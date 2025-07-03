import { Star } from "lucide-react"
import { BoxReveal } from "../magicui/box-reveal"
import { VideoHero } from "./optionals/video-hero"
import Image from "next/image"
import { Post, Page, SiteSettings, Category } from '@/types/types'
import { formatDate } from "@/lib/utils"
import { BorderBeam } from "../magicui/border-beam"
import { Card, CardContent } from "../ui/card"
import { MagicCard } from "../magicui/magic-card"
import { Breadcrumbs } from "./breadcrumbs"



export function HeroHomePage ({ meta_title, meta_description, site_title }: SiteSettings) {

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <VideoHero />
      <Card className="w-custom my-5 flex h-full flex-col items-center justify-center border-none bg-transparent p-0 shadow-none">
        <MagicCard className="m-0 w-full p-0">
          <CardContent className="flex flex-col items-center justify-center space-y-5 p-10">
            <div className="flex flex-row items-center justify-center rounded-md border bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary)] px-5 opacity-90">
              <Star size={18} className="mr-2 inline text-[var(--color-primary-light)]" /> <p className="text-md bg-gradient-to-t from-[var(--color-primary-light)] to-white bg-clip-text font-bold text-transparent">{site_title}</p>
            </div>
            <BoxReveal duration={0.5}>
              <h1 className="bg-gradient-to-r from-[var(--color-accent-dark)] to-[var(--color-primary-dark)] bg-clip-text text-center text-transparent lg:leading-normal">
                {meta_title}
              </h1>
            </BoxReveal>
            <BoxReveal duration={0.6}>
              <p className="hero-text-description text-center">{meta_description}</p>
            </BoxReveal>
            <BorderBeam />
          </CardContent>
        </MagicCard>
      </Card>
    </section>
  )
}

export function HeroPage ({ title, meta_description, breadcrumbs }: Page) {
  return (
    <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
      <div className="w-custom flex w-full items-start justify-start">
        <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
      </div>
      <div className="h-20" />


      <div className="w-custom relative flex h-full flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-2xl">{meta_description}</p>
      </div>
    </section>
  )
}

export function HeroPost ({ title, excerpt, primary_category, author_avatar, author_name, created_at, breadcrumbs }: Post) {
  return (
    <>
      <section className="itju-center mb-10 mt-5 flex w-full overflow-hidden">
        <div className="w-custom mb-10 flex w-full items-start justify-start">
          <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
        </div>

        <Card className="w-custom bg-[var(--color-accent]) relative flex h-fit flex-row items-center justify-center border-2 bg-[var(--color-primary)] p-0">
          <MagicCard className="m-0 w-full p-0">
            <CardContent className="flex flex-col items-center justify-center space-y-5 bg-gradient-to-br from-neutral-200 to-white p-8">

              {
                primary_category?.name && (
                  <div className="flex w-max flex-row items-center justify-between space-x-3 rounded-full border border-[var(--color-primary)] bg-[var(--color-primary-dark)] px-3 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)]">
                    <p className="text-zinc-200">{primary_category.name}</p>

                  </div>
                )
              }
              <BoxReveal duration={0.5}>
                <h1 className="z-10 h-full whitespace-pre-wrap text-center leading-normal tracking-tighter text-black">
                  {title}
                </h1>
              </BoxReveal>
              <BoxReveal duration={0.7}>
                <p>{excerpt}</p>
              </BoxReveal>

              <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">

                <div className="group-badge group mb-0 flex w-max flex-row items-center justify-between space-x-2 rounded-full border border-[var(--color-accent)] bg-gradient-to-br from-[var(--color-accent-dark)] to-[var(--color-primary-dark)] pl-2 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)] lg:space-x-3">
                  <div className="size-7 lg:size-10 relative mb-0 overflow-hidden rounded-full">
                    <Image
                      src={
                        author_avatar ||
                        `https://api.dicebear.com/7.x/lorelei/svg?seed=${author_name || "default"}`
                      }
                      alt={`Image of ${author_name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-zinc-200 [.group-badge:hover_&]:text-white">{author_name}</p>
                </div>

                <div className="flex w-max flex-row items-center justify-between space-x-3 rounded-full border border-[var(--color-accent)] bg-gradient-to-bl from-[var(--color-accent-dark)] to-[var(--color-primary-dark)] px-3 pr-3 transition duration-500 hover:border-[var(--color-primary)] hover:to-[var(--color-primary-semi-dark)]">
                  <p className="text-zinc-200">{formatDate(created_at)}</p>
                </div>
              </div>

            </CardContent>
            <BorderBeam />
          </MagicCard>
        </Card>
      </section>
    </>
  )
}

export function HeroCategory ({ name, description, breadcrumbs }: Category) {
  return (
    <>
      <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden">
        <div className="w-custom flex w-full items-start justify-start">
          <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
        </div>
        <Card className="bg-[var(--color-accent]) w-custom relative flex h-fit flex-col items-center justify-center p-0">
          <MagicCard className="m-0 w-full p-0">
            <CardContent className="flex flex-col items-center justify-center p-10">
              <BoxReveal duration={0.5}>
                <h1 className="z-10 h-full text-center font-bold leading-normal">
                  {name}
                </h1>
              </BoxReveal>
              <BoxReveal duration={0.7}>
                <p className="text-center text-2xl">{description}</p>
              </BoxReveal>
            </CardContent>
          </MagicCard>
        </Card>
      </section>
    </>
  )
}