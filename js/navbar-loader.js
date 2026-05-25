// Load navbar into all pages
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Determine the correct path to navbar.html based on current page location
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const navbarPath = isHomePage ? './components/navbar.html' : '../components/navbar.html';

    const response = await fetch(navbarPath);
    const navbarHTML = await response.text();
    const headerPlaceholder = document.querySelector('a.skip-link')?.nextElementSibling || document.body.firstElementChild;

    // Insert navbar as second element (after skip-link)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navbarHTML;
    headerPlaceholder.parentNode.insertBefore(tempDiv.firstElementChild, headerPlaceholder);

    // Re-attach menu toggle functionality
    attachMenuToggle();
  } catch (error) {
    console.error('Failed to load navbar:', error);
  }
});

// Menu toggle functionality
function attachMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    });
  }

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Highlight active page
  highlightActivePage();
}

function highlightActivePage() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });
}
