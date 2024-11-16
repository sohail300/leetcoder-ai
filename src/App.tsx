import { useState } from 'react'
// import { Sun, Moon } from "lucide-react";

const Popup = () => {
  const [darkMode, _setDarkMode] = useState(true)
  // const [loading, setLoading] = useState(true);

  // Check system dark mode preference on mount
  // useEffect(() => {
  //   const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   setDarkMode(isDark);
  //   console.log(isDark);

  //   // Listen for system theme changes
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   console.log(mediaQuery);

  //   const handleChange = (e) => setDarkMode(e.matches);
  //   mediaQuery.addEventListener("change", handleChange);
  //   setLoading(false);

  //   return () => mediaQuery.removeEventListener("change", handleChange);
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className={`w-96 min-h-[300px] shadow-lg font-sans transition-colors duration-200 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      {/* Header with Toggle */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold tracking-tight">Leetcoder AI</h1>
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button> */}
      </div>

      {/* Main Content */}
      <div className="p-6 flex flex-col items-center">
        {/* Logo */}
        <div className="mt-2 mb-6">
          <img
            src="logo/logo-dark-transparent.png"
            alt="Leetcoder Logo"
            className="w-56 h-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <p className="text-center text-sm font-medium italic mb-8 text-gray-600 dark:text-gray-300">
          Your AI-powered coding companion for LeetCode
        </p>

        {/* Button */}
        <button
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#FFA116] to-[#F5B453] 
             font-medium hover:from-[#F5B453] hover:to-[#FFA116] 
             transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
             shadow-md hover:shadow-lgn text-black"
        >
          Open Sidebar
        </button>
      </div>
    </div>
  )
}

export default Popup
