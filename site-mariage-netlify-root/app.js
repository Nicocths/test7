const content = window.WEDDING_CONTENT;

const NAV_ITEMS = [
  ["Accueil", "index.html"],
  ["Notre histoire", "histoire.html"],
  ["Jour J", "jour-j.html"],
  ["Accès", "acces.html"],
  ["Hébergement", "hebergement.html"],
  ["RSVP", "rsvp.html"],
  ["Liste", "liste.html"],
];

function pageName() {
  const file = window.location.pathname.split("/").pop();
  return file || "index.html";
}

function makeWhatsAppMessage(lines) {
  const filtered = lines.filter(Boolean).join("\n");
  return `https://wa.me/${content.couple.whatsapp}?text=${encodeURIComponent(filtered)}`;
}

function renderShell() {
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");
  const current = pageName();

  if (header) {
    header.innerHTML = `
      <div class="brand-block">
        <a class="brand-link" href="index.html">${content.couple.shortNames}</a>
        <p>${content.couple.date} • ${content.couple.venue}</p>
      </div>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Ouvrir le menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav">
        ${NAV_ITEMS.map(
          ([label, href]) =>
            `<a href="${href}" class="${current === href ? "active" : ""}">${label}</a>`
        ).join("")}
      </nav>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div>
        <h3>${content.couple.shortNames}</h3>
        <p>${content.couple.date} • ${content.couple.venue}</p>
      </div>
      <div>
        <p>Contact WhatsApp</p>
        <a href="https://wa.me/${content.couple.whatsapp}" target="_blank" rel="noreferrer">
          ${content.couple.whatsappDisplay}
        </a>
      </div>
      <div>
        <p>Lieu</p>
        <a href="${content.venue.mapLink}" target="_blank" rel="noreferrer">${content.venue.address}</a>
      </div>
    `;
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }
}

function fillBasics() {
  document.querySelectorAll("[data-whatsapp-display]").forEach((el) => {
    el.textContent = content.couple.whatsappDisplay;
  });

  const dressCodeTitle = document.querySelector("[data-dress-code-title]");
  const dressCodeText = document.querySelector("[data-dress-code-text]");
  const updateHint = document.querySelector("[data-update-hint]");
  const lodgingCapacity = document.querySelector("[data-lodging-capacity]");

  if (dressCodeTitle) dressCodeTitle.textContent = content.editableNotes.dressCodeTitle;
  if (dressCodeText) dressCodeText.textContent = content.editableNotes.dressCodeText;
  if (updateHint) updateHint.textContent = content.editableNotes.updateHint;
  if (lodgingCapacity) lodgingCapacity.textContent = content.lodging.capacityNote;
}

function renderGallery() {
  const target = document.querySelector("[data-gallery]");
  if (!target) return;
  target.innerHTML = content.gallery
    .map(
      (item) => `
        <article class="photo-card reveal">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="photo-copy">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderStory() {
  const target = document.querySelector("[data-story]");
  if (!target) return;
  target.innerHTML = content.story
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <p class="timeline-year">${item.year}</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderSchedule() {
  const target = document.querySelector("[data-schedule]");
  if (!target) return;
  target.innerHTML = content.schedule
    .map(
      (item) => `
        <article class="schedule-item reveal">
          <p class="schedule-time">${item.time}</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderFaq() {
  const target = document.querySelector("[data-faq]");
  if (!target) return;
  target.innerHTML = content.faq
    .map(
      (item, index) => `
        <details class="faq-item reveal" ${index === 0 ? "open" : ""}>
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join("");
}

function renderPricing() {
  const target = document.querySelector("[data-pricing]");
  if (!target) return;
  target.innerHTML = content.lodging.pricing
    .map(
      (item) => `
        <article class="price-card reveal">
          <p class="price-label">${item.label}</p>
          <h3>${item.price}</h3>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderRooms() {
  const target = document.querySelector("[data-rooms]");
  if (!target) return;
  target.innerHTML = content.lodging.rooms
    .map(
      (room) => `
        <article class="room-card reveal">
          <img src="${room.image}" alt="${room.name}" loading="lazy">
          <div class="room-copy">
            <p class="room-capacity">${room.capacity}</p>
            <h3>${room.name}</h3>
            <p>${room.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderVenueInfo() {
  const list = document.querySelector("[data-directions]");
  if (!list) return;
  list.innerHTML = content.venue.directions.map((item) => `<li>${item}</li>`).join("");
}

function setupCountdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;
  const weddingDate = new Date(content.couple.dateIso).getTime();

  function update() {
    const now = Date.now();
    const diff = weddingDate - now;
    if (diff <= 0) {
      el.textContent = "Le grand jour est arrivé";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    el.textContent = `${days} jours avant le mariage`;
  }

  update();
  window.setInterval(update, 60_000);
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupRsvp() {
  const form = document.querySelector("[data-rsvp-form]");
  const cta = document.querySelector("[data-rsvp-send]");
  const preview = document.querySelector("[data-rsvp-preview]");
  if (!form || !cta || !preview) return;

  function sync() {
    const data = new FormData(form);
    const message = [
      `Bonjour ${content.couple.shortNames},`,
      `Réponse mariage : ${data.get("presence")}`,
      data.get("guestName") ? `Nom : ${data.get("guestName")}` : "",
      data.get("count") ? `Nombre de personnes : ${data.get("count")}` : "",
      data.get("lodging") ? `Option chambre : ${data.get("lodging")}` : "",
      data.get("allergies") ? `Allergies / régime : ${data.get("allergies")}` : "",
      data.get("note") ? `Message : ${data.get("note")}` : "",
    ];

    preview.textContent = message.filter(Boolean).join("\n");
    cta.href = makeWhatsAppMessage(message);
  }

  form.addEventListener("input", sync);
  form.addEventListener("change", sync);
  sync();
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  fillBasics();
  renderGallery();
  renderStory();
  renderSchedule();
  renderFaq();
  renderPricing();
  renderRooms();
  renderVenueInfo();
  setupCountdown();
  setupRsvp();
  setupReveal();
});
