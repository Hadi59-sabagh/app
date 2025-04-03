import React from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import AddTransaction from "./components/AddTransaction";
import AddWallet from "./components/AddWallet";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import Reminder from "./components/Reminder";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import './styles.css';

const ExpenseTracker = () => {
  return (
    <ExpenseProvider>
      <div className="app-container p-4">
        <h1 className="text-2xl font-bold text-center mb-6">مدیریت هزینه‌ها</h1>
        <Login />
        <AddWallet />
        <AddTransaction />
        <TransactionList />
        <ExpenseChart />
        <Reminder />
        <AdminDashboard />
      </div>
    </ExpenseProvider>
  );
};

export default ExpenseTracker;
