import React, { FC } from "react";

const ShowError: FC<{ error: string }> = ({ error }) => {
  return <p className="text-red-500 text-sm mt-2">{error}</p>;
};

export default ShowError;
