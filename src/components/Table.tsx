import { FC, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

interface TableProps {
  data: History[] | CropPreventions[];
  title?: string;
  onDelete?: DeletePrevention;
}

const Table: FC<TableProps> = ({ data, title, onDelete }) => {
  let keys = Object.keys(data[0]);
  let values = data.map((key) => Object.values(key));
  title ? keys.unshift("no.") : keys.push("actions");

  // const handleDelete = (id:number)
  return (
    <div className="mt-8">
      {title && (
        <h1 className="text-2xl p-3 rounded-lg my-4 font-bold text-white bg-gradient-to-r from-transparent via-green-700 to-transparent text-center">
          {title}
        </h1>
      )}
      <div className="relative overflow-x-auto mb-8 rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-white">
          <thead className="text-xs uppercase bg-green-900">
            <tr>
              {keys.map((key, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((value, i) => (
              <tr key={i} className="bg-green-700 border-b border-green-200">
                {title && (
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </th>
                )}
                {value.map((val, i) => (
                  <td key={i} className="px-6 py-4 capitalize">
                    {val || "-"}
                  </td>
                ))}
                {onDelete && (
                  <td key={i} className="px-6 py-4 capitalize">
                    <button
                      onClick={() => onDelete(value[0])}
                      type="button"
                      className="text-red-500 transform hover:scale-125 transition text-xl"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
