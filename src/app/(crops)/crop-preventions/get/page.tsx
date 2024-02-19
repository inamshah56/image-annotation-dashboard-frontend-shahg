"use client";
import { deleteCropConditions, getCropConditions } from "@/api/cropConditions";
import {
  deleteCropPreventions,
  getCropPreventions,
} from "@/api/cropPreventions";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import ShowError from "@/components/ShowError";
import { useAppData } from "@/context/appDataContext";
import { validateGetCropPreventions } from "@/utils/validate";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Table from "@/components/Table";

const GetCropPreventions = () => {
  const { startLoading, stopLoading, status, updateStatus } = useAppData();
  const [condition, setCondition] = useState<string>("");
  const [cropPreventions, setCropPreventions] = useState<
    CropPreventions[] | null
  >([]);
  const [error, setError] = useState<Errors>();

  const deletePrevention: DeletePrevention = async (id: number) => {
    startLoading();
    const res: any = await deleteCropPreventions(id);
    if (res.data) {
      const update: any = cropPreventions?.filter((cropPrevention: any) => {
        return cropPrevention.id !== id;
      });
      setCropPreventions(
        update.length < 1
          ? `All preventions of "${condition}" are deleted`
          : update
      );
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
    const validationError = validateGetCropPreventions(condition);

    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }
    setError({});
    startLoading();

    const res: any = await getCropPreventions(condition);
    if (res.data) {
      if (res.data.length > 0) {
        setCropPreventions(res.data);
      } else {
        setCropPreventions(null);
      }
    } else {
      updateStatus({
        code: 0,
        message: res.response?.data?.message || res.message,
      });
    }
    stopLoading();
  };

  const handleReSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCropPreventions([]);
  };

  return (
    <>
      <Card title={"Get crop preventions"}>
        <Alert />
        {cropPreventions && cropPreventions.length < 1 ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h6 className="text-lg font-semibold mb-2">
                Enter Condition Name
              </h6>
              <input
                type="text"
                name="condition"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
                placeholder="Enter condition name here"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
              {error?.condition && <ShowError error={error.condition} />}
            </div>
            <div className="my-4">
              <Button title={"Search"} disabled={false} />
            </div>
          </form>
        ) : (
          <form onSubmit={handleReSearch} className="mx-auto p-4">
            {cropPreventions && cropPreventions.length > 0 ? (
              typeof cropPreventions == "string" ? (
                <>
                  <h1 className="text-2xl font-bold mb-4">{cropPreventions}</h1>
                  <Link
                    href="/crop-preventions/add"
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Click here to Add new preventions
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-4">
                    {`All preventions of "${condition}"`}
                  </h1>
                  {cropPreventions && cropPreventions.length > 0 && (
                    <Table data={cropPreventions} onDelete={deletePrevention} />
                  )}
                </>
              )
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">
                  {`No preventions added for "${condition}"`}
                </h1>
                <Link
                  href="/crop-preventions/add"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Click here to Add new preventions
                </Link>
              </>
            )}

            <div className="mt-4">
              <Button title="ReSearch" disabled={false} />
            </div>
          </form>
        )}
      </Card>
    </>
  );
};

export default GetCropPreventions;
