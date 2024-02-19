import { FC } from "react";
import Card from "./Card";
import SelectOpt from "./Select";
import { useAppData } from "@/context/appDataContext";

const ImageAnnotation: FC<{ title: string }> = ({ title }) => {
  const { processedResult, cropConditions } = useAppData();
  return (
    <Card title={title}>
      <div className="mb-8 space-y-4">
        <SelectOpt label={"Crop Status"} disabled={cropConditions.length < 1} />
        <SelectOpt
          label={"Field Status"}
          overAll={true}
          disabled={processedResult.count !== 4}
        />
      </div>
    </Card>
  );
};

export default ImageAnnotation;
