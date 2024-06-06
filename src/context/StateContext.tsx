"use client";

import { createContext, useContext } from "react";

export const StateContext = createContext(null);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
