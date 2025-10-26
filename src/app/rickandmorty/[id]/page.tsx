import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Character, CharacterResponse } from "@/types/rickandmorty";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaVenusMars,
  FaDna,
  FaGlobe,
  FaTv,
  FaCalendar,
} from "react-icons/fa";

interface CharacterPageProps {
  params: {
    id: string;
  };
}

/**
 * ISR (Incremental Static Regeneration)
 * Justificación: Los detalles de personajes cambian ocasionalmente
 * (nuevos episodios). ISR permite tener páginas estáticas pero actualizadas.
 * Revalidación cada 10 días (864000 segundos) balancea rendimiento y frescura.
 */
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // ISR - Revalida cada 10 días
  });

  if (!res.ok) throw new Error("Personaje no encontrado");
  return res.json();
}

/**
 * generateStaticParams - SSG
 * Pre-genera todas las páginas de personajes en build time
 */
export async function generateStaticParams() {
  const allCharacters: Character[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    if (!res.ok) break;

    const data: CharacterResponse = await res.json();
    allCharacters.push(...data.results);

    hasMore = data.info.next !== null;
    page++;
  }

  return allCharacters.map((character) => ({
    id: character.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);

  return {
    title: `${character.name} - Rick and Morty`,
    description: `Información sobre ${character.name} - ${character.species}`,
  };
}

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Estrategia Badge */}
        <div className="mb-6 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-purple-400">Estrategia:</strong> ISR (Incremental Static Regeneration)
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Página estática que se revalida cada 10 días. ID: {character.id}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-700">
          {/* Header con imagen de fondo */}
          <div className="relative h-96 bg-gradient-to-b from-transparent to-gray-900">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {character.name}
                </h1>
                <div className="flex gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      character.status === "Alive"
                        ? "bg-green-500 text-white"
                        : character.status === "Dead"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {character.status}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-bold bg-purple-600 text-white">
                    #{character.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Imagen del personaje */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={400}
                    height={400}
                    className="rounded-xl shadow-2xl border-4 border-green-400"
                    priority
                  />
                </div>
              </div>

              {/* Información detallada */}
              <div className="space-y-6">
                {/* Información básica */}
                <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
                  <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <FaDna />
                    Información Básica
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>
                      <strong className="text-white">
                        <FaVenusMars className="inline mr-2" />
                        Género:
                      </strong>{" "}
                      {character.gender}
                    </p>
                    <p>
                      <strong className="text-white">
                        <FaDna className="inline mr-2" />
                        Especie:
                      </strong>{" "}
                      {character.species}
                    </p>
                    {character.type && (
                      <p>
                        <strong className="text-white">Tipo:</strong>{" "}
                        {character.type}
                      </p>
                    )}
                    <p>
                      <strong className="text-white">
                        <FaCalendar className="inline mr-2" />
                        Creado:
                      </strong>{" "}
                      {new Date(character.created).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>

                {/* Ubicaciones */}
                <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
                  <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt />
                    Ubicaciones
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>
                      <strong className="text-white">
                        <FaGlobe className="inline mr-2" />
                        Origen:
                      </strong>{" "}
                      {character.origin.name}
                    </p>
                    <p>
                      <strong className="text-white">
                        <FaMapMarkerAlt className="inline mr-2" />
                        Última ubicación:
                      </strong>{" "}
                      {character.location.name}
                    </p>
                  </div>
                </div>

                {/* Episodios */}
                <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
                  <h2 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    <FaTv />
                    Episodios
                  </h2>
                  <p className="text-gray-300">
                    Aparece en{" "}
                    <strong className="text-pink-400 text-2xl">
                      {character.episode.length}
                    </strong>{" "}
                    episodios
                  </p>
                  <div className="mt-4 max-h-40 overflow-y-auto">
                    <div className="grid grid-cols-5 gap-2">
                      {character.episode.map((ep) => {
                        const episodeNum = ep.split("/").pop();
                        return (
                          <span
                            key={ep}
                            className="bg-gray-700 text-white text-center py-1 px-2 rounded text-xs font-semibold"
                          >
                            E{episodeNum}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Datos adicionales en formato tarjetas */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 text-center">
                <p className="text-white text-sm font-semibold">Estado</p>
                <p className="text-white text-2xl font-bold">
                  {character.status}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 text-center">
                <p className="text-white text-sm font-semibold">Especie</p>
                <p className="text-white text-2xl font-bold">
                  {character.species}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4 text-center">
                <p className="text-white text-sm font-semibold">Género</p>
                <p className="text-white text-2xl font-bold">
                  {character.gender}
                </p>
              </div>
            </div>
          </div>

          {/* Botón de regreso */}
          <div className="p-8 bg-gray-900 border-t-2 border-gray-700 flex gap-4">
            <Link
              href="/rickandmorty"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              <FaArrowLeft />
              Volver a Personajes
            </Link>
            <Link
              href="/rickandmorty/search"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Ir a Búsqueda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
