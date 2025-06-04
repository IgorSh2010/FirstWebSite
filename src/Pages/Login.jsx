import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const lastProductId = localStorage.getItem("lastViewedProductId");
      if (lastProductId) {
        navigate(`/productsMain/${lastProductId}`);
        localStorage.removeItem("lastViewedProductId"); 
      } else {
        navigate("/account"); 
      }
    } catch (error) {
      setModalMessage("Błąd: " + error.message);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-16">
      <h2 className="text-2xl text-center font-bold mb-2">Logowanie </h2>
      <h2 className="text-xl text-center font-bold mb-2">dla zarejestrowanych użytkowników</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Twoj adres e-mail, podany pod czas rejestracji..."
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Wprowadź hasło..."
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
          Zaloguj się
        </button>
      </form>
    </div>

    {modalMessage && (
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);
        if (modalMessage == null) {
          navigate("/account");
        }
      }} />
    )}
  </>
);
};

export default Login;