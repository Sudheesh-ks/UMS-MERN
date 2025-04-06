import React from 'react';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-100">
            404
          </h1>
          <h1 className="absolute top-0 left-0 right-0 text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse">
            404
          </h1>
        </div>

        <div className="mt-4 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 animate-fade-in-up">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto animate-fade-in-up">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry though, you can always find your way back home!
          </p>
        </div>

        <div className="mt-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <span className="relative flex items-center gap-2">
              <Home className="w-5 h-5 group-hover:animate-bounce" />
              Take Me Home
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-100" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-600 rounded-full animate-ping delay-200" />
        </div>
      </div>
    </div>
  );
}

export default NotFound