import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Import components
import Header from "@/components/Header";
import DynamicChatWidget from "@/components/DynamicChatWidget";
import { AnimationProvider } from "@/components/AnimationProvider";
import { PageTransition } from "@/components/PageTransition";
// import ClientOnly from "@/components/ClientOnly";
// import ErrorBoundary from "@/components/ErrorBoundary";
// import StairTransition from "@/components/StairTransition";

const geist = localFont({
  src: [
    {
      path: './fonts/GeistVF.woff',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = localFont({
  src: [
    {
      path: './fonts/GeistMonoVF.woff',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});

export const metadata = {
  title: "Joseph Akharume | Portfolio",
  description: "Software Engineer | Mobile & Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${jetbrainsMono.variable} bg-primary text-white`} suppressHydrationWarning={true}>
        <AnimationProvider>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <DynamicChatWidget />
        </AnimationProvider>
      </body>
    </html>
  );
}
