import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';
import Social from '@/components/Social';
import Photo from '@/components/Photo';
import Stats from '@/components/Stats';
import { ScrollAnimation } from "@/components/ScrollAnimation";

const Home = () => {
  return (
    <section className='h-full'>
      <div className="container mx-auto h-full">
        <div className='flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24'>
          {/* text */}
          <div className='text-center xl:text-left order-2 xl:order-none'>
            <ScrollAnimation>
              <span>Software Engineer | Mobile & Web Developer</span>
              <h1 className='h1 mb-6'>
                Hello I'm <br /> <span className='text-accent'>Joseph Akharume</span>
              </h1>
              <p className='max-w-[500px] mb-9 text-white/80'>
                I bring ideas to life through immersive digital experiences, blending creativity with mastery in a wide array of programming languages and advanced technologies.
              </p>
            </ScrollAnimation>
            {/* btn and socials */}
            <ScrollAnimation delay={0.4}>
              <div className='flex flex-col xl:flex-row items-center gap-8'>
                <Button
                  variant='outline'
                  size='lg'
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className='text-xl' />
                </Button>
                <div className='mb-8 xl:mb-0'>
                  <Social containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border
                   border-accent rounded-full flex justify-center items-center
                   text-accent text-base hover:bg-accent hover:text-primary 
                   hover:transition-all duration-500" />
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* photo */}
          <div className='order-1 xl:order-none mb-8 xl:mb-0'>
            <ScrollAnimation delay={0.6}>
              <Photo />
            </ScrollAnimation>
          </div>
        </div>
      </div>
      <ScrollAnimation delay={0.8}>
        <Stats />
      </ScrollAnimation>
    </section>
  );
}
export default Home;