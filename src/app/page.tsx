import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { GiPortal } from "react-icons/gi";
import { FaRocket, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaRocket className="text-yellow-400" />
              Next.js SSG/ISR Lab
            </h1>
            <a
              href="https://github.com/D1egoOQuintana/LAB10-DSAPWA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-purple-300 transition"
            >
              <FaGithub size={24} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Bienvenido al Laboratorio
          </h2>
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Explora dos aplicaciones completas construidas con{" "}
            <span className="text-purple-400 font-semibold">Next.js 16</span> implementando diferentes
            estrategias de renderizado
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
              SSG - Static Site Generation
            </span>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
              ISR - Incremental Static Regeneration
            </span>
            <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">
              CSR - Client-Side Rendering
            </span>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Pokédex Card */}
          <Link href="/pokemon" className="group">
            <div className="bg-gradient-to-br from-red-600 to-yellow-600 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 border-4 border-yellow-400">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <IoGameController size={50} className="text-white" />
                  <h3 className="text-4xl font-bold text-white">Pokédex</h3>
                </div>
                <p className="text-white text-lg mb-6">
                  Explora los primeros 151 Pokémon con información detallada de cada uno.
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      ISR - 24 horas
                    </span>
                    <span className="text-white text-sm">Lista de Pokémon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      SSG - 151 páginas
                    </span>
                    <span className="text-white text-sm">Detalles pre-generados</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold text-white">151</p>
                    <p className="text-sm text-white">Pokémon</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold text-white">24h</p>
                    <p className="text-sm text-white">Revalidación</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Ver Pokédex →</span>
                  <div className="bg-white text-red-600 rounded-full p-2 group-hover:bg-yellow-300 transition">
                    <IoGameController size={24} />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Rick and Morty Card */}
          <Link href="/rickandmorty" className="group">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 border-4 border-green-400">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <GiPortal size={50} className="text-green-400 animate-spin-slow" />
                  <h3 className="text-4xl font-bold text-white">Rick and Morty</h3>
                </div>
                <p className="text-white text-lg mb-6">
                  Explora el multiverso con más de 800 personajes y búsqueda avanzada.
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      SSG - Force Cache
                    </span>
                    <span className="text-white text-sm">Lista completa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      ISR - 10 días
                    </span>
                    <span className="text-white text-sm">Detalles de personajes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      CSR - Tiempo real
                    </span>
                    <span className="text-white text-sm">Búsqueda avanzada</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold text-white">800+</p>
                    <p className="text-sm text-white">Personajes</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <p className="text-3xl font-bold text-white">10d</p>
                    <p className="text-sm text-white">Revalidación</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Explorar Multiverso →</span>
                  <div className="bg-white text-purple-600 rounded-full p-2 group-hover:bg-green-400 transition">
                    <GiPortal size={24} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Accesos Rápidos
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/pokemon"
              className="bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl text-center transition transform hover:scale-105"
            >
              <IoGameController className="mx-auto mb-2" size={30} />
              Lista Pokémon
            </Link>
            <Link
              href="/rickandmorty"
              className="bg-gradient-to-br from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl text-center transition transform hover:scale-105"
            >
              <GiPortal className="mx-auto mb-2" size={30} />
              Lista R&M
            </Link>
            <Link
              href="/rickandmorty/search"
              className="bg-gradient-to-br from-purple-500 to-pink-700 hover:from-purple-600 hover:to-pink-800 text-white font-semibold py-4 px-6 rounded-xl text-center transition transform hover:scale-105"
            >
              🔍
              <div className="mt-2">Búsqueda R&M</div>
            </Link>
            <a
              href="https://github.com/D1egoOQuintana/LAB10-DSAPWA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold py-4 px-6 rounded-xl text-center transition transform hover:scale-105"
            >
              <FaGithub className="mx-auto mb-2" size={30} />
              Ver Código
            </a>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Construido con</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg border border-white border-opacity-20">
              Next.js 16
            </span>
            <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg border border-white border-opacity-20">
              TypeScript
            </span>
            <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg border border-white border-opacity-20">
              Tailwind CSS
            </span>
            <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg border border-white border-opacity-20">
              React Icons
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-blur-md border-t border-white border-opacity-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>Laboratorio 10 - Desarrollo de Soluciones en la Nube</p>
          <p className="text-sm mt-2">Next.js SSG/ISR Implementation © 2025</p>
        </div>
      </footer>
    </div>
  );
}
         