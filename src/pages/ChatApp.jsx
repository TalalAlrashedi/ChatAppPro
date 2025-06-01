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
  const [bgColor, setBgColor] = useState("bg-sky-100");
  const [textColor, setTextColor] = useState("text-black");

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transition-all duration-500">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6">
        {/* رأس التطبيق مع زر الخروج */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-sky-800">تطبيق الدردشة</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow"
          >
            خروج
          </button>
        </div>

        <p className="text-center text-lg mb-4">مرحبا، <span className="font-semibold">{currentUser}</span></p>

        <div className="flex gap-3 mb-4 text-sm">
          <select
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="flex-1 p-2 border border-sky-400 rounded-md focus:outline-none text-sky-700"
          >
            <option value="bg-gray-100">رمادي</option>
            <option value="bg-sky-100">أزرق</option>
            <option value="bg-red-100">أحمر</option>
            <option value="bg-pink-100">وردي</option>
            <option value="bg-green-100">أخضر</option>
            <option value="bg-yellow-100">أصفر</option>
          </select>

          <select
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="flex-1 p-2 border border-sky-400 rounded-md focus:outline-none text-sky-700"
          >
            <option value="text-black">أسود</option>
            <option value="text-white">أبيض</option>
            <option value="text-blue-700">أزرق غامق</option>
            <option value="text-red-700">أحمر غامق</option>
            <option value="text-pink-700">وردي غامق</option>
            <option value="text-green-700">أخضر غامق</option>
          </select>
        </div>

        <div className="h-72 overflow-y-auto mb-4 border border-sky-200 rounded-lg p-4 bg-sky-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 mb-3 w-fit max-w-[70%] rounded-2xl shadow-sm break-words ${bgColor} ${textColor} ${
                msg.sender === currentUser ? "ml-auto text-right" : "mr-auto text-left"
              }`}
            >
              <p className="text-xs opacity-60 mb-1 font-medium">
                {msg.sender === currentUser ? "أنت" : msg.sender}
              </p>
              <hr />
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border border-sky-400 rounded-md focus:outline-none focus:ring focus:ring-sky-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="اكتب رسالة..."
          />
          <button
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-md shadow"
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