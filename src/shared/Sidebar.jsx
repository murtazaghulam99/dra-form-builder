import React from "react";
import { menu } from "../assets";

const Sidebar = () => {
  return (
    <aside className="bg-[#F1F5F9] h-full px-6 py-5">
      <div>
        <div className="flex justify-around">
          <p className="text-balance font-bold text-[12px]">
            Phase 2 Trial of Novel Targeted Therapy for Metastic Lung Cancer
            (Target Lung)
          </p>

          <img
            src={menu}
            className="w-full max-w-[25px] h-[20px] cursor-pointer"
            alt=""
          />
        </div>
        <div></div>
      </div>
    </aside>
  );
};

export default Sidebar;
