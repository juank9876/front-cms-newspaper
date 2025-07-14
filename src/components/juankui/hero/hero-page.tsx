import { Page } from "@/types/types"
import { Breadcrumbs } from "../breadcrumbs"

export function HeroPage({ title, meta_description, breadcrumbs }: Page) {
    return (
        <section className="itju-center mb-20 mt-5 flex w-full overflow-hidden bg-transparent">
            <div className="w-custom flex w-full items-start justify-start">
                <Breadcrumbs className="flex" breadcrumbs={breadcrumbs} />
            </div>
            <div className="h-20" />


            <div className="w-custom relative flex h-full flex-col items-center justify-center space-y-5">
                <h1 className="text-5xl">{title}</h1>
                <p className="text-2xl">{meta_description}</p>
            </div>
        </section>
    )
}