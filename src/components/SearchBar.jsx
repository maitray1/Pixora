import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';

const placeholders = [
  "Search retro 90s vibes, cinematic neon lights, cozy rain...",
  "What's inspiring your moodboard today?",
  "Search dreamy landscapes, abstract gradients, lo-fi moments...",
  "Explore vintage aesthetics, surreal art, minimalist spaces...",
  "Search abstract 3D, neon cyberpunk streets, soft morning vibes..."
];

const SearchBar = () => {
  const [text, setText] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  let dispatch = useDispatch();

  // Automatically cycle placeholder text every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  let submitForm = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    dispatch(setQuery(text));
    setText('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-8 pb-4">
      <form
        onSubmit={submitForm}
        className="flex gap-2 items-center bg-white border-2 border-(--c2) hover:border-(--c3) focus-within:border-(--c4) shadow-sm rounded-full px-5 py-2.5 transition-all"
      >
        <svg className="w-5 h-5 text-(--c3) shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          className="w-full bg-transparent outline-none text-(--c4) placeholder:text-gray-400 text-base md:text-lg transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder={placeholders[currentPlaceholderIndex]}
        />
        <button type="submit" className="bg-(--c3) hover:bg-(--c4) text-white px-6 py-2.5 rounded-full font-medium transition-all cursor-pointer active:scale-95 shrink-0">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;