import { useState, useEffect, useMemo } from "react";
import {
  prepareRevenueDistribution,
  prepareBarChartData,
  prepareProfitAnalysisData,
  calculateSummaryStats,
  getProfitMarginInsights,
} from "../utils/chartHelpers";

export const useCharts = (uploadedData) => {
  const [selectedChart, setSelectedChart] = useState("pie");
  const [chartLoading, setChartLoading] = useState(false);

  const chartData = useMemo(() => {
    if (!uploadedData || uploadedData.length === 0) {
      return {
        revenueDistribution: [],
        barChartData: [],
        profitAnalysisData: [],
        summaryStats: {},
        insights: [],
      };
    }

    return {
      revenueDistribution: prepareRevenueDistribution(uploadedData),
      barChartData: prepareBarChartData(uploadedData),
      profitAnalysisData: prepareProfitAnalysisData(uploadedData),
      summaryStats: calculateSummaryStats(uploadedData),
      insights: getProfitMarginInsights(uploadedData),
    };
  }, [uploadedData]);

  useEffect(() => {
    if (uploadedData && uploadedData.length > 0) {
      setChartLoading(true);
      const timer = setTimeout(() => setChartLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [uploadedData]);

  const refreshCharts = () => {
    setChartLoading(true);
    setTimeout(() => setChartLoading(false), 300);
  };

  return {
    chartData,
    selectedChart,
    setSelectedChart,
    chartLoading,
    refreshCharts,
  };
};
