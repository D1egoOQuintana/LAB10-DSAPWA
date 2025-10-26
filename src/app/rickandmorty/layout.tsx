import { ReactNode } from "react";
import { Metadata } from "next";
import { GiPortal } from "react-icons/gi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Character Explorer",
  description: "Explora el multiverso de Rick and Morty",
};

interface RickAndMortyLayoutProps {
  children: ReactNode;
}

export default function RickAndMortyLayout({ children }: RickAndMortyLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <nav className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-50 border-b-2 border-green-400">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/rickandmorty"
            className="text-white text-2xl font-bold hover:text-green-400 transition flex items-center gap-2"
          >
            <GiPortal size={35} className="animate-spin-slow text-green-400" />
            <span className="text-green-400">Rick</span> and <span className="text-blue-400">Morty</span>
          </Link>
          
          <div className="flex gap-4">
            <Link
              href="/rickandmorty"
              className="text-white hover:text-green-400 transition font-semibold"
            >
              Personajes
            </Link>
            <Link
              href="/rickandmorty/search"
              className="text-white hover:text-blue-400 transition font-semibold"
            >
              Búsqueda
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
