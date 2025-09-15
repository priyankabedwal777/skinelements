import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export const useMultipleLocalStorage = (keys) => {
  const [values, setValues] = useState(() => {
    const initialValues = {};
    keys.forEach(({ key, initialValue }) => {
      try {
        const item = window.localStorage.getItem(key);
        initialValues[key] = item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        initialValues[key] = initialValue;
      }
    });
    return initialValues;
  });

  const setStoredValue = (key, value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(values[key]) : value;
      setValues((prev) => ({ ...prev, [key]: valueToStore }));
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeStoredValue = (key) => {
    try {
      window.localStorage.removeItem(key);
      const keyConfig = keys.find((k) => k.key === key);
      setValues((prev) => ({
        ...prev,
        [key]: keyConfig?.initialValue || null,
      }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  const clearAllValues = () => {
    keys.forEach(({ key }) => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    });

    const initialValues = {};
    keys.forEach(({ key, initialValue }) => {
      initialValues[key] = initialValue;
    });
    setValues(initialValues);
  };

  return {
    values,
    setStoredValue,
    removeStoredValue,
    clearAllValues,
  };
};
