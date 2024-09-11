import Image, { type ImageProps } from 'next/image'
import { BriefcaseIcon, ArrowDownIcon } from './CustomIcons'

import { Button } from './Button'
import { Role } from './Role'

import logoCarmen from '@/images/logos/carmen.png'
import logoEngenium from '@/images/logos/engenium.png'
import logoMHC from '@/images/logos/mobile_health_consumer.jpeg'
import logoHomebase from '@/images/logos/homebase.jpeg'
// import logo from '@/images/carmen.png'
// import logo from '../../public/logos/carmen.png'

import { type RoleData } from '@/types'

export function WorkExperience() {
  let resume: Array<RoleData> = [
    {
      company: 'CDE Consulting ',
      title: 'Mentor - Software Engineer',
      logo: logoCarmen,
      start: '2020',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Engenium Technologies',
      title: 'Software Engineer Principal',
      logo: logoEngenium,
      start: '2023',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Mobile Health Consumer',
      title: 'Solutions Engineer',
      logo: logoMHC,
      start: '2022',
      end: '2023',
    },
    {
      company: 'Homebase',
      title: 'Delivery Lead - Software Engineer',
      logo: logoHomebase,
      start: '2018',
      end: '2020',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download Resume
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}


