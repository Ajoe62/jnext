"use client";
import dynamic from 'next/dynamic';

// Improved DynamicWorkSlider that properly passes props
const WorkSliderComponent = dynamic(() => import('./WorkSlider'), {
    ssr: false,
    loading: () => <div className="h-[520px] w-full bg-primary/10 rounded-lg flex items-center justify-center"><p>Loading slider...</p></div>,
});

const DynamicWorkSlider = ({ projects, onSlideChange }) => {
    return <WorkSliderComponent projects={projects} onSlideChange={onSlideChange} />;
};

export default DynamicWorkSlider;
