// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal-on-scroll animation
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.16 });
revealElements.forEach((el) => observer.observe(el));

// Card tilt interaction
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Theme toggle with persistence
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") document.body.classList.add("dark");
themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});

// Scroll tracking and back-to-top
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");

function onScrollUpdate() {
  const marker = window.scrollY + 130;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (marker >= top && marker < bottom) {
      navAnchors.forEach((a) => a.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (active) active.classList.add("active");
    }
  });
  backToTop.classList.toggle("show", window.scrollY > 320);
}

window.addEventListener("scroll", onScrollUpdate);
onScrollUpdate();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const match = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden-card", !match);
    });
  });
});

// Contact form feedback
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button[type='submit']");
  button.disabled = true;
  formStatus.textContent = "Thanks! Your message has been recorded.";
  setTimeout(() => {
    contactForm.reset();
    button.disabled = false;
    formStatus.textContent = "";
  }, 1800);
});
