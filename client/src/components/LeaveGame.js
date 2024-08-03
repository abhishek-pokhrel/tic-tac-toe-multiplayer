import React, { createContext, useContext } from "react";

const LeaveGameContext = createContext();

export const useLeaveGame = () => useContext(LeaveGameContext);

export const LeaveGameProvider = ({ children, leaveGame }) => (
  <LeaveGameContext.Provider value={leaveGame}>
    {children}
  </LeaveGameContext.Provider>
);
