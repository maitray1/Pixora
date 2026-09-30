import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGIF, fetchPhotos, fetchVideos } from "../../Api/mediaApi";
import {
  setError,
  setLoading,
  setResults,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";

const defaultKeywords = [
  "cinematic aesthetic",
  "nature landscape",
  "cyberpunk neon",
  "portrait art",
  "lofi vibes",
  "abstract gradients",
  "vintage retro",
  "dreamy sunset"
];

const ResultGrid = () => {
  let dispatch = useDispatch();
  let { query, activeTab, results, loading, error } = useSelector((store) => store.search);
  const [page, setPage] = useState(1);

  const [randomDefaultQuery] = useState(() => {
    return defaultKeywords[Math.floor(Math.random() * defaultKeywords.length)];
  });

  const effectiveQuery = query || randomDefaultQuery;

  useEffect(() => {
    setPage(1);
  }, [activeTab, query]);

  useEffect(() => {
    let getData = async () => {
      try {
        dispatch(setLoading());
        let data = [];
        if (activeTab === "Photos") {
          let response = await fetchPhotos(effectiveQuery, page);
          data = response.results.map((item) => ({
            id: item.id,
            type: "photo",
            src: item.urls.regular || item.urls.full,
            url: item.links.html,
            thumbnail: item.urls.small,
            title: item.alt_description || "Trending Photo",
          }));
        }
        if (activeTab === "Videos") {
          let response = await fetchVideos(effectiveQuery, page);
          data = response.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user.name ? `Video by ${item.user.name}` : "Cinematic Video",
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url,
          }));
        }
        if (activeTab === "GIF") {
          const offset = (page - 1) * 20;
          let response = await fetchGIF(effectiveQuery, 20, offset);
          data = response.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "Trending GIF",
            src: item.images.original.url,
            url: item.url,
          }));
        }
        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    getData();
  }, [effectiveQuery, activeTab, page, dispatch]);

  if (error) return <h1 className="text-2xl text-center py-16 text-red-500 font-semibold">Failed to load content. Please try again.</h1>;
  if (loading) return <div className="text-xl text-center py-20 font-medium animate-pulse text-(--c3)">Loading amazing pins...</div>;

  return (
    <div className="w-full px-3 sm:px-10 py-4">
      {/* Pinterest Masonry Columns Grid */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 sm:gap-4 column-fill:_balance space-y-3 sm:space-y-4">
        {results.map((item, idx) => (
          <ResultCard key={item.id || idx} item={item} />
        ))}
      </div>

      {/* Pagination - Clean & Compact on Mobile */}
      {results.length > 0 && (
        <div className="flex items-center justify-center w-full gap-3 sm:gap-6 py-6 sm:py-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-(--c3) hover:bg-(--c4) text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full disabled:opacity-30 cursor-pointer active:scale-95 font-medium text-xs sm:text-base transition-all shadow"
          >
            Previous
          </button>
          <span className="text-sm sm:text-lg font-semibold text-(--c4)">
            Page {page}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-(--c3) hover:bg-(--c4) text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full cursor-pointer active:scale-95 font-medium text-xs sm:text-base transition-all shadow"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultGrid;