
import { fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { normalizeUrl } from '@/lib/utils'
import { contextSiteSettings } from '@/app/context/getSiteSettings'
import { Logo } from './logo'
import { RenderMenu } from './nav/render-menu'
import { NavMobile } from './nav/nav-mobile'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Search, Bell, User, Globe } from 'lucide-react'
import Link from 'next/link'

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Main Header */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <NavMobile {...navProps} />
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex lg:items-center lg:space-x-8">
              <RenderMenu
                categoriesItems={categoriesItems}
                normalizedItems={normalizedItems}
              />
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <Search className="h-5 w-5 text-slate-600" />
                <span className="sr-only">Search</span>
              </button>

              {/* CTA Button */}
              <Link
                href="/subscribe"
                className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Banner (Optional) */}
      <div className="bg-red-600 text-white py-2 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center">
            <span className="bg-white text-red-600 px-2 py-1 text-xs font-bold rounded mr-3">
              LATEST NEWS
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-sm">
                  Breaking news: Stay informed with the latest updates from around the world.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
