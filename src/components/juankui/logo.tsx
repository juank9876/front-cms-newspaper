import { fetchSiteSettings } from "@/api-fetcher/fetcher";
import { SiteSettings } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export async function Logo() {
  let siteSettings: SiteSettings | null = null;

  try {
    siteSettings = await fetchSiteSettings();
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  // Fallback values if API fails
  const site_title = siteSettings?.site_title || "News Site";
  const site_logo = siteSettings?.site_logo;

  // Get first letter of title for fallback
  const firstLetter = site_title.charAt(0).toUpperCase();

  return (
    <Link
      href="/"
      className="flex items-center py-10 space-x-2 hover:opacity-80 transition-opacity"
    >
      {site_logo ? (
        <Image
          alt={site_title || "Site logo"}
          src={site_logo}
          width={120}
          height={40}
          className="h-16 w-auto object-contain "
        />
      ) : (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{firstLetter}</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            {site_title}
          </span>
        </div>
      )}
    </Link>
  );
}
