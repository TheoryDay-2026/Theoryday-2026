// Load shared header into the page
(function() {
  function loadHeader() {
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) {
      console.error('Page container not found');
      return;
    }

    // Use XMLHttpRequest for better compatibility
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'header.html', true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Insert header at the beginning of page-container
        pageContainer.insertAdjacentHTML('afterbegin', xhr.responseText);
        
        // Set active link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
          }
        });
        
        // Mobile hamburger toggle
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
          toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
          });
        }
      } else {
        console.error('Failed to load header. Status:', xhr.status);
      }
    };
    
    xhr.onerror = function() {
      console.error('Error loading header:', xhr.statusText);
    };
    
    xhr.send();
  }

  // Load header immediately since script is at end of page-container
  loadHeader();
})();
