import { useAppData } from "@/context/appDataContext";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FiCheck } from "react-icons/fi";

const Alert = () => {
  const pathname = usePathname();
  const { status, closeAlert } = useAppData();
  const { message, code } = status;

  useEffect(() => {
    return closeAlert();
  }, [pathname]);

  return (
    <>
      {message &&
        (code == 1 ? (
          <div
            className={`flex justify-between items-center p-4 mb-4 text-green-500 border-t-4 border-green-500 bg-green-50 rounded-lg`}
          >
            <div className="font-medium">{message}</div>
            <div onClick={closeAlert}>
              <FiCheck
                className={`p-2 cursor-pointer bg-green-500 hover:bg-green-400 rounded-full text-green-50`}
                size={30}
              />
            </div>
          </div>
        ) : (
          <div
            className={`flex justify-between items-center p-4 mb-4 text-red-500 border-t-4 border-red-500 bg-red-50 rounded-lg`}
          >
            <div className="font-medium">{message}</div>
            <div onClick={closeAlert}>
              <FiCheck
                className={`p-2 cursor-pointer bg-red-500 hover:bg-red-400 rounded-full text-red-50`}
                size={30}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default Alert;
