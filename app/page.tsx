import Navbar from "./shared/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import LogoSection from "./components/logoshapes/LogoSection";

export default function Home() {
  return (
 <>
      <Navbar />
      <Hero />
      <LogoSection />
      <About />
    </>
  );
}
