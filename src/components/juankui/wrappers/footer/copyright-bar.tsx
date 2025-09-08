import { Footer } from "@/types/footer";
import { Link } from "../../optionals/link";
import { SiteSettings } from "@/types/types";

export function CopyrightBar({ footer, settings }: { footer: Footer | undefined; settings: SiteSettings }) {
    const currentYear = new Date().getFullYear();
    return (
        <div className="border-t border-slate-300 bg-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between sm:flex-row">
                    <div className="flex items-center space-x-4 text-slate-600">
                        <span className="text-sm">
                            © {footer?.copyright?.start_year || currentYear}-{footer?.copyright?.end_year || currentYear} {footer?.copyright?.company_name || settings.site_title}
                            {footer?.copyright?.copyright_text ? `. ${footer.copyright.copyright_text}` : '. All rights reserved'}
                        </span>
                    </div>
                    <div className="mt-4 flex items-center space-x-6 sm:mt-0">
                        {footer?.legal_links?.map(link => (
                            <Link
                                key={link.id}
                                href={link.url}
                                target={link.target}
                                className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
