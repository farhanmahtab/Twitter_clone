import { createContext, useState } from "react";

import React from "react";

export const RecentMessageContext = createContext(null);

export default function RecentMessageProvider({ children }) {
  const recentMessages = {
    showNotification: false,
    latestMessage: null,
    messages: [],
  };

  return (
    <RecentMessageContext.Provider value={useState(recentMessages)}>
      {children}
    </RecentMessageContext.Provider>
  );
}
