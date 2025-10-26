'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { GiPortal } from 'react-icons/gi';

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
      <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-center border-2 border-red-500">
        <GiPortal className="mx-auto text-red-500 animate-spin-slow" size={80} />
        <h2 className="text-3xl font-bold text-white mt-6 mb-4">
          ¡Portal Malfuncionando!
        </h2>
        <p className="text-gray-300 mb-6">
          Algo salió mal en el multiverso. Inténtalo de nuevo.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Reintentar
          </button>
          <Link
            href="/rickandmorty"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
