import Link from 'next/link';
import { GiPortal } from 'react-icons/gi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-center border-2 border-purple-500">
        <GiPortal className="mx-auto text-purple-500 animate-spin" size={80} />
        <h2 className="text-3xl font-bold text-white mt-6 mb-4">
          404 - Dimensión No Encontrada
        </h2>
        <p className="text-gray-300 mb-6">
          Este personaje no existe en ninguna dimensión conocida.
        </p>
        <Link
          href="/rickandmorty"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Volver al Multiverso
        </Link>
      </div>
    </div>
  );
}
