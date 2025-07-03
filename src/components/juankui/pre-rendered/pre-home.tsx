import { HeroHomePage } from '@/components/juankui/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
//import { capitalize } from '@/utils/capitalize'
import { ReactNode } from 'react'
import { Section } from '../wrappers/section'
import { isParticles } from '@/config/options'
import { ParticlesFull } from '../particles'
import { SiteSettings } from '@/types/types'
//import { AsideList } from '../aside-items/aside-list'

interface HomePage {
  children: ReactNode
  settings: SiteSettings
}

export function PreHomePage ({ children, settings }: HomePage) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}

      <HeroHomePage {...settings} />
      <Section>

        {children}

      </Section>
    </MainWrapper>
  )
}