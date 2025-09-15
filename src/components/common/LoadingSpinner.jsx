import React from "react";
const LoadingSpinner = ({
  size = "md",
  color = "blue",
  text,
  className = "",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const colors = {
    white: "text-white",
    blue: "text-blue-600",
    gray: "text-gray-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <svg
          className={`animate-spin ${sizes[size]} ${colors[color]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && (
          <p className={`text-sm font-medium ${colors[color]}`}>{text}</p>
        )}
      </div>
    </div>
  );
};

// Fullscreen loading
export const LoadingOverlay = ({ text = "Loading...", show = true }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
};

// Inline loading
export const InlineLoader = ({ text = "Loading...", className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LoadingSpinner size="sm" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
