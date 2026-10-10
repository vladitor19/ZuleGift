/* =============================================================
   REGALO — ARCHIVO DE CONFIGURACIÓN
   -------------------------------------------------------------
   Edita SOLO este archivo para personalizar tu regalo.
   No hace falta tocar el HTML ni el CSS.

   - Para cambiar fotos: pon tus imágenes en la carpeta "assets/"
     y escribe aquí el nombre del archivo (ej: "assets/foto1.jpg").
   - Para cambiar textos: edita los valores entre comillas.
   - Las líneas que empiezan por // son comentarios de ayuda.
   ============================================================= */

const CONFIG = {

  /* ---------- 1. PANTALLA DE INTRO (el regalo cerrado) ---------- */
  intro: {
    etiqueta: "TIENES UN REGALO",
    paraLabel: "PARA",
    para: "Zulema",
    de: "Vladimir",
    mensaje: "Espero que te guste, mi amor. ❤️ Lo hice con todo mi corazón, solo para ti.",
    instruccion: "Toca el corazón para descubrir tu regalo.",
  },

  /* ---------- 2. TAP DEL CORAZÓN (abrir el regalo) ---------- */
  corazon: {
    instruccion: "Cada toque abre un pedacito del recuerdo.",
    // Número de toques necesarios para abrir el regalo
    toquesNecesarios: 5,
  },

  /* ---------- 3. REGALO ABIERTO (transición) ---------- */
  abierto: {
    titulo: "Has abierto tu regalo ❤️",
    subtitulo: "Un recuerdo creado especialmente para ti.",
  },

  /* ---------- 4. PÁGINA PRINCIPAL (hero) ---------- */
  hero: {
    foto: "assets/hero.jpg",          // foto grande de cabecera
    paraLabel: "PARA",
    para: "Zulema",
    subtitulo: "Zulema y Vladimir",
    pie: "DE VLADIMIR · DESDE EL 16 DE JULIO DE 2015",
  },

  /* ---------- 5. NUESTRA CANCIÓN (YouTube) ---------- */
  cancion: {
    seccion: "NUESTRA CANCIÓN",
    titulo: "Nuestra canción",
    plataforma: "YOUTUBE",
    foto: "assets/cancion.jpg",       // imagen circular sobre el reproductor
    // Pega aquí el enlace de YouTube de la canción.
    // Vale cualquier formato: https://youtu.be/ID, https://www.youtube.com/watch?v=ID
    // o directamente el enlace embed. El reproductor se genera automáticamente.
    youtubeUrl: "https://youtu.be/1_qRsCQdzuE?si=JuF_m_edqB5sWlUj",
  },

  /* ---------- 6. GALERÍA ---------- */
  galeria: {
    seccion: "GALERÍA",
    titulo: "Momentos que no se borran",
    // Añade todas las fotos que quieras a esta lista
    fotos: [
      "assets/galeria1.jpg",
      "assets/galeria2.jpg",
      "assets/galeria3.jpg",
      "assets/galeria4.jpg",
      "assets/galeria5.jpg",
      "assets/galeria6.jpg",
    ],
  },

  /* ---------- 7. CARTA ---------- */
  carta: {
    seccion: "CARTA",
    // Cada elemento de la lista es un párrafo
    parrafos: [
      "Hola, mi amor.",
      "Si estás leyendo esto es porque quería regalarte algo un poco diferente. Algo que no se guarda en una caja, sino en el corazón.",
      "Todavía me acuerdo del día en que empezamos esta historia. Quién me iba a decir que aquel momento iba a convertirse en uno de los más importantes de mi vida. Desde entonces, has llenado mis días de risas, de calma y de un montón de recuerdos que nunca quiero olvidar.",
      "Hemos vivido momentos muy bonitos, pero también otros que nos han hecho más fuertes. Y si algo he aprendido de nosotros es que, pase lo que pase, siempre merece la pena seguir caminando de tu mano.",
      "Gracias por estar cuando más te he necesitado, por creer en mí incluso cuando yo dudaba y por hacer que cualquier lugar sea mi lugar favorito si estás allí.",
      "Quiero seguir creando recuerdos contigo, uno detrás de otro.",
      "Te quiero muchísimo. Y ojalá, dentro de muchos años, podamos volver a leer esta carta y sonreír al recordar todo lo que hemos vivido.",
      "Con todo mi amor.",
    ],
    firma: "Vladimir ❤️",
  },

  /* ---------- 8. LÍNEA DEL TIEMPO ---------- */
  timeline: {
    seccion: "RECUERDOS",
    titulo: "Nuestra línea del tiempo",
    // Fecha de inicio para contar los "días juntos" (formato: AAAA-MM-DD)
    fechaInicio: "2015-07-16",
    diasLabel: "DÍAS JUNTOS",
    desdeLabel: "desde 16 de julio de 2015",
    lugar: "Todo empezó en La Paz",
    // Eventos de la línea del tiempo
    eventos: [
      {
        fecha: "10 DE DICIEMBRE",
        foto: "assets/timeline1.jpg",
        titulo: "Uno de tus cumpleaños justos",
        texto: "Todavía recuerdo aquel cumpleaños que pasamos juntos. Fuimos con tus amigos, Abel y Belén. Después de estar con ellos, nos vinimos a mi casa. Recuerdo que te di un anillo de compromiso y dijiste que sí te querías casar.",
      },
      {
        fecha: "DICIEMBRE DE 2024",
        foto: "assets/timeline2.jpg",
        titulo: "Nuestro viaje a Villa Verde",
        texto: "¿Cómo olvidar nuestro viaje a Villa Verde? Fue el primer viaje de vacaciones que nos dimos. La pasamos súper bien y decidimos siempre darnos unas vacaciones y viajar",
      },
      {
        fecha: "12 DE ENERO DE 2026",
        foto: "assets/timeline3.jpg",
        titulo: "Nuestro viaje a Copacabana",
        texto: "Ese viaje a Copacabana en el que nos quedamos en un hotel a las orillas del lago. Fue otro viaje en el que la pasamos súper bien; recuerdos que solo los dos sabemos",
      },
    ],
  },

  /* ---------- 9. MENSAJE DE VOZ ---------- */
  voz: {
    seccion: "MENSAJE DE VOZ",
    de: "De Vladimir",
    // Pon tu archivo de audio en assets/ (ej: mp3, m4a, ogg)
    audio: "assets/mensaje-de-voz.mp3",
    foto: "assets/voz.jpg",           // foto bajo el reproductor de voz
  },

  /* ---------- 10. CIERRE ---------- */
  cierre: {
    foto: "assets/cierre.jpg",
    titulo: "Zulema y Vladimir",
    subtitulo: "hoy y siempre ❤️",
    firma: "— VLADIMIR",
  },

  /* ---------- 11. ÚLTIMA SORPRESA (intro del quiz) ---------- */
  sorpresa: {
    etiqueta: "UNA ÚLTIMA SORPRESA",
    texto1: "Pensabas que el regalo había terminado...",
    texto2: "Pero todavía tengo algo preparado para ti.",
    boton: "Descubrir la sorpresa 💌",
  },

  /* ---------- 12. QUIZ ---------- */
  quiz: {
    intro: "Para descubrir mi última sorpresa tendrás que responder unas preguntas sobre nosotros.",
    preguntaLabel: "PREGUNTA",
    deLabel: "DE",
    // Para cada pregunta, "correcta" es el índice (empezando en 0) de la respuesta correcta.
    preguntas: [
      {
        pregunta: "¿Dónde fue nuestro primer beso?",
        opciones: ["En Combaya.", "En el mercado Hinojosa después del wally.", "En el mercado Hinojosa al despedirnos el día de la Verbena."],
        correcta: 2,
      },
      {
        pregunta: "¿Dónde fue nuestra primera cita?",
        opciones: [
          "En un restaurante.",
          "En la plaza San Pedro.",
          "En un parque.",
        ],
        correcta: 1,
      },
      {
        pregunta: "¿Cuál es nuestro lugar favorito juntos?",
        opciones: [
          "En algun restaurante.",
          "En cama viendo pelis.",
          "Cualquier sitio, mientras estemos juntos.",
        ],
        correcta: 2,
      },
    ],
  },

  /* ---------- 13. FINAL ---------- */
  final: {
    titulo: "Lo has conseguido ❤️",
    subtitulo: "Esta era la última sorpresa que tenía preparada para ti.",
  },

  /* ---------- 14. CUPÓN (vale de regalo) ---------- */
  cupon: {
    etiqueta: "VALE ESPECIAL",
    texto: "Vale por una cena en el lugar que tú elijas.",
    firma: "— VLADIMIR",
    boton: "Volver al regalo",
  },

  /* ---------- 15. TEXTOS DEL QUIZ (acierto / fallo) ---------- */
  feedback: {
    acierto: "¡Sí! ❤️",
    fallo: "No 💔",
  },

};
