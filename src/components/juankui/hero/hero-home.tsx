import { fetchArticles, fetchCategories, fetchCategoryPosts } from "@/api-fetcher/fetcher"
import { Category, Post, SiteSettings } from "@/types/types"
import Image from "next/image"
import { formatDate, permalinkPost } from "@/lib/utils"
import { AuthorDate } from "../author-date"
import { NewBadge } from "../new-badge"
import { Link } from "../optionals/link"


export async function HeroHomePage({ site_title, site_description }: SiteSettings) {
    const articles = await fetchArticles();
    const categories = await fetchCategories();

    // Componentes internos para cada tipo de card
    async function DestacadoCard({ article }: { article: any }) {
        return (
            <Link href={await permalinkPost(article.id)} className="flex flex-col gap-6 bg-white overflow-hidden shadow-none">
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
            </Link>
        )
    }


    async function ListaCard({ article }: { article: any }) {
        return (

            <Link href={await permalinkPost(article.id)} className="flex flex-col w-full items-start justify-start py-2 border-r border-slate-200 pr-3 pl-3 first:pl-0 last:border-r-0">
                {article.featured_image && (
                    <div className="relative w-full h-64 flex mb-4">
                        <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="flex flex-col justify-center space-y-2">
                    <h4 className="text-xl font-semibold font-serif">{article.title}</h4>
                    <AuthorDate author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />

                    {!article.featured_image && (
                        <p className="text-sm text-gray-500 line-clamp-8">{article.excerpt}</p>
                    )}
                </div>
            </Link>
        )
    }

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
                <div className="w-full md:w-2/4 flex flex-col pr-6 border-r border-slate-200">
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
                        </Link>
                    )}
                </div>
            </div>

            {/* Lista de artículos restantes 
            <div className="w-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-t border-slate-200 pt-5">
                {articles.slice(5).map((article: any) => (
                    <ListaCard key={article.id} article={article} />
                ))}
            </div>
            */}
            {/* NUEVA SECCIÓN: Artículos por categoría */}
            <div>
                {categories.map(async (category: Category) => {
                    const categoryPosts = await fetchCategoryPosts(category.id)

                    if (Number(category.post_count) > 0) return (
                        <div key={category.id} className="border-t-8 border-slate-800 w-custom flex flex-col pt-10">
                            <h2 className="text-4xl font-extrabold font-serif text-start border-b-2 border-slate-800 pb-2">{category.name}</h2>
                            <div className="my-8 w-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
                                {categoryPosts.posts?.slice(0, 4).map((article: Post) => (
                                    <ListaCard key={article.id} article={article} />
                                ))}
                            </div>
                            <div className="flex flex-row gap-4 pb-10">
                                {categoryPosts.posts?.slice(5).map(async (article: Post) => (
                                    <Link href={await permalinkPost(article.id)} key={article.id} className="flex flex-row w-custom items-start justify-start py-2 border-t border-slate-200 pt-8 first:pl-0 last:border-r-0 gap-5">
                                        {article.featured_image && (
                                            <div className="relative w-96 h-64 flex ">
                                                <Image
                                                    src={article.featured_image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col w-2/3 mx-auto justify-between items-stretch h-3/3 py-5">
                                            <h4 className="text-4xl font-semibold text-center font-serif">{article.title}</h4>
                                            <div>
                                                <AuthorDate isTextCenter={true} author={article.author_name} date={formatDate(article.created_at, { includeTime: false, uppercase: false })} />
                                                <p className=" text-center text-base text-gray-600">{article.excerpt}</p>

                                            </div>

                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}