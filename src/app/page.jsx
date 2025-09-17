import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { RevealElement } from "@/components/RevealElement";

export default function Home() {
  return (
    <section className="min-h-screen w-full">
      <div className="container mx-auto py-8 md:py-12">
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-10 md:gap-16 xl:gap-0 xl:pt-8 xl:pb-24 w-full">
          {/* text */}
          <div className="text-center xl:text-left w-full xl:w-[55%] mt-8 md:mt-12 xl:mt-0">
            <RevealElement direction="left">
              <span className="text-xl">Software Developer</span>
            </RevealElement>
            <RevealElement direction="left" delay={100}>
              <h1 className="h1 mb-6">
                Hello I&apos;m <br /> <span className="text-accent">Joseph Akharume</span>
              </h1>
            </RevealElement>
            <RevealElement direction="left" delay={200}>
              <p className="max-w-[500px] mx-auto xl:mx-0 mb-9 text-white/80">
                I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
              </p>
            </RevealElement>
            {/* btn and socials */}
            <RevealElement direction="up" delay={300}>
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </RevealElement>
          </div>
          {/* photo */}
          <div className="w-full xl:w-[45%] flex justify-center mb-8 xl:mb-0">
            <RevealElement direction="right" delay={100}>
              <div className="relative h-[340px] w-[340px] md:h-[4200px] md:w-[420px] xl:h-[520px] xl:w-[520px] flex items-center justify-center mx-auto">
                <Photo />
              </div>
            </RevealElement>
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}