import React from "react";
import { BarChart3, DollarSign, Package, PieChart } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../common/Cards"; // <-- IMPORTANT: correct path & filename

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { uploadedData = [] } = useData();

  const product = uploadedData.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const productData = [
    { name: "Sales", value: product.sales || 0, color: "#0088FE" },
    { name: "Profit", value: product.profit || 0, color: "#00C49F" },
    {
      name: "Expenses",
      value: (product.te || 0) + (product.amazonFee || 0),
      color: "#FF8042",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.productName}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Sales"
            value={`$${product.sales.toLocaleString()}`}
            icon={<BarChart3 className="w-6 h-6" />}
            gradient="from-blue-500 to-indigo-600"
          />
          <Card
            title="Profit"
            value={`$${product.profit.toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6" />}
            gradient="from-green-500 to-emerald-600"
          />
          <Card
            title="Profit Margin"
            value={`${product.profitPercentage}%`}
            icon={<PieChart className="w-6 h-6" />}
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, "Amount"]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Financial Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Total Expenses (TE)
                </span>
                <span className="text-red-600 font-bold">
                  ${(product.te || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Credit</span>
                <span className="text-blue-600 font-bold">
                  ${(product.credit || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Amazon Fee</span>
                <span className="text-orange-600 font-bold">
                  ${(product.amazonFee || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="font-medium text-green-700">Net Profit</span>
                <span className="text-green-600 font-bold text-xl">
                  ${(product.profit || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
