import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";

const Tab = () => {
  let tabs = ["Photos", "Videos", "GIF"];
  let dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex justify-center gap-3 my-4 px-4 flex-wrap">
      {tabs.map((elem, idx) => (
        <button
          onClick={() => dispatch(setActiveTab(elem))}
          key={idx}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all cursor-pointer active:scale-95 shadow-xs ${
            activeTab === elem 
              ? 'bg-(--c4) text-white shadow-md' 
              : 'bg-(--c2) text-(--c4) hover:bg-(--c3) hover:text-white'
          }`}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

export default Tab;