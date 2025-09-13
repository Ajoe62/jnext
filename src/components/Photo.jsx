"use client";

import Image from "next/image";

const Photo = () => {
    return (
        <div className="w-full h-full relative overflow-visible">
            <div className="w-full h-full flex justify-center items-center relative">
                {/* profile image */}
                <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] absolute overflow-hidden rounded-full border-2 border-accent/20">
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
                <svg className="absolute w-[310px] xl:w-[516px] h-[310px] xl:h-[516px] z-10"
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
                <div className="absolute w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] bg-gradient-to-br from-accent/30 to-primary rounded-full opacity-30 z-5"></div>
            </div>
        </div>
    );

};
export default Photo;