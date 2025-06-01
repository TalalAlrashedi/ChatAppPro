import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(url);
      const users = await res.data;
      const user = users.find(
        (u) => u.email == email && u.password == password
      );

      if (user) {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل الدخول",
        });

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/chatapp");
      } else {
        Swal.fire({
          icon: "error",
          title: "بيانات غير صحيحة",
          text: "تأكد من البريد الإلكتروني وكلمة المرور",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="flex h-screen  bg-gray-700">
      <div class="w-full max-w-md m-auto bg-blue-50 rounded p-6">
        <h1 className="text-center text-3xl p-3">Login page</h1>
        <hr />
        <header>
          <img
            class="w-15 mx-auto m-3"
            src="https://img.icons8.com/?size=100&id=6a8F4OVXnpvb&format=png&color=000000"
          />
        </header>
        <form onSubmit={handleLogin}>
          <div>
            <label class="block mb-2 text-sky-500" for="username">
              Email
            </label>
            <input
              class="w-full p-2 mb-6 text-sky-700 border-b-2 border-sky-500 outline-none focus:bg-gray-300"
              type="email"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label class="block mb-2 text-sky-500" for="password">
              Password
            </label>
            <input
              class="w-full p-2 mb-6 text-sky-700 border-b-2 border-sky-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button class="w-full bg-sky-700 hover:bg-sky-600 transition hover:cursor-pointer text-white font-bold py-2 px-4 mb-6 rounded">
              create Account
            </button>
          </div>
        </form>
        <footer className="flex items-center gap-2">
          <p> New user?</p>
          <Link to="/" class="text-sky-700  hover:text-sky-400  ">
            register
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Login;
