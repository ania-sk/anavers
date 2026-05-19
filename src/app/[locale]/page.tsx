import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
