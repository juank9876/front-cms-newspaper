import { Footer } from "@/types/footer";
import { FooterLinkList, FooterSocialIcons } from "./footer";
import { SiteSettings } from "@/types/types";

export function MainFooterContent({ footer, settings }: { footer: Footer; settings: SiteSettings }) {
    return (
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
                        <h4 className="text-xl font-bold text-slate-600">
                            {settings.site_title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {settings.site_description}
                        </p>
                        <FooterSocialIcons />
                    </div>
                </div>

                {/* Navigation Links dinámicos */}
                {footer.columns.map((column) => (
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
                <div className="space-x-4 flex flex-wrap flex-row pt-4">
                    {footer.legal_images.map(image => (
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
            </div>
        </div>
    );
};
