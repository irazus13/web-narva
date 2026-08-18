(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Año en el footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  const loaderCount = document.getElementById("loaderCount");

  function finishLoader() {
    if (loader) loader.classList.add("is-done");
    const heroH1 = document.querySelector(".hero h1.scramble");
    if (heroH1) scrambleReveal(heroH1);
  }

  if (loader && loaderCount) {
    if (prefersReduced) {
      loaderCount.textContent = "100";
      finishLoader();
    } else {
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        loaderCount.textContent = String(Math.floor(t * 100));
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          loaderCount.textContent = "100";
          setTimeout(finishLoader, 200);
        }
      };
      requestAnimationFrame(tick);
    }
  }

  /* ---------- Cabecera: fondo al hacer scroll ---------- */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
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

  /* ---------- Texto que se "materializa" (scramble) ---------- */
  function scrambleReveal(el, duration = 800) {
    if (prefersReduced) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    const originals = nodes.map((n) => n.nodeValue);
    const start = performance.now();

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      nodes.forEach((n, i) => {
        const original = originals[i];
        const revealCount = Math.floor(original.length * t);
        let out = "";
        for (let c = 0; c < original.length; c++) {
          const ch = original[c];
          if (ch === " " || ch === "\n" || c < revealCount) out += ch;
          else out += chars[(Math.random() * chars.length) | 0];
        }
        n.nodeValue = out;
      });
      if (t < 1) requestAnimationFrame(frame);
      else nodes.forEach((n, i) => (n.nodeValue = originals[i]));
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Reveal on scroll (+ scramble en títulos) ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          const heading = entry.target.matches(".scramble")
            ? entry.target
            : entry.target.querySelector(".scramble");
          if (heading) scrambleReveal(heading);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Cursor personalizado ---------- */
  if (fineHover && !prefersReduced) {
    const cursorDot = document.getElementById("cursorDot");
    const cursorRing = document.getElementById("cursorRing");
    if (cursorDot && cursorRing) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX, ringY = mouseY;

      window.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      });

      function ringLoop() {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(ringLoop);
      }
      requestAnimationFrame(ringLoop);

      document.querySelectorAll("a, button, .project-row").forEach((el) => {
        el.addEventListener("mouseenter", () => cursorRing.classList.add("is-hover"));
        el.addEventListener("mouseleave", () => cursorRing.classList.remove("is-hover"));
      });
    }
  }

  /* ---------- Botones magnéticos ---------- */
  if (!prefersReduced) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * 0.22}px, ${relY * 0.32}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Lista de proyectos: preview flotante que sigue al cursor ---------- */
  const projectsList = document.getElementById("projectsList");
  const preview = document.getElementById("projectPreview");
  const previewCube = document.getElementById("previewCube");
  if (projectsList && preview && fineHover) {
    let px = 0, py = 0, tx = 0, ty = 0;
    let active = false;

    projectsList.querySelectorAll(".project-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        active = true;
        preview.classList.add("is-visible");
        if (previewCube) previewCube.style.setProperty("--hue", row.style.getPropertyValue("--hue"));
      });
      row.addEventListener("mouseleave", () => {
        active = false;
        preview.classList.remove("is-visible");
      });
    });

    projectsList.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function previewLoop() {
      px += (tx - px) * 0.18;
      py += (ty - py) * 0.18;
      if (active || Math.abs(tx - px) > 0.5 || Math.abs(ty - py) > 0.5) {
        preview.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${active ? 1 : 0.6})`;
      }
      requestAnimationFrame(previewLoop);
    }
    requestAnimationFrame(previewLoop);
  }

  /* ---------- Escena 3D del hero (Three.js) ---------- */
  function initHeroScene() {
    const canvas = document.getElementById("heroCanvas");
    const heroSection = document.getElementById("inicio");
    if (!canvas || !heroSection || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const accent = new THREE.Color(0xff5a2e);
    const soft = new THREE.Color(0x948c7f);

    const group = new THREE.Group();
    const meshes = [];
    const shapeCount = 16;
    for (let i = 0; i < shapeCount; i++) {
      const size = 0.4 + Math.random() * 1.3;
      const geo = new THREE.IcosahedronGeometry(size, 0);
      const edges = new THREE.EdgesGeometry(geo);
      const isAccent = i % 4 === 0;
      const mat = new THREE.LineBasicMaterial({
        color: isAccent ? accent : soft,
        transparent: true,
        opacity: isAccent ? 0.85 : 0.3,
      });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 8
      );
      mesh.userData.spin = 0.15 + Math.random() * 0.35;
      mesh.userData.axis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
      group.add(mesh);
      meshes.push(mesh);
    }
    scene.add(group);

    function resize() {
      const w = heroSection.clientWidth;
      const h = heroSection.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener("resize", resize);

    let mouseX = 0, mouseY = 0;
    window.addEventListener("pointermove", (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    });

    let visible = true;
    document.addEventListener("visibilitychange", () => {
      visible = document.visibilityState === "visible";
      if (visible && !prefersReduced) requestAnimationFrame(animate);
    });

    function animate() {
      if (!visible) return;
      meshes.forEach((mesh) => mesh.rotateOnAxis(mesh.userData.axis, mesh.userData.spin * 0.012));
      group.rotation.y += (mouseX * 0.6 - group.rotation.y) * 0.02;
      group.rotation.x += (mouseY * 0.4 - group.rotation.x) * 0.02;
      renderer.render(scene, camera);
      if (!prefersReduced) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
  initHeroScene();

  /* ---------- Formulario de contacto: abre el cliente de correo ---------- */
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
