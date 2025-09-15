import React from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import RevenueChart from "../../components/common/RevenueCharts";
import PerformanceChart from "../../components/common/PerformanceCharts";
import ProductTable from "../../components/common/ProductTable";

import { BarChart3, DollarSign, PieChart } from "lucide-react";
import Card from "../../components/common/Cards";

const Dashboard = () => {
  const { uploadedData } = useData();
  const navigate = useNavigate();

  const totalSales = uploadedData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = uploadedData.reduce((sum, item) => sum + item.profit, 0);
  const totalExpenses = uploadedData.reduce(
    (sum, item) => sum + (item.te + item.amazonFee),
    0
  );

  const cards = [
    {
      title: "Total Sales",
      value: `$${totalSales.toLocaleString()}`,
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Profit",
      value: `$${totalProfit.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toLocaleString()}`,
      icon: <PieChart className="w-6 h-6" />,
      gradient: "from-orange-500 to-pink-500",
    },
  ];

  const pieData = [
    { name: "Sales", value: totalSales, color: "#0088FE" },
    { name: "Profit", value: totalProfit, color: "#00C49F" },
    { name: "Expenses", value: totalExpenses, color: "#FF8042" },
  ];

  const barData = uploadedData.map((item) => ({
    name: item.productName.substring(0, 10) + "...",
    sales: item.sales,
    profit: item.profit,
    expenses: item.te + item.amazonFee,
  }));

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of product performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            value={card.value}
            icon={card.icon}
            gradient={card.gradient}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart pieData={pieData} />
        <PerformanceChart barData={barData} />
      </div>
      <ProductTable
        uploadedData={uploadedData}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default Dashboard;
