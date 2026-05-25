// Reference Card Interactive Border Effect
document.addEventListener('DOMContentLoaded', () => {
  const referenceCards = document.querySelectorAll('.reference-card');

  referenceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate angle for gradient
      const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);

      // Update gradient based on mouse position
      card.style.setProperty('--border-angle', `${angle}deg`);

      // Add active hover class
      card.classList.add('active-hover');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('active-hover');
    });

    // Initial setup
    card.style.setProperty('--border-angle', '45deg');
  });

  // Glow effect on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'float 3s ease-in-out infinite';
      }
    });
  }, observerOptions);

  referenceCards.forEach(card => observer.observe(card));
});
