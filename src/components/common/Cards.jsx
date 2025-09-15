import React from "react";

const Card = ({
  title,
  value,
  icon,
  gradient = "from-blue-500 to-indigo-600",
}) => {
  return (
    <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${gradient} text-white shadow-md mb-4`}
      >
        {icon}
      </div>

      <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
      <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>

      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-10`}
        aria-hidden="true"
      />
    </div>
  );
};

export default Card;
