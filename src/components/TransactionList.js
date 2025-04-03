import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const TransactionList = () => {
  const { transactions, deleteTransaction, addTransaction } = useExpenseContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [newCategory, setNewCategory] = useState(""); // برای اضافه کردن دسته‌بندی جدید
  const [categories, setCategories] = useState(["خوراک", "حمل و نقل", "قبوض", "تفریح"]); // دسته‌بندی‌های پیش‌فرض و جدید

  // فیلتر کردن تراکنش‌ها بر اساس جستجو و دسته‌بندی
  const filteredTransactions = transactions.filter(transaction => 
    (transaction.title.includes(searchTerm) || transaction.amount.toString().includes(searchTerm)) && 
    (categoryFilter ? transaction.category === categoryFilter : true)
  );

  // افزودن دسته‌بندی جدید
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory(""); // پاک کردن فیلد ورودی بعد از افزودن دسته‌بندی جدید
    } else {
      alert("لطفاً یک دسته‌بندی معتبر وارد کنید.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">لیست تراکنش‌ها</h3>
      
      {/* فیلد جستجو */}
      <input
        type="text"
        placeholder="جستجو بر اساس عنوان یا مبلغ"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* فیلتر دسته‌بندی */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">انتخاب دسته‌بندی</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      {/* افزودن دسته‌بندی جدید */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="دسته‌بندی جدید"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          افزودن دسته‌بندی جدید
        </button>
      </div>

      {/* نمایش لیست تراکنش‌ها */}
      <ul className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
            <div>
              <span className="font-semibold text-lg text-gray-800">{transaction.title}</span>
              <span className="text-gray-500 text-sm"> - {transaction.category}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800 font-semibold">{transaction.amount} تومان</span>
              <button
                className="ml-4 text-red-500 hover:text-red-700 transition-all"
                onClick={() => deleteTransaction(transaction.id)}
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
