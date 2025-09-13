"use client";

import { useRef, useState, useEffect } from "react";
import { useAnimation } from "./AnimationProvider";
import { cn } from "@/lib/utils";

export function RevealElement({
    children,
    className,
    delay = 0,
    threshold = 0.1,
    direction = "up",
    distance = "20px",
    duration = 600,
}) {
    const { reducedMotion } = useAnimation();
    const [isRevealed, setIsRevealed] = useState(reducedMotion);
    const ref = useRef(null);

    // Map directions to transform properties
    const transformMap = {
        up: `translateY(${distance})`,
        down: `translateY(-${distance})`,
        left: `translateX(${distance})`,
        right: `translateX(-${distance})`,
        none: "none"
    };

    useEffect(() => {
        // Skip animation for reduced motion
        if (reducedMotion) {
            setIsRevealed(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [reducedMotion, threshold]);

    const style = !reducedMotion
        ? {
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? "none" : transformMap[direction],
            transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
            transitionDelay: `${delay}ms`,
        }
        : {};

    return (
        <div
            ref={ref}
            className={cn("reveal-element", className)}
            style={style}
        >
            {children}
        </div>
    );
}
