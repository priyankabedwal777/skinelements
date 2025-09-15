import * as XLSX from "xlsx";
import { ColumnMaping, ErrorMessages, Filesize } from "./constants";

export const validateFile = (file) => {
  if (!file) {
    throw new Error("No file selected");
  }
  if (file.size > Filesize) {
    throw new Error(ErrorMessages.FILE_TOO_LARGE);
  }

  const fileExtension = file.name.split(".").pop().toLowerCase();
  const allowedTypes = ["csv", "xlsx", "xls"];

  if (!allowedTypes.includes(fileExtension)) {
    throw new Error(ErrorMessages.INVALID_FILE);
  }

  return true;
};

export const parseFileData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonData || jsonData.length === 0) {
          reject(new Error(ErrorMessages.NO_DATA));
          return;
        }

        resolve(jsonData);
      } catch (error) {
        reject(new Error(ErrorMessages.PROCESSING_ERROR));
      }
    };

    reader.onerror = () => {
      reject(new Error(ErrorMessages.PROCESSING_ERROR));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const mapColumnName = (columnName) => {
  const lowerColumnName = columnName.toLowerCase().trim();

  for (const [standardName, alternatives] of Object.entries(ColumnMaping)) {
    if (standardName.toLowerCase() === lowerColumnName) {
      return standardName;
    }

    for (const alt of alternatives) {
      if (alt.toLowerCase() === lowerColumnName) {
        return standardName;
      }
    }
  }

  return columnName;
};

export const processProductData = (rawData) => {
  const processedData = rawData.map((row, index) => {
    const processedRow = {};

    Object.keys(row).forEach((key) => {
      const standardKey = mapColumnName(key);
      processedRow[standardKey] = row[key];
    });

    return {
      id: index + 1,
      productName: processedRow["Product Name"] || `Product ${index + 1}`,
      sales: parseFloat(processedRow["Sales"] || 0),
      profit: parseFloat(processedRow["Profit"] || 0),
      te: parseFloat(processedRow["TE"] || 0),
      credit: parseFloat(processedRow["Credit"] || 0),
      amazonFee: parseFloat(processedRow["Amazon Fee"] || 0),
      profitPercentage: parseFloat(processedRow["Profit Percentage"] || 0),
    };
  });

  return processedData.filter(
    (item) => item.productName && !isNaN(item.sales) && !isNaN(item.profit)
  );
};

export const validateProcessedData = (data) => {
  if (!data || data.length === 0) {
    throw new Error(ErrorMessages.NO_DATA);
  }
  const hasValidData = data.some(
    (item) => item.productName && item.sales > 0 && !isNaN(item.profit)
  );

  if (!hasValidData) {
    throw new Error("No valid product data found in the file");
  }

  return true;
};

// upload file func
export const processUploadedFile = async (file) => {
  try {
    validateFile(file);
    const rawData = await parseFileData(file);
    const processedData = processProductData(rawData);
    validateProcessedData(processedData);

    return processedData;
  } catch (error) {
    throw error;
  }
};

// export to csv
export const exportToCSV = (data, filename = "export.csv") => {
  const headers = [
    "Product Name",
    "Sales",
    "Profit",
    "TE",
    "Credit",
    "Amazon Fee",
    "Profit Percentage",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        `"${row.productName}"`,
        row.sales,
        row.profit,
        row.te,
        row.credit,
        row.amazonFee,
        row.profitPercentage,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
