import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCollection = location.pathname === '/collection';

  return (
    <nav className="sticky top-0 z-40 flex justify-between items-center bg-(--c2)/90 backdrop-blur-md px-4 sm:px-10 py-3 sm:py-4 shadow-sm">
      {/* Logo: Shows only 'P' on mobile, 'P Pixora' on larger screens */}
      <Link className="font-bold text-xl sm:text-2xl tracking-tight text-(--c4) flex items-center gap-2" to={'/'}>
        <span className="bg-(--c4) text-(--c1) w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-base sm:text-lg shadow shrink-0">P</span>
        <span className="hidden sm:inline">Pixora</span>
      </Link>

      {/* Nav Actions: Compact sizing on mobile for smooth fit */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base font-medium">
        <Link 
          className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer active:scale-95 shadow-xs ${
            isHome 
              ? 'bg-(--c4) text-(--c1)' 
              : 'bg-(--c3) text-white hover:opacity-90'
          }`} 
          to={'/'}
        >
          Explore
        </Link>
        <Link 
          className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer active:scale-95 shadow-xs ${
            isCollection 
              ? 'bg-(--c4) text-(--c1)' 
              : 'bg-(--c3) text-white hover:opacity-90'
          }`} 
          to={'/collection'}
        >
          Saved Pins
        </Link>
      </div>
    </nav>
  );
};

export default Nav;