import React from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import * as XLSX from "xlsx";

const FileUpload = () => {
  const navigate = useNavigate(); //  React Router navigation
  const { setUploadedData } = useData();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const processedData = jsonData.map((row, index) => ({
            id: index + 1,
            productName:
              row["Product Name"] || row.productName || "Unknown Product",
            sales: parseFloat(row["Sales"] || row.sales || 0),
            profit: parseFloat(row["Profit"] || row.profit || 0),
            te: parseFloat(row["TE"] || row.te || 0),
            credit: parseFloat(row["Credit"] || row.credit || 0),
            amazonFee: parseFloat(row["Amazon Fee"] || row.amazonFee || 0),
            profitPercentage: parseFloat(
              row["Profit Percentage"] || row.profitPercentage || 0
            ),
          }));

          setUploadedData(processedData);
          navigate("/dashboard"); //  redirect after upload
        } catch (error) {
          alert("Error reading file. Please upload a valid CSV/Excel file.");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Your Data
          </h1>
          <p className="text-gray-600">
            Upload a CSV or Excel file with your product data
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Click to upload file
            </p>
            <p className="text-sm text-gray-500">
              CSV, XLSX, or XLS files only
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
