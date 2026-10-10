# Regalo 💝

Un regalo digital en forma de página web: el destinatario abre el regalo tocando un corazón, recorre una carta, una galería, una canción, una línea del tiempo y un mensaje de voz, y al final supera un pequeño quiz para desbloquear la sorpresa final.

Hecho con **HTML + CSS + JavaScript puro**, sin dependencias ni compilación. Perfecto para **GitHub Pages**.

## Estructura

```
regalo/
├── index.html      ← la página (no suele hacer falta tocarla)
├── styles.css      ← estilos (colores, tipografías…)
├── app.js          ← lógica (no hace falta tocarla)
├── config.js       ← 👈 AQUÍ se personaliza TODO (textos, fechas, quiz, rutas de fotos)
└── assets/         ← 👈 AQUÍ van tus FOTOS y el AUDIO
```

## Cómo personalizarlo

1. **Textos, nombres, fechas, carta, timeline y quiz** → edita `config.js`. Está todo comentado en español.
2. **Fotos y audio** → mete tus archivos en `assets/` con los nombres que indica `assets/README.txt` (o cambia las rutas en `config.js`).
3. **Canción de Spotify** → en `config.js`, campo `cancion.spotifyEmbed`. Usa un enlace con formato:
   `https://open.spotify.com/embed/track/XXXXXXXXXXXX`
   (en Spotify: canción → Compartir → Copiar enlace, y sustituye `/track/` por `/embed/track/`).

## Verlo en local

Abre `index.html` en el navegador. Para que Spotify y el audio funcionen sin problemas, es mejor servirlo con un servidor local, por ejemplo:

```bash
# Con Python instalado:
python -m http.server 8000
# luego abre http://localhost:8000
```

## Subirlo a GitHub Pages

1. Crea un repositorio en GitHub (p. ej. `regalo`) y sube estos archivos a la rama `main`.
2. En el repo: **Settings → Pages**.
3. En **Source**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
4. En un minuto tendrás la URL: `https://TU_USUARIO.github.io/regalo/`.

> Nota: GitHub Pages sirve archivos estáticos, así que todo (fotos, audio, Spotify) funciona tal cual.

## Flujo de la experiencia

1. Intro: el regalo cerrado.
2. Toca el corazón varias veces para abrirlo.
3. "Has abierto tu regalo".
4. Página principal (scroll): portada → canción → galería → carta → línea del tiempo → mensaje de voz → cierre → última sorpresa.
5. Quiz de preguntas.
6. Pantalla final con lluvia de corazones.
