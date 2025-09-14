"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Animation settings context for global control
const AnimationContext = createContext({
    reducedMotion: false,
    loaded: false,
    prefersReducedMotion: false
});

export function AnimationProvider({ children }) {
    // Detect loading state and motion preferences
    const [loaded, setLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Mark as loaded after initial render
        setLoaded(true);

        // Check for reduced motion preference
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            setPrefersReducedMotion(mediaQuery.matches);

            // Listen for preference changes
            const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

            // Use the appropriate event listener method based on browser support
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener("change", handleChange);
                return () => mediaQuery.removeEventListener("change", handleChange);
            } else {
                // Fallback for older browsers
                mediaQuery.addListener(handleChange);
                return () => mediaQuery.removeListener(handleChange);
            }
        }
    }, []);

    return (
        <AnimationContext.Provider value={{
            loaded,
            prefersReducedMotion,
            reducedMotion: !loaded || prefersReducedMotion
        }}>
            {children}
        </AnimationContext.Provider>
    );
}

export const useAnimation = () => useContext(AnimationContext);
