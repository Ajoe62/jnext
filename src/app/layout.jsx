import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import ClientOnly from "@/components/ClientOnly";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import DynamicChatWidget from "@/components/DynamicChatWidget";



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
  title: 'JNext',
  description: 'App layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${geist.variable} ${geistMono.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning={true}>
        <Header />
        <ClientOnly>
          <StairTransition />
          <PageTransition>{children}</PageTransition>
          <DynamicChatWidget />
        </ClientOnly>
      </body>
    </html>
  );
}
