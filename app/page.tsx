import Hero from "@/app/Hero";

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* @ts-expect-error */}
      <Hero />
      {/* @ts-expect-error */}

      <Hero />
    </main>
  );
}
