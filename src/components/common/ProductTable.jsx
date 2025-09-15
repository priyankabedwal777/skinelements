import React from "react";
import { Eye } from "lucide-react";

const ProductTable = ({ uploadedData, onProductClick }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold">Product Data</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Product Name", "Sales", "Profit", "Profit %", "Action"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {uploadedData.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onProductClick(product)}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  ${product.sales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600">
                  ${product.profit.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.profitPercentage >= 30
                        ? "bg-green-100 text-green-800"
                        : product.profitPercentage >= 20
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.profitPercentage}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
