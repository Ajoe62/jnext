"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { BsArrowUpRight } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

// Mock ScrollAnimation component
const ScrollAnimation = ({ children, delay }) => (
  <div className="animate-fadeIn">{children}</div>
);

// Mock tooltip components
const TooltipProvider = ({ children }) => <div>{children}</div>;
const Tooltip = ({ children }) => <div className="relative group">{children}</div>;
const TooltipTrigger = ({ children, className }) => (
  <div className={`${className} cursor-pointer`}>{children}</div>
);
const TooltipContent = ({ children }) => (
  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
    {children}
  </div>
);

// Mock Link component
const Link = ({ href, children }) => (
  <a href={href} className="inline-block">{children}</a>
);

// Mock DynamicWorkSlider component
const DynamicWorkSlider = ({ projects, onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(newIndex);
    if (onSlideChange) {
      onSlideChange({ activeIndex: newIndex });
    }
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (onSlideChange) {
      onSlideChange({ activeIndex: newIndex });
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="bg-[#232329] rounded-lg p-4 h-80 flex items-center justify-center relative">
        <div className="relative w-full h-64">
          <Image
            src={projects[currentIndex].image}
            alt={projects[currentIndex].title}
            width={400}
            height={300}
            style={{ objectFit: 'contain' }}
            className="rounded"
            unoptimized={true}
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevSlide}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-accent transition-colors"
        >
          ← Prev
        </button>
        <div className="flex space-x-2 items-center">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-accent' : 'bg-gray-500'}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-600 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Work component
const WorkComponent = () => {
  const projects = [
    {
      num: "01",
      category: "Yea Impact ",
      title: "yea-impact - Youth Empowerment Platform",
      description:
        "A comprehensive full-stack web application for Youth Empowerment and Advocacy. Built with Next.js 15, Supabase, and TypeScript. The app is built using the Next.js App Router and Supabase to provide a full‑stack experience with authentication, database interactions, and real‑time updates",
      stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "Nextjs" }, { name: "Express.js" }, { name: "supabase" }, { name: "typescript" }, { name: "postgresql" }],
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
      stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "Nextjs" }, { name: "Express.js" }, { name: "supabase" }, { name: "typescript" }, { name: "postgresql" }],
      image: '/assets/work/nexscholar.png',
      live: "https://nexscholar.vercel.app",
      github: "https://github.com/Ajoe62/nexscholar",
    },
    {
      num: "03",
      category: "Uswift - Job Application Automation",
      title: "Job Application Automation",
      description:
        "A comprehensive job application automation platform built with Next.js 15, Supabase, and TypeScript. To be deployed",
      stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "Nextjs" }, { name: "Express.js" }, { name: "supabase" }, { name: "typescript" }, { name: "postgresql" }],
      image: '/assets/work/nexscholar.png',
      live: "",
      github: "https://github.com/Ajoe62/Uswift",
    },
    {
      num: "04",
      category: "Ecommerce Platform",
      title: "Ecommerce Platform",
      description: "A full-stack e-commerce website (mvp). Features include user authentication, product search and filtering, cart management.",
      stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Express.js" }, { name: "PostgreSql" }],
      image: '/assets/work/techstore.png',
      live: "#",
      github: "https://www.github.com/Ajoe62/techstore",
    },
    {
      num: "05",
      category: "Remote Job-search Platform",
      title: "Remote Job-search Platform",
      description: "A platform that connects remote job seekers with employers. Features include user authentication, job search and filtering, and job application.",
      stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Firebase" }, { name: "Material-UI" }],
      image: '/assets/work/remotelydev.PNG',
      live: "https://remotelydev.vercel.app",
      github: "https://www.github.com/Ajoe62/remotelydev",
    },
    {
      num: "06",
      category: "Streambeat App",
      title: "Streambeat App",
      description: "A group calling app that allows users to create virtual rooms. Features include video chat, screen sharing and real-time messaging.",
      stack: [{ name: "Html 5" }, { name: "Tailwindcss" }, { name: "React" }, { name: "Django" }, { name: "Agora SDK" }],
      image: '/assets/work/streambeat.PNG',
      live: "#",
      github: "https://www.github.com/Ajoe62/streambeat",
    },
  ];

  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0 bg-[#1b1b1f] text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation delay={0.1}>
          <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
            <div className='w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none'>
              <div className='flex flex-col gap-[30px] h-[50%]'>
                {/* outline num */}
                <div className='text-8xl leading-none font-extrabold text-transparent bg-gradient-to-r from-accent-hover to-blue-500 bg-clip-text'>
                  {project.num}
                </div>

                {/* project category */}
                <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize'>
                  {project.category}
                  project
                </h2>

                {/* project description */}
                <p className='text-white/60'>{project.description}</p>

                {/* stack */}
                <ul className='flex flex-wrap gap-4'>
                  {project.stack.map((item, index) => (
                    <li key={index} className='text-xl text-accent'>
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  ))}
                </ul>

                {/* border */}
                <div className='border border-white/20'></div>

                {/* buttons */}
                <div className='flex items-center gap-4'>
                  <Link href={project.live}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 hover:bg-green-500/20 flex justify-center items-center group transition-colors'>
                          <BsArrowUpRight />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>

                  <Link href={project.github}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 hover:bg-green-500/20 flex justify-center items-center group transition-colors'>
                          <BsGithub />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Github repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
              </div>
            </div>

            <div className='w-full xl:w-[50%] flex flex-col justify-between items-center xl:items-end'>
              <div className='w-full h-full flex items-center justify-center'>
                <DynamicWorkSlider
                  projects={projects}
                  onSlideChange={handleSlideChange}
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default WorkComponent;