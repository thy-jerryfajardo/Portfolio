// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

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

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
if (themeToggle) {
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "🌙" : "☀️";
  });
}

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
