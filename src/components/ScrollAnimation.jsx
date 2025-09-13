"use client";

import { useEffect, useRef } from "react";
import { m, useInView, useAnimation } from "framer-motion";

export const ScrollAnimation = ({ children, delay = 0.25, once = true }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.2 });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else {
            mainControls.start("hidden");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className="relative w-full">
            <m.div
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{
                    duration: 0.6,
                    delay: delay,
                    ease: [0.25, 0.1, 0.25, 1.0]  // easeOutQuart
                }}
            >
                {children}
            </m.div>
        </div>
    );
};
