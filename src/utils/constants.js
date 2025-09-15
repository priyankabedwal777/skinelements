// Chart colors
export const Chartcolours = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
];

export const Filesize = 10 * 1024 * 1024; // 10MB

export const ColumnMaping = {
  "Product Name": ["productName", "product_name", "name"],
  Sales: ["sales", "total_sales", "revenue"],
  Profit: ["profit", "net_profit", "profit_amount"],
  TE: ["te", "total_expenses", "expenses"],
  Credit: ["credit", "credits", "credit_amount"],
  "Amazon Fee": ["amazonFee", "amazon_fee", "fees"],
  "Profit Percentage": [
    "profitPercentage",
    "profit_percentage",
    "profit_margin",
  ],
};

export const Profits = {
  HIGH: 30,
  MEDIUM: 20,
  LOW: 0,
};

// Local storage keys
export const localstoragekey = {
  USER: "ecommerce_user",
  DATA: "ecommerce_data",
  THEME: "ecommerce_theme",
};

export const ErrorMessages = {
  INVALID_FILE: "Please upload a valid CSV or Excel file",
  FILE_TOO_LARGE: "File size exceeds 10MB limit",
  MISSING_COLUMNS: "Required columns are missing from the file",
  PROCESSING_ERROR: "Error processing file data",
  NO_DATA: "No valid data found in the file",
};
