import { HeroPost } from '@/components/juankui/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { Post } from '@/types/types'
import { ReactNode } from 'react'
import { ParticlesFull } from '../particles'
import { isParticles } from '@/config/options'
import { RecentArticles } from '../aside-items/recent-articles'
import { SocialShare } from '../aside-items/social-share'
import { fetchArticles, fetchCategories } from '@/api-fetcher/fetcher'
import { Categories } from '../aside-items/categories'

export async function PrePost ({ children, post }: { children: ReactNode, post: Post }) {
  const recentArticles = await fetchArticles()
  const categories = await fetchCategories()

  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      <HeroPost {...post} />

      <article className={`space gap-15 flex w-[90vw] flex-col items-start justify-center space-y-5 rounded-lg lg:w-[60vw] lg:flex-row`}>

        {/* Contenido principal: el post en cuestion */}
        <div className='flex w-full flex-col space-y-5 lg:flex-[0.7]'>
          {children}
        </div>

        {/* Contenido no principal: articulos, redes sociales, etc */}
        <aside className='space-y-16 lg:flex-[0.3]' >
          <RecentArticles articles={recentArticles || []} />
          <SocialShare />
          <Categories categories={categories} />
        </aside>
      </article>
    </MainWrapper>
  )
}