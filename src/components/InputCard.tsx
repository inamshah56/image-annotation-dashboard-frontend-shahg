import { FC } from "react";
import Card from "./Card";

const InputCard: FC<{ title: string }> = ({ title }) => {
  return (
    <Card title={title}>
      <div className="mb-4">
        <h6 className="text-lg font-semibold mb-2">Enter Image Name</h6>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none bg-gray-100 focus:ring ring-green-300"
          placeholder="Paste image name here"
        />
      </div>
    </Card>
  );
};

export default InputCard;
