"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RevealElement } from "@/components/RevealElement";

// about data
const about = {
  title: 'About me',
  description: 'I am a full-stack web developer with a passion for creating beautiful and functional user experiences. I specialize in building websites and web applications using modern technologies like React, Next.js, and Tailwind CSS.',
  info: [
    { fieldName: 'Name', fieldValue: 'Joseph Akharume' },
    { fieldName: 'Phone', fieldValue: '(+234) 8067325131' },
    { fieldName: 'Experience', fieldValue: '5+ Years' },
    { fieldName: 'Facebook', fieldValue: 'Jossyking99' },
    { fieldName: 'Nationality', fieldValue: 'Nigerian' },
    { fieldName: 'Job-type', fieldValue: 'Contract, Part-time, Full-time' },
    { fieldName: 'Language', fieldValue: 'English, Edo' },
    { fieldName: 'Email', fieldValue: 'josephakharume62@gmail.com' },
  ]
};

// experience data
const experience = {
  icon: '/assets/resume/badge.svg',
  title: 'Experience',
  description: 'I have worked with several companies and startups to develop websites and web applications that drive conversions and provide intuitive user experiences.',
  items: [
    { title: 'Frontend Developer', company: 'Company A', duration: '2023 - 2024', description: 'I worked as frontend' },
    { title: 'Backend Developer', company: 'Ypn Connect', duration: '2022 - 2023', description: 'I worked as backend developer' },
    { title: 'AI Tutor', company: 'IAS Technologies', duration: '2021 - 2022', description: 'I worked as AI tutor' },
    { title: 'Full-stack Developer', company: 'Remotely Dev', duration: '2019 - 2021', description: 'I worked as full-stack developer' },
    { title: 'React Developer', company: 'Remotely Dev', duration: '2019 - 2020', description: 'I create high priority content' }
  ]
};

// education data
const education = {
  icon: '/assets/resume/badge.svg',
  title: 'Education',
  description: 'I have obtained various degrees that certified me as a Software Developer.',
  items: [
    { institution: 'African Learning Xperience', degree: 'Full Stack Software Engineer', duration: '2024' },
    { institution: 'ZURI Platform', degree: 'Diploma in Web Development', duration: '2023' },
    { institution: 'Linkedin Learning', degree: 'C Developer', duration: '2023' },
    { institution: 'FreeCode Camp', degree: 'FrontEnd Developer fundamentals', duration: '2022' },
    { institution: 'Great Learning Platform', degree: 'Javascript Frontend Fundamentals', duration: '2021' },
    { institution: 'Online Bootcamp Learning Platform', degree: 'Python Fundamentals', duration: '2020' },
    { institution: 'University of Benin', degree: 'Bsc Medical Biochemistry', duration: '2015 - 2019' },
  ]
};

// skills data
const skills = {
  title: "My skills",
  description: "I have gained these skills in the process of my software development journey",
  skillList: [
    { icon: <FaHtml5 />, name: "html 5" },
    { icon: <FaCss3 />, name: "css 3" },
    { icon: <FaJs />, name: "javascript" },
    { icon: <FaReact />, name: "react.js" },
    { icon: <SiNextdotjs />, name: "next.js" },
    { icon: <SiTailwindcss />, name: "tailwind.css" },
    { icon: <FaNodeJs />, name: "node.js" },
    { icon: <FaPython />, name: "python.py" },
  ]
};

const Resume = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <RevealElement>
          <Tabs
            defaultValue='experience'
            className='flex flex-col xl:flex-row gap-[60px]'
          >
            <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
              <RevealElement direction="left" delay={100}>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </RevealElement>
              <RevealElement direction="left" delay={200}>
                <TabsTrigger value="education">Education</TabsTrigger>
              </RevealElement>
              <RevealElement direction="left" delay={300}>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </RevealElement>
              <RevealElement direction="left" delay={400}>
                <TabsTrigger value="about">About me</TabsTrigger>
              </RevealElement>
            </TabsList>

            {/* content */}
            <div className='min-h-[70vh] w-full'>
              {/* experience */}
              <TabsContent value="experience" className="w-full">
                <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                  <RevealElement direction="up">
                    <h3 className='text-4xl font-bold'>{experience.title}</h3>
                  </RevealElement>
                  <RevealElement direction="up" delay={100}>
                    <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{experience.description}</p>
                  </RevealElement>
                  <ScrollArea className="h-[400px]">
                    <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                      {experience.items.map((item, index) => (
                        <RevealElement key={index} delay={index * 100 + 200} direction={index % 2 === 0 ? "left" : "right"}>
                          <li className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                            <span className='text-accent'>{item.duration}</span>
                            <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.title}</h3>
                            <div className='flex items-center gap-3'>
                              <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                              <p>{item.company}</p>
                            </div>
                          </li>
                        </RevealElement>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* education */}
              <TabsContent value="education" className="w-full">
                <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                  <RevealElement direction="up">
                    <h3 className='text-4xl font-bold'>{education.title}</h3>
                  </RevealElement>
                  <RevealElement direction="up" delay={100}>
                    <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{education.description}</p>
                  </RevealElement>
                  <ScrollArea className="h-[400px]">
                    <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                      {education.items.map((item, index) => (
                        <RevealElement key={index} delay={index * 100 + 200} direction={index % 2 === 0 ? "left" : "right"}>
                          <li className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                            <span className='text-accent'>{item.duration}</span>
                            <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.degree}</h3>
                            <div className='flex items-center gap-3'>
                              <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                              <p>{item.institution}</p>
                            </div>
                          </li>
                        </RevealElement>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* skills */}
              <TabsContent value="skills" className="w-full h-full">
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-[30px] text-center xl:text-left">
                    <RevealElement direction="up">
                      <h3 className="text-4xl font-bold">{skills.title}</h3>
                    </RevealElement>
                    <RevealElement direction="up" delay={100}>
                      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                    </RevealElement>
                  </div>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                    {skills.skillList.map((skill, index) => (
                      <RevealElement key={index} delay={index * 80 + 200} direction="up">
                        <li>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="capitalize">{skill.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      </RevealElement>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* about */}
              <TabsContent value="about" className="w-full text-center xl:text-left">
                <div className="flex flex-col gap-[30px]">
                  <RevealElement direction="up">
                    <h3 className="text-4xl font-bold">{about.title}</h3>
                  </RevealElement>
                  <RevealElement direction="up" delay={100}>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                  </RevealElement>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                    {about.info.map((item, index) => (
                      <RevealElement key={index} delay={index * 50 + 200} direction="up">
                        <li className="flex items-center justify-center xl:justify-start gap-4">
                          <span className="text-white/60">{item.fieldName}</span>
                          <span className="text-xl">{item.fieldValue}</span>
                        </li>
                      </RevealElement>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </RevealElement>
      </div>
    </div>
  );
};

export default Resume;