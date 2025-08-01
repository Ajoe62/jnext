"use client";

import dynamic from 'next/dynamic';

// Dynamically import ChatWidget to reduce initial bundle
const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null
});

const ChatWidgetWrapper = () => {
  return <ChatWidget />;
};

export default ChatWidgetWrapper;
