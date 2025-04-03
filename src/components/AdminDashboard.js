import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const AdminDashboard = () => {
  const { transactions, wallets, reminders } = useExpenseContext();

  // محاسبه مجموع درآمدها و هزینه‌ها
  const totalIncome = transactions
    .filter(transaction => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">داشبورد مدیریت</h3>
      <div>
        <h4 className="text-lg mb-2">تعداد تراکنش‌ها: {transactions.length}</h4>
        <h4 className="text-lg mb-2">تعداد کیف پول‌ها: {wallets.length}</h4>
        <h4 className="text-lg mb-2">تعداد یادآوری‌ها: {reminders.length}</h4>
        <h4 className="text-lg mb-2 text-green-600">مجموع درآمدها: {totalIncome} تومان</h4>
        <h4 className="text-lg mb-2 text-red-600">مجموع هزینه‌ها: {totalExpense} تومان</h4>
      </div>
    </div>
  );
};

export default AdminDashboard;
