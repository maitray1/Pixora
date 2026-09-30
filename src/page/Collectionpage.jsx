import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { clearCollection } from "../redux/features/collectionSlice";

const Collectionpage = () => {
  let collection = useSelector((state) => state.collection.items);
  let dispatch = useDispatch();

  let clearAll = () => {
    dispatch(clearCollection());
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-6">
      {collection.length > 0 ? (
        <div className="flex justify-between items-center mb-6 border-b border-(--c2) pb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-(--c4) tracking-tight">
            Your Saved Pins ({collection.length})
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 px-4 sm:px-5 py-2 rounded-full cursor-pointer active:scale-95 text-white font-medium text-xs sm:text-sm transition-all shadow shrink-0"
            onClick={clearAll}
          >
            Clear All Saves
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[60vh] w-full text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-(--c4) mb-2">Your saves is empty</h2>
          <p className="text-gray-500 text-sm sm:text-base">Explore and click 'Save Pin' on any photo, video, or GIF to build your moodboard.</p>
        </div>
      )}

      {/* Masonry layout for Collection */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 column-fill:_balance space-y-4">
        {collection.map((item, idx) => (
          <CollectionCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Collectionpage;