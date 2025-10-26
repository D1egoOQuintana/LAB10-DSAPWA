# 🚀 Guía de Despliegue en Vercel

Esta guía te llevará paso a paso para desplegar tu aplicación Next.js en Vercel.

## 📋 Prerrequisitos

- ✅ Cuenta de GitHub
- ✅ Cuenta de Vercel (gratis)
- ✅ Git instalado
- ✅ Proyecto listo para deploy

## 🎯 Pasos para Desplegar

### 1. Preparar el Repositorio Git

```bash
# Si no tienes git inicializado
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "feat: Rick and Morty y Pokédex completos"

# Crear rama principal
git branch -M main
```

### 2. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Click en el botón **"+"** (arriba derecha)
3. Selecciona **"New repository"**
4. Configura:
   - **Repository name:** `next-ssg-isr-app` (o el nombre que prefieras)
   - **Description:** "Next.js app con Pokédex y Rick and Morty usando SSG, ISR y CSR"
   - **Visibility:** Public
   - **NO marcar** "Initialize with README"
5. Click en **"Create repository"**

### 3. Conectar y Subir a GitHub

```bash
# Agregar remote (reemplaza TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/next-ssg-isr-app.git

# Push al repositorio
git push -u origin main
```

### 4. Desplegar en Vercel

#### Opción A: Desde la Web (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Click en **"Sign Up"** o **"Log In"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza Vercel para acceder a tu GitHub
5. En el dashboard, click en **"Add New..."** → **"Project"**
6. Busca tu repositorio `next-ssg-isr-app`
7. Click en **"Import"**
8. Configuración:
   - **Framework Preset:** Next.js (detectado automáticamente)
   - **Root Directory:** ./
   - **Build Command:** `next build` (por defecto)
   - **Output Directory:** `.next` (por defecto)
9. Click en **"Deploy"**
10. ¡Espera 2-3 minutos! ⏳

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### 5. Verificar el Despliegue

Una vez completado el despliegue, verás:

```
✅ Production: https://tu-app-xxxxx.vercel.app
```

#### Prueba las rutas:

- **Home:** `https://tu-app.vercel.app`
- **Pokédex:** `https://tu-app.vercel.app/pokemon`
- **Detalle Pokémon:** `https://tu-app.vercel.app/pokemon/pikachu`
- **Rick and Morty:** `https://tu-app.vercel.app/rickandmorty`
- **Búsqueda R&M:** `https://tu-app.vercel.app/rickandmorty/search`
- **Detalle R&M:** `https://tu-app.vercel.app/rickandmorty/1`

## 🔧 Configuración Opcional

### Variables de Entorno

Si tu app necesita variables de entorno:

1. En Vercel Dashboard → Tu Proyecto
2. Settings → Environment Variables
3. Agregar variables:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://api.example.com`
4. Save → Redeploy

### Dominios Personalizados

1. Settings → Domains
2. Agregar dominio personalizado
3. Configurar DNS según instrucciones

### Build & Development Settings

```bash
# Build Command (default)
next build

# Output Directory (default)
.next

# Install Command (default)
npm install

# Development Command (default)
next dev
```

## 📊 Verificar Build en Vercel

Después del deploy, verifica:

### Deployment Summary

```
✅ Building...
✅ Linting and checking validity of types...
✅ Collecting page data...
✅ Generating static pages (950+ pages)
✅ Finalizing page optimization...

Route (app)                    Revalidate  Expire
┌ ○ /
├ ○ /pokemon                   1d          1y
├ ● /pokemon/[name] (151)      1d          1y
├ ○ /rickandmorty              ∞           ∞
├ ● /rickandmorty/[id] (800+)  10d         1y
└ ƒ /rickandmorty/search

○  Static
●  SSG (generateStaticParams)
ƒ  Dynamic (CSR)
```

### Lighthouse Score

Vercel automáticamente ejecuta Lighthouse:
- **Performance:** 95-100 ⚡
- **SEO:** 95-100 🔍
- **Best Practices:** 90-100 ✅
- **Accessibility:** 85-95 ♿

## 🔄 Actualizaciones Automáticas

Cada vez que hagas push a `main`:

```bash
# Hacer cambios
git add .
git commit -m "update: mejoras en UI"
git push

# Vercel automáticamente:
# 1. Detecta el push
# 2. Ejecuta el build
# 3. Despliega la nueva versión
# 4. Te envía notificación
```

## 🐛 Troubleshooting

### Error: "Build Failed"

```bash
# Probar build localmente primero
npm run build

# Si funciona localmente, revisar:
# 1. Node version (Vercel usa Node 20 por default)
# 2. Dependencies en package.json
# 3. TypeScript errors
```

### Error: "Page not found"

- Verificar que las rutas existan
- Revisar `next.config.ts`
- Check build logs en Vercel

### Error: "Image Optimization"

```typescript
// next.config.ts debe tener:
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'raw.githubusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'rickandmortyapi.com',
    },
  ],
}
```

### Páginas muy lentas

- Revisar revalidate times
- Verificar que SSG/ISR estén configurados correctamente
- Check Vercel Analytics

## 📈 Monitoreo

### Vercel Analytics (Gratis)

1. Project → Analytics
2. Ver métricas:
   - Page views
   - Top pages
   - Real Experience Score
   - Core Web Vitals

### Vercel Speed Insights

```bash
npm install @vercel/speed-insights

# En layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
```

## 📸 Capturas para Documentación

Después del deploy, toma capturas de:

1. **Vercel Dashboard**
   - Build logs exitosos
   - Deployment summary
   - Domain URL

2. **Aplicación Desplegada**
   - Home page
   - `/pokemon` - Lista
   - `/pokemon/pikachu` - Detalle
   - `/rickandmorty` - Lista
   - `/rickandmorty/search` - Búsqueda
   - `/rickandmorty/1` - Detalle

3. **Lighthouse Report**
   - Performance score
   - Core Web Vitals

## ✅ Checklist Final

- [ ] Repositorio en GitHub creado
- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Build exitoso
- [ ] Todas las rutas funcionan
- [ ] Imágenes cargan correctamente
- [ ] SSG/ISR funcionando (verificar build logs)
- [ ] CSR funcionando (búsqueda en tiempo real)
- [ ] Performance score > 90
- [ ] URLs documentadas en README

## 📝 Para Entregar

En tu documento incluye:

### 1. Links
```
Repositorio: https://github.com/TU-USUARIO/next-ssg-isr-app
App Desplegada: https://tu-app-xxxxx.vercel.app
```

### 2. Capturas de Pantalla
- Build exitoso en Vercel
- Dashboard de Vercel con deployment
- Páginas funcionando en producción
- Lighthouse scores

### 3. Justificación Técnica
Incluye explicación de:
- Por qué usaste SSG en lista de Rick and Morty
- Por qué usaste ISR en detalles
- Por qué usaste CSR en búsqueda
- Beneficios de cada estrategia

## 🎉 ¡Listo!

Tu aplicación ahora está:
- ✅ Desplegada en producción
- ✅ Accesible desde cualquier lugar
- ✅ Con SSL/HTTPS automático
- ✅ Con CDN global de Vercel
- ✅ Con auto-scaling
- ✅ Con actualizaciones automáticas

---

**Happy Deploying! 🚀**

¿Problemas? Revisa la [documentación de Vercel](https://vercel.com/docs)
