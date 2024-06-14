import { type Metadata } from "next";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { type GistWithSlug, getAllGists } from "@/lib/gists";
import { formatDate } from "@/lib/formatDate";

function Gist({ gist }: { gist: GistWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/gists/${gist.slug}`}>
          {gist.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={gist.date}
          className="md:hidden"
          decorate
        >
          {formatDate(gist.date)}
        </Card.Eyebrow>
        <Card.Description>{gist.description}</Card.Description>
        <Card.Cta>Read gist</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={gist.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(gist.date)}
      </Card.Eyebrow>
    </article>
  );
}

export const metadata: Metadata = {
  title: "Gists",
  description:
    "All of my notes on programming, cheat sheets, and more, collected in chronological order.",
};

export default async function GistsIndex() {
  let gists = await getAllGists();

  return (
    <SimpleLayout
      title="Gists: { Coding land }"
      intro="All of my notes on programming, cheat sheets, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {gists.map((gist) => (
            <Gist key={gist.slug} gist={gist} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
