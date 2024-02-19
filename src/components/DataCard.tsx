import { FC } from "react";
import Card from "./Card";

const DataCard: FC<{ title: string; data: CropDetails | PreviousResults }> = ({
  title,
  data,
}) => {
  const formatKeyToLabel = (key: string) => {
    return key
      .replace(/([A-Z0-9])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const entries = Object.entries(data);

  return (
    <Card title={title}>
      {entries.map(([key, value]) => (
        <div className="grid grid-cols-5 gap-4" key={key}>
          <div className="grid col-span-2">
            {" "}
            <h6 className="text-lg font-semibold overflow-x-auto whitespace-nowrap">
              {formatKeyToLabel(key)}
            </h6>
          </div>
          <div className="grid col-span-3 items-center text-lg overflow-x-auto whitespace-nowrap">
            {" "}
            <p>{value}</p>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default DataCard;
