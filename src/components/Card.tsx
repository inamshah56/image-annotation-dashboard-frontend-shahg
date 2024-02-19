import { FC, ReactNode } from "react";

const Card: FC<{ title: TitleProp; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="rounded shadow">
      <div className="bg-secondary rounded-t-lg">
        <h1 className="w-full max-w-full p-4 h-16 flex items-center text-2xl font-bold capitalize">
          {title}
        </h1>
      </div>
      <div className="bg-gray-200 p-4 space-y-2 rounded-b-lg">{children}</div>
    </div>
  );
};

export default Card;
