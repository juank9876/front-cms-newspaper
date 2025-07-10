import { formatDate } from "@/lib/utils";
import { Post } from "@/types/types";
import Image from "next/image";
import { DivAccent } from "./div-accent";
import { Link } from "../optionals/link";
import { fetchCategoryById } from "@/api-fetcher/fetcher";

export function RecentArticles({ articles, className }: { articles: Post[], className?: string }) {
  if (!articles || articles.length === 0) {
    return null; // No hay artículos recientes
  }
  const category = fetchCategoryById(articles[2].category_id)
  const sortedArticles = articles
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)


  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <h2 className='text-2xl font-bold'>Articulos recientes</h2>
      <DivAccent />
      <ul className='flex flex-col gap-1'>
        {sortedArticles.map((article, index) => {

          const url =
            article.breadcrumbs.length === 4 ?
              `/categories${article.breadcrumbs[1].url}${article.breadcrumbs[3].url.slice(1)}` :
              article.breadcrumbs.length === 2 ?
                `/categories${article.breadcrumbs[1].url}`
                : `/categories${article.breadcrumbs[2].url}`

          return (
            <li key={article.id || index}>
              <Link
                href={`${url}` || `/categories/single/${article.slug}`}
                className="group flex w-full items-center gap-4 py-3 px-1 hover:bg-slate-50 overflow-hidden flex-row md:flex-row"
              >
                {/* Contenedor de imagen */}
                {article.featured_image && (
                  <div className="relative min-w-[90px] min-h-[60px] w-[90px] h-[60px] md:w-[110px] md:h-[70px] overflow-hidden">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {/* Contenido textual */}
                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <h4 className="line-clamp-2 text-base md:text-lg font-bold text-slate-900 group-hover:underline group-hover:decoration-[var(--color-black,red)] group-hover:decoration-2 font-sans text-left">{article.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(article.created_at)}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}