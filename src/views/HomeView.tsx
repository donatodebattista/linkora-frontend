import Header from "../components/Header";
import HomeSearchForm from "../components/HomeSearchForm";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-10 min-h-screen lg:bg-[url('/bg.svg')] bg-no-repeat bg-right-top bg-size-[50%]">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales</span> en
              un enlace
            </h1>
            <p className="text-slate-800 text-xl">Unete a nuestra comunidad compartiendo tus redes sociales, comparte tu perfil de Instagram, Youtube, Twitch, Linkedin, TikTok, Github y más</p>
            <HomeSearchForm />
          </div>
        </div>
      </main>
    </>
  );
}
