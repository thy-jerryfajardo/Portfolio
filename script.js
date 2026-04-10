// Handles mobile navigation toggle and menu close on link click
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

// Updates footer year dynamically
document.getElementById("year").textContent = new Date().getFullYear();

// Adds subtle reveal animation when sections scroll into view
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

// Adds 3D tilt interaction to project cards
const tiltCards = document.querySelectorAll(".tilt-card");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Toggles light/dark theme
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Draws a simple animated 3D world + mouse trail on canvas
const bgCanvas = document.getElementById("interactiveBg");
const bgCtx = bgCanvas.getContext("2d");

let viewportWidth = 0;
let viewportHeight = 0;
const worldPoints = [];
const trailPoints = [];
let worldTime = 0;

function resizeCanvas() {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  bgCanvas.width = viewportWidth * window.devicePixelRatio;
  bgCanvas.height = viewportHeight * window.devicePixelRatio;
  bgCanvas.style.width = `${viewportWidth}px`;
  bgCanvas.style.height = `${viewportHeight}px`;
  bgCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function initWorldPoints() {
  worldPoints.length = 0;
  for (let i = 0; i < 90; i += 1) {
    const angle = (Math.PI * 2 * i) / 90;
    worldPoints.push({
      angle,
      radius: 140 + Math.sin(i) * 12,
      z: Math.cos(i * 0.4) * 50
    });
  }
}

function addTrailPoint(x, y) {
  trailPoints.push({ x, y, life: 1 });
  if (trailPoints.length > 28) {
    trailPoints.shift();
  }
}

function drawFrame() {
  worldTime += 0.012;
  bgCtx.clearRect(0, 0, viewportWidth, viewportHeight);

  const isDark = document.body.classList.contains("dark");
  const cx = viewportWidth * 0.78;
  const cy = viewportHeight * 0.28;
  const worldColor = isDark ? "99, 102, 241" : "79, 70, 229";
  const trailColor = isDark ? "56, 189, 248" : "34, 197, 94";

  // World core glow
  const glow = bgCtx.createRadialGradient(cx, cy, 8, cx, cy, 120);
  glow.addColorStop(0, `rgba(${worldColor}, 0.38)`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  bgCtx.fillStyle = glow;
  bgCtx.beginPath();
  bgCtx.arc(cx, cy, 130, 0, Math.PI * 2);
  bgCtx.fill();

  // World ring points with pseudo-3D projection
  worldPoints.forEach((point, index) => {
    const spin = point.angle + worldTime;
    const x3d = Math.cos(spin) * point.radius;
    const y3d = Math.sin(spin) * point.radius * 0.45;
    const z3d = point.z + Math.sin(worldTime + index * 0.08) * 35;
    const depth = (z3d + 160) / 320;
    const px = cx + x3d * (0.75 + depth * 0.45);
    const py = cy + y3d * (0.6 + depth * 0.6);
    const size = 1.2 + depth * 2.4;
    const alpha = 0.12 + depth * 0.38;

    bgCtx.fillStyle = `rgba(${worldColor}, ${alpha})`;
    bgCtx.beginPath();
    bgCtx.arc(px, py, size, 0, Math.PI * 2);
    bgCtx.fill();
  });

  // Mouse trail rendering
  for (let i = trailPoints.length - 1; i >= 0; i -= 1) {
    const point = trailPoints[i];
    point.life -= 0.022;
    if (point.life <= 0) {
      trailPoints.splice(i, 1);
      continue;
    }
    const radius = 3 + point.life * 12;
    bgCtx.fillStyle = `rgba(${trailColor}, ${point.life * 0.24})`;
    bgCtx.beginPath();
    bgCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    bgCtx.fill();
  }

  requestAnimationFrame(drawFrame);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => addTrailPoint(event.clientX, event.clientY));
window.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  if (touch) {
    addTrailPoint(touch.clientX, touch.clientY);
  }
}, { passive: true });

resizeCanvas();
initWorldPoints();
drawFrame();
