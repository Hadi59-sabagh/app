import React, { createContext, useReducer, useContext, useState } from "react";

// مقدار اولیه
const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
  wallets: JSON.parse(localStorage.getItem("wallets")) || [{ id: 1, name: "کیف پول اصلی", balance: 0 }],
  reminders: JSON.parse(localStorage.getItem("reminders")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  categories: ["خوراک", "حمل و نقل", "قبوض", "تفریح"], // دسته‌بندی‌های پیش‌فرض
};

// Reducer برای مدیریت وضعیت
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const updatedTransactions = [...state.transactions, action.payload];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return { ...state, transactions: updatedTransactions };

    case "DELETE_TRANSACTION":
      const filteredTransactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(filteredTransactions));
      return { ...state, transactions: filteredTransactions };

    case "ADD_WALLET":
      const updatedWallets = [...state.wallets, action.payload];
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      return { ...state, wallets: updatedWallets };

    case "ADD_CUSTOM_CATEGORY":
      const updatedCategories = [...state.categories, action.payload];
      return { ...state, categories: updatedCategories };

    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "ADD_REMINDER":
      const updatedReminders = [...state.reminders, action.payload];
      localStorage.setItem("reminders", JSON.stringify(updatedReminders));
      return { ...state, reminders: updatedReminders };

    default:
      return state;
  }
};

// Context برای استفاده در دیگر کامپوننت‌ها
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{
      transactions: state.transactions,
      wallets: state.wallets,
      reminders: state.reminders,
      user: state.user,
      categories: state.categories,
      addTransaction: (transaction) => dispatch({ type: "ADD_TRANSACTION", payload: transaction }),
      deleteTransaction: (id) => dispatch({ type: "DELETE_TRANSACTION", payload: id }),
      addWallet: (wallet) => dispatch({ type: "ADD_WALLET", payload: wallet }),
      addCustomCategory: (category) => dispatch({ type: "ADD_CUSTOM_CATEGORY", payload: category }),
      setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
      addReminder: (reminder) => dispatch({ type: "ADD_REMINDER", payload: reminder }),
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
