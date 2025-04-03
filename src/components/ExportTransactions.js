import React from "react";
import { CSVLink } from "react-csv";
import { useExpenseContext } from "../context/ExpenseContext";

const ExportTransactions = () => {
  const { transactions = [] } = useExpenseContext();

  // تعریف سربرگ‌های CSV
  const headers = [
    { label: "عنوان", key: "title" },
    { label: "مبلغ", key: "amount" },
    { label: "تاریخ", key: "date" },
    { label: "دسته‌بندی", key: "category" },
    { label: "نوع", key: "type" }
  ];

  // تبدیل داده‌ها برای خروجی CSV با فرمت بهتر برای تاریخ
  const data = transactions.map(transaction => ({
    title: transaction.title,
    amount: transaction.amount,
    date: new Date(transaction.date).toLocaleDateString("fa-IR"), // تبدیل تاریخ به فرمت خوانا
    category: transaction.category,
    type: transaction.type
  }));

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">دانلود تراکنش‌ها</h3>
      <p className="text-gray-600 mb-4 text-center">برای دانلود لیست تراکنش‌ها به فرمت CSV، دکمه زیر را فشار دهید.</p>
      <CSVLink
        data={data}
        headers={headers}
        filename={"transactions.csv"}
        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
      >
        دانلود CSV تراکنش‌ها
      </CSVLink>
    </div>
  );
};

export default ExportTransactions;
