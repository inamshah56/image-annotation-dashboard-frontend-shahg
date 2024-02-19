"use client";
import { deleteCropConditions, getCropConditions } from "@/api/cropConditions";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import ShowError from "@/components/ShowError";
import { useAppData } from "@/context/appDataContext";
import { validateGetCropCondition } from "@/utils/validate";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const GetCropConditions = () => {
  const { startLoading, stopLoading, status, updateStatus } = useAppData();
  const [cropname, setcropname] = useState<string>("");
  const [error, setError] = useState<Errors>();
  const [cropConditions, setCropConditions] = useState<CropConditions[] | null>(
    []
  );

  const handleDelete = async (data: CropConditions) => {
    const res: any = await deleteCropConditions(data);
    if (res.data) {
      const update: any = cropConditions?.filter((cropCondition: any) => {
        return cropCondition !== data;
      });
      setCropConditions(
        update.length < 1
          ? `All conditions of "${cropname}" are deleted`
          : update
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateGetCropCondition(cropname);

    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

    setError({});
    startLoading();

    const res: any = await getCropConditions(cropname);

    if (res.data) {
      if (res.data.length > 0) {
        setCropConditions(res.data);
      } else {
        setCropConditions(null);
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
    setCropConditions([]);
  };

  return (
    <Card title={"Get crop conditions"}>
      <Alert />
      {cropConditions && cropConditions.length < 1 ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h6 className="text-lg font-semibold mb-2">Enter Crop Name</h6>
            <input
              type="text"
              name="cropname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
              placeholder="Enter crop name here"
              value={cropname}
              onChange={(e) => setcropname(e.target.value)}
            />
            {error?.cropname && <ShowError error={error.cropname} />}
          </div>
          <div className="my-4">
            <Button title={"Search"} disabled={false} />
          </div>
        </form>
      ) : (
        <form onSubmit={handleReSearch} className="mx-auto p-4">
          {cropConditions && cropConditions.length > 0 ? (
            typeof cropConditions == "string" ? (
              <>
                <h1 className="text-2xl font-bold mb-4">{cropConditions}</h1>
                <Link
                  href="/crop-conditions/add"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Click here to Add new condition
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">
                  {`All conditions of "${cropname}"`}
                </h1>
                <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-6 gap-4">
                  {cropConditions &&
                    cropConditions.map((data, i) => (
                      <div
                        key={i}
                        className="flex items-center shadow bg-gray-100 rounded-lg p-4"
                      >
                        <h6 className="flex-grow">{data.condition}</h6>
                        <button
                          onClick={() => handleDelete(data)}
                          type="button"
                          className="text-red-500 transform hover:scale-125 transition text-xl"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    ))}
                </div>
              </>
            )
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {`No conditions added for "${cropname}"`}
              </h1>
              <Link
                href="/crop-conditions/add"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Click here to Add new condition
              </Link>
            </>
          )}

          <div className="mt-4">
            <Button title="ReSearch" disabled={false} />
          </div>
        </form>
      )}
    </Card>
  );
};

export default GetCropConditions;
