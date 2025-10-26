"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Character, SearchFilters } from "@/types/rickandmorty";
import { FaSearch, FaFilter } from "react-icons/fa";

/**
 * CSR (Client-Side Rendering)
 * Justificación: La búsqueda en tiempo real requiere interactividad
 * y respuesta inmediata a las acciones del usuario. CSR es ideal
 * para filtros dinámicos y búsquedas que cambian constantemente.
 */
export default function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    status: "",
    gender: "",
    species: "",
  });

  // useEffect para búsqueda en tiempo real
  useEffect(() => {
    const searchCharacters = async () => {
      setLoading(true);
      setError("");

      try {
        // Construir URL con filtros
        const params = new URLSearchParams();
        if (filters.name) params.append("name", filters.name);
        if (filters.status) params.append("status", filters.status);
        if (filters.gender) params.append("gender", filters.gender);
        if (filters.species) params.append("species", filters.species);

        const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("No se encontraron personajes");
        }

        const data = await res.json();
        setCharacters(data.results);
      } catch (err) {
        setError("No se encontraron personajes con esos criterios");
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: esperar 500ms después de que el usuario deje de escribir
    const timeoutId = setTimeout(() => {
      if (
        filters.name ||
        filters.status ||
        filters.gender ||
        filters.species
      ) {
        searchCharacters();
      } else {
        setCharacters([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (
    field: keyof SearchFilters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <FaSearch className="text-blue-400" />
            Búsqueda de Personajes
          </h1>
          
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              <strong className="text-blue-400">Estrategia:</strong> CSR (Client-Side Rendering)
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Búsqueda en tiempo real con useState y useEffect para máxima interactividad
            </p>
          </div>

          {/* Filtros de búsqueda */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border-2 border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-green-400" />
              <h2 className="text-xl font-bold text-white">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Búsqueda por nombre */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  placeholder="Buscar por nombre..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-green-400 focus:outline-none transition"
                />
              </div>

              {/* Filtro por status */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Estado
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-green-400 focus:outline-none transition"
                >
                  <option value="">Todos</option>
                  <option value="alive">Vivo</option>
                  <option value="dead">Muerto</option>
                  <option value="unknown">Desconocido</option>
                </select>
              </div>

              {/* Filtro por gender */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Género
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-green-400 focus:outline-none transition"
                >
                  <option value="">Todos</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="genderless">Sin género</option>
                  <option value="unknown">Desconocido</option>
                </select>
              </div>

              {/* Filtro por species */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Especie
                </label>
                <input
                  type="text"
                  value={filters.species}
                  onChange={(e) => handleFilterChange("species", e.target.value)}
                  placeholder="Ej: Human, Alien..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-green-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Botón para limpiar filtros */}
            <button
              onClick={() =>
                setFilters({ name: "", status: "", gender: "", species: "" })
              }
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Resultados */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
            <p className="text-white mt-4">Buscando personajes...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900 bg-opacity-50 border-2 border-red-500 rounded-lg p-6 text-center">
            <p className="text-white text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && characters.length > 0 && (
          <div>
            <p className="text-gray-300 mb-4">
              Se encontraron <span className="font-bold text-green-400">{characters.length}</span> personajes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <Link
                  key={character.id}
                  href={`/rickandmorty/${character.id}`}
                  className="transform transition hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border-2 border-gray-700 hover:border-green-400 transition">
                    <div className="relative h-64 w-full">
                      <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        className="object-cover"
                        loading="lazy"
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
                      <p className="text-gray-400 text-sm">
                        <span className="font-semibold">Género:</span> {character.gender}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Usa los filtros para buscar personajes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
