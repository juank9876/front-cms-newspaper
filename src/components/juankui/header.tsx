
//import menu from '@/lib/menu.json'
import { NavigationMenu } from '../ui/navigation-menu'
import { fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { normalizeUrl } from '@/lib/utils'

import { contextSiteSettings } from '@/app/context/getSiteSettings'
import { Logo } from './logo'
import { RenderMenu } from './nav/render-menu'
import { NavMobile } from './nav/nav-mobile'


export async function Header() {
  const rawNavItems = await fetchMenu()
  const navItems = rawNavItems.filter(item => item.status === 'active')
  const sortedItems = navItems.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))

  const normalizedItems = sortedItems.map(item => ({
    ...item,
    url: normalizeUrl(item.url)
  }))
  const categoriesItems = await fetchCategories()
  const settings = await contextSiteSettings()

  const navProps = { categoriesItems, settings, normalizedItems }
  return (
    <>
      <header className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-white p-3 lg:p-0">
        <div className='grid w-full grid-cols-3 items-center justify-center px-5'>
          <NavMobile {...navProps} />

          <div className="top-0 flex h-full w-full flex-row items-center justify-center lg:mt-8 lg:flex-col lg:justify-start">
            <Logo
              {...settings}
            />
          </div>
        </div>
        <NavigationMenu className='hidden lg:flex'>
          <RenderMenu
            categoriesItems={categoriesItems}
            normalizedItems={normalizedItems}
          />
        </NavigationMenu>

        <div />
      </header>
      <div className='hidden w-full border border-[var(--color-accent-dark)] lg:flex' />
    </>
  )
}
