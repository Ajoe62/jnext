import { JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import ClientOnly from "@/components/ClientOnly";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});

export const metadata = {
  title: "Create Next App",
  description: "Create Next App with Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="grammarly-disable-indicator" content="true" />
        <meta name="grammarly-disable" content="true" />
        <link
          rel="preload"
          as="image"
          href="/assets/optimized/photo.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={jetbrainsMono.variable} suppressHydrationWarning={true}>
        <Header />
        <ClientOnly>
          <StairTransition />
          <PageTransition>{children}</PageTransition>
          <ChatWidgetWrapper />
        </ClientOnly>
      </body>
    </html>
  );
}
