# Capitán Narváez — web

Web de una sola página para Jon Narváez (Capitán Narváez), hecha en HTML, CSS y JavaScript puro — sin frameworks ni pasos de instalación. Se puede abrir tal cual o publicar en cualquier hosting gratuito.

## Estructura

```
index.html        → todo el contenido y las secciones
css/styles.css     → estilos, colores, tipografía
js/main.js         → menú móvil, animaciones al hacer scroll, cubo 3D arrastrable, formulario
assets/            → carpeta vacía, lista para tus fotos/renders cuando los tengas
```

## Ver la web en tu ordenador

Basta con hacer doble clic en `index.html` y se abre en el navegador. No hace falta instalar nada.

## Qué es "de verdad" y qué es un placeholder

Ahora mismo no tienes logo, fotos de proyectos ni redes sociales, así que la web usa marcadores provisionales pensados para sustituirse fácilmente más adelante:

- **Proyectos**: las 6 tarjetas de la sección "Proyectos" muestran un cubo animado en vez de una foto real. Cuando tengas renders o fotos de un proyecto, en `index.html` busca cada `<article class="project-card">` y cambia el `<div class="mini-cube"></div>` por una imagen, por ejemplo:
  ```html
  <div class="project-visual">
    <img src="assets/proyecto-01.jpg" alt="Nombre del proyecto">
  </div>
  ```
  También puedes cambiar el título "Proyecto próximamente" y las etiquetas (Modelado 3D, Render, etc.) por las reales.

- **Redes sociales**: en la sección de Contacto, los iconos de Instagram y LinkedIn apuntan a `href="#"`. Busca `<ul class="social-links">` en `index.html` y sustituye el `#` por el enlace real de cada perfil.

- **Blog**: la sección "Blog" solo tiene un aviso de "Próximamente". Cuando tengas artículos, lo más sencillo (sin backend) es añadir tarjetas parecidas a las de Proyectos; si más adelante quieres publicar con más frecuencia, ahí ya conviene un blog con gestor de contenido.

## Textos

Todo el texto (Sobre mí, Servicios, etc.) es un primer borrador basado en lo que contaste en el briefing. Puedes cambiarlo directamente en `index.html` — es texto normal, no hace falta tocar el CSS ni el JS.

## Formulario de contacto

El formulario no usa ningún servidor: al enviarlo, abre el programa de correo de quien lo rellena con el mensaje ya escrito, dirigido a tu email. Es la forma más simple de tener un formulario funcionando sin cuentas ni configuración.

Si más adelante prefieres que el mensaje llegue directo a tu bandeja sin que se abra un programa de correo, se puede conectar en pocos minutos a un servicio gratuito como Formspree — es un cambio pequeño y no rompe nada de lo demás.

## WhatsApp y teléfono

El botón de WhatsApp y el enlace de "Llamar por teléfono" usan tu número (+34 616 88 98 97). Si algún día lo cambias, búscalo en `index.html` (aparece como `34616889897` en varios sitios) y sustitúyelo.

## Publicar la web gratis

La forma más rápida, sin saber de servidores:

1. Entra en [netlify.com](https://www.netlify.com) y crea una cuenta gratuita.
2. Arrastra la carpeta del proyecto entera a la web de Netlify.
3. En segundos te da una dirección tipo `algo.netlify.app` ya funcionando.

Alternativas igual de válidas y gratuitas: Vercel o GitHub Pages.

## Sobre el dominio "Capitán Narváez"

Marcaste que te gustaría ese nombre de dominio. Una vez publicada la web (paso anterior), puedes comprar el dominio en cualquier registrador (Namecheap, GoDaddy, IONOS, etc. — hay muchos, no hace falta uno en concreto) y conectarlo siguiendo las instrucciones del propio hosting (Netlify/Vercel tienen guías paso a paso para esto).

## Próximos pasos sugeridos

1. Revisar y ajustar los textos a tu gusto.
2. Reunir fotos/renders de 2-3 proyectos para sustituir los primeros placeholders — con eso la web ya deja de parecer "vacía".
3. Publicar en Netlify (gratis) para tener una versión visible mientras decides el dominio.
4. Cuando tengas logo o quieras cuidar más la marca, se puede sustituir el nombre de texto del menú por una imagen de logo.
