import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { ParallaxScroll } from "../components/ParallaxScroll";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-8 font-bold text-[#111113] text-xl">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchedTimeout] = useState(null);

  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://picsai.onrender.com/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
        console.log(result.data);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const textArray = "The Zagreb Community".split("");

    const animateText = async () => {
      let animatedText = "";

      for (let i = 0; i < textArray.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            animatedText += textArray[i];
            setText(animatedText);
            resolve();
          }, 150); // Adjust the typing speed
        });
      }
      // Set the cursorVisible to false immediately after the typing animation ends
      setCursorVisible(false);

      // After typing effect completes, set the cursor to blink
      const cursorBlinkInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 600);

      // Clear the interval after a certain duration (adjust as needed)
      setTimeout(() => {
        clearInterval(cursorBlinkInterval);
        setCursorVisible(false); // Set cursorVisible to false when the animation ends
      }, textArray.length * 150 + 600); // Adjust the duration based on your typing speed
    };

    animateText();

    return () => {}; // No cleanup needed
  }, []); // Run only once on component mount

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchedTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (post) =>
            post.name.toLowerCase().includes(searchText.toLowerCase()) ||
            post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
        staggerChildren: 0.05, // Adjust the typing speed
        delayChildren: 0.5, // Delay before typing starts
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const cursorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 0.6,
        repeatType: "reverse",
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto justify-center items-center flex flex-col">
      <div>
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="font-extrabold text-[#222328] text-[132px] text-center"
        >
          <AnimatePresence>
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
            <motion.span
              key="cursor"
              variants={cursorVariants}
              animate={cursorVisible ? "visible" : "hidden"}
              initial="hidden"
              className="cursor"
            >
              |
            </motion.span>
          </AnimatePresence>
        </motion.h1>
        <p className="mt-2 font-bold text-black text-[18px]  text-center">
          Browse through a collection of your friends prompts.
        </p>
      </div>

      <div className="mt-16 max-w-md w-full">
        <FormField
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {/* {searchText && (
              <h2 className="font-medium text-[#43474b] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )} */}
            <div className=" w-full">
              {searchText ? (
    searchedResults?.length > 0 ? (
      <ParallaxScroll images={searchedResults} />
    ) : (
      <h2 className="mt-8 font-bold text-[#111113] text-xl">No search results found!</h2>
    )
  ) : (
                <ParallaxScroll images={allPosts} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
