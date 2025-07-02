import { ReactNode } from "react";
import { ParticlesFull } from "../particles";
import { isParticles } from "@/config/options";

interface SectionProps {
  children: ReactNode,
  title?: string,
  description?: string,
  gradientBackground?: 'bg-gradient-middle' | 'bg-gradient-top' | 'bg-gradient-bottom' | ''
  className?: string
}

export function Section ({ children, className }: SectionProps) {
  return (
    <section className={`${className} relative flex w-full items-center justify-center`}>
      {isParticles && <ParticlesFull />}

      <article className={`flex w-[90vw] flex-col items-center justify-center space-y-5 rounded-lg lg:w-[60vw]`}>
        {children}
      </article>

    </section>
  )
}