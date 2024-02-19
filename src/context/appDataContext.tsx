"use client";

import { FC, useContext, createContext, useState, ReactNode } from "react";

const AppDataContext = createContext<AppData | undefined>(undefined);

export const AppDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const [errors, setErrors] = useState<Errors>({});

  const updateErrors = (newErrors: Partial<Errors>) => {
    setErrors({ ...errors, ...newErrors });
  };

  const initialCropDetails: CropDetails = {
    date: "",
    farmId: "",
    cropname: "",
    cropVariety: "",
    cropStage: "",
    cropAge: "",
  };

  const initialProcessedResult: ProcessedResult = {
    count: 0,
    img_column: "",
    result: null,
    overall_result: false,
    id: "",
  };

  const initialPreviousResults: PreviousResults = {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  };

  const initialStatus: Status = { code: null, message: "" };

  const [cropDetails, setCropDetails] = useState(initialCropDetails);

  const updateCropDetails = (data: Partial<CropDetails>) => {
    setCropDetails({ ...cropDetails, ...data });
  };

  const [processedResult, setProcessedResult] = useState(
    initialProcessedResult
  );

  const updateProcessedResult = (data: Partial<ProcessedResult>) => {
    setProcessedResult({
      ...processedResult,
      ...data,
    });
  };

  const [previousResults, setPreviousResults] = useState(
    initialPreviousResults
  );

  const updatePreviousResults = (data: Partial<PreviousResults>) => {
    setPreviousResults({ ...previousResults, ...data });
  };

  const updateResults = (data: any) => {
    const { img_column, ...annotations } = data;

    updateProcessedResult({
      img_column,
      annotated: data.count && data.count === 4 ? true : false,
      ...annotations,
    });

    const newPreviousResults: any = Object.fromEntries(
      Object.keys(previousResults).map((key) => {
        return [key, annotations[key] || "not annotated"];
      })
    );
    setPreviousResults(newPreviousResults);
  };

  const [cropConditions, setCropConditions] = useState<Conditions[]>([]);

  const updateCropConditions = (data: any[]) => {
    const updatedCropConditions = data.map((cropCondition) => ({
      value: cropCondition.condition,
      label: cropCondition.condition,
    }));

    setCropConditions(updatedCropConditions);
  };

  const [status, setStatus] = useState(initialStatus);
  const updateStatus = (data: Partial<Status>): void => {
    setStatus({ ...status, ...data });
  };

  const resetStatus = () => {
    setStatus(initialStatus);
  };

  const closeAlert = () => {
    setStatus(initialStatus);
  };

  const resetContext = () => {
    setCropDetails(initialCropDetails);
    setProcessedResult(initialProcessedResult);
    setCropConditions([]);
    setPreviousResults(initialPreviousResults);
    setStatus(initialStatus);
  };

  const contextValues: AppData = {
    loading,
    startLoading,
    updateResults,
    stopLoading,
    errors,
    updateErrors,
    cropDetails,
    updateCropDetails,
    processedResult,
    updateProcessedResult,
    previousResults,
    updatePreviousResults,
    cropConditions,
    updateCropConditions,
    status,
    updateStatus,
    resetStatus,
    // cropPreventions,
    // updateCropPreventions,
    closeAlert,
    resetContext,
  };

  return (
    <AppDataContext.Provider value={contextValues}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
