import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

  const createUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "لم يتم تعبئة البيانات",
        text: "قم بتعبئة البيانات ",
      });
      return;
    }
    if (!email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "خطأ في البريد الإلكتروني",
        text: "يجب أن يحتوي البريد الإلكتروني على @",
      });
      return;
    }

    if (password.length <= 6) {
      Swal.fire({
        icon: "error",
        title: "كلمة المرور قصيرة",
        text: "كلمة المرور يجب أن تكون أكثر من 6 أحرف",
      });
      return;
    }

    try {
      await axios.post(url, { email, password, name });
      await Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح سيتم نقلك لصفحة تسجيل الدخول",
      });
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="flex h-screen  bg-gray-700">
      <div class="w-full max-w-md m-auto bg-blue-50 rounded p-6">
        <h1 className="text-center text-3xl p-3">Register page</h1>
        <hr />
        <header>

          <FaUserPlus class="w-15 text-6xl mx-auto m-2" />
        </header>
        <form onSubmit={createUser}>
          <div>
            <label class="block mb-2 text-sky-500" for="name">
              Name
            </label>
            <input
              class="w-full p-2 mb-6 text-sky-700 border-b-2 border-sky-500 outline-none focus:bg-gray-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <button
              type="submit"
              class="w-full bg-sky-700 hover:bg-sky-600 transition hover:cursor-pointer text-white font-bold py-2 px-4 mb-6 rounded"
            >
              create Account
            </button>
          </div>
        </form>
        <footer className="flex items-center gap-2">
          <p> Have already Account?</p>
          <Link to="/login" class="text-sky-700  hover:text-sky-400  ">
            Login
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;
