import Hero from "@/app/Hero";
import About from "./About";

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* @ts-expect-error */}
      <Hero />
      <About />
    </main>
  );
}
