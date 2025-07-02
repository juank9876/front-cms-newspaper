import { capitalize } from '@/utils/capitalize'
import { fetchCategoryById } from '@/api-fetcher/fetcher'
import { PreCategory } from '@/components/juankui/pre-rendered/pre-category'
//import categoryTest from '@/lib/category-test.json'
import { getCategorySlugToIdMap } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { CardPostCategory } from '@/components/juankui/card-post-category'


async function getCategoryFromParams ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const map = await getCategorySlugToIdMap()
  const { slug } = await params
  const id = map[slug]

  if (!id) return notFound()

  const category = await fetchCategoryById(id)
  return category
}

export async function generateMetadata ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const category = await getCategoryFromParams({ params })

    return {
      title: capitalize(category.name || ''),
      description: capitalize(category.description || ''),
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    notFound()
  }
}

export default async function CategoryPage ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const category = await getCategoryFromParams({ params })
    const posts = category.posts

    if (!posts || posts.length === 0) {
      return (
        <PreCategory category={category} className='flex h-full flex-col items-center justify-center'>
          <span className="text-muted rounded-lg bg-[var(--color-accent)] px-5 py-10 text-xl italic">Oops! No posts available in this category.</span>
        </PreCategory>
      )
    }
    return (
      <PreCategory category={category} className='flex w-full flex-wrap items-center justify-center space-y-5 lg:space-x-5'>
        {posts?.map((post) => (
          <CardPostCategory key={post.id} post={post} category={category} />
        ))}
      </PreCategory>
    )
  } catch (error) {
    console.log('Error fetching category:', error)
    notFound()
  }
}
