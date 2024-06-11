import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Container>
      <Header />
      <div className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Hola! I’m Carmen 👋
        </h1>
      </div>
      <Footer />
    </Container>
  );
}
