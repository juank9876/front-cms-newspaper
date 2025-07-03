import { HeroPost } from '@/components/juankui/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { Post } from '@/types/types'
import { ReactNode } from 'react'
import { ParticlesFull } from '../particles'
import { isParticles } from '@/config/options'
import { Section } from '../wrappers/section'

export async function PrePost ({ children, post }: { children: ReactNode, post: Post }) {


  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      <HeroPost {...post} />

      <Section>
        {children}
      </Section>
    </MainWrapper>
  )
}