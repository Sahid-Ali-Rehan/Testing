import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {notification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
