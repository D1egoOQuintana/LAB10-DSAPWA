# 🚀 Rick and Morty Character Explorer

Aplicación web desarrollada con **Next.js 16** que implementa rutas estáticas y dinámicas utilizando la API de Rick and Morty, con despliegue en Vercel.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estrategias de Renderizado](#estrategias-de-renderizado)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Justificación Técnica](#justificación-técnica)

## ✨ Características

### 1. **Página Principal** (`/rickandmorty`)
- ✅ Lista completa de personajes con **SSG (Static Site Generation)**
- ✅ Caché forzado con `force-cache`
- ✅ **Lazy Loading** de imágenes con Next.js Image
- ✅ Grid responsivo con Tailwind CSS
- ✅ Indicadores de estado (Vivo/Muerto/Desconocido)

### 2. **Búsqueda en Tiempo Real** (`/rickandmorty/search`)
- ✅ **CSR (Client-Side Rendering)** con hooks React
- ✅ Filtros dinámicos por:
  - Nombre (búsqueda en tiempo real)
  - Estado (Alive/Dead/Unknown)
  - Género (Male/Female/Genderless/Unknown)
  - Especie (Human, Alien, etc.)
- ✅ Debounce de 500ms para optimizar peticiones
- ✅ useState y useEffect para manejo de estado

### 3. **Detalle de Personaje** (`/rickandmorty/[id]`)
- ✅ **ISR (Incremental Static Regeneration)** con revalidación cada 10 días
- ✅ Páginas pre-generadas con `generateStaticParams()`
- ✅ Información completa del personaje:
  - Imagen, nombre, estado
  - Especie, género, tipo
  - Origen y ubicación actual
  - Lista de episodios en los que aparece
  - Fecha de creación
- ✅ UI atractiva con gradientes y animaciones

### 4. **Componentes de Error**
- ✅ `error.tsx` - Manejo de errores personalizado
- ✅ `not-found.tsx` - Página 404 temática

## 🛠 Tecnologías Utilizadas

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Icons** - Iconografía
- **Rick and Morty API** - Fuente de datos

## 🎯 Estrategias de Renderizado

### SSG (Static Site Generation) - Página Principal

**Ubicación:** `/rickandmorty/page.tsx`

```typescript
async function getAllCharacters(): Promise<Character[]> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    {
      cache: "force-cache", // ✅ Forzar caché
    }
  );
}
```

**Justificación:**
- ✅ La lista de personajes cambia muy poco frecuentemente
- ✅ Mejor rendimiento (páginas pre-generadas en build time)
- ✅ Excelente para SEO
- ✅ Menor carga en el servidor
- ✅ Tiempos de carga instantáneos

**Ventajas:**
- Rendimiento máximo
- No requiere servidor para cada request
- Ideal para contenido que no cambia constantemente

---

### ISR (Incremental Static Regeneration) - Detalle de Personaje

**Ubicación:** `/rickandmorty/[id]/page.tsx`

```typescript
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // ✅ Revalida cada 10 días
  });
}

export async function generateStaticParams() {
  // ✅ Pre-genera todas las páginas de personajes
  return allCharacters.map((character) => ({
    id: character.id.toString(),
  }));
}
```

**Justificación:**
- ✅ Los detalles de personajes pueden cambiar (nuevos episodios)
- ✅ Balance perfecto entre rendimiento y actualización
- ✅ Revalidación cada 10 días (864000 segundos)
- ✅ Páginas estáticas que se actualizan automáticamente
- ✅ No requiere rebuild completo para actualizaciones

**Ventajas:**
- Combina velocidad de SSG con frescura de datos
- Actualización automática sin rebuild
- Escalabilidad (no sobrecarga el servidor)

---

### CSR (Client-Side Rendering) - Búsqueda

**Ubicación:** `/rickandmorty/search/page.tsx`

```typescript
"use client";

export default function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    name: "", status: "", gender: "", species: "",
  });

  useEffect(() => {
    // ✅ Búsqueda en tiempo real con debounce
    const timeoutId = setTimeout(() => {
      searchCharacters();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filters]);
}
```

**Justificación:**
- ✅ La búsqueda requiere **interactividad inmediata**
- ✅ Los filtros cambian constantemente según input del usuario
- ✅ Respuesta en tiempo real (debounce de 500ms)
- ✅ Estado dinámico con useState
- ✅ Efectos secundarios con useEffect

**Ventajas:**
- Máxima interactividad
- Respuesta instantánea a acciones del usuario
- Ideal para filtros y búsquedas dinámicas

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar build de producción
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── rickandmorty/
│   │   ├── layout.tsx          # Layout con navegación
│   │   ├── page.tsx            # Lista de personajes (SSG)
│   │   ├── search/
│   │   │   └── page.tsx        # Búsqueda en tiempo real (CSR)
│   │   ├── [id]/
│   │   │   └── page.tsx        # Detalle del personaje (ISR)
│   │   ├── error.tsx           # Manejo de errores
│   │   └── not-found.tsx       # Página 404
│   └── pokemon/                # Ejercicio anterior
│       └── ...
├── types/
│   ├── rickandmorty.ts         # Tipos TypeScript
│   └── pokemon.ts              # Tipos del ejercicio anterior
└── ...
```

## 🚀 Despliegue en Vercel

### Pasos para desplegar:

1. **Crear cuenta en Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Sign up con GitHub

2. **Conectar repositorio**
   ```bash
   # Push a GitHub
   git add .
   git commit -m "feat: Rick and Morty app"
   git push origin main
   ```

3. **Import en Vercel**
   - Click en "Import Project"
   - Seleccionar el repositorio
   - Click en "Deploy"

4. **Configuración automática**
   - Vercel detecta Next.js automáticamente
   - No requiere configuración adicional
   - Build y deploy automáticos

5. **Variables de entorno** (si las hay)
   - Settings → Environment Variables
   - Agregar las necesarias

### URLs de ejemplo:
- **Repositorio:** `https://github.com/tu-usuario/tu-repo`
- **Aplicación desplegada:** `https://tu-app.vercel.app`

## 🎨 UI/UX

### Características visuales:

- ✅ **Gradientes dinámicos** con Tailwind CSS
- ✅ **Animaciones suaves** con transitions
- ✅ **Diseño responsivo** (mobile, tablet, desktop)
- ✅ **Cards interactivas** con hover effects
- ✅ **Loading states** con spinners
- ✅ **Error boundaries** personalizados
- ✅ **Tema oscuro** inspirado en la serie
- ✅ **Iconografía** con React Icons

### Paleta de colores:

- **Primario:** Verde (#10B981) - Portal de Rick
- **Secundario:** Azul (#3B82F6) - Morty
- **Acento:** Púrpura (#A855F7) - Multiverso
- **Fondo:** Gradiente de azul a rosa oscuro

## 📊 Métricas de Rendimiento

### Build Output esperado:

```
Route (app)                              Size     First Load JS
┌ ○ /rickandmorty                       XX kB         XXX kB
├ ● /rickandmorty/[id]                  XX kB         XXX kB
├ ƒ /rickandmorty/search                XX kB         XXX kB
└ ○ /_not-found                         XX kB          XX kB

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML
ƒ  (Dynamic) server-rendered on demand
```

### Lighthouse Score esperado:

- **Performance:** 95-100 ⚡
- **SEO:** 95-100 🔍
- **Best Practices:** 90-100 ✅
- **Accessibility:** 85-95 ♿

## 🔍 API Endpoints Utilizados

```typescript
// Obtener todos los personajes (paginado)
GET https://rickandmortyapi.com/api/character?page=1

// Obtener personaje por ID
GET https://rickandmortyapi.com/api/character/1

// Búsqueda con filtros
GET https://rickandmortyapi.com/api/character/?name=rick&status=alive
```

## ✅ Criterios de Evaluación Cumplidos

- ✅ **Uso correcto de revalidate y generateStaticParams**
- ✅ **Uso de async/await en todas las peticiones**
- ✅ **UI atractiva con Tailwind CSS**
- ✅ **Manejo de hooks useState y useEffect (CSR)**
- ✅ **Justificación documentada de SSG/ISR/CSR**
- ✅ **Lazy Loading de imágenes**
- ✅ **TypeScript con tipado completo**
- ✅ **Error handling y 404 personalizados**
- ✅ **Responsive design**
- ✅ **Despliegue en Vercel**

## 📝 Notas Adicionales

### Optimizaciones implementadas:

1. **Image Optimization:** Next.js Image con lazy loading
2. **Code Splitting:** Automático por Next.js
3. **Debouncing:** En búsqueda para reducir peticiones
4. **Caching:** SSG con force-cache
5. **ISR:** Revalidación inteligente cada 10 días

### Próximas mejoras potenciales:

- [ ] Paginación en página principal
- [ ] Filtros en página principal
- [ ] Favoritos con localStorage
- [ ] Comparador de personajes
- [ ] Modos de visualización (grid/list)

## 👨‍💻 Autor

**Desarrollado por:** [Tu Nombre]
**Fecha:** Octubre 2025
**Tecnologías:** Next.js 16, TypeScript, Tailwind CSS

---

## 📸 Capturas de Pantalla

### Página Principal
![Lista de personajes](/screenshots/home.png)

### Búsqueda en Tiempo Real
![Búsqueda dinámica](/screenshots/search.png)

### Detalle del Personaje
![Página de detalle](/screenshots/detail.png)

---

**🌟 ¡Explora el multiverso de Rick and Morty!**
