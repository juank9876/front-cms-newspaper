import { fetchArticles } from "@/api-fetcher/fetcher"
import { SiteSettings } from "@/types/types"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { AuthorDate } from "../author-date"
import { NewBadge } from "../new-badge"


export async function HeroHomePage({ meta_title, meta_description, site_title }: SiteSettings) {
    const articles = await fetchArticles()

    // Componentes internos para cada tipo de card
    function DestacadoCard({ article }: { article: any }) {
        return (
            <div className="flex flex-col gap-6 bg-white overflow-hidden shadow-none">
                {article.featured_image && (
                    <div className="relative w-full h-64 md:h-96">
                        <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
                <div className="flex flex-col justify-center w-full">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight text-start">{article.title}</h2>
                    <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                    <p className="text-base text-gray-700 line-clamp-4">{article.excerpt}</p>
                </div>
            </div>
        )
    }


    function ListaCard({ article }: { article: any }) {
        return (
            <div className="flex flex-col gap-3 w-full items-center py-2 border-b border-slate-100 last:border-b-0">
                {article.featured_image && (
                    <div className="relative w-64 h-64 flex-shrink-0">
                        <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="flex flex-col justify-center">
                    <h4 className="text-base font-semibold font-serif">{article.title}</h4>
                    <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />

                    {!article.featured_image && (
                        <p className="text-sm text-gray-500 line-clamp-4">{article.excerpt}</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <div className="w-full my-5 flex h-full flex-col items-center justify-center border-none p-0 shadow-none">
                <h1 className="text-center text-black font-serif lg:leading-normal">
                    {meta_title}
                </h1>
                <p className="hero-text-description text-center text-sm font-serif">{meta_description}</p>
            </div>

            {/* Layout de portada tipo El País: 3 columnas */}
            <div className="w-custom h-full flex flex-col md:flex-row pb-5 border-b border-slate-200 ">
                {/* Columna 1: Principal (2/3) */}
                <div className="w-full md:w-2/4 flex flex-col pr-6 border-r border-slate-200">
                    {articles[0] && <DestacadoCard article={articles[0]} />}
                </div>

                {/* Columna 2: Titulares secundarios (1/3) */}
                <div className="w-full md:w-1/4 flex flex-col flex-1 justify-between items-end h-full px-6 ">
                    {articles.slice(1, 4).map((article: any) => (
                        <div key={article.id} className="flex-1 py-3 border-b border-slate-200">
                            <h3 className="text-xl font-bold font-serif mb-1 leading-snug hover:underline cursor-pointer">{article.title}</h3>
                            <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                            <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                        </div>
                    ))}
                </div>

                {/* Columna 3: Noticia secundaria con imagen (como la de la derecha en la imagen) */}
                <div className="w-full md:w-1/4 flex flex-col gap-4 pl-6 border-l border-slate-200">
                    {articles[4] && (
                        <div className="flex flex-col gap-2 h-full justify-between">
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
                            <div className="flex flex-col">

                                <div className="flex flex-row">

                                    <h3 className="italic text-xl font-bold font-serif mb-1 leading-snug hover:underline cursor-pointer">
                                        <NewBadge />
                                        {articles[4].title}
                                    </h3>

                                </div>
                                <AuthorDate author={articles[4].author_name} date={formatDate(articles[4].created_at, { includeTime: false, uppercase: false })} />
                                <p className="text-sm text-gray-600 line-clamp-6">{articles[4].excerpt}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lista de artículos restantes */}
            <div className="w-custom grid grid-cols-4 gap-2">
                {articles.slice(5).map((article: any) => (
                    <ListaCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    )
}