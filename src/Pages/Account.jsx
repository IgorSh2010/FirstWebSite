import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal"; 
import { Edit, Save, X, LogOut, NotebookTabs, ClockAlert } from 'lucide-react';

const Account = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ fullName: "", phone: "" , email: ""});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
        setLoading(false);
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

  const handleSave = async () => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { ...profile, email: user.email }, { merge: true });
    setModalMessage("Profil został zapisany!");
    setEditMode(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setModalMessage("📩 E-mail o potwierdzeniu adresu został ponownie wysłany.");
      } catch (error) {
        setModalMessage("❌ Błąd podczas wysyłania e-maila: " + error.message);
      }
    }
  };
 
  if (loading) {
    return (
      <div className="text-center text-gray-600 py-20">
        Ładowanie profilu...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
        Moje konto
      </h1>

      <div className="space-y-4">

        <div className="bg-pink-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">ID użytkownika:</p>
          <p className="font-mono break-all">{user.uid}</p>
        </div>

        <div className="bg-pink-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">E-mail:</p>
          <p>{user.email}</p>
        </div>

        <div className="bg-pink-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Imię i Nazwisko:</p>
          {editMode ? (
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            />
          ) : (
            <p className="mt-1">{profile.fullName || "-"}</p>
          )}
        </div>

        <div className="bg-pink-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Numer telefonu:</p>
          {editMode ? (
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          ) : (
            <p className="mt-1">{profile.phone || "-"}</p>
          )}
        </div>

        {/* Przyciski */}
        <div className="flex flex-col md:flex-row justify-between mt-4 space-y-2 md:space-y-0 md:space-x-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                <Save size={20} />Zapisz
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="flex items-center justify-center gap-2 w-full bg-red-400 text-white py-2 rounded hover:bg-red-700 transition"
              >
                <X size={20} />Anuluj
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center justify-center gap-2 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              <Edit size={20} />Edytuj profil
            </button>
          )}
        </div>

        {user && !emailVerified && (
            <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded">
              <p>
                <ClockAlert size={30} className="text-yellow-800 items-center justify-center"/> Twój adres e-mail nie został jeszcze potwierdzony. Sprawdź swoją skrzynkę e-mail.
              </p>
              <button
                onClick={handleResendVerification}
                className="mt-2 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Wyślij ponownie e-mail
              </button>
            </div>
          )}

          {modalMessage && (
            <Modal
              message={modalMessage}
              onClose={() => setModalMessage("")}
              onConfirm={() => setModalMessage("")}
              confirmMode={false} />
          )}

        <button
          onClick={() => navigate("/orders")}
          className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          <NotebookTabs size={20} /> Moje zamówienia
        </button>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
        >
          <LogOut size={20}/> Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default Account;