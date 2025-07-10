"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BussinessDataAnalyzeResult {
  profit: number;
  alerts: string[];
  recommendations: string[];
}

type ContextType = {
  bussinessData: BussinessDataAnalyzeResult | null;
  setBussinessData: (bussinessData: BussinessDataAnalyzeResult | null) => void;
};

const BussinessDataContext = createContext<ContextType | undefined>(undefined);

export const BussinessDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bussinessData, setBussinessData] =
    useState<BussinessDataAnalyzeResult | null>(null);

  return (
    <BussinessDataContext.Provider value={{ bussinessData, setBussinessData }}>
      {children}
    </BussinessDataContext.Provider>
  );
};

export const useBussinessData = (): ContextType => {
  const context = useContext(BussinessDataContext);
  if (!context)
    throw new Error(
      "useBussinessData must be used within BussinessDataProvider"
    );
  return context;
};
