
//import menu from '@/lib/menu.json'
import { capitalize } from '@/utils/capitalize'
import { NavigationMenu } from '../ui/navigation-menu'
import { fetchCategories, fetchMenu } from '@/api-fetcher/fetcher'
import { normalizeUrl } from '@/lib/utils'
import { Link } from './optionals/link'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import { Fragment } from 'react'
import { contextSiteSettings } from '@/app/context/getSiteSettings'
import { Logo } from './logo'
import { RenderMenu } from './nav/render-menu'


export async function Header () {
  const rawNavItems = await fetchMenu()
  const navItems = rawNavItems.filter(item => item.status === 'active')
  const sortedItems = navItems.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))

  const normalizedItems = sortedItems.map(item => ({
    ...item,
    url: normalizeUrl(item.url)
  }))

  const categoriesItems = await fetchCategories()

  const settings = await contextSiteSettings()
  return (
    <>
      <header className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-white p-3 lg:p-0">
        <div className='grid w-full grid-cols-3 items-center justify-center px-5'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="size-12 text-[var(--color-primary-dark)]" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto py-5 pl-2">
              <SheetTitle>{settings.site_title}</SheetTitle>
              <div className="border bg-[var(--color-accent)]" />

              <div className="grid gap-6 px-5">
                {normalizedItems.map((item, index) => (
                  <Fragment key={index}>
                    {item.title == "categories" || item.title == "Categories" ? (
                      <>
                        <Link
                          href={item.url}
                          className="mb-0 pb-0 text-sm font-bold"
                        >
                          {item.title}
                        </Link >

                        <ul className="space-y-3">
                          {categoriesItems.map((category) => (
                            <li key={category.id}>
                              <a key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`}>
                                • {category.description}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <Link
                          href={item.url}
                          className="text-sm font-bold"
                        >
                          {item.title}
                        </Link >

                        {
                          item.children?.map((child, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                              <Link href={child.url}>
                                • {child.title}
                              </Link>
                            </div>
                          ))
                        }
                      </>
                    )}
                  </Fragment>
                ))}

                <div className='flex flex-col space-y-3'>
                  <Link
                    href={'/categories'}
                    className="text-sm font-bold"
                  >
                    Categories
                  </Link>
                  <ul className="space-y-3">
                    {categoriesItems.map((category) => (
                      <li key={category.id}>
                        <a key={category.id} title={capitalize(category.name)} href={`/categories/${category.slug}`}>
                          • {category.name}
                        </a>
                      </li>
                    ))}

                  </ul>
                </div>

              </div>
            </SheetContent>
          </Sheet>

          <div className="top-0 flex h-full w-full flex-row items-center justify-center lg:mt-8 lg:flex-col lg:justify-start">
            <Logo
              {...settings}
            />
          </div>
          <div />
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
