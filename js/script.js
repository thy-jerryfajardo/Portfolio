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

// AI Chatbot Widget
class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isLoading = false;
    this.init();
  }

  init() {
    this.createWidget();
    this.setupEventListeners();
    this.loadChatHistory();
    // Show welcome only if no chat history exists
    if (this.messages.length === 0) {
      this.showWelcomeMessage();
    }
  }

  createWidget() {
    // Create toggle button with tooltip
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "chat-toggle-btn";
    toggleBtn.textContent = "💬";
    toggleBtn.setAttribute("aria-label", "Open Dan chatbot");
    toggleBtn.title = "Chat with Dan";
    document.body.appendChild(toggleBtn);

    // Create chat container
    const container = document.createElement("div");
    container.className = "chatbot-container";
    container.innerHTML = `
      <div class="chat-header">
        <h3>✨ Dan</h3>
        <button class="chat-close-btn" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-messages"></div>
      <div class="chat-input-area">
        <input
          type="text"
          id="chatInput"
          placeholder="Ask me anything about my work..."
          aria-label="Chat message input"
        />
        <button id="chatSendBtn" aria-label="Send message">Send</button>
      </div>
    `;
    document.body.appendChild(container);

    this.toggleBtn = toggleBtn;
    this.container = container;
    this.messagesDiv = container.querySelector(".chat-messages");
    this.input = container.querySelector("#chatInput");
    this.sendBtn = container.querySelector("#chatSendBtn");
    this.closeBtn = container.querySelector(".chat-close-btn");
  }

  showWelcomeMessage() {
    const welcomeEl = document.createElement("div");
    welcomeEl.className = "chat-message assistant";
    const bubble = document.createElement("div");
    bubble.className = "chat-message-bubble";
    bubble.textContent = "👋 Hi! I'm Dan, your AI assistant. Ask me anything about Jerry's skills, projects, and experience!";
    welcomeEl.appendChild(bubble);
    this.messagesDiv.appendChild(welcomeEl);
  }

  setupEventListeners() {
    // Toggle chat
    this.toggleBtn.addEventListener("click", () => this.toggleChat());
    this.closeBtn.addEventListener("click", () => this.closeChat());

    // Send message
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    this.isOpen = true;
    this.container.classList.add("open");
    this.toggleBtn.classList.add("hidden");
    this.input.focus();
  }

  closeChat() {
    this.isOpen = false;
    this.container.classList.remove("open");
    this.toggleBtn.classList.remove("hidden");
  }

  async sendMessage() {
    const message = this.input.value.trim();

    if (!message) {
      return;
    }

    if (this.isLoading) {
      return;
    }

    // Display user message
    this.displayMessage(message, "user");
    this.input.value = "";
    this.isLoading = true;
    this.sendBtn.disabled = true;

    // Show typing indicator
    this.showTypingIndicator();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        const errorMsg = errorData.error || `API error: ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (data.success) {
        this.displayMessage(data.reply, "assistant");
        this.saveChatHistory();
      } else {
        this.displayMessage(
          data.error || "Sorry, I couldn't process that. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "Sorry, there was an issue with the chat. ";

      if (error.message.includes("API error: 500")) {
        errorMessage += "The API isn't properly configured. Please check the environment variables.";
      } else if (error.message.includes("API error: 429")) {
        errorMessage += "Rate limited. Please try again in a moment.";
      } else {
        errorMessage += "Please try again.";
      }

      this.displayMessage(errorMessage, "error");
    } finally {
      this.isLoading = false;
      this.sendBtn.disabled = false;
      this.hideTypingIndicator();
      this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
    }
  }

  displayMessage(text, type) {
    const messageEl = document.createElement("div");

    if (type === "error") {
      messageEl.className = "chat-error";
      messageEl.textContent = text;
    } else {
      messageEl.className = `chat-message ${type}`;
      const bubble = document.createElement("div");
      bubble.className = "chat-message-bubble";
      bubble.textContent = text;
      messageEl.appendChild(bubble);

      this.messages.push({ text, type, timestamp: Date.now() });
    }

    this.messagesDiv.appendChild(messageEl);
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }

  showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-message";
    indicator.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    indicator.id = "typingIndicator";
    this.messagesDiv.appendChild(indicator);
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) {
      indicator.remove();
    }
  }

  saveChatHistory() {
    sessionStorage.setItem("chatHistory", JSON.stringify(this.messages));
  }

  loadChatHistory() {
    const saved = sessionStorage.getItem("chatHistory");
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
        this.messages.forEach((msg) => {
          const messageEl = document.createElement("div");
          messageEl.className = `chat-message ${msg.type}`;
          const bubble = document.createElement("div");
          bubble.className = "chat-message-bubble";
          bubble.textContent = msg.text;
          messageEl.appendChild(bubble);
          this.messagesDiv.appendChild(messageEl);
        });
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    }
  }
}

// Initialize chat widget when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ChatWidget();
  });
} else {
  new ChatWidget();
}
