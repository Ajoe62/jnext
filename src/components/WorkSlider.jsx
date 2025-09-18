"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import WorkSliderBtns from './WorkSliderBtns';

// Default projects if none are provided
const defaultProjects = [
    {
        num: "01",
        category: "yea-impact-Youth Empowerment Platform",
        title: "yea-impact - Youth Empowerment Platform",
        description:
            "A comprehensive full-stack web application for Youth Empowerment and Advocacy. Built with Next.js 15, Supabase, and TypeScript. The app is built using the Next.js App Router and Supabase to provide a full‑stack experience with authentication, database interactions, and real‑time updates",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "Nextjs" }, { name: "Express.js" }, { name: "supabase" },{name: "typescript" }, { name: "postgresql" }],
        image: '/assets/work/yea-impact.png',
        live: "https://yea-impact.vercel.app",
        github: "https://github.com/Ajoe62/yea-impact",
    },
    {
        num: "02",
        category: "Nexscholar - Scholarship Management System",
        title: "Nexscholar - Scholarship Management System",
        description:
            "A comprehensive scholarship management platform built with Next.js 15, Supabase, and TypeScript.To be deployed",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "Nextjs" }, { name: "Express.js" }, { name: "supabase" },{name: "typescript" }, { name: "postgresql" }],
        image: '/assets/work/nexscholar.png',
        live: "https://nexscholar.vercel.app",
        github: "https://github.com/Ajoe62/nexscholar",
    },
    {
        num: "03",
        category: "Uswift Chrome Extension",
        title: "Uswift Chrome Extension",
        description:
            "USwift Auto-Apply feature is the most advanced job application automation system available. It combines AI-powered form detection, intelligent field mapping, and adaptive strategies to automatically fill and submit job applications across 25+ major job boards",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "Nextjs" }, { name: "Express.js" }, { name: "supabase" }],
        image: '/assets/work/uswift.png',
        live: "",
        github: "https://github.com/Ajoe62/uswift",
    },
    {
        num: "04",
        category: "Ecommerce Platform",
        title: "Ecommerce Platform",
        description:
            "A full-stack e-commerce website (mvp). Features include user authenticiation, product search and filtering, cart management.",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Express.js" }, { name: "PostgreSql" }],
        image: '/assets/work/techstore.png',
        live: "",
        github: "https://github.com/Ajoe62/techstore",
    },
    {
        num: "05",
        category: "Remote Job-search Platform",
        title: "Remote Job-search Platform",
        description:
            "A platform that connects remote job seekers with employers. Features include user authentication, job search and filtering, and job application.",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Firebase" }, { name: "Material-UI" }],
        image: '/assets/work/remotelydev.png',
        live: "https://remotelydev.vercel.app",
        github: "https://github.com/Ajoe62/remotelydev",
    },
    {
        num: "06",
        category: "Streambeat App",
        title: "Streambeat App",
        description:
            "A group calling app tha allows users to create virtual rooms. Features include video chat, screen sharing and real-time messaging.",
        stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Django" }, { name: "Agora SDK" }],
        image: '/assets/work/streambeat.png',
        live: "",
        github: "https://www.github.com/Ajoe62/streambeat",
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
                            <Image
                                src={project.image}
                                fill
                                className='object-cover'
                                alt={project.title}
                                sizes="(max-width: 1200px) 100vw, 50vw"
                                priority
                            />
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
