import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChatApp = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = user?.name;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bgColor, setBgColor] = useState("bg-gray-100");

  const apiURL = "https://6836b885664e72d28e41d28e.mockapi.io/api/char";

  const fetchMessages = async () => {
    try {
      const res = await axios.get(apiURL);
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(apiURL, {
        sender: currentUser,
        text: input,
      });
      setInput("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const result = await Swal.fire({
          icon: "error",
          title: "المستخدم لم يقم بتسجيل الدخول",
          text: "سوف يتم توجيهك إلى صفحة التسجيل",
          confirmButtonText: "موافق",
        });

        if (result.isConfirmed) {
          navigate("/login");
        }

        return;
      }

      fetchMessages();
    };

    checkUser();
  }, []);

  return (
    <div className={`flex flex-col items-center h-screen p-5`}>
      <h2 className="text-2xl font-bold mb-4">مرحبا ، {currentUser}</h2>
      <div className="text-balance flex flex-col">
        <label htmlFor="">اختر اللون</label>
        <select
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="bg-amber-50 block"
        >
          <option value="bg-gray-100">رمادي</option>
          <option value="bg-sky-100">ازرق</option>
          <option value="bg-red-100">احمر</option>
          <option value="bg-pink-100">وردي</option>
        </select>
      </div>
      <div className={`w-full max-w-2xl ${bgColor} shadow rounded p-4`}>
        <h3 className="text-lg font-semibold mb-2 text-center">
          تطبيق الدردشة
        </h3>
        <div className="h-100 overflow-y-scroll mb-4 border p-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 m-2  w-fit flex rounded-2xl  flex-col gap-1  ${
                msg.sender === currentUser
                  ? "bg-green-500 self-end ml-auto text-right"
                  : "bg-gray-300"
              }`}
            >
              <p className="
               text-sm opacity-80 max-w-20  ml-auto bg-gray-50 rounded-3xl px-4">
                {msg.sender === currentUser ? "انت" : msg.sender}
              </p>
              <hr />
              <span >{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="اكتب رسالة"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSend}
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
