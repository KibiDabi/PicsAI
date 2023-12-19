import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { download } from "../assets";
import { downloadImage } from "../utils";
import Card from "./Card";

export const ParallaxScroll = ({ images }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <div className="items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-10 py-40 px-10">
      {images?.map((el, idx) => (
        <motion.div
          style={{
            y: idx % 3 === 0 ? translateYFirst : idx % 3 === 1 ? 0 : translateYThird,
            x: idx % 3 === 0 ? translateXFirst : idx % 3 === 1 ? 0 : translateXThird,
            rotateZ: idx % 3 === 0 ? rotateXFirst : idx % 3 === 1 ? 0 : rotateXThird,
          }}
          key={"grid-" + idx}
          whileHover={{ scale: 1.2 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          className="relative overflow-hidden rounded-lg group"
        >
          <img
            src={el.photo}
            className="h-96 w-full aspect-w-1 aspect-h-1 object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
            alt="thumbnail"
          />
          <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[rgba(16,19,31,0.8)] m-2 p-4 rounded-md">
            <Card _id={el._id} name={el.name} prompt={el.prompt} photo={el.photo} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
