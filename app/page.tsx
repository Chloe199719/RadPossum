import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* <h1 className="text-8xl font-bold underline">test Page</h1> */}
      <Hero />
      <Hero />
    </main>
  );
}
