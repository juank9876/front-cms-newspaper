'use client'

import { navPosition } from '@/config/options'
//import menu from '@/lib/menu.json'
import { capitalize } from '@/utils/capitalize'
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Link } from '../optionals/link';
import { Fragment, useState } from 'react';
import { Category, NavItemType } from '@/types/types';
import { ArrowRight } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

type ListItemProps = {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string
  isChild?: boolean
  childCategories?: Category[]
  parentSlug?: string
}

function ListItem({ title, href, children, className, isChild = false, childCategories, parentSlug }: ListItemProps) {
  const hasSubcategories = childCategories && childCategories.length > 0;
  return (
    <li className={hasSubcategories ? 'group relative' : ''}>
      <NavigationMenuLink asChild>
        <Link
          href={parentSlug ? `/categories/${parentSlug}/${href}` : '/categories/' + href}
          className={`flex items-start px-4 py-2 text-base font-bold uppercase tracking-wide text-slate-900 hover:text-red-600 hover:underline hover:underline-offset-8 transition-colors duration-150 ${isChild ? 'pl-8 text-sm' : ''}`}
        >
          {title}
          {hasSubcategories && (
            <ChevronRight className="text-black ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          )}
        </Link>
      </NavigationMenuLink>
      {/* Aquí podrías renderizar el submenú lateral si lo deseas */}
    </li>
  )
}

// ... existing code ...
export function RenderMenu({ normalizedItems, categoriesItems }: { normalizedItems: NavItemType[], categoriesItems: Category[] }) {
  const [isCategories, setIsCategories] = useState(false)

  return (
    <nav>
      <ul className="flex flex-row gap-2 items-center justify-center w-full bg-white border-0 shadow-none py-0">
        {normalizedItems.map((item) => (
          <li key={item.id} className="relative group">
            {item.children && item.children.length > 0 ? (
              <>
                <span className="flex items-center gap-1 px-4 py-2 text-base font-bold uppercase tracking-wide text-slate-900 hover:text-red-600 hover:underline hover:underline-offset-8 cursor-pointer">
                  {capitalize(item.title)}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </span>
                <div className="absolute left-0 top-full min-w-[180px] bg-white border border-slate-200 z-20 hidden group-hover:block">
                  <ul className="py-0">
                    {item.children.map((child) => (
                      <ListItem key={child.id} title={capitalize(child.title)} href={`/${child.url}`} />
                    ))}
                  </ul>
                </div>
              </>
            ) : item.title == "categories" || item.title == "Categories" ? (
              (() => {
                if (!isCategories) setIsCategories(true);
                return (
                  <>
                    <span className="flex items-center gap-1 px-4 py-2 text-base font-bold uppercase tracking-wide text-slate-900 hover:text-red-600 hover:underline hover:underline-offset-8 cursor-pointer">
                      {item.title.toUpperCase()}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </span>
                    <div className="absolute left-0 top-full min-w-[180px] bg-white border border-slate-200 z-20 hidden group-hover:block">
                      <ul className="py-0">
                        {categoriesItems.map((category) => (
                          <ListItem key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`} />
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()
            ) : (
              <Link
                href={`${item.url}`}
                className="px-4 py-2 text-base font-bold uppercase tracking-wide text-slate-900 hover:text-red-600 hover:underline hover:underline-offset-8 transition-colors duration-150"
              >
                {(item.title).toUpperCase()}
              </Link>
            )}
          </li>
        ))}
        {
          !isCategories && (
            <li className="relative group">
              <span className="flex items-center gap-1 px-4 py-2 text-base font-bold uppercase tracking-wide text-slate-900 hover:text-red-600 hover:underline hover:underline-offset-8 cursor-pointer">
                CATEGORIES
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </span>
              <div className="absolute left-0 pr-5 top-full w-fit bg-white border border-slate-200 z-20 hidden group-hover:block">
                <ul className="py-0">
                  {categoriesItems.map((category) => (
                    <ListItem
                      key={category.id}
                      title={capitalize(category.name)}
                      href={`${category.slug}`}
                      parentSlug={category.parent_slug!}
                    />
                  ))}
                </ul>
              </div>
            </li>
          )
        }
      </ul>
    </nav>
  )
}
// ... existing code ...