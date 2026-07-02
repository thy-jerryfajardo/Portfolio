// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const siteLoader = document.getElementById("siteLoader");
if (siteLoader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      siteLoader.classList.add("hidden");
    }, 650);
  });
}

if (menuToggle && navLinks) {
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
}

// Mouse tracking gradient background
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--mx", e.clientX + "px");
  document.body.style.setProperty("--my", e.clientY + "px");
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reading progress bar
const progressBar = document.getElementById("progressBar");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// Animated counter for stats
function animateCounters() {
  const counters = document.querySelectorAll(".counter[data-target]");
  counters.forEach((counter) => {
    const target = parseFloat(counter.dataset.target);
    const duration = 1200;
    const start = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(startValue + (target - startValue) * easeOutQuad);
      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = Math.floor(target) + (target === 100 ? "%" : "+");
      }
    };

    if (!counter.dataset.animated) {
      counter.dataset.animated = "true";
      updateCounter();
    }
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.classList.contains("stats-grid")) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector(".stats-grid");
if (statsGrid) {
  counterObserver.observe(statsGrid);
}

// Floating tech badges
const techStack = ["React", "Node.js", "TypeScript", "Python", "Docker", "PostgreSQL", "Vercel", "Firebase"];
const floatingContainer = document.body;

function createFloatingBadge() {
  if (Math.random() > 0.6) return;

  const badge = document.createElement("div");
  badge.className = "floating-badge";
  badge.textContent = techStack[Math.floor(Math.random() * techStack.length)];

  const randomX = Math.random() * window.innerWidth;
  const randomDuration = 6 + Math.random() * 4;
  const randomTx = (Math.random() - 0.5) * 100;

  badge.style.left = randomX + "px";
  badge.style.top = window.innerHeight + "px";
  badge.style.setProperty("--tx", randomTx + "px");
  badge.style.animationDuration = randomDuration + "s";

  floatingContainer.appendChild(badge);

  setTimeout(() => badge.remove(), randomDuration * 1000);
}

setInterval(createFloatingBadge, 3000);

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
if (storedTheme === "dark") {
  document.body.classList.add("dark");
}
function bindThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) {
    return;
  }

  toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "🌙" : "☀️";
    toggleFireflies(isDark);
  });
}

let fireflyIntervalId = null;

function createFirefly() {
  const firefly = document.createElement("div");
  firefly.className = "firefly";

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const deltaX = (Math.random() - 0.5) * 260;
  const deltaY = (Math.random() - 0.5) * 180;
  const duration = 8 + Math.random() * 6;
  const size = 4 + Math.random() * 4;

  firefly.style.left = startX + "px";
  firefly.style.top = startY + "px";
  firefly.style.setProperty("--dx", deltaX + "px");
  firefly.style.setProperty("--dy", deltaY + "px");
  firefly.style.setProperty("--fly-duration", duration + "s");
  firefly.style.width = size + "px";
  firefly.style.height = size + "px";

  document.body.appendChild(firefly);

  setTimeout(() => firefly.remove(), duration * 1000);
}

function toggleFireflies(enabled) {
  document.querySelectorAll(".firefly").forEach((fly) => fly.remove());

  if (fireflyIntervalId) {
    clearInterval(fireflyIntervalId);
    fireflyIntervalId = null;
  }

  if (enabled) {
    for (let index = 0; index < 8; index += 1) {
      setTimeout(createFirefly, index * 300);
    }
    fireflyIntervalId = setInterval(createFirefly, 1800);
  }
}

function syncThemeEffects() {
  toggleFireflies(document.body.classList.contains("dark"));
}

if (document.querySelector(".site-header")) {
  bindThemeToggle();
  syncThemeEffects();
}

document.addEventListener("navbar:loaded", () => {
  bindThemeToggle();
  syncThemeEffects();
});

// Scroll tracking and back-to-top
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");
const pageName = window.location.pathname.split("/").pop();
const isHomePage = pageName === "" || pageName === "index.html";

function onScrollUpdate() {
  if (isHomePage) {
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
  }
  if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 320);
  }
}

window.addEventListener("scroll", onScrollUpdate);
onScrollUpdate();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

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

if (contactForm && formStatus) {
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
}

// Random text generator on landing page
const randomTextBtn = document.getElementById("randomTextBtn");
const randomTextOutput = document.getElementById("randomTextOutput");
const randomPrompts = [
  "Build a clean dashboard UI that improves conversion by 20% for a SaaS product.",
  "Create an AI assistant prompt that summarizes support tickets by urgency and sentiment.",
  "Design a landing page experiment to increase sign-ups with social proof and clear CTAs.",
  "Generate a backend API strategy for handling 10k daily requests with low latency.",
  "Write a product requirement for an AI feature that personalizes user onboarding."
];

if (randomTextBtn && randomTextOutput) {
  randomTextBtn.addEventListener("click", () => {
    const index = Math.floor(Math.random() * randomPrompts.length);
    randomTextOutput.textContent = randomPrompts[index];
  });
}

// Random rotating role text under name
const heroRole = document.getElementById("heroRole");
const heroRoleDescription = document.getElementById("heroRoleDescription");
const roleData = [
  {
    title: "Full Stack Developer",
    description: "I build scalable frontends and robust backends that deliver high-performance user experiences."
  },
  {
    title: "System Analyst",
    description: "I analyze business workflows, map requirements, and design efficient systems that solve real problems."
  },
  {
    title: "AI Prompting Specialist",
    description: "I craft high-quality AI prompts and workflows to improve automation, productivity, and decision-making."
  }
];
if (heroRole && heroRoleDescription) {
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typeDelay = 70;
  const deleteDelay = 45;
  const holdDelay = 1400;

  function typeRole() {
    const currentText = roleData[roleIndex].title;
    if (!deleting) {
      charIndex += 1;
      heroRole.textContent = currentText.slice(0, charIndex);
      if (charIndex === currentText.length) {
        heroRoleDescription.textContent = roleData[roleIndex].description;
        deleting = true;
        setTimeout(typeRole, holdDelay);
        return;
      }
      setTimeout(typeRole, typeDelay);
    } else {
      charIndex -= 1;
      heroRole.textContent = currentText.slice(0, Math.max(charIndex, 0));
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roleData.length;
        setTimeout(typeRole, 1000);
        return;
      }
      setTimeout(typeRole, deleteDelay);
    }
  }

  heroRole.textContent = "";
  heroRoleDescription.textContent = roleData[0].description;
  typeRole();
}

// Lazy loading for project images
const lazyImages = document.querySelectorAll(".lazy-image");
if ("IntersectionObserver" in window && lazyImages.length > 0) {
  const imageObserver = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        image.classList.add("loaded");
        observerRef.unobserve(image);
      }
    });
  }, { rootMargin: "120px 0px" });
  lazyImages.forEach((img) => imageObserver.observe(img));
} else {
  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
    img.classList.add("loaded");
  });
}

// Ripple effect on buttons
document.querySelectorAll(".btn-ripple").forEach((button) => {
  button.addEventListener("click", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.width = "0";
    ripple.style.height = "0";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,.5)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.transform = "translate(-50%, -50%)";

    button.style.position = "relative";
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Chat widget removed per user request.
// The site no longer includes the AI chat widget or client-side chat UI.
