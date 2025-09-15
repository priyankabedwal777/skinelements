import { Chartcolours, Profits } from "./constants";

export const preparePieChartData = (data, valueKey, nameKey = "name") => {
  return data.map((item, index) => ({
    name: item[nameKey] || `Item ${index + 1}`,
    value: item[valueKey] || 0,
    color: Chartcolours[index % Chartcolours.length],
  }));
};

export const prepareRevenueDistribution = (uploadedData) => {
  const totalSales = uploadedData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = uploadedData.reduce((sum, item) => sum + item.profit, 0);
  const totalExpenses = uploadedData.reduce(
    (sum, item) => sum + (item.te + item.amazonFee),
    0
  );

  return [
    { name: "Sales", value: totalSales, color: "#0088FE" },
    { name: "Profit", value: totalProfit, color: "#00C49F" },
    { name: "Expenses", value: totalExpenses, color: "#FF8042" },
  ];
};

export const prepareBarChartData = (uploadedData, maxItems = 10) => {
  return uploadedData.slice(0, maxItems).map((item) => ({
    name:
      item.productName.length > 15
        ? item.productName.substring(0, 15) + "..."
        : item.productName,
    sales: item.sales,
    profit: item.profit,
    expenses: item.te + item.amazonFee,
    profitPercentage: item.profitPercentage,
  }));
};

export const prepareProfitAnalysisData = (uploadedData) => {
  return uploadedData.map((item) => ({
    name: item.productName,
    profit: item.profit,
    profitPercentage: item.profitPercentage,
    sales: item.sales,
    expenses: item.te + item.amazonFee,
    status: getProfitabilityStatus(item.profitPercentage),
  }));
};

export const getProfitabilityStatus = (profitPercentage) => {
  if (profitPercentage >= Profits.HIGH) {
    return "High";
  } else if (profitPercentage >= Profits.MEDIUM) {
    return "Medium";
  } else {
    return "Low";
  }
};

export const getStatusColorClass = (profitPercentage) => {
  if (profitPercentage >= Profits.HIGH) {
    return "bg-green-100 text-green-800";
  } else if (profitPercentage >= Profits.MEDIUM) {
    return "bg-yellow-100 text-yellow-800";
  } else {
    return "bg-red-100 text-red-800";
  }
};

export const calculateSummaryStats = (uploadedData) => {
  if (!uploadedData || uploadedData.length === 0) {
    return {
      totalSales: 0,
      totalProfit: 0,
      totalExpenses: 0,
      averageProfit: 0,
      averageProfitPercentage: 0,
      totalProducts: 0,
      highProfitProducts: 0,
      mediumProfitProducts: 0,
      lowProfitProducts: 0,
    };
  }

  const totalSales = uploadedData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = uploadedData.reduce((sum, item) => sum + item.profit, 0);
  const totalExpenses = uploadedData.reduce(
    (sum, item) => sum + (item.te + item.amazonFee),
    0
  );
  const averageProfit = totalProfit / uploadedData.length;
  const averageProfitPercentage =
    uploadedData.reduce((sum, item) => sum + item.profitPercentage, 0) /
    uploadedData.length;

  const highProfitProducts = uploadedData.filter(
    (item) => item.profitPercentage >= Profits.HIGH
  ).length;
  const mediumProfitProducts = uploadedData.filter(
    (item) =>
      item.profitPercentage >= Profits.MEDIUM &&
      item.profitPercentage < Profits.HIGH
  ).length;
  const lowProfitProducts = uploadedData.filter(
    (item) => item.profitPercentage < Profits.MEDIUM
  ).length;

  return {
    totalSales,
    totalProfit,
    totalExpenses,
    averageProfit,
    averageProfitPercentage,
    totalProducts: uploadedData.length,
    highProfitProducts,
    mediumProfitProducts,
    lowProfitProducts,
  };
};

export const formatCurrency = (value, locale = "en-US", currency = "USD") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const prepareTrendData = (uploadedData, groupBy = "month") => {
  const trendData = uploadedData.map((item, index) => ({
    period: `Period ${index + 1}`,
    sales: item.sales,
    profit: item.profit,
    profitPercentage: item.profitPercentage,
  }));

  return trendData;
};

export const getTopProducts = (uploadedData, sortBy = "profit", limit = 5) => {
  const sorted = [...uploadedData].sort((a, b) => {
    if (sortBy === "profit") return b.profit - a.profit;
    if (sortBy === "sales") return b.sales - a.sales;
    if (sortBy === "profitPercentage")
      return b.profitPercentage - a.profitPercentage;
    return 0;
  });

  return sorted.slice(0, limit);
};

export const getBottomProducts = (
  uploadedData,
  sortBy = "profit",
  limit = 5
) => {
  const sorted = [...uploadedData].sort((a, b) => {
    if (sortBy === "profit") return a.profit - b.profit;
    if (sortBy === "sales") return a.sales - b.sales;
    if (sortBy === "profitPercentage")
      return a.profitPercentage - b.profitPercentage;
    return 0;
  });

  return sorted.slice(0, limit);
};

export const getProfitMarginInsights = (uploadedData) => {
  const stats = calculateSummaryStats(uploadedData);
  const insights = [];

  if (stats.averageProfitPercentage >= Profits.HIGH) {
    insights.push({
      type: "positive",
      message:
        "Excellent overall profit margins! Your products are performing very well.",
    });
  } else if (stats.averageProfitPercentage >= Profits.MEDIUM) {
    insights.push({
      type: "neutral",
      message:
        "Good profit margins. Consider optimizing costs for better performance.",
    });
  } else {
    insights.push({
      type: "negative",
      message:
        "Low profit margins detected. Review pricing and cost structure.",
    });
  }

  if (stats.highProfitProducts > stats.lowProfitProducts) {
    insights.push({
      type: "positive",
      message: `${stats.highProfitProducts} products have high profitability.`,
    });
  }

  if (stats.lowProfitProducts > stats.totalProducts * 0.3) {
    insights.push({
      type: "warning",
      message: `${stats.lowProfitProducts} products need attention for better profitability.`,
    });
  }

  return insights;
};
