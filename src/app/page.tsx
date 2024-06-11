import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { getAboutData } from "@/lib/about";

export default function Home() {
  const { fullName, headline, shortBio } = getAboutData();
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {fullName}
          </h1>
          <div className="mt-1 ">{headline}</div>
          <div className="mt-6 space-y-7">
            {shortBio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
