import Header from "../components/Header";
import HomeSearchForm from "../components/HomeSearchForm";
import Hero3D from "../components/Hero3D";

export default function HomeView() {

  const APP_VERSION = '2.0';

  return (
    <>
      <Header />

      <main className="bg-[#0a0a0a] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 lg:pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <div className="lg:w-1/2 space-y-8 z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Todas tus{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Redes Sociales
                </span>{' '}
                en un enlace
              </h1>

              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
                Centraliza tu presencia digital. Comparte tu perfil de Instagram, YouTube, TikTok, GitHub, LinkedIn y más desde un solo lugar.
              </p>

              <div className="max-w-md">
                <HomeSearchForm />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[400px]">
              <Hero3D />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <footer className="text-center pb-8 text-gray-600 text-xs">
          <div className="flex items-center justify-center gap-2">
            <p>Linkora © {new Date().getFullYear()}</p>
            <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px] font-mono border border-gray-700">
              v{APP_VERSION}
            </span>
          </div>
          <p className="mt-1">
            Made by{' '}
            <a className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors" href="https://donatodebattista.vercel.app/" target="_blank" rel="noopener noreferrer">
              donidevツ
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
