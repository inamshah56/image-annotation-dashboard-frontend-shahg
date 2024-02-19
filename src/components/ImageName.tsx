import React, { Dispatch, FC, useEffect, useState } from "react";
import { useAppData } from "@/context/appDataContext";
import Card from "./Card";
import ShowError from "./ShowError";

const ImageName: FC<{
  title: string;
  imageName: string;
  setImageName: Dispatch<React.SetStateAction<string>>;
  error: string;
}> = ({ title, imageName, setImageName, error }) => {
  const { updateCropDetails } = useAppData();

  useEffect(() => {
    const data = imageName.split("_").slice(0, -1);

    if (data.length === 5) {
      updateCropDetails({
        farmId: data[0],
        cropname: data[1],
        cropVariety: data[2],
        cropStage: data[3],
        cropAge: data[4],
      });
    } else {
      updateCropDetails({
        farmId: "",
        cropname: "",
        cropVariety: "",
        cropStage: "",
        cropAge: "",
      });
    }
  }, [imageName]);

  return (
    <Card title={title}>
      <div className="mb-4">
        <h6 className="text-lg font-semibold mb-2">Enter Image Name</h6>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-700"
          placeholder="Paste image name here"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
        />
        <ShowError error={error} />
      </div>
    </Card>
  );
};

export default ImageName;
