"use client";

import { AnimationProvider } from "@/components/AnimationProvider";
import { PageTransition } from "@/components/PageTransition";
import Header from "@/components/Header";
import DynamicChatWidget from "@/components/DynamicChatWidget";

export default function ClientLayout({ children }) {
    return (
        <AnimationProvider>
            <Header />
            <PageTransition>
                {children}
            </PageTransition>
            <DynamicChatWidget />
        </AnimationProvider>
    );
}
