import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Паролі не співпадають!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Реєстрація успішна!");
      navigate("/account");
    } catch (error) {
      alert("Помилка: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-16">
      <h2 className="text-2xl font-bold mb-4">Реєстрація</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Підтвердження пароля"
          className="w-full border p-2"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default Register;