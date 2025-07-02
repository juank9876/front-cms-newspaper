import { SiteSettings } from "@/types/types";
import Image from "next/image";
import { Link } from "./optionals/link";


export function Logo ({ site_title, site_logo }: SiteSettings) {
  return (
    <Link href="/" className="relative mb-0 flex items-start justify-end pb-0">
      <Image
        alt={site_title || "Site logo"}
        src={site_logo || "/logo-1.png"}
        width={150}
        height={75} // <= asegúrate de que sea más pequeño que el contenedor
        className="h-full"
      ></Image>
    </Link>
  )
}