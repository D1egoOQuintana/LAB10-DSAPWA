'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Algo salió mal!
        </h2>
        <p className="text-gray-600 mb-6">
          Ha ocurrido un error al cargar la información del Pokémon.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/pokemon"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
