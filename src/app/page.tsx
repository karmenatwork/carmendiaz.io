import Link from "next/link";

import { Container } from "@/components/Container";
import { Card } from '@/components/Card'
import { LinkedInIcon } from '@/components/SocialIcons'
import { WorkExperience } from '@/components/WorkExperience'
// import { ImageGallery } from "@/components/ImageGallery"; # Static image Gallery.
import Carousel from '@/components/Carousel'; // Adjust path if needed

import { type GistWithSlug, getAllGists } from "@/lib/gists";
import { formatDate } from '@/lib/formatDate'
import { getAboutData } from "@/lib/about";

import goldenGate from '@/images/home/carmen-golden-gate.jpg'
import hiking from '@/images/home/carmen-hiking.jpg'
import carmenPiano from '@/images/home/carmen-piano.jpg'
import healthyMeal from '@/images/home/healthy-meal.jpg'
import carmenAsuncion from '@/images/home/carmen-asuncion.jpg'

const imageList = [
  { src: carmenPiano, alt: 'Carmen playing the piano' },
  { src: healthyMeal, alt: 'Carmen eating a healthy meal' },
  { src: goldenGate, alt: 'Carmen at the Golden Gate Bridge' },
  { src: hiking, alt: 'Carmen hiking' },
  { src: carmenAsuncion, alt: 'Carmen in Asuncion' },
]


function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Gist({ gist }: { gist: GistWithSlug }) {
  const date =
    gist.updated && gist.updated !== gist.created ? gist.updated : gist.created
  return (
    <Card as="article">
      <Card.Title href={`/gists/${gist.slug}`}>
        {gist.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={date} decorate>
        {formatDate(date)}
      </Card.Eyebrow>
      <Card.Description>{gist.description}</Card.Description>
      <Card.Cta>Check gist</Card.Cta>
    </Card>
  )
}

export default async function Home() {
  const { fullName, headline, shortBio, shortBioI } = getAboutData();
  const gists = (await getAllGists()).slice(0,4);
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {fullName}
          </h1>
          <div className="mt-1">{headline}</div>
          <div className="mt-6 space-y-7">
            {shortBioI.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 flex gap-6">
            {/* <SocialLink href="#" aria-label="Follow on X" icon={XIcon} /> */}
            {/* <SocialLink
              href="#"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            /> */}
            <SocialLink
              href="https://www.linkedin.com/in/carmen-diaz/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      {/* <ImageGallery images={imageList} /> */}

      <div className="container mx-auto mt-16 sm:mt-20">
        {/* <div className="mx-auto max-w-5xl"> */}
        <Carousel
          images={imageList}
          imagesPerView={3}
          enableRotation={true} // Rotation disabled
          autoPlay={true}
          showControls={true}
          showIndicators={true}
          // imageContainerClassName="aspect-video w-full" // For a 16:9 video aspect ratio
          // imageContainerClassName = 'aspect-[9/10]'
          gapBetweenImages="gap-10"
        />
        {/* </div> */}
      </div>
      <Container className="md:mt-18 mt-14">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {gists.map((gist) => (
              <Gist key={gist.slug} gist={gist} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <WorkExperience />
          </div>
        </div>
      </Container>
    </>
  )
}
