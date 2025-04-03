import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const Reminder = () => {
  const { addReminder } = useExpenseContext();
  const [reminder, setReminder] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [error, setError] = useState("");

  const handleAddReminder = () => {
    // بررسی فیلدهای خالی
    if (!reminder || !reminderDate) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    // بررسی تاریخ آینده
    const currentDate = new Date();
    const selectedDate = new Date(reminderDate);
    if (selectedDate < currentDate) {
      setError("تاریخ باید بعد از امروز باشد.");
      return;
    }

    // افزودن یادآوری
    const newReminder = { reminder, reminderDate };
    addReminder(newReminder);
    setReminder("");
    setReminderDate("");
    setError(""); // پاک کردن خطا بعد از موفقیت
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 className="text-2xl font-bold text-center text-indigo-600 mb-6">یادآوری‌ها</h3>

      {/* نمایش پیام خطا */}
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="یادآوری"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={handleAddReminder}
          className="w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
        >
          افزودن یادآوری
        </button>
      </div>
    </div>
  );
};

export default Reminder;
