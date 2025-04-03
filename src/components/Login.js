import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const Login = () => {
  const { setUser } = useExpenseContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // بررسی ورودی‌های خالی
    if (!email || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }

    // بررسی اعتبار ایمیل
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("ایمیل وارد شده معتبر نیست.");
      return;
    }

    // ذخیره اطلاعات کاربر در LocalStorage و مدیریت وضعیت
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setEmail("");  // ریست کردن فیلد ایمیل
    setPassword(""); // ریست کردن فیلد رمز عبور
    setError(""); // پاک کردن پیام خطا
  };

  return (
    <div className="p-4">
      {/* نمایش پیام خطا */}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="button"
        onClick={handleLogin}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        ورود
      </button>
    </div>
  );
};

export default Login;
