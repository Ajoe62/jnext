"use client";

import { m } from "framer-motion";
import Image from "next/image";
import profilePhoto from "/public/assets/optimized/photo.webp";

const Photo = () => {
    return (
        <div className="w-full h-full relative">
            <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-full flex justify-center items-center"
            >
                {/* profile image */}
                <m.div
                    className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten
    absolute">
                    <Image
                        src={profilePhoto}
                        priority={true}
                        quality={90}
                        fill
                        sizes="(max-width: 768px) 298px, (max-width: 1280px) 398px, 498px"
                        alt="Joseph Akharume - Software Engineer"
                        className="object-contain"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVR42mP8/58BFTAhgzHgwag7Rt2BMgAA6xkFBSX7jP8AAAAASUVORK5CYII="
                    />
                </m.div>

                {/* circle */}
                <m.svg className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
                    viewBox="0 0 506 506"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <m.circle cx="253" cy="253" r="250"
                        stroke="#00d4ff" strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: "24 10 0 0" }}
                        animate={{
                            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                            rotate: [120, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </m.svg>
            </m.div>
        </div>
    );

};
export default Photo;