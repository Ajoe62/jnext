"use client";

import { BsArrowDownRight } from 'react-icons/bs';
import Link from 'next/link';
import { RevealElement } from "@/components/RevealElement";

const services = [
  {
    num: '01',
    title: 'Mobile App Development',
    description: 'I develop native and cross-platform mobile applications that deliver seamless user experiences across iOS and Android devices.',
    href: ""
  },
  {
    num: '02',
    title: 'Web Development',
    description: 'I develop websites and web applications that provide intuitive user experiences and drive conversions.',
    href: ""
  },
  {
    num: '03',
    title: 'Content Creation',
    description: 'I create visual content that helps brands tell their stories and connect with their audience.',
    href: ""
  },
  {
    num: '04',
    title: 'Code/AI Tutoring',
    description: 'I tutor aspiring developers and help them build the skills they need to succeed in the tech industry.',
    href: ""
  },
  {
    num: '05',
    title: 'SEO Optimization',
    description: 'I optimize websites for search engines to help brands increase their online visibility and reach more customers.',
    href: ""
  },
];

const Services = () => {
  return (
    <section className='min-h-[80vh] flex flex-col justify-center py-12 xl:py-0'>
      <div className="container mx-auto">
        <RevealElement>
          <h1 className="text-4xl font-bold mb-12 text-center">My Services</h1>
        </RevealElement>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-[60px]'>
          {services.map((service, index) => {
            return (
              <RevealElement
                key={index}
                delay={index * 100}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div className='flex-1 flex flex-col justify-center gap-6 group'>
                  {/* top */}
                  <div className='w-full flex justify-between items-center'>
                    <div className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                      {service.num}
                    </div>
                    <Link href={service.href} className='w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45'>
                      <BsArrowDownRight className='text-primary text-3xl' />
                    </Link>
                  </div>
                  {/* title */}
                  <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{service.title}</h2>
                  {/* description */}
                  <p className='text-white/60'>{service.description}</p>
                  {/* border */}
                  <div className='border-b border-white/20 w-full'></div>
                </div>
              </RevealElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;