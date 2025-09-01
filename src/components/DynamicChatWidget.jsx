"use client";

import dynamic from 'next/dynamic';

const ChatWidgetWrapper = dynamic(() => import('@/components/ChatWidgetWrapper'), {
  ssr: false,
  loading: () => null, // Optional: you can add a loading skeleton here
});

const DynamicChatWidget = () => {
  return <ChatWidgetWrapper />;
};

export default DynamicChatWidget;
