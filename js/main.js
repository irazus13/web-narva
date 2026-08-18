(() => {
  "use strict";

  /* Año en el footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Cabecera: sombra/fondo al hacer scroll */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menú móvil */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* Cubo 3D del hero: arrastrable con el ratón / dedo */
  const stage = document.getElementById("cubeStage");
  const cube = document.getElementById("cube");
  if (stage && cube) {
    let dragging = false;
    let startX = 0, startY = 0;
    let rotX = -20, rotY = 35;

    const pointerDown = (e) => {
      dragging = true;
      stage.classList.add("dragging");
      startX = e.clientX;
      startY = e.clientY;
      stage.setPointerCapture(e.pointerId);
    };
    const pointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      rotY += dx * 0.4;
      rotX -= dy * 0.4;
      rotX = Math.max(-80, Math.min(80, rotX));
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      startX = e.clientX;
      startY = e.clientY;
    };
    const pointerUp = () => {
      dragging = false;
      stage.classList.remove("dragging");
    };

    stage.addEventListener("pointerdown", pointerDown);
    stage.addEventListener("pointermove", pointerMove);
    stage.addEventListener("pointerup", pointerUp);
    stage.addEventListener("pointerleave", pointerUp);
  }

  /* Formulario de contacto: abre el cliente de correo con los datos rellenados
     (sin backend ni servicios de terceros — pensado para arrancar rápido) */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      const subject = encodeURIComponent(`Contacto desde la web — ${nombre}`);
      const body = encodeURIComponent(`${mensaje}\n\n— ${nombre} (${email})`);
      window.location.href = `mailto:jon.narvaezpdiriarte@gmail.com?subject=${subject}&body=${body}`;

      formNote.textContent = "Se abrirá tu programa de correo con el mensaje ya preparado.";
    });
  }
})();
