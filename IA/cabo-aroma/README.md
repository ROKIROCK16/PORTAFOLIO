# Cabo Aroma

Sitio web de cafetería. 100% local: sin APIs externas, sin base de datos, sin servicios cloud.
Todo el contenido vive en archivos JSON dentro de `data/` y se edita desde el panel `/studio`.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- TailwindCSS v4
- Framer Motion
- Lucide Icons

## Arranque

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm start
```

## Estructura

```
data/                    contenido editable (JSON)
  settings.json          identidad, colores, logo, nav, redes, footer
  home.json              hero, nosotros, destacados, preview del menú
  about.json             historia, misión, visión, valores, equipo
  gallery.json           imágenes + categorías
  menu.json              categorías y productos (nombre, desc, precio, imagen)
  contact.json           dirección, teléfono, correo, horario, formulario, mapa
public/images/           todas las imágenes (reemplazables 1:1 por el mismo nombre)
src/
  app/
    (site)/              sitio público: /, /galeria, /nosotros, /menu, /contacto
    studio/              panel de edición (/studio)
    api/content/[key]/   GET/PUT del JSON correspondiente
  components/
    layout/              Navbar, Footer, PageHero
    ui/                  Button, Card, SectionTitle, Reveal
    cards/               ProductCard, MenuCard
    gallery/             Gallery con filtros + lightbox
    forms/               ContactForm
    studio/              StudioPanel, JsonEditor, FieldInput
  sections/              secciones de la landing
  hooks/                 useContentEditor
  lib/                   content (fs), object-path, utils
  types/                 tipado del contenido
  styles/                globals.css
```

## Contenido desacoplado

Ningún texto, precio ni ruta de imagen está escrito en los componentes: todo se lee de `data/*.json`
mediante `getContent()` (server-side, `src/lib/content.ts`). Los colores de marca se inyectan como
CSS variables desde `settings.colors`, así que cambiar la paleta es editar un solo archivo.

## Modo Studio (`/studio`)

Panel sin autenticación (pensado para uso local). Pestaña por archivo JSON.
El editor es recursivo: cualquier campo del JSON aparece como formulario, con
color pickers para colores, preview para imágenes y botones agregar/eliminar en las listas
(productos, categorías, valores, equipo, horario, links del nav, galería).
"Guardar cambios" hace `PUT /api/content/<key>`, reescribe el JSON en disco y revalida el sitio.

## Reemplazar imágenes

Sustituye el archivo en `public/images/` conservando el nombre, o cambia la ruta desde Studio.

## Despliegue

El sitio publico es estatico y funciona en cualquier host. La unica pieza con requisitos
especiales es **Studio**, porque escribe los JSON en disco:

| Host | Sitio publico | Studio (`/studio`) |
|---|---|---|
| Local (`npm run dev`) | si | si |
| VPS / Docker / Render con disco | si | si, con `ENABLE_STUDIO=true` |
| Vercel / Netlify (serverless) | si | no: FS de solo lectura, el `PUT` responde 503 |

En serverless el contenido se sigue sirviendo desde `data/*.json` (van en el repo);
para cambiarlo, editas el JSON y vuelves a desplegar. Copia `.env.example` a `.env`
si necesitas habilitar Studio en un host con disco persistente.

## Escalabilidad

- `src/lib/content.ts` es la única capa de acceso a datos: para migrar a una base de datos
  basta reimplementar `getContent`/`saveContent` sin tocar componentes.
- Las rutas API ya validan la clave de contenido; añadir auth es envolver el handler `PUT`.
- El grupo de rutas `(site)` permite añadir `(admin)` o `(shop)` sin reestructurar.
