"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import WorkSliderBtns from './WorkSliderBtns';

// Default projects if none are provided
const defaultProjects = [
    {
        num: "01",
        category: "full-stack ",
        title: "Ecommerce Platform",
        description:
            "A full-stack e-commerce website (mvp). Features include user authenticiation, product search and filtering, cart management.",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Express.js" }, { name: "PostgreSql" }],
        image: '/assets/work/techstore.png',
        live: "",
        github: "",
    },
    {
        num: "02",
        category: "full-stack ",
        title: "Remote Job-search Platform",
        description:
            "A platform that connects remote job seekers with employers. Features include user authentication, job search and filtering, and job application.",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Firebase" }, { name: "Material-UI" }],
        image: '/assets/work/remotelydev.png',
        live: "",
        github: "",
    },
    {
        num: "03",
        category: "full-stack ",
        title: "Streambeat App",
        description:
            "A group calling app tha allows users to create virtual rooms. Features include video chat, screen sharing and real-time messaging.",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Django" }, { name: "Agora SDK" }],
        image: '/assets/work/streambeat.png',
        live: "",
        github: "",
    },
];

const WorkSlider = ({ projects = defaultProjects, onSlideChange }) => {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            className='xl:h-[520px] mb-12'
            onSlideChange={onSlideChange}
        >
            {projects.map((project, index) => (
                <SwiperSlide key={index} className='w-full'>
                    <div className='h-[460px] relative group flex justify-center items-center bg-pink-50/20'>
                        {/* overlay */}
                        <div className='absolute top-0 bottom-0 w-full bg-black/10 z-10'></div>
                        {/* image */}
                        <div className='relative w-full h-full'>
                            <Image src={project.image} fill className='object-cover' alt={project.title} sizes="(max-width: 1200px) 100vw, 50vw" />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
            />
        </Swiper>
    );
};

export default WorkSlider;
