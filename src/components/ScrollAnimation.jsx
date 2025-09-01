"use client";

import { useEffect, useRef } from "react";
import { m, useInView, useAnimation } from "framer-motion";

export const ScrollAnimation = ({ children, delay = 0.25, once = true }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className="relative overflow-hidden">
            <m.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: delay }}
            >
                {children}
            </m.div>
        </div>
    );
};
