"use client";

import Image from "next/image";

const Photo = () => {
    return (
        <div className="w-full h-full relative overflow-visible flex items-center justify-center">
            {/* profile image with debug border and background */}
            <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] bg-gray-900 border-4 border-accent overflow-hidden rounded-full flex items-center justify-center relative">
                {/* Next.js Image for production */}
                <Image
                    src="/assets/photo.jpg"
                    width={500}
                    height={500}
                    alt="Joseph Akharume - Software Engineer"
                    className="object-cover z-20"
                    style={{ objectPosition: "center 10%" }}
                    priority={true}
                    quality={100}
                />
                {/* Fallback native img for debugging */}
                <noscript>
                    <img src="/assets/photo.jpg" alt="Joseph Akharume - Software Engineer" style={{ width: '100%', height: '100%', objectFit: 'cover', border: '2px solid yellow' }} />
                </noscript>
                {/* circle - simplified without animation */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none"
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary rounded-full opacity-30 z-5 pointer-events-none"></div>
            </div>
            {/* Direct img for debugging outside of noscript */}
            <div className="hidden">
                <img src="/assets/photo.jpg" alt="Debug direct img" style={{ width: '100px', height: '100px', border: '2px solid lime' }} />
            </div>
        </div>
    );

};
export default Photo;