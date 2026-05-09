const config = {
  whatsappNumber: "5215512345678", // Cambia este numero por el real.
  books: [
    {
      title: "Libro 1",
      subtitle: "Una aventura inolvidable",
      image: "imagenes/portada 1.png",
      description:
        "Una historia emocionante sobre amistad, retos y valentia que atrapa desde la primera pagina.",
      price: "$199 MXN",
    },
    {
      title: "Libro 2",
      subtitle: "El secreto del bosque",
      image: "imagenes/libro-2.jpg",
      description:
        "Misterio, fantasia y descubrimientos en una narracion ideal para lectores curiosos.",
      price: "$219 MXN",
    },
    {
      title: "Libro 3",
      subtitle: "Cartas para el futuro",
      image: "imagenes/libro-3.jpg",
      description:
        "Relatos con mensaje positivo que invitan a sonar, crear y creer en uno mismo.",
      price: "$229 MXN",
    },
  ],
};

const bookGrid = document.getElementById("bookGrid");
const heroWhatsapp = document.getElementById("heroWhatsapp");
const bundleWhatsapp = document.getElementById("bundleWhatsapp");
const stickyWhatsapp = document.getElementById("stickyWhatsapp");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

function whatsappLink(text) {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function renderBooks() {
  config.books.forEach((book, index) => {
    const card = document.createElement("article");
    card.className = "book-card";

    card.innerHTML = `
      <div class="cover cover-${index + 1}">
        ${book.image ? `<img class="cover-media" src="${book.image}" alt="Portada de ${book.title}" loading="lazy" />` : ""}
        <span class="cover-label">${book.subtitle}</span>
      </div>
      <div class="book-body">
        <h3>${book.title}</h3>
        <p>${book.description}</p>
        <span class="price">${book.price}</span>
        <a class="btn btn-outline" href="${whatsappLink(
          `Hola, quiero informacion de ${book.title}`
        )}" target="_blank" rel="noopener noreferrer">Solicitar este libro</a>
      </div>
    `;

    bookGrid.appendChild(card);
  });
}

function revealCardsOnScroll() {
  const cards = document.querySelectorAll(".book-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("show"), i * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach((card) => observer.observe(card));
}

function bindStaticLinks() {
  heroWhatsapp.href = whatsappLink("Hola, me interesa comprar los libros de David Tenza");
  heroWhatsapp.target = "_blank";
  heroWhatsapp.rel = "noopener noreferrer";

  bundleWhatsapp.href = whatsappLink(
    "Hola, me interesa comprar la coleccion completa de libros de David Tenza"
  );
  bundleWhatsapp.target = "_blank";
  bundleWhatsapp.rel = "noopener noreferrer";

  stickyWhatsapp.href = whatsappLink(
    "Hola, quiero informacion para comprar los libros de David Tenza"
  );
  stickyWhatsapp.target = "_blank";
  stickyWhatsapp.rel = "noopener noreferrer";

  yearEl.textContent = String(new Date().getFullYear());
}

function bindContactForm() {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre");
    const correo = formData.get("correo");
    const mensaje = formData.get("mensaje");

    const subject = "Consulta desde la web de Libros de David Tenza";
    const body = `Nombre: ${nombre}%0D%0ACorreo: ${correo}%0D%0A%0D%0AMensaje:%0D%0A${encodeURIComponent(
      String(mensaje)
    )}`;

    window.location.href = `mailto:tu-correo@ejemplo.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
}

renderBooks();
revealCardsOnScroll();
bindStaticLinks();
bindContactForm();
