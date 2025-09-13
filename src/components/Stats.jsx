"use client";
import CountUp from "react-countup";
import { RevealElement } from "@/components/RevealElement";

const stats = [
    {
        num: 4,
        text: "Years of experience"
    },
    {
        num: 8,
        text: "Project Completed"
    },
    {
        num: 12,
        text: "Technologies mastered"
    },
    {
        num: 400,
        text: "Code commits"
    }
];

const Stats = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                    {stats.map((item, index) => {
                        return (
                            <RevealElement
                                key={index}
                                direction="up"
                                delay={index * 100 + 300}
                                threshold={0.3}
                            >
                                <div
                                    className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                                >
                                    <CountUp
                                        end={item.num}
                                        duration={5}
                                        delay={1}
                                        className="text-4xl xl:text-6xl font-extrabold text-accent"
                                    />
                                    <p className="max-w-[150px] leading-snug text-white/80">
                                        {item.text}
                                    </p>
                                </div>
                            </RevealElement>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;