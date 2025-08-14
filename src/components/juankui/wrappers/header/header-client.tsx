
import { Logo } from './logo'
import { RenderMenu } from './render-menu'
import { NavMobile } from './nav-mobile'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { BreakingNews } from './breaking-news'
import { fetchAllSlugs } from '@/api-fetcher/fetcher';

export async function HeaderClient({ categoriesItems, settings, normalizedItems }: any) {
    const navProps = { categoriesItems, settings, normalizedItems };
    const allSlugs = await fetchAllSlugs("category");
    return (
        <header
            className={`
         sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200
        transition-transform duration-300
        
      `}
        >
            {/* Main Header */}
            <div className="bg-white">
                <div className="mx-auto w-[70vw]">
                    <div className="flex items-center justify-between h-fit">
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
                                allSlugs={allSlugs}
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
                                className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent  uppercase text-sm font-bold rounded-xs text-black bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] transition-colors"
                            >
                                Subscribe
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <BreakingNews />
        </header>
    )
}