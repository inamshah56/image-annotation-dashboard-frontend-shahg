import { FC } from "react";

export const Button: FC<ButtonProps> = ({ title, disabled }) => {
  return (
    <div className="pt-2">
      <button
        className={`${
          disabled ? "btn-disabled" : "btn"
        } w-full transition-colors h-14 rounded-lg font-semibold text-lg shadow`}
        type="submit"
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  );
};
