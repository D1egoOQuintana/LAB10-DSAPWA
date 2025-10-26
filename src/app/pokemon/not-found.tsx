import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          404 - Pokémon No Encontrado
        </h2>
        <p className="text-gray-600 mb-6">
          El Pokémon que buscas no existe en nuestra Pokédex.
        </p>
        <Link
          href="/pokemon"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Volver al Pokédex
        </Link>
      </div>
    </div>
  );
}
