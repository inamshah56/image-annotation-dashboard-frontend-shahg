"use client";

import { Button } from "@/components/Button";
import Card from "@/components/Card";
import ShowError from "@/components/ShowError";
import { validateAddCropCondition } from "@/utils/validate";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Alert from "@/components/Alert";
import { useAppData } from "@/context/appDataContext";
import { addCropConditions } from "@/api/cropConditions";

const AddCropCondition = () => {
  const { startLoading, stopLoading, updateStatus } = useAppData();
  const initialValues = {
    cropname: "",
    condition: "",
  };
  const [conditionData, setConditionData] =
    useState<CropConditions>(initialValues);

  const [errors, setErrors] = useState<Errors>({
    cropname: "",
    condition: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConditionData((prevConditionData) => ({
      ...prevConditionData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateAddCropCondition(conditionData);

    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    } else {
      setErrors({});
    }
    startLoading();
    const res: any = await addCropConditions(conditionData);
    if (res.data) {
      updateStatus({ code: 1, message: res?.data?.message });
      setConditionData(initialValues);
    } else {
      updateStatus({
        code: 0,
        message:
          (res.response?.data &&
            `"${conditionData.condition}" already added for "${conditionData.cropname}"`) ||
          res.message,
      });
      stopLoading();
    }
  };
  return (
    <Card title="Add new crop condition">
      <Alert />
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">Enter Crop Name</h6>
          <input
            type="text"
            name="cropname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter crop name here"
            value={conditionData.cropname}
            onChange={handleChange}
          />
          {errors.cropname && <ShowError error={errors.cropname} />}
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">Enter Condition</h6>
          <input
            type="text"
            name="condition"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter condition here"
            value={conditionData.condition}
            onChange={handleChange}
          />
          {errors.condition && <ShowError error={errors.condition} />}
        </div>

        <div className="my-4">
          <Button title="Submit" disabled={false} />
        </div>
      </form>
    </Card>
  );
};

export default AddCropCondition;
