import Link from "next/link";
import Image from "next/image";
import { CharacterResponse, Character } from "@/types/rickandmorty";
import { FaUsers } from "react-icons/fa";

/**
 * SSG (Static Site Generation)
 * Justificación: La lista de personajes cambia muy poco, por lo que generarla
 * estáticamente en build time mejora el rendimiento. Se usa force-cache para
 * asegurar que los datos se almacenan en caché.
 */
async function getAllCharacters(): Promise<Character[]> {
  const allCharacters: Character[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`,
      {
        cache: "force-cache", // SSG - Forzar caché
      }
    );

    if (!res.ok) break;

    const data: CharacterResponse = await res.json();
    allCharacters.push(...data.results);

    hasMore = data.info.next !== null;
    page++;
  }

  return allCharacters;
}

export default async function RickAndMortyList() {
  const characters = await getAllCharacters();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
            <FaUsers className="text-green-400" />
            Personajes de Rick and Morty
          </h1>
          <p className="text-gray-300 text-lg">
            Total de personajes: <span className="font-bold text-green-400">{characters.length}</span>
          </p>
          <div className="mt-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">Estrategia:</strong> SSG (Static Site Generation) con{" "}
              <code className="bg-gray-800 px-2 py-1 rounded">force-cache</code>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Las páginas se generan en build time para máximo rendimiento
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="transform transition hover:scale-105 hover:z-10"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border-2 border-gray-700 hover:border-green-400 transition">
                <div className="relative h-64 w-full">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover"
                    loading="lazy" // Lazy Loading
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        character.status === "Alive"
                          ? "bg-green-500 text-white"
                          : character.status === "Dead"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {character.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2 truncate">
                    {character.name}
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">
                    <span className="font-semibold">Especie:</span> {character.species}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    <span className="font-semibold">Origen:</span> {character.origin.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
