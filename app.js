/* =============================================================
   REGALO — LÓGICA
   Toma los datos de config.js y construye la experiencia.
   No hace falta editar este archivo para personalizar el regalo.
   ============================================================= */

(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Lee un valor anidado de CONFIG a partir de "a.b.c"
  function get(path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), CONFIG);
  }

  /* ---------- 1. Rellenar textos (data-field) ---------- */
  function fillText() {
    $$("[data-field]").forEach((el) => {
      const val = get(el.dataset.field);
      if (val != null) el.textContent = val;
    });
  }

  /* ---------- 2. Rellenar imágenes (data-src) ---------- */
  function fillImages() {
    $$("[data-src]").forEach((img) => {
      const src = get(img.dataset.src);
      if (src) {
        img.src = src;
        img.addEventListener("error", () => img.classList.add("broken"), { once: true });
      }
    });
  }

  /* ---------- Navegación entre pantallas ---------- */
  const screens = {
    intro: $("#screen-intro"),
    tap: $("#screen-tap"),
    opened: $("#screen-opened"),
    main: $("#screen-main"),
    quiz: $("#screen-quiz"),
    final: $("#screen-final"),
    coupon: $("#screen-coupon"),
  };

  // Cross-fade entre pantallas: la actual se desvanece y luego aparece la nueva.
  function show(name) {
    const next = screens[name];
    const current = Object.values(screens).find(
      (s) => s.classList.contains("active") && s !== next
    );

    const reveal = () => {
      Object.values(screens).forEach((s) => {
        if (s !== next) {
          s.classList.remove("active", "leaving");
        }
      });
      next.classList.remove("leaving");
      next.classList.add("active");
      // Reinicia la animación de entrada
      void next.offsetWidth;
    };

    if (current) {
      current.classList.add("leaving");
      // Espera a que termine el fade-out antes de mostrar la siguiente
      setTimeout(reveal, 520);
    } else {
      reveal();
    }
  }

  /* ---------- 1 → 2: Intro al tap ---------- */
  function initIntro() {
    $("#intro-heart").addEventListener("click", () => {
      const h = $("#intro-heart .heart-shape");
      h.classList.add("heart-beat");
      setTimeout(() => show("tap"), 450);
    });
  }

  /* ---------- 2: Tap del corazón ---------- */
  function initTap() {
    const need = CONFIG.corazon.toquesNecesarios || 5;
    let count = 0;

    // Puntos de progreso
    const prog = $("#tap-progress");
    for (let i = 0; i < need; i++) {
      prog.appendChild(document.createElement("span"));
    }
    const dots = $$("#tap-progress span");

    $("#tap-heart").addEventListener("click", () => {
      const shape = $("#tap-heart .heart-shape");
      shape.classList.remove("heart-beat");
      void shape.offsetWidth; // reinicia la animación
      shape.classList.add("heart-beat");

      if (count < need) {
        dots[count].classList.add("on");
        count++;
      }
      if (count >= need) {
        const tapScreen = $("#screen-tap");
        tapScreen.classList.add("burst"); // destello al completar
        setTimeout(() => {
          show("opened");
          setTimeout(() => show("main"), 3000);
        }, 650);
      }
    });
  }

  /* ---------- 5. YouTube embed ---------- */
  // Extrae el ID del vídeo de cualquier formato de enlace de YouTube.
  function youtubeId(url) {
    if (!url) return null;
    // Si ya es un ID de 11 caracteres, úsalo directamente
    if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
    const patterns = [
      /youtu\.be\/([A-Za-z0-9_-]{11})/,          // youtu.be/ID
      /[?&]v=([A-Za-z0-9_-]{11})/,               // watch?v=ID
      /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/, // /embed/ID
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/, // /shorts/ID
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  function initYouTube() {
    const id = youtubeId(CONFIG.cancion.youtubeUrl);
    const wrap = $("#spotify-wrap");
    if (!id) return;

    const iframe = document.createElement("iframe");
    // Dominio sin cookies + parámetros que evitan el "Error 153" de incrustación.
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      origin: window.location.origin,
    });
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?" + params.toString();
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.title = "Reproductor de YouTube";
    wrap.appendChild(iframe);

    // Enlace de reserva: si el vídeo bloquea la incrustación, siempre se puede abrir en YouTube.
    const fallback = document.createElement("a");
    fallback.className = "yt-fallback";
    fallback.href = "https://www.youtube.com/watch?v=" + id;
    fallback.target = "_blank";
    fallback.rel = "noopener";
    fallback.textContent = "▶ Ver en YouTube";
    wrap.insertAdjacentElement("afterend", fallback);
  }

  /* ---------- 6. Galería ---------- */
  function initGallery() {
    const wrap = $("#gallery");
    const dotsWrap = $("#gallery-dots");
    const fotos = CONFIG.galeria.fotos || [];

    fotos.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Recuerdo " + (i + 1);
      img.addEventListener("error", () => img.classList.add("broken"), { once: true });
      wrap.appendChild(img);

      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("on");
      dotsWrap.appendChild(dot);
    });

    const dots = $$("#gallery-dots span");
    wrap.addEventListener("scroll", () => {
      const idx = Math.round(wrap.scrollLeft / (wrap.scrollWidth / fotos.length));
      dots.forEach((d, i) => d.classList.toggle("on", i === idx));
    });
  }

  /* ---------- 7. Carta ---------- */
  function initLetter() {
    const box = $("#letter");
    (CONFIG.carta.parrafos || []).forEach((p) => {
      const el = document.createElement("p");
      el.textContent = p;
      box.appendChild(el);
    });
    $("#letter-firma").textContent = CONFIG.carta.firma || "";
  }

  /* ---------- 8. Línea del tiempo ---------- */
  function initTimeline() {
    // Días juntos
    const start = new Date(CONFIG.timeline.fechaInicio + "T00:00:00");
    const today = new Date();
    const days = Math.max(0, Math.floor((today - start) / 86400000));
    animateNumber($("#days-number"), days);

    // Eventos
    const box = $("#timeline");
    (CONFIG.timeline.eventos || []).forEach((ev) => {
      const item = document.createElement("div");
      item.className = "tl-item";
      item.innerHTML = `
        <img alt="${ev.titulo}" />
        <span class="tl-fecha">🗓 ${ev.fecha}</span>
        <span class="tl-titulo">${ev.titulo}</span>
        <span class="tl-texto">${ev.texto}</span>`;
      const img = item.querySelector("img");
      if (ev.foto) {
        img.src = ev.foto;
        img.addEventListener("error", () => img.classList.add("broken"), { once: true });
      } else {
        img.remove();
      }
      box.appendChild(item);
    });
  }

  function animateNumber(el, target) {
    const dur = 1400;
    const t0 = performance.now();
    function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("es-ES");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- 9. Mensaje de voz ---------- */
  function initVoice() {
    const audio = $("#voice-audio");
    if (CONFIG.voz.audio) audio.src = CONFIG.voz.audio;
  }

  /* ---------- 11 → 12: abrir quiz ---------- */
  function initSurprise() {
    $("#open-quiz").addEventListener("click", () => show("quiz"));
    $("#close-quiz").addEventListener("click", () => show("main"));
  }

  /* ---------- 13 → 14: final, cupón y volver al regalo ---------- */
  function initCoupon() {
    $("#show-coupon").addEventListener("click", () => show("coupon"));
    // "Volver al regalo": vuelve a la página principal del regalo (el final del todo).
    $("#back-to-gift").addEventListener("click", () => {
      show("main");
      // Vuelve arriba del todo para revivir el regalo desde la portada.
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 560);
    });
  }

  /* ---------- 12. Quiz ---------- */
  function initQuiz() {
    const q = CONFIG.quiz;
    const preguntas = q.preguntas || [];
    const stepsWrap = $("#quiz-steps");
    const counterEl = $("#quiz-counter");
    const questionEl = $("#quiz-question");
    const optionsEl = $("#quiz-options");
    const feedbackEl = $("#quiz-feedback");
    const fb = CONFIG.feedback || { acierto: "¡Sí! ❤️", fallo: "No 💔" };
    let current = 0;
    let locked = false; // evita responder dos veces mientras pasa de pregunta

    // Indicadores de paso
    preguntas.forEach(() => stepsWrap.appendChild(document.createElement("span")));
    const steps = $$("#quiz-steps span");

    function render() {
      const item = preguntas[current];
      locked = false;
      steps.forEach((s, i) => s.classList.toggle("on", i <= current));
      counterEl.textContent = `${q.preguntaLabel} ${current + 1} ${q.deLabel} ${preguntas.length}`;
      questionEl.textContent = item.pregunta;
      optionsEl.innerHTML = "";
      feedbackEl.className = "quiz-feedback";
      feedbackEl.textContent = "";

      item.opciones.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = op;
        btn.addEventListener("click", () => {
          if (locked) return;

          if (i === item.correcta) {
            locked = true;
            btn.classList.add("correct");
            // Feedback: ¡Sí! con corazón
            feedbackEl.textContent = fb.acierto;
            feedbackEl.className = "quiz-feedback show good";
            setTimeout(next, 1050);
          } else {
            btn.classList.add("wrong");
            // Feedback: No con corazón roto (no bloquea, puede reintentar)
            feedbackEl.textContent = fb.fallo;
            feedbackEl.className = "quiz-feedback show bad";
            setTimeout(() => btn.classList.remove("wrong"), 450);
          }
        });
        optionsEl.appendChild(btn);
      });
    }

    function next() {
      current++;
      if (current >= preguntas.length) {
        show("final");
        launchHearts();
      } else {
        render();
      }
    }

    render();
  }

  /* ---------- 13. Lluvia de corazones ---------- */
  function launchHearts() {
    const box = $("#hearts-rain");
    const emojis = ["❤", "💛", "💗", "🤍"];
    for (let i = 0; i < 36; i++) {
      const s = document.createElement("span");
      s.textContent = emojis[i % emojis.length];
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 0.8 + Math.random() * 1.6 + "rem";
      s.style.animationDuration = 3 + Math.random() * 4 + "s";
      s.style.animationDelay = Math.random() * 2 + "s";
      box.appendChild(s);
    }
  }

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    fillText();
    fillImages();
    initIntro();
    initTap();
    initYouTube();
    initGallery();
    initLetter();
    initTimeline();
    initVoice();
    initSurprise();
    initQuiz();
    initCoupon();
  });

})();
