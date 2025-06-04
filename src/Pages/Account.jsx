import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
      }
    });

    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        setEmailVerified(auth.currentUser.emailVerified);
        }
      }, 1000);  // 1 секунда

      return () => {
        unsubscribe();
        clearInterval(interval);
      };
    }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setMessage("📩 E-mail o potwierdzeniu adresu został ponownie wysłany.");
      } catch (error) {
        setMessage("❌ Błąd podczas wysyłania e-maila: " + error.message);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white shadow-md rounded p-6">
      <h1 className="text-2xl font-bold mb-4">Moje konto</h1>

      {user && !emailVerified && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded">
          <p>
            ⚠️ Twój adres e-mail nie został jeszcze potwierdzony. Sprawdź swoją skrzynkę e-mail.
          </p>
          <button
            onClick={handleResendVerification}
            className="mt-2 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          >
            Wyślij ponownie e-mail
          </button>
        </div>
      )}

      {message && (
        <div className="mb-4 text-sm text-blue-600 bg-blue-100 p-2 rounded">
          {message}
        </div>
      )}

      {user && (
        <div className="space-y-2">
          <p><strong>ID użytkownika:</strong> {user.uid}</p>
          <p><strong>E-mail:</strong> {user.email}</p>
          <p><strong>Imię i Nazwisko:</strong> </p>
          <p><strong>Nr. telefonu:</strong> </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Wylogować się
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
