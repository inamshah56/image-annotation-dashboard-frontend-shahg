"use client";
import { Button } from "@/components/Button";
import DataCard from "@/components/DataCard";
import ImageAnnotation from "@/components/ImageAnnotation";
import ImageName from "@/components/ImageName";
import { useAppData } from "@/context/appDataContext";
import { FC, FormEvent, useState } from "react";

import Alert from "@/components/Alert";
import {
  getImageProcessingHistory,
  getImageProcessingResult,
  submitAnnotation,
} from "@/api/annotation";
import { getCropConditions } from "@/api/cropConditions";
import Table from "@/components/Table";
import { validateImageName } from "@/utils/validate";
import ShowError from "@/components/ShowError";

const HomePage: FC = () => {
  const {
    startLoading,
    stopLoading,
    cropDetails,
    previousResults,
    processedResult,
    updateCropConditions,
    updateResults,
    updateStatus,
    resetStatus,
    resetContext,
  } = useAppData();

  const [imageName, setImageName] = useState<string>("");
  const [history, setHistory] = useState<History[]>([]);
  const [error, setError] = useState<string>("");

  const handleProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetStatus();
    const error = validateImageName(imageName);
    if (error) {
      return setError(error);
    }
    setError("");
    startLoading();
    const res: any = await getImageProcessingResult(imageName);
    const history: any = await getImageProcessingHistory(cropDetails.farmId);
    setHistory(history.data);
    if (res.data) {
      updateResults(res.data);
      const conditions: any = await getCropConditions(cropDetails.cropname);
      const history: any = await getImageProcessingHistory(cropDetails.farmId);
      if (history.data) {
        setHistory(history.data);
      }
      if (conditions.data) {
        if (conditions.data.length < 1) {
          updateStatus({
            code: 0,
            message: `No conditions are added for "${cropDetails.cropname}" `,
          });
          stopLoading();
          return;
        }
        updateCropConditions(conditions.data);
        stopLoading();
      } else {
        updateStatus({
          code: 0,
          message: conditions.response?.data?.message || conditions.message,
        });
        stopLoading();
      }
    } else {
      updateStatus({
        code: 0,
        message: res.response?.data?.message || res.message,
      });
    }
    stopLoading();
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetStatus();
    startLoading();
    const res: any = await submitAnnotation(processedResult);
    if (res.data) {
      stopLoading();
      resetContext();
      setImageName("");
      setHistory([]);
      updateStatus({ code: 1, message: res?.data?.message });
      return;
    } else {
      updateStatus({
        code: 0,
        message: res.response?.data?.message || res.message,
      });
      stopLoading();
      return;
    }
  };

  return (
    <>
      <Alert />
      <div className="grid xl:grid-cols-3 grid-cols-1 xl:gap-4 gap-y-4">
        <form onSubmit={handleProcess} className="col-span-2 space-y-4">
          <ImageName
            title={"Image Name"}
            imageName={imageName}
            setImageName={setImageName}
            error={error}
          />
          <Button disabled={false} title={"Process"} />
          <ImageAnnotation title={"Image Annotation"} />
        </form>

        <div className="col-span-1 space-y-4">
          <DataCard title={"Crop Details"} data={cropDetails} />
          <DataCard title={"Previous Results"} data={previousResults} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="my-4">
        <Button title={"Submit"} disabled={!processedResult.id} />
      </form>
      {history && history.length > 0 && (
        <Table data={history} title={"History"} />
      )}
    </>
  );
};

export default HomePage;
