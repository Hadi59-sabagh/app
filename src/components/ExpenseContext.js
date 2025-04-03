import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const AddTransaction = () => {
  const { addTransaction, categories } = useExpenseContext();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");  // اضافه کردن وضعیت برای خطا

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // بررسی خالی بودن فیلدها
    if (!title || !amount || !date || !category) {
      setError("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    // بررسی مبلغ منفی یا صفر
    if (parseFloat(amount) <= 0) {
      setError("مبلغ باید بزرگتر از صفر باشد!");
      return;
    }

    // ارسال تراکنش
    addTransaction({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date,
      category,
      type,
    });

    // ریست کردن فیلدها
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setError("");  // پاک کردن پیام خطا بعد از موفقیت

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      {error && <div className="text-red-500 text-center">{error}</div>} {/* نمایش پیام خطا */}

      <div>
        <input
          type="text"
          placeholder="عنوان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <input
          type="number"
          placeholder="مبلغ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="expense">هزینه</option>
          <option value="income">درآمد</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          افزودن تراکنش
        </button>
      </div>
    </form>
  );
};

export default AddTransaction;
