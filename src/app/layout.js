import "./globals.css";
import Header from "@/components/Genric/Header/Header";
import Footer from "@/components/Genric/Footer/Footer";
import FloatingClaimButton from "@/components/Genric/FloatingClaimButton/FloatingClaimButton";
import Script from "next/script";

export const metadata = {
  title: "Medibank",
  description: "Centralised EHR ",
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
        <Header/>
          {children}
        <FloatingClaimButton />
        <Footer/>
        </body>
    </html>
  );
}
