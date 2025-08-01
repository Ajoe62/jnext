"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
    return (
        <div className="w-full h-full relative">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { delay: 0.1, duration: 0.2, ease: "easeIn" },
                }}>

                {/* image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 0.15, duration: 0.2, ease: "easeInOut" },
                    }}

                    className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten
    absolute">
                    <Image
                        src="/assets/optimized/photo.webp"
                        priority
                        quality={100}
                        fill
                        sizes="(max-width: 768px) 298px, (max-width: 1280px) 398px, 498px"
                        alt="Joseph Akharume - Software Engineer"
                        className="object-contain"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVR42mP8/58BFTAhgzHgwag7Rt2BMgAA6xkFBSX7jP8AAAAASUVORK5CYII="
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>

                {/* circle */}
                <motion.svg className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
                    fill="transparent"
                    viewBox="0 0 506 506"
                    xmlns="http://www.w3.org/2000/svg">

                    <motion.circle cx="253" cy="253" r="250"
                        stroke="#00d4ff" strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: "24 10 0 0" }}
                        animate={{
                            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],

                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}

                    />

                </motion.svg>

            </motion.div>
        </div>
    );

};
export default Photo;