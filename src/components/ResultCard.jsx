import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addedToast, addcollection } from "../redux/features/collectionSlice";

const ResultCard = ({ item }) => {
  let dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  let addToCollection = (e) => {
    e.stopPropagation();
    dispatch(addcollection(item));
    dispatch(addedToast());
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(item.src);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      
      let ext = "jpg";
      if (item.type === "video") ext = "mp4";
      if (item.type === "gif") ext = "gif";
      
      link.download = `pixora-${item.id || Date.now()}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const link = document.createElement('a');
      link.href = item.src;
      link.target = "_blank";
      link.download = true;
      link.click();
    }
  };

  return (
    <>
      {/* Pinterest-style Card Container */}
      <div 
        onClick={() => setShowModal(true)}
        className="relative group mb-4 break-inside-avoid bg-(--c2) rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="w-full relative overflow-hidden bg-gray-200">
          {item.type === "photo" && (
            <img className="w-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.src} alt={item.title} loading="lazy" />
          )}
          {item.type === "video" && (
            <video autoPlay muted loop playsInline className="w-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.src} />
          )}
          {item.type === "gif" && (
            <img className="w-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.src} alt={item.title} loading="lazy" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
            <div className="flex justify-end gap-1.5">
              <button 
                onClick={handleDownload}
                title="Download"
                className="bg-white/90 hover:bg-white text-(--c4) p-2 rounded-full shadow cursor-pointer active:scale-95 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button 
                onClick={addToCollection}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-xs px-3 py-2 rounded-full shadow transition-all"
              >
                Save
              </button>
            </div>
            <h2 className="text-white text-xs md:text-sm font-medium line-clamp-1 drop-shadow">{item.title}</h2>
          </div>
        </div>
      </div>

      {/* In-App Full View Modal - Clean Background without White Line */}
      {showModal && (
        <div 
          onClick={() => setShowModal(false)}
          className="fixed h-full inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 md:p-10 animate-fade-in overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-(--c1) rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative my-auto"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center text-lg cursor-pointer shadow-lg"
            >
              &times;
            </button>

            {/* Media Preview inside Modal */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center max-h-[40vh] md:max-h-[85vh] shrink-0">
              {item.type === "photo" && <img className="max-h-[40vh] md:max-h-[85vh] w-full object-contain" src={item.src} alt={item.title} />}
              {item.type === "video" && <video controls autoPlay loop className="max-h-[40vh] md:max-h-[85vh] w-full object-contain" src={item.src} />}
              {item.type === "gif" && <img className="max-h-[40vh] md:max-h-[85vh] w-full object-contain" src={item.src} alt={item.title} />}
            </div>

            {/* Details & Actions */}
            <div className="w-full md:w-2/5 p-4 md:p-8 flex flex-col justify-between bg-(--c1)">
              <div>
                <span className="uppercase text-xs font-bold tracking-wider text-(--c3) bg-(--c2) px-3 py-1 rounded-full">
                  {item.type}
                </span>
                <h2 className="text-lg md:text-2xl font-bold mt-2 text-(--c4) capitalize">{item.title || "Untitled Pin"}</h2>
                <p className="text-gray-600 text-xs md:text-sm mt-1">Saved directly inside Pixora.</p>
              </div>

              <div className="flex flex-col gap-2.5 mt-4">
                <button 
                  onClick={handleDownload}
                  className="w-full bg-(--c3) hover:bg-(--c4) text-white font-medium py-2.5 rounded-xl shadow cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download File
                </button>
                <button 
                  onClick={(e) => { addToCollection(e); setShowModal(false); }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl shadow cursor-pointer active:scale-95 transition-all text-sm"
                >
                  Save to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCard;