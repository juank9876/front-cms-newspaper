import { ReactNode } from "react";
import { ParticlesFull } from "../particles";
import { isParticles } from "@/config/options";
import { AsideList } from "../aside-items/aside-list";

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

      <article className={`space gap-15 flex w-[90vw] flex-col items-start justify-center space-y-5 rounded-lg lg:w-[60vw] lg:flex-row`}>
        <div className='flex w-full flex-col space-y-5 lg:flex-[0.7]'>
          {children}
        </div>
        <AsideList />
      </article>

    </section>
  )
}