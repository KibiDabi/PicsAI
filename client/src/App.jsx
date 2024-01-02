import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Home, CreatePost } from "./pages";
import { motion } from "framer-motion";

const App = () => {
  return (
    <Router basename="/PicsAI">
      {" "}
      <header className="w-full flex justify-between items-center bg-gradient-to-r from-yellow-600 to-red-600 sm:px-8 px-4 py-4 ">
        <Link
          to="/"
          className="text-black text-xl font-medium flex flex-row flex-nowrap items-center justify-center gap-x-1.5 pr-1.5 leading-none rounded-lg"
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-image"
          >
            <rect width="18" height="20" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span className="font-bold lg:text-3xl text-3xl text-[#222328]">
            PicsAI
          </span>
        </Link>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/create-post"
            className="text-gray-900 bg-white  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-xl text-sm px-6 py-3.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Create
          </Link>
        </motion.div>
      </header>{" "}
      <main className="sm:p-8 px-4 py-8 w-full bg-gradient-to-r from-yellow-600 to-red-600 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
