import { Category, NavItemType, SiteSettings } from "@/types/types";
import { FooterLinkList, FooterSocialIcons } from "./footer";
import { Link } from "../../optionals/link";
import { Footer } from "@/types/footer";
import Image from "next/image";



export function DefaultFooter({
    footerData,
    settings,
    menuItems,
    //categoriesItems
}: {
    footerData: Footer;
    settings: SiteSettings;
    menuItems: NavItemType[];
    //categoriesItems: Category[];
}) {
    const currentYear = new Date().getFullYear();

    // Transform menuItems to match the expected structure
    const navigationCol = menuItems.filter(item => item.status === 'active').map((item, index) => ({
        id: index + 1,
        column_id: 1,
        title: item.title,
        url: item.url,
        target: item.target || "_self",
        sort_order: index + 1,
        status: "active" as const,
        created_at: "2024-01-15 10:00:00",
        updated_at: "2024-01-15 10:00:00"
    }));

    const defaultFooterData: Footer = {
        columns: [
            {
                id: 1,
                project_id: 1,
                title: "Navigation",
                sort_order: 1,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00",
                items: navigationCol
            },
            {
                id: 2,
                project_id: 1,
                title: "Support",
                sort_order: 2,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00",
                items: [
                    {
                        id: 3,
                        column_id: 2,
                        title: "Help Center",
                        url: "/help",
                        target: "_self",
                        sort_order: 1,
                        status: "active",
                        created_at: "2024-01-15 10:00:00",
                        updated_at: "2024-01-15 10:00:00"
                    },
                    {
                        id: 4,
                        column_id: 2,
                        title: "Contact",
                        url: "/contact",
                        target: "_blank",
                        sort_order: 2,
                        status: "active",
                        created_at: "2024-01-15 10:00:00",
                        updated_at: "2024-01-15 10:00:00"
                    },
                    {
                        id: 5,
                        column_id: 2,
                        title: "Cookies",
                        url: "/cookies",
                        target: "_blank",
                        sort_order: 2,
                        status: "active",
                        created_at: "2024-01-15 10:00:00",
                        updated_at: "2024-01-15 10:00:00"
                    }
                ]
            }
        ],
        legal_images: [
            {
                id: 1,
                project_id: 1,
                image_url: "/iconos-footer/juego-seguro.png",
                link_url: "juego-seguro.png",
                alt_text: "JuegoSeguro",
                title: "JuegoSeguro",
                sort_order: 1,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            },
            {
                id: 2,
                project_id: 1,
                image_url: "/iconos-footer/jugar-bien.png",
                link_url: "/iconos-footer/jugar-bien.png",
                alt_text: "/iconos-footer/jugar-bien.png",
                title: "/iconos-footer/jugar-bien.png",
                sort_order: 2,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            },
            {
                id: 3,
                project_id: 1,
                image_url: "/iconos-footer/mayor-edad.png",
                link_url: "/iconos-footer/mayor-edad.png",
                alt_text: "/iconos-footer/mayor-edad.png",
                title: "/iconos-footer/mayor-edad.png",
                sort_order: 2,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            },
            {
                id: 4,
                project_id: 1,
                image_url: "/iconos-footer/logo.png",
                link_url: "/iconos-footer/logo.png",
                alt_text: "/iconos-footer/logo.png",
                title: "/iconos-footer/logo.png",
                sort_order: 2,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            },
            {
                id: 5,
                project_id: 1,
                image_url: "/iconos-footer/auto-prohibicion.png",
                link_url: "/iconos-footer/auto-prohibicion.png",
                alt_text: "/iconos-footer/auto-prohibicion.png",
                title: "/iconos-footer/auto-prohibicion.png",
                sort_order: 2,
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            }
        ],
        legal_links: [
            {
                id: 1,
                project_id: 1,
                link_type: "privacy_policy",
                title: "Privacy Policy",
                url: "/privacy-policy",
                target: "_self",
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            },
            {
                id: 2,
                project_id: 1,
                link_type: "terms_of_service",
                title: "Terms of Service",
                url: "/terms-of-service",
                target: "_self",
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            },
            {
                id: 3,
                project_id: 1,
                link_type: "sitemap",
                title: "Sitemap",
                url: "/sitemap.xml",
                target: "_self",
                status: "active",
                created_at: "2024-01-15 10:00:00",
                updated_at: "2024-01-15 10:00:00"
            }
        ],
        copyright: {
            id: 1,
            project_id: 1,
            start_year: 2020,
            end_year: 2024,
            company_name: "Your Company Name",
            copyright_text: "All rights reserved",
            status: "active",
            created_at: "2024-01-15 10:00:00",
            updated_at: "2024-01-15 10:00:00"
        }
    }

    // Use API data with fallbacks to defaultFooterData
    const columns = footerData?.columns.length > 0 ? footerData.columns : defaultFooterData.columns;
    const legalImages = footerData?.legal_images.length > 0 ? footerData.legal_images : defaultFooterData.legal_images;
    const legalLinks = footerData?.legal_links.length > 0 ? footerData.legal_links : defaultFooterData.legal_links;
    const copyright = footerData?.copyright || defaultFooterData.copyright;

    return (
        <footer className="w-full bg-gradient-to-b from-slate-100 to-slate-200 border-t border-slate-300">

            <div className="py-10 w-[90vw] lg:w-[60vw] mx-auto flex flex-wrap  lg:flex-row justify-between">
                {/* Main Footer Content */}
                <div className="flex flex-col">
                    {settings.site_logo && (
                        <Image
                            src={settings.site_logo}
                            alt={settings.site_title}
                            width={100}
                            height={100}
                        />
                    )}
                    <h4 className="text-xl font-bold text-foreground mt-3">
                        {settings.site_title}
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed my-0 py-0">
                        {settings.site_description}
                    </p>
                    <FooterSocialIcons />
                </div>

                {/* Dynamic Footer Columns from API */}
                {columns.map((column) => (
                    <FooterLinkList
                        key={column.id}
                        title={column.title}
                        links={column.items.map(item => ({
                            href: item.url,
                            label: item.title
                        }))}
                    />
                ))}

                {/* Legal Images Section */}
                <div className="flex flex-wrap gap-4 pt-4">
                    {legalImages.map(image => (
                        <a
                            key={image.id}
                            href={image.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={image.image_url}
                                alt={image.alt_text}
                                title={image.title}
                                className="w-fit h-8"
                            />
                        </a>
                    ))}
                </div>



                {/* Navigation Links dinámicos 

                <FooterLinkList
                    title="Navegación"
                    links={menuItems.filter(item => item.status === 'active').map(item => ({
                        href: item.url,
                        label: item.title
                    }))}
                />
                */}

            </div>


            {/* Bottom Bar */}
            <div className="border-t border-slate-300 flex flex-col items-center justify-center gap-4 py-3 text-slate-600 font-light">
                <span className="text-sm text-slate-600">
                    © {copyright?.start_year || currentYear} - {copyright?.end_year || currentYear} {copyright?.company_name || settings.site_title}
                    {copyright?.copyright_text ? `. ${copyright.copyright_text}` : '. All rights reserved'}
                </span>
                <div className="flex justify-center flex-wrap">
                    {legalLinks?.map(link => (
                        <Link
                            key={link.id}
                            href={link.url}
                            target={link.target}
                            className="text-sm font-light transition-colors px-4 py-1 text-slate-600"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}