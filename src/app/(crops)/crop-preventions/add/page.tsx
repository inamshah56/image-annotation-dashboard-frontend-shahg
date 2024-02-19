"use client";
import { addCropPreventions } from "@/api/cropPreventions";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import ShowError from "@/components/ShowError";
import { useAppData } from "@/context/appDataContext";
import { validateAddCropPrevention } from "@/utils/validate";
import { ChangeEvent, FormEvent, useState } from "react";

const AddCropPreventions = () => {
  const { stopLoading, startLoading, updateStatus } = useAppData();
  const initialValues = {
    condition: "",
    severity: "",
    formula: "",
    prevention_eng: "",
    prevention_urdu: "",
    chemical_control_eng: "",
    chemical_control_urdu: "",
  };

  const [errors, setErrors] = useState<Errors>({
    condition: "",
    formula: "",
  });

  const [preventionData, setPreventionData] =
    useState<CropPreventions>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreventionData((prevPreventionData) => ({
      ...prevPreventionData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateAddCropPrevention(preventionData);
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    } else {
      setErrors({});
    }
    startLoading();

    const res: any = await addCropPreventions(preventionData);
    if (res.data) {
      updateStatus({
        code: 1,
        message: res.data?.message || "Prevention added sucessfully",
      });
      setPreventionData(initialValues);
    } else {
      updateStatus({
        code: 0,
        message: res.response?.data.message || res.message,
      });
    }
    stopLoading();
  };

  return (
    <Card title="Add new crop prevention">
      <Alert />
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">Enter Condition Name</h6>
          <input
            type="text"
            name="condition"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter condition here"
            value={preventionData.condition}
            onChange={handleChange}
          />
          {errors.condition && <ShowError error={errors.condition} />}
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">Enter Severity</h6>
          <input
            type="text"
            name="severity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter severity here"
            value={preventionData.severity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">Enter Formula</h6>
          <input
            type="text"
            name="formula"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter formula here"
            value={preventionData.formula}
            onChange={handleChange}
          />
          {errors.formula && <ShowError error={errors.formula} />}
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">
            Enter prevention in english
          </h6>
          <input
            type="text"
            name="prevention_eng"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter prevention in english here"
            value={preventionData.prevention_eng}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">
            Enter prevention in urdu
          </h6>
          <input
            type="text"
            name="prevention_urdu"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter prevention in urdu here"
            value={preventionData.prevention_urdu}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">
            Enter chemical control in english
          </h6>
          <input
            type="text"
            name="chemical_control_eng"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter chemical control in english here"
            value={preventionData.chemical_control_eng}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <h6 className="text-lg font-semibold mb-2">
            Enter chemical control in urdu
          </h6>
          <input
            type="text"
            name="chemical_control_urdu"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
            placeholder="Enter chemical control in urdu here"
            value={preventionData.chemical_control_urdu}
            onChange={handleChange}
          />
        </div>

        <div className="my-4">
          <Button title="Submit" disabled={false} />
        </div>
      </form>
    </Card>
  );
};

export default AddCropPreventions;
