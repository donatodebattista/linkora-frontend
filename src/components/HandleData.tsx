import type { SocialNetwork, UserHandle } from "../types"
import { Link } from 'react-router-dom'

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({ data }: HandleDataProps) {
    const enabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (link: SocialNetwork) => link.enabled === true
    )

    const socialLabel: Record<string, string> = {
        facebook: "Red social",
        github: "Código",
        instagram: "Red social",
        x: "Red social",
        youtube: "Video",
        tiktok: "Video",
        linkedin: "Profesional",
        twitch: "Streaming",
    }

    return (
        <div className="relative min-h-screen bg-zinc-950 flex flex-col items-center px-4 py-10">

            {/* Glow ambiental sutil arriba */}
            <div
                className="pointer-events-none absolute inset-0 -z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(34,211,238,0.07), transparent 65%)",
                }}
            />

            {/* Card principal */}
            <div
                className="relative z-10 w-full max-w-md flex flex-col items-center
          bg-zinc-900/80 backdrop-blur-xl
          border border-white/[0.07]
          rounded-[2rem] px-8 py-10
          shadow-[0_0_60px_-20px_rgba(34,211,238,0.1)]"
            >
                {/* Badge Linkora */}
                <span
                    className="mb-5 inline-flex items-center gap-1.5
            text-[0.65rem] font-semibold tracking-widest uppercase
            text-cyan-400 border border-cyan-500/25
            bg-cyan-500/[0.07] rounded-full px-3 py-1"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    linkora
                </span>

                {/* Avatar */}
                {data.image && (
                    <div
                        className="w-24 h-24 rounded-full mb-5 flex-shrink-0
              border-2 border-cyan-500/30 p-[3px]
              bg-cyan-500/[0.05] shadow-lg"
                    >
                        <img
                            src={data.image}
                            alt={data.handle}
                            className="w-full h-full rounded-full object-cover block"
                        />
                    </div>
                )}

                {/* Nombre y descripción */}
                <h1 className="text-[1.75rem] font-bold text-white tracking-tight mb-1.5">
                    {data.handle}
                </h1>
                <p className="text-sm text-zinc-400 text-center leading-relaxed max-w-xs mb-6">
                    {data.description}
                </p>

                {/* Divisor */}
                <div className="w-10 h-px bg-cyan-500/25 mb-6" />

                {/* Links */}
                <div className="flex flex-col gap-3 w-full">
                    {enabledLinks.length ? (
                        enabledLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3.5
                  bg-zinc-800/60 hover:bg-zinc-700/60
                  border border-white/[0.06] hover:border-cyan-500/30
                  rounded-2xl px-5 py-3.5
                  transition-all duration-150
                  hover:-translate-y-0.5 group"
                            >
                                {/* Ícono */}
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center
                                               bg-white/[0.15] flex-shrink-0"
                                >
                                    <img
                                        src={`/social/icon_${link.name}.svg`}
                                        alt={link.name}
                                        className="w-5 h-5 object-contain"
                                    />
                                </div>

                                {/* Texto */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[0.65rem] text-zinc-500 uppercase tracking-wider mb-0.5">
                                        {socialLabel[link.name] ?? "Link"}
                                    </p>
                                    <p className="text-[0.9375rem] font-semibold text-zinc-200 capitalize leading-none">
                                        {link.name}
                                    </p>
                                </div>

                                {/* Flecha */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </a>
                        ))
                    ) : (
                        <p className="text-zinc-600 text-sm text-center py-8">
                            No hay links en esta página
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 mt-8 flex flex-col items-center gap-1">
                <Link to="/">
                    <img src="/logo.svg" alt="Linkora" className="w-24 opacity-60 hover:opacity-90 transition-opacity" />
                </Link>
                <p className="text-[0.7rem] text-zinc-600">
                    © 2025 · Made by{" "}
                    <a
                        href="https://donatodebattista.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                        donidevツ
                    </a>
                </p>
            </footer>
        </div>
    )
}