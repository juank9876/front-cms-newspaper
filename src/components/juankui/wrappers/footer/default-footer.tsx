import { Category, NavItemType, SiteSettings } from "@/types/types";
import { FooterLinkList, FooterSocialIcons } from "./footer";
import { Link } from "../../optionals/link";

const SUPPORT_LINKS = [
    { href: "/privacy", label: "Privacidad" },
    { href: "/terms", label: "Términos" },
    { href: "/cookies", label: "Cookies" },
    { href: "/help", label: "Ayuda" },
];

const LEGAL_LINKS = [
    { href: "/privacy", label: "Política de Privacidad" },
    { href: "/terms", label: "Términos de Uso" },
    { href: "/sitemap", label: "Mapa del Sitio" },
];

const RESPONSIBLE_GAMING_LINKS = [
    { href: "/iconos-footer/auto-prohibicion.png", label: "Juego Responsable" },
    { href: "/iconos-footer/juego-seguro.png", label: "Juego Responsable" },
    { href: "/iconos-footer/jugar-bien.png", label: "Juego Responsable" },
    { href: "/iconos-footer/logo.png", label: "Juego Responsable" },
    { href: "/iconos-footer/mayor-edad.png", label: "Juego Responsable" },
];

export function DefaultFooter({
    settings,
    menuItems,
    categoriesItems
}: {
    settings: SiteSettings;
    menuItems: NavItemType[];
    categoriesItems: Category[];
}) {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full bg-gradient-to-b from-slate-100 to-slate-200 border-t border-slate-300">
            {/* Main Footer Content */}
            <div className="mx-auto w-[70vw] px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-3">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                {settings.site_logo && (
                                    <img
                                        src={settings.site_logo}
                                        alt={settings.site_title}
                                        className="h-8 w-auto"
                                    />
                                )}
                                {
                                    !settings.site_logo && (
                                        <h3 className="text-xl font-bold text-slate-800">
                                            {settings.site_title}
                                        </h3>
                                    )
                                }
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {settings.site_description}
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links dinámicos */}
                    <div className="lg:col-span-2">
                        <FooterLinkList
                            title="Navegación"
                            links={menuItems.filter(item => item.status === 'active').map(item => ({
                                href: item.url,
                                label: item.title
                            }))}
                        />
                    </div>

                    {/* Categorías dinámicas */}
                    <div className="lg:col-span-2">
                        <FooterLinkList
                            title="Categorías"
                            links={categoriesItems.map(cat => ({
                                href: `/categories/${cat.slug}`,
                                label: cat.name
                            }))}
                        />
                    </div>

                    {/* Legal & Support */}
                    <div className="lg:col-span-2">
                        <FooterLinkList title="Soporte" links={SUPPORT_LINKS} />
                    </div>

                    {/* Social & Newsletter */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-4">
                            Síguenos
                        </h4>
                        <div className="space-y-4">
                            <FooterSocialIcons />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-300 bg-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between sm:flex-row">
                        <div className="flex items-center space-x-4 text-slate-600">
                            <span className=" text-sm">
                                © {currentYear} {settings.site_title}. Todos los derechos
                                reservados.
                            </span>
                        </div>
                        <div className="mt-4 flex items-center space-x-6 sm:mt-0">
                            {LEGAL_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}