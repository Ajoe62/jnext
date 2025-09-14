"use client";

import Image from "next/image";

const Photo = () => {
    return (
        <div className="w-full h-full relative overflow-visible">
            <div className="w-full h-full flex justify-start items-center relative">
                {/* profile image */}
                <div className="w-[250px] h-[250px] xl:w-[380px] xl:h-[380px] absolute overflow-hidden rounded-full border-2 border-accent/20 left-[10%] sm:left-[15%] md:left-[20%] lg:left-0 xl:left-[10%]">
                    <Image
                        src="/assets/photo.jpg"
                        priority={true}
                        loading="eager"
                        quality={100}
                        fill
                        sizes="(max-width: 768px) 298px, (max-width: 1280px) 398px, 498px"
                        alt="Joseph Akharume - Software Engineer"
                        className="object-cover z-20"
                        style={{ objectPosition: "center 10%" }}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVR42mP8/58BFTAhgzHgwag7Rt2BMgAA6xkFBSX7jP8AAAAASUVORK5CYII="
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/optimized/photo.webp";
                        }}
                    />
                </div>

                {/* circle - simplified without animation */}
                <svg className="absolute w-[262px] xl:w-[398px] h-[262px] xl:h-[398px] z-10 left-[10%] sm:left-[15%] md:left-[20%] lg:left-0 xl:left-[10%]"
                    viewBox="0 0 506 506"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="253" cy="253" r="248"
                        stroke="#00d4ff" strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>

                {/* Fallback div in case the image doesn't load */}
                <div className="absolute w-[250px] h-[250px] xl:w-[380px] xl:h-[380px] bg-gradient-to-br from-accent/30 to-primary rounded-full opacity-30 z-5 left-[10%] sm:left-[15%] md:left-[20%] lg:left-0 xl:left-[10%]"></div>
            </div>
        </div>
    );

};
export default Photo;