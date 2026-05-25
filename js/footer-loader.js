// Load footer into all pages
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Determine the correct path to footer.html based on current page location
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const footerPath = isHomePage ? './components/footer.html' : '../components/footer.html';

    const response = await fetch(footerPath);
    const footerHTML = await response.text();

    // Insert footer before closing body tag
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = footerHTML;
    document.body.appendChild(tempDiv.firstElementChild);

    // Set current year in footer
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }

    // Re-attach back-to-top functionality
    attachBackToTop();
  } catch (error) {
    console.error('Failed to load footer:', error);
  }
});

// Back to top button functionality
function attachBackToTop() {
  const backToTopButton = document.getElementById('backToTop');

  if (!backToTopButton) return;

  // Show/hide button based on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Smooth scroll to top
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
