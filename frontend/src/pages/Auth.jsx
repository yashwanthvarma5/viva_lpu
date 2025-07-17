import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async () => {
    const url = isLogin ? "login" : "register";
    const payload = isLogin
      ? {
          email: form.email,
          password: form.password,
        }
      : form;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${url}`,
        payload
      );
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(`${isLogin ? "Login" : "Register"} failed`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>
      {!isLogin && (
        <input
          className="block w-full mb-2 p-2 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        className="block w-full mb-2 p-2 border rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="block w-full mb-2 p-2 border rounded"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        onClick={handleSubmit}
      >
        {isLogin ? "Login" : "Register"}
      </button>
      <p className="text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
