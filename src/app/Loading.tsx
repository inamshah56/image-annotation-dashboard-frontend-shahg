"use client";
import { useAppData } from "@/context/appDataContext";
import { FC } from "react";

const LoadingSpinner: FC = () => {
  const { loading } = useAppData();
  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    )
  );
};

export default LoadingSpinner;
