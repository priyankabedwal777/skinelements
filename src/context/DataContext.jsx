import React, { createContext, useState, useContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("dashboard");

  const addData = (newData) => {
    setUploadedData(newData);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <DataContext.Provider
      value={{
        uploadedData,
        selectedProduct,
        sidebarTab,
        setUploadedData,
        setSelectedProduct,
        setSidebarTab,
        addData,
        selectProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData used with DataProvider");
  }
  return context;
};
