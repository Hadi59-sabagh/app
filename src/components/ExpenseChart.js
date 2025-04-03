import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { useExpenseContext } from "../context/ExpenseContext";
import Chart from "chart.js/auto";

const ExpenseChart = () => {
  const { transactions = [] } = useExpenseContext();

  // مرتب‌سازی تراکنش‌ها بر اساس تاریخ به ترتیب صعودی
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const categories = ["خوراک", "حمل و نقل", "قبوض", "تفریح"];
  const categoryAmounts = categories.map(category =>
    sortedTransactions
      .filter(transaction => transaction.category === category)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  );

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryAmounts,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      }
    ]
  };

  const lineData = {
    labels: sortedTransactions.map(transaction => transaction.date),
    datasets: [
      {
        label: "هزینه‌ها",
        data: sortedTransactions.filter(transaction => transaction.type === "expense").map(transaction => transaction.amount),
        borderColor: "red",
        fill: false
      },
      {
        label: "درآمدها",
        data: sortedTransactions.filter(transaction => transaction.type === "income").map(transaction => transaction.amount),
        borderColor: "green",
        fill: false
      }
    ]
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">گزارش‌ها</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">نمودار دایره‌ای هزینه‌ها</h4>
          <div className="w-full max-w-xs">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">نمودار خطی روند هزینه و درآمد</h4>
          <div className="w-full max-w-xs">
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
