"use client";

import dynamic from 'next/dynamic';

// Dynamically import ChatWidget with better error handling
const ChatWidget = dynamic(() => import('./ChatWidget').catch(() => ({ default: () => null })), {
    ssr: false,
    loading: () => null,
});

const ChatWidgetWrapper = () => {
    return <ChatWidget />;
};

export default ChatWidgetWrapper;
