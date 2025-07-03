import { formatDate } from "@/lib/utils";
import { Post } from "@/types/types";
import Image from "next/image";
import { DivAccent } from "./div-accent";
import { Link } from "../optionals/link";

export function RecentArticles ({ articles, className }: { articles: Post[], className?: string }) {
  const sortedArticles = articles
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <h2 className='text-2xl font-bold'>Articulos recientes</h2>
      <DivAccent />
      <ul className='flex flex-col gap-5'>
        {sortedArticles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/categories/${article.primary_category.slug}/${article.slug}`}
              className="group relative flex w-full flex-col overflow-hidden rounded-md border border-[var(--color-accent-light)] transition-transform duration-300 hover:scale-105"
            >
              {/* Contenedor de imagen */}
              <div className="relative h-[180px] w-full">
                <Image
                  src={article.featured_image || '/default-image.png'}
                  alt={article.title}
                  fill
                  className="duration-400 object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Contenido textual */}
              <div className="flex flex-col p-3">
                <h4 className="line-clamp-2 text-base font-semibold">{article.title}</h4>
                <p className="text-muted-foreground mt-1 text-sm">{formatDate(article.created_at)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}