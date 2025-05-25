import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login"); // редирект, якщо не залогінений
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white shadow-md rounded p-6">
      <h1 className="text-2xl font-bold mb-4"> Moje konto</h1>
      {user && (
        <div className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID користувача:</strong> {user.uid}</p>
          {/* Тут можна додати: замовлення, улюблені товари тощо */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Вийти
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;