import { fetchArticles, fetchCategories } from "@/api-fetcher/fetcher"
import { SiteSettings, Category, Post } from "@/types/types"
import { DestacadoCard } from "./destacado-card"
import { ListaCard } from "./lista-card"
import { CategorySection } from "./category-section"
import { AuthorDate } from "../../author-date"
import { NewBadge } from "../../badges/new-badge"
import { Link } from "../../optionals/link"
import { formatDate, permalinkPost } from "@/lib/utils"
import Image from "next/image"
import { BarraInformativa } from "./barra-informativa"


export async function HeroHome({ site_title, site_description }: SiteSettings) {
    const articles = await fetchArticles();
    const categories = await fetchCategories();

    return (
        <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <div className="w-custom my-10 pb-5 flex h-full flex-col items-center justify-center border-b border-slate-800">
                <h1 className="text-center text-black font-serif">
                    {site_title}
                </h1>
                <p className="hero-text-description text-center text-sm font-serif">{site_description}</p>
            </div>

            {/* Layout de portada tipo El País: 3 columnas */}
            <div className="w-custom h-full flex flex-col md:flex-row pb-5  ">
                {/* Columna 1: Principal (2/3) */}
                <div className="w-full md:w-2/4 flex flex-col pr-6 border-r border-slate-200 ">
                    {articles[0] && <DestacadoCard article={articles[0]} />}
                </div>

                {/* Columna 2: Titulares secundarios (1/3) */}
                <div className="w-full md:w-1/4 flex flex-col flex-1 justify-between items-end h-full px-6 ">
                    {articles.slice(1, 4).map(async (article: Post) => (
                        <Link href={await permalinkPost(article.id)} key={article.id} className="flex-1 py-3 border-b border-slate-200">
                            <h3 className="text-xl font-bold font-serif mb-1 leading-snug hover:underline cursor-pointer">{article.title}</h3>
                            <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                            <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                        </Link>
                    ))}
                </div>

                {/* Columna 3: Noticia secundaria con imagen (como la de la derecha en la imagen) */}
                <div className="w-full md:w-1/4 flex flex-col gap-4 pl-6 border-l border-slate-200">
                    {articles[4] && (
                        <Link href={await permalinkPost(articles[4].id)} className="flex flex-col gap-2 h-full justify-between">
                            {articles[4].featured_image && (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={articles[4].featured_image}
                                        alt={articles[4].title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col text-start">
                                <div className="flex flex-row">
                                    <h3 className="italic text-xl font-bold font-serif mb-1 leading-snug hover:underline cursor-pointer">
                                        {articles[4].title}
                                    </h3>
                                </div>
                                <AuthorDate author={articles[4].author_name} date={formatDate(articles[4].created_at, { includeTime: false, uppercase: false })} />
                                <p className="text-sm text-gray-600 line-clamp-6">{articles[4].excerpt}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            {/* NUEVA SECCIÓN: Artículos por categoría */}
            <div>
                {categories.map((category: Category) => (
                    <CategorySection key={category.id} category={category} />
                ))}
            </div>
        </section>
    )
} 