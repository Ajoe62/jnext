"use client";
import dynamic from 'next/dynamic';

const DynamicWorkSlider = dynamic(() => import('./WorkSlider'), {
    ssr: false,
    loading: () => <div className="h-[520px] w-full bg-primary/10 rounded-lg flex items-center justify-center"><p>Loading slider...</p></div>,
});

export default DynamicWorkSlider;
