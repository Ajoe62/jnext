"use client"

import WorkSliderBtns from '@/components/WorkSliderBtns'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

import { BsArrowRight, BsArrowUpRight, BsGithub } from 'react-icons/bs';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    num: "01",
    category: "full-stack ",
    title: "Ecommerce Platform",
    description:
    "A full-stack e-commerce website (mvp). Features include user authenticiation, product search and filtering, cart management.",
    stack: [{ name: "Html 5" }, {name: "Tailwindcss" }, {name: "React" }, { name: "Express.js" }, { name: "PostgreSql" }],
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
    stack: [{ name: "Html 5" }, {name: "Tailwindcss" }, {name: "React" }, { name: "Firebase" }, { name: "Material-UI" }],
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
    stack: [{ name: "Html 5" }, {name: "Tailwindcss" }, {name: "React" }, { name: "Django" }, { name: "Agora SDK" }],
    image: '/assets/work/streambeat.png',
    live: "",
    github: "",
  },
];
 
const Work = () => {
  const [project, setProject] = useState(projects[0])
  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
    setProject(projects[currentIndex])
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
         transition: { delay: 2.4, duration: 0.4, ease: "easeIn" }, 

       }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
      >
      <div className="container mx-auto">
        <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
          <div className='w-full xl:w-[50px] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none'>
            <div className='flex flex-col gap-[30px] h-[50%]'>
              {/* outline num */}
              <div className='text-8xl leading-none front-extrabold text-transparent text-outline'>
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
              <ul className='flex gap-4'>
                {project.stack.map((item, index) => {
                  return (
                  <li key={index} className='text-xl text-accent'>
                    {item.name}
                    {/* remove the last comma from the list */}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                );
                })}
              
              </ul>
              {/* border */}
              <div className='border border-white/20'> </div>
                  {/* button */}
                <div className='flex items-center gap-4'>
                  {/* live project button */}
                  <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                        <BsArrowUpRight className='text-white text-3xl group-hover:text-accent' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  </Link>
                  {/* github project button */}
                  <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                        <BsGithub className='text-white text-3xl group-hover:text-accent' />
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
          <div className='w-full xl:w-[50%]'>
          <Swiper spaceBetween={30} slidesPerView={1} className='xl:h-[520px] mb-12' onSlideChange={handleSlideChange}>
            {projects.map((project, index) => {
              return (
              <SwiperSlide key={index} className='w-full'>
                <div className='h-[460px] relative group flex justify-center items-center bg-pink-50/20'>
                {/* overlay */}
                <div className='absolute top-0 bottom-0 w-full bg-black/10 z-10'></div>
                {/* image */}
                <div className='relative w-full h-full'>
                  <Image src={project.image} fill className='object-cover' alt=''></Image>
                </div>
                </div>
              </SwiperSlide>
              );
            })}
            {/* slider buttons */}
            <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-8 z-20 w-full justify-between xl:w-max xl:justify-none" btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center transition-all"/>
          </Swiper>
          </div>

        </div>
      </div>
    </motion.section>
  )
}
export default Work;
