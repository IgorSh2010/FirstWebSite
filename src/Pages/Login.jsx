import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/account");
    } catch (error) {
      alert("Помилка входу: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-16">
      <h2 className="text-2xl font-bold mb-4">Вхід до кабінету</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;