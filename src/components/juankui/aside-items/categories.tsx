import { Category } from "@/types/types";
import { DivAccent } from "./div-accent";

export function Categories ({ categories, className }: { categories: Category[], className?: string }) {
  if (!categories || categories.length === 0) {
    return (
      <div className={`flex flex-col space-y-3 ${className}`}>
        <h2 className='text-2xl font-bold'>Categorias populares</h2>
        <DivAccent />
        <p className='text-muted-foreground'>No hay categorias disponibles.</p>
      </div>
    );
  }

  const sortedCategories = categories.sort(
    (a, b) => Number(b.post_count ?? 0) - Number(a.post_count ?? 0)
  );

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <h2 className='text-2xl font-bold'>Categorias populares</h2>
      <DivAccent />
      <ul className='flex flex-col gap-5'>
        {sortedCategories.map((category) => (
          <li key={category.id}>
            <a
              href={`/categories/${category.slug}/${category.slug}`}
              className="group relative flex w-full flex-col overflow-hidden rounded-md border border-[var(--color-accent-light)] transition-transform duration-300 hover:scale-105"
            >
              {/* Contenido textual */}
              <div className="flex flex-col p-3">
                <h4 className="line-clamp-2 text-base font-semibold">{category.name}</h4>
                <p className="text-muted-foreground mt-1 text-sm">{category.post_count} articulos</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}