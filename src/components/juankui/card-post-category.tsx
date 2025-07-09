import { Card, CardContent } from '@/components/ui/card'
import { ShineBorder } from '@/components/magicui/shine-border'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Link } from '@/components/juankui/optionals/link'
import { Category, Post } from '@/types/types'

export function CardPostCategory({ post, category }: { post: Post, category: Category }) {
  const categoryUrl = category.parent_id ? category.parent_slug + "/" + category.slug : category.slug
  return (
    <>
      {/*Card para PC*/}
      <Card className="duration-400 scale-custom relative hidden h-[420px] w-[300px] overflow-hidden border-none p-0 shadow-none transition lg:flex">
        <Link href={`/categories/${categoryUrl}/${post.slug}`} className="h-full w-full">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          <CardContent className="flex h-full flex-col items-center overflow-hidden rounded">
            {/* Imagen superior, más compacta */}
            <div className="relative h-[180px] w-[300px]">
              <Image
                src={
                  post.featured_image ||
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
                }
                alt={post.title}
                fill
                className="rounded-t-lg object-cover"
              />
            </div>

            {/* Contenido compacto */}
            <div className="flex flex-col items-start justify-between space-y-2 px-4 py-4">
              <h2 className="line-clamp-2 text-start text-lg font-semibold">{post.title}</h2>
              <p className="text-muted-foreground text-xs">{formatDate(post.published_at)}</p>
              <p className="text-muted-foreground line-clamp-3 text-sm">{post.excerpt}</p>

              <div className="flex flex-row items-center space-x-3 pt-2">
                <div className="size-8 relative overflow-hidden rounded-full">
                  <Image
                    src={
                      post.author_avatar ||
                      `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author_name || "default"}`
                    }
                    alt={post.id}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm">{post.author_name}</p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>


      {/*Card para movil*/}
      <Card className="duration-400 scale-custom relative w-full overflow-hidden border-none p-0 shadow-none transition hover:bg-[var(--color-primary-dark)] lg:hidden">
        <Link href={`/categories/${category.slug}/${post.slug}`} className="flex w-full">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

          {/* Imagen como background */}
          <div
            className="h-ful relative w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${post.featured_image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"})`,
            }}
          >
            {/* Overlay oscuro con filtro */}
            <div className="backdrop-blur-xs absolute inset-0 h-full bg-black/70"></div>

            {/* Contenido centrado */}
            <CardContent className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{post.title}</h2>
                <p className="text-sm text-white opacity-80">{formatDate(post.published_at)}</p>
                <p className="text-base text-white opacity-90">{post.excerpt}</p>
              </div>

              {/* Autor */}
              <div className="flex flex-row items-center space-x-3">
                <div className="size-10 relative mb-0 overflow-hidden rounded-full">
                  <Image
                    src={
                      post.author_avatar ||
                      `https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author_name || "default"}`
                    }
                    alt={post.id}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-white">{post.author_name}</p>
              </div>
            </CardContent>
          </div>
        </Link>
      </Card>

    </>
  )
}