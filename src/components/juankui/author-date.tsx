import { capitalize } from "@/utils/capitalize";

export function AuthorDate({ author, date }: { author: string, date: string }) {
    return (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <span className="text-gray-500 text-sm">{author.toUpperCase()}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{date}</span>
        </div>
    )
}