// Theme Toggle Logic
const themeToggle = document.querySelector(".theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
} else {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectsTitle = document.getElementById("projects-title");
const modal = document.querySelector(".project-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalClose = document.querySelector(".modal-close");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");

function closeNav() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("is-open") &&
      !event.target.closest(".site-header")
    ) {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 641px)").matches) {
      closeNav();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    if (projectsTitle) {
      if (filter === "all") {
        projectsTitle.textContent = "Projects";
      } else {
        projectsTitle.textContent = button.textContent;
      }
    }

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

projectCards.forEach((card) => {
  card.addEventListener("dblclick", () => {
    modalImage.src = card.dataset.image;
    modalImage.alt = `${card.dataset.title} preview`;
    modalTitle.textContent = card.dataset.title;
    document.body.classList.add("modal-open");
    modal.showModal();
  });
});

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.open) {
    document.body.classList.remove("modal-open");
  }
});

// Scroll Reveal Animation using Intersection Observer
const revealItems = document.querySelectorAll(".reveal-item");
if (revealItems.length > 0) {
  const observerOptions = {
    root: null,
    threshold: 0.08,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}
