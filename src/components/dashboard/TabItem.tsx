import React from "react";
import Pencil from "../icons/Pencil";

type TTabItem = {
  label: string;
  isActive: boolean;
  clickHandler: () => void;
  total: number;
};
export const TabItem = ({ label, total, isActive, clickHandler }: TTabItem) => {
  return (
    <div
      role="button"
      className={` flex  justify-between p-[10px] rounded-[10px]  min-w-[200px] font-inter ${isActive ? " tab-active bg-[#F1F1F1]" : ""
        }`}
      onClick={clickHandler}
    >
      <div>
        <span className="block font-semibold text-sm border-b-[2px] border-dashed border-[#CCCCCC] mb-2 pb-1"> {label}</span>
        <span className="block font-bold"> {typeof total === "number" && total}</span>
      </div>
      {isActive &&
        // INFO: Action for the button is not specified in the task
        <button type="button" className="flex items-start">
          <Pencil className="fill-black/50" width="30" height="30" />
        </button>
      }
    </div>
  );
};
