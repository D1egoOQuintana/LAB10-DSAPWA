# 🚀 Next.js SSG/ISR Application - Pokédex & Rick and Morty

Proyecto educativo desarrollado con **Next.js 16** que implementa diferentes estrategias de renderizado (SSG, ISR, CSR) a través de dos aplicaciones completas:

1. **Pokédex** - Explorador de Pokémon (151 primeros)
2. **Rick and Morty Character Explorer** - Explorador del multiverso

## 📋 Contenido del Proyecto

### 🎮 Pokédex (`/pokemon`)
- **Estrategia:** SSG + ISR
- **Características:**
  - Lista de 151 Pokémon
  - Páginas de detalle pre-generadas
  - Revalidación cada 24 horas
  - Lazy loading de imágenes
  - Error handling personalizado

### 🌌 Rick and Morty (`/rickandmorty`)
- **Estrategias:** SSG + ISR + CSR
- **Características:**
  - Lista completa de personajes (SSG)
  - Búsqueda en tiempo real (CSR)
  - Detalle con ISR (revalidación cada 10 días)
  - Filtros dinámicos por múltiples criterios
  - UI temática y responsiva

## 🛠 Tecnologías

- **Next.js 16** - App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos
- **React Icons** - Iconografía
- **PokeAPI** - Datos de Pokémon
- **Rick and Morty API** - Datos de personajes

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Ejecutar producción
npm start
```

## 📁 Estructura

```
src/
├── app/
│   ├── pokemon/              # Pokédex (SSG + ISR)
│   │   ├── page.tsx         # Lista (ISR - 24h)
│   │   ├── [name]/          # Detalle (SSG)
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   └── rickandmorty/        # Rick and Morty
│       ├── page.tsx         # Lista (SSG)
│       ├── search/          # Búsqueda (CSR)
│       ├── [id]/            # Detalle (ISR - 10 días)
│       ├── layout.tsx
│       ├── error.tsx
│       └── not-found.tsx
│
└── types/
    ├── pokemon.ts
    └── rickandmorty.ts
```

## 🎯 Estrategias de Renderizado

### SSG (Static Site Generation)
- **Dónde:** Lista de Rick and Morty, Detalle de Pokémon
- **Por qué:** Contenido estable, máximo rendimiento
- **Implementación:** `cache: 'force-cache'`, `generateStaticParams()`

### ISR (Incremental Static Regeneration)
- **Dónde:** Lista de Pokémon (24h), Detalle de R&M (10 días)
- **Por qué:** Balance entre rendimiento y actualización
- **Implementación:** `next: { revalidate: segundos }`

### CSR (Client-Side Rendering)
- **Dónde:** Búsqueda de Rick and Morty
- **Por qué:** Interactividad en tiempo real
- **Implementación:** `"use client"`, `useState`, `useEffect`

## 📊 Métricas de Build

```
Route (app)                              Size     First Load JS
┌ ○ /pokemon                            XX kB         XXX kB
├ ● /pokemon/[name] (151 paths)         XX kB         XXX kB
├ ○ /rickandmorty                       XX kB         XXX kB
├ ● /rickandmorty/[id] (800+ paths)     XX kB         XXX kB
└ ƒ /rickandmorty/search                XX kB         XXX kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML
ƒ  (Dynamic)  server-rendered on demand
```

## 📖 Documentación Detallada

- **Pokédex:** Ver ejercicio en el código
- **Rick and Morty:** Ver `RICKANDMORTY-README.md`

## 🚢 Despliegue en Vercel

```bash
# 1. Push a GitHub
git add .
git commit -m "feat: complete project"
git push origin main

# 2. Import en Vercel
# - Ir a vercel.com
# - Import proyecto desde GitHub
# - Deploy automático
```

### URLs del Proyecto
- **Repositorio:** `[TU LINK DE GITHUB]`
- **App Desplegada:** `[TU LINK DE VERCEL]`

## ✅ Características Implementadas

- ✅ SSG con `generateStaticParams()`
- ✅ ISR con `revalidate`
- ✅ CSR con hooks React
- ✅ TypeScript completo
- ✅ Lazy loading de imágenes
- ✅ Error boundaries
- ✅ 404 personalizados
- ✅ UI responsiva con Tailwind
- ✅ Optimización de imágenes
- ✅ Code splitting automático

## 🎨 UI/UX

### Pokédex
- Tema gaming colorido
- Cards con hover effects
- Badges de tipo con colores
- Estadísticas con progress bars

### Rick and Morty
- Tema oscuro espacial
- Gradientes dinámicos
- Portal animado
- Filtros interactivos en tiempo real

## 📝 Notas Técnicas

### Optimizaciones:
1. **Image Optimization** con Next.js Image
2. **Code Splitting** automático
3. **Debouncing** en búsquedas (500ms)
4. **Caching** estratégico por ruta
5. **Lazy Loading** universal

### APIs Utilizadas:
- PokeAPI: `https://pokeapi.co/api/v2/`
- Rick and Morty API: `https://rickandmortyapi.com/api/`

## 🏆 Criterios de Evaluación

- ✅ Uso correcto de `revalidate` y `generateStaticParams`
- ✅ Async/await en todas las peticiones
- ✅ UI atractiva con Tailwind CSS
- ✅ Hooks `useState` y `useEffect` (CSR)
- ✅ Justificación documentada de estrategias
- ✅ Despliegue exitoso en Vercel

## 👨‍💻 Desarrollo

```bash
# Instalar dependencias adicionales
npm install react-icons

# Ejecutar linter
npm run lint

# Ver configuración
cat next.config.ts
```

## 📸 Screenshots

Incluye capturas de:
1. Página principal de Pokédex
2. Detalle de Pokémon
3. Lista de Rick and Morty
4. Búsqueda en tiempo real
5. Detalle de personaje
6. Páginas de error

## 🔗 Enlaces Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [PokeAPI](https://pokeapi.co)
- [Rick and Morty API](https://rickandmortyapi.com)
- [Vercel Deployment](https://vercel.com/docs)

---


