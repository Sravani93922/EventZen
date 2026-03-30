import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      console.log("➡️ LOGIN started");

      // ✅ call login API
      const res = await login(email, password);

      console.log("➡️ LOGIN SUCCESS:", res);

      alert("Login Successful 🎉");

      // ✅ get role from localStorage
      const role = localStorage.getItem("role");

      // ✅ ROLE BASED REDIRECT (FIXED)
      if (role === "ADMIN") {
        nav("/admin/dashboard");
      } else {
        nav("/dashboard");   // ✅ FIXED (NOT "/")
      }

    } catch (err) {
      console.log("❌ LOGIN ERROR:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card w-96 bg-base-200 p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="input w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input w-full mb-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full" onClick={submit}>
          Login
        </button>
      </div>
    </div>
  );
}