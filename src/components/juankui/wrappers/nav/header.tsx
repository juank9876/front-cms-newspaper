//import menu from '@/lib/menu.json'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { fetchAllSlugs, fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { normalizeUrl } from '@/lib/utils'
import { contextSiteSettings } from '@/app/context/getSiteSettings'

import { NavMobile } from './nav-mobile'
import { RenderMenu } from './render-menu'
import { Logo } from './logo'


export async function Header() {
  const rawNavItems = await fetchMenu()
  const navItems = rawNavItems.filter(item => item.status === 'active')
  const sortedItems = navItems.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
  const allSlugs = await fetchAllSlugs("category")

  const normalizedItems = sortedItems.map(item => ({
    ...item,
    url: normalizeUrl(item.url)
  }))

  const categoriesItems = await fetchCategories()
  const settings = await contextSiteSettings()

  const navProps = { categoriesItems, settings, normalizedItems }
  return (
    <>
      <header className="sticky top-0 z-50 flex w-full flex-row items-center justify-center bg-[var(--color-primary-dark)] px-5 py-3">
        <div className="w-custom mx-auto flex h-full flex-row items-center justify-between">
          <Logo

          />

          <div className='hidden lg:flex'>
            <RenderMenu
              categoriesItems={categoriesItems}
              normalizedItems={normalizedItems}
              allSlugs={allSlugs}
            />
          </div>
        </div>

        {/* VERSION MOVIL */}
        <NavMobile {...navProps} />
      </header>
    </>
  )
}
