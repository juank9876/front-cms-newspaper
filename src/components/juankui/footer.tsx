import { SiteSettings } from "@/types/types";

export function Footer ({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="w-full border-t border-[var(--color-accent)] bg-gradient-to-t from-neutral-300 to-white px-6 py-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 rounded-lg border border-zinc-600 p-6 transition duration-300 hover:shadow-lg lg:grid-cols-3">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">{settings.site_title}</h4>
          <p className="text-sm text-zinc-700">{settings.site_description}</p>
        </div>

        <div className="space-y-2">
          {/* Aquí puedes añadir navegación o enlaces útiles */}
        </div>

        {settings.social_links.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Redes sociales</h4>
            <div className="space-y-1">
              {settings.social_links.map((social, index) => (
                <a
                  key={index}
                  href={social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-400 hover:underline"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}