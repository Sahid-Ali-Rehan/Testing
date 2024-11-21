import React from "react";

const Notification = ({ type, message, onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`${bgColor} text-white p-3 rounded-lg flex items-center justify-between shadow-lg`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-white text-black px-2 rounded-full font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
