
import { fetchArticles, fetchCategories } from "@/api-fetcher/fetcher";
import { DestacadoCard } from "./hero-home/destacado-card";
import { AuthorDate } from "../author-date";
import { Link } from "../optionals/link";
import { cleanSlug, formatDate, permalinkPost } from "@/lib/utils";
import Image from "next/image";
import { CategorySection } from "./hero-home/category-section";
import { Category, Page, Post, SiteSettings } from "@/types/types";
import { Breadcrumbs } from "./breadcrumbs";
import { DivAccent } from "../aside-items/div-accent";
import { Clock, Copy } from "lucide-react";

export async function HeroHomePage({ site_title, site_description }: SiteSettings) {
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

export function HeroPost({
    title,
    excerpt,
    primary_category,
    author_avatar,
    author_name,
    created_at,
    breadcrumbs,
    featured_image
}: Post) {

    const categorySlug =
        breadcrumbs.length === 4
            ? `/${cleanSlug(breadcrumbs[1].url)}/${cleanSlug(breadcrumbs[2].url)}`
            : `/${cleanSlug(breadcrumbs[1].url)}`


    return (
        <section className="w-full bg-white py-2">
            <div className="mx-auto w-[70vw] px-0">
                {/* Breadcrumbs */}

                <Breadcrumbs breadcrumbs={breadcrumbs} />

                {/* Categoría */}
                {primary_category?.name && (
                    <Link href={`/categories${categorySlug}`} className="inline-block rounded-full text-black text-3xl  uppercase tracking-widest underline font-extrabold">
                        {primary_category.name}
                    </Link>
                )}

                {/* Título */}
                <h1 className="mb-3 text-4xl text-start font-bold leading-tight text-gray-900 md:text-5xl">
                    {title}
                </h1>

                {excerpt && (
                    <>
                        <p className=" max-w-3xl text-lg text-gray-700">{excerpt}</p>
                    </>
                )}
                {/* Excerpt */}

                {/* Autor y fecha */}
                <div className="flex flex-col items-start md:items-start mb-3">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                                src={
                                    author_avatar ||
                                    `https://api.dicebear.com/7.x/lorelei/svg?seed=${author_name || "default"}`
                                }
                                alt={author_name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-lg text-gray-500">{author_name}</p>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-x-1 pl-2 mb-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-500">
                            {formatDate(created_at, {
                                includeTime: true,
                                uppercase: true,
                                withTimeZone: true
                            })}
                        </p>

                    </div>

                    <div className="flex space-x-4 justify-start items-center">
                        {/* Facebook */}
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Compartir en Facebook"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                        </a>
                        {/* X (Twitter) */}
                        <a
                            href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Compartir en X"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                        {/* Instagram (copia el enlace) */}
                        <button
                            type="button"
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Enlace copiado. Ahora puedes compartirlo en Instagram.');
                                }
                            }}
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Copiar enlace para Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
                        </button>
                        {/* Copiar enlace */}
                        <button
                            type="button"
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('¡Enlace copiado al portapapeles!');
                                }
                            }}
                            className="text-slate-800 hover:text-slate-600 transition-colors"
                            aria-label="Copiar enlace"
                        >
                            <Copy
                                className="size-5 " />
                        </button>
                    </div>
                </div>

                {/* Imagen destacada */}
                <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-lg md:h-[450px]">
                    <Image
                        src={featured_image || "https://imagenes.elpais.com/resizer/v2/H5RD3AOEDFACTM5YQLKCJTZ6TA.jpg?auth=5672d03482fe2f39ac03675dba3971044a0e73c753e2610fe3ec3bd1640aad5e&width=1200"} // reemplaza con tu imagen destacada real
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

export function HeroCategory({ name, description, breadcrumbs }: Category) {
    return (
        <section className="w-full bg-white pb-8 flex flex-col items-center justify-center">
            <div className=" mb-2 w-[70vw]">
                <Breadcrumbs className="text-xs text-slate-500" breadcrumbs={breadcrumbs} />
            </div>
            <div className="w-full max-w-3xl flex flex-col items-center justify-center pt-5">
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-4xl md:text-5xl font-serif font-extrabold uppercase tracking-widest text-center mb-2">
                        {name}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-700 text-center max-w-2xl mb-2">
                        {description}
                    </p>
                </div>
            </div>
            <DivAccent />
        </section>
    )
}

export function HeroPage({ title, meta_description, breadcrumbs }: Page) {
    return (
        <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
            <div className="w-custom flex w-full items-start justify-start">
                <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
            </div>
        </section>
    )
}