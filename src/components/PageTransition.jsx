"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAnimation } from "./AnimationProvider";

export function PageTransition({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState("fadeIn");
    const { prefersReducedMotion } = useAnimation();

    // Skip animations for debug pages
    const isDebugPage = pathname.includes('debug') ||
        pathname.includes('test') ||
        pathname.includes('layout-tool') ||
        pathname.includes('simple-test') ||
        pathname.includes('layout-debug');

    useEffect(() => {
        if (isDebugPage || prefersReducedMotion) {
            setDisplayChildren(children);
            return;
        }

        if (children !== displayChildren) {
            setTransitionStage("fadeOut");

            // After the fade out, update children and fade back in
            const timeout = setTimeout(() => {
                setDisplayChildren(children);
                setTransitionStage("fadeIn");
            }, 800); // Increased duration for more visibility

            return () => clearTimeout(timeout);
        }
    }, [children, displayChildren, prefersReducedMotion, isDebugPage]);

    if (isDebugPage) {
        return (
            <main className="min-h-screen pt-28 pb-12">
                {children}
            </main>
        );
    }

    return (
        <div className="page-transition-container relative">
            {/* First overlay (right to left) */}
            <div
                className={`page-transition-overlay ${transitionStage === "fadeOut" ? "active" : ""}`}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#00D4FF",
                    zIndex: 40,
                    transform: transitionStage === "fadeOut" ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                    transformOrigin: "right"
                }}
            />

            {/* The content container */}
            <div
                className={`page-transition-content ${transitionStage}`}
                style={{
                    position: "relative",
                    zIndex: 30,
                    opacity: transitionStage === "fadeIn" ? 1 : 0,
                    transform: transitionStage === "fadeIn" ? "translateY(0)" : "translateY(35px)",
                    transition: "opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
                    transitionDelay: transitionStage === "fadeIn" ? "0.4s" : "0s"
                }}
                key={pathname}
            >
                <main className="min-h-screen pt-28 pb-12">
                    {displayChildren}
                </main>
            </div>
        </div>
    );
}

export default PageTransition;