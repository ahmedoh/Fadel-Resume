/**
 * Ahmed Fadel R. Salem - CV Website JavaScript
 * Pure vanilla JavaScript - 100% Static & GitHub Pages Compatible
 * Enhanced with Visual Effects, 3D Tilt, Staggered Reveal, Rolling Counters & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProgressBar();
  initScrollReveal();
  initAnimatedCounters();
  initLivingBackground();
  initFloatingDock();
  initModals();
  initCertFilters();
  initCopyButtons();
  initFooterYear();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   Theme Management (System Preference + LocalStorage)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('ahmed-cv-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (storedTheme) {
    setTheme(storedTheme);
  } else if (systemPrefersDark.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('ahmed-cv-theme', newTheme);
    });
  }

  // React to OS-level theme change if user hasn't manually overridden it
  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('ahmed-cv-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/* --------------------------------------------------------------------------
   Reading Progress Bar
   -------------------------------------------------------------------------- */
function initProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, index) => {
    // Add subtle stagger to siblings
    const delay = (index % 4) * 0.08;
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   Rolling Number Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.counter[data-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;

  const duration = 1400; // ms
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // EaseOutQuad
    const ease = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(ease * target);
    
    el.textContent = current.toString();

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target.toString();
    }
  }

  requestAnimationFrame(updateCount);
}

/* --------------------------------------------------------------------------
   Living Background (Interactive Spotlight on Mouse Move)
   -------------------------------------------------------------------------- */
function initLivingBackground() {
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Floating Quick-Dock (Appears on Scroll)
   -------------------------------------------------------------------------- */
function initFloatingDock() {
  const dock = document.getElementById('floating-dock');
  const dockTopBtn = document.getElementById('dock-top-btn');
  if (!dock) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      dock.classList.add('show');
    } else {
      dock.classList.remove('show');
    }
  }, { passive: true });

  if (dockTopBtn) {
    dockTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   Interactive Modals (PDF Preview, Credential Details, QR Code)
   -------------------------------------------------------------------------- */
function initModals() {
  // Modal Elements
  const pdfModal = document.getElementById('pdf-modal');
  const pdfIframe = document.getElementById('pdf-iframe');
  const navPreviewBtn = document.getElementById('nav-preview-cv-btn');
  const heroPreviewBtn = document.getElementById('hero-preview-cv-btn');
  const dockPreviewBtn = document.getElementById('dock-preview-btn');
  const pdfModalClose = document.getElementById('pdf-modal-close');
  const pdfModalBackdrop = document.getElementById('pdf-modal-backdrop');

  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalBackdrop = document.getElementById('cert-modal-backdrop');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalExpandBtn = document.getElementById('cert-modal-expand-btn');
  const certModalDownloadBtn = document.getElementById('cert-modal-download-btn');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalCategory = document.getElementById('cert-modal-category');
  const certModalBadge = document.getElementById('cert-modal-badge');
  const certModalSkills = document.getElementById('cert-modal-skills');
  const certModalCopyBtn = document.getElementById('cert-modal-copy-btn');
  const certModalFilterBtn = document.getElementById('cert-modal-filter-btn');

  const qrModal = document.getElementById('qr-modal');
  const heroQrBtn = document.getElementById('hero-qr-btn');
  const dockQrBtn = document.getElementById('dock-qr-btn');
  const qrModalClose = document.getElementById('qr-modal-close');
  const qrModalBackdrop = document.getElementById('qr-modal-backdrop');
  const copyQrUrlBtn = document.getElementById('copy-qr-url-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // PDF Preview Modal
  function openPdfModal() {
    if (!pdfIframe.getAttribute('src')) {
      pdfIframe.setAttribute('src', 'assets/cv-ahmed-fadel.pdf');
    }
    openModal(pdfModal);
  }

  if (navPreviewBtn) navPreviewBtn.addEventListener('click', openPdfModal);
  if (heroPreviewBtn) heroPreviewBtn.addEventListener('click', openPdfModal);
  if (dockPreviewBtn) dockPreviewBtn.addEventListener('click', openPdfModal);
  if (pdfModalClose) pdfModalClose.addEventListener('click', () => closeModal(pdfModal));
  if (pdfModalBackdrop) pdfModalBackdrop.addEventListener('click', () => closeModal(pdfModal));

  // Certificate Details Modal
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || card.querySelector('.cert-title')?.innerText;
      const issuer = card.getAttribute('data-issuer') || card.querySelector('.cert-issuer')?.innerText;
      const badge = card.getAttribute('data-badge') || 'Verified Credential';
      const category = card.getAttribute('data-category') || 'general';
      const skillsStr = card.getAttribute('data-skills') || 'Clinical Operations, Professional Communication';
      const certImg = card.getAttribute('data-cert-img');

      // Set Document Preview Image & Links
      if (certModalImg && certImg) {
        certModalImg.src = certImg;
        certModalImg.alt = `${title} Certificate Document`;
      }
      if (certModalExpandBtn && certImg) {
        certModalExpandBtn.href = certImg;
      }
      if (certModalDownloadBtn && certImg) {
        certModalDownloadBtn.href = certImg;
        certModalDownloadBtn.setAttribute('download', certImg.split('/').pop());
      }

      certModalTitle.textContent = title;
      certModalIssuer.textContent = issuer;
      certModalBadge.textContent = badge;

      // Category tag class
      certModalCategory.className = `cert-tag cert-tag-${category}`;
      const categoryLabels = {
        clinical: 'Healthcare & Clinical',
        it: 'IT & Digital',
        sales: 'Sales & Service',
        lang: 'Languages'
      };
      certModalCategory.textContent = categoryLabels[category] || 'Credential';

      // Skills pills
      certModalSkills.innerHTML = '';
      skillsStr.split(',').forEach((skill) => {
        const pill = document.createElement('span');
        pill.className = 'cert-skill-pill';
        pill.textContent = skill.trim();
        certModalSkills.appendChild(pill);
      });

      // Copy credential info
      certModalCopyBtn.onclick = () => {
        const text = `${title} — Issued by ${issuer} (${badge})`;
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied: ${title}`);
        });
      };

      // Filter category shortcut
      certModalFilterBtn.onclick = () => {
        closeModal(certModal);
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (filterBtn) filterBtn.click();
        const certSection = document.getElementById('certifications');
        if (certSection) certSection.scrollIntoView({ behavior: 'smooth' });
      };

      openModal(certModal);
    });
  });

  if (certModalClose) certModalClose.addEventListener('click', () => closeModal(certModal));
  if (certModalBackdrop) certModalBackdrop.addEventListener('click', () => closeModal(certModal));

  // QR Share Modal
  function openQrModal() {
    openModal(qrModal);
  }

  if (heroQrBtn) heroQrBtn.addEventListener('click', openQrModal);
  if (dockQrBtn) dockQrBtn.addEventListener('click', openQrModal);
  if (qrModalClose) qrModalClose.addEventListener('click', () => closeModal(qrModal));
  if (qrModalBackdrop) qrModalBackdrop.addEventListener('click', () => closeModal(qrModal));

  if (copyQrUrlBtn) {
    copyQrUrlBtn.addEventListener('click', () => {
      const urlText = document.getElementById('qr-display-url')?.innerText || window.location.href;
      navigator.clipboard.writeText(urlText).then(() => {
        showToast('Portfolio link copied to clipboard!');
      });
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(pdfModal);
      closeModal(certModal);
      closeModal(qrModal);
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   ScrollSpy Active Nav Highlighting
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   Certificate Category Filters & Live Search
   -------------------------------------------------------------------------- */
function initCertFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');
  const searchInput = document.getElementById('cert-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const counterStatus = document.getElementById('cert-counter-status');
  const noFound = document.getElementById('no-cert-found');
  const resetBtn = document.getElementById('reset-filter-btn');

  let activeCategory = 'all';
  let searchQuery = '';
  const totalCerts = certCards.length;

  function applyFilters() {
    let visibleCount = 0;

    certCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const keywords = (card.getAttribute('data-keywords') || '') + ' ' + card.innerText;
      
      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = !searchQuery || keywords.toLowerCase().includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    if (counterStatus) {
      counterStatus.textContent = `Showing ${visibleCount} of ${totalCerts} credentials`;
    }

    if (noFound) {
      noFound.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      applyFilters();
      searchInput.focus();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) allBtn.click();
    });
  }
}

/* --------------------------------------------------------------------------
   Click to Copy Email & Phone with Toast
   -------------------------------------------------------------------------- */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('copy-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="copy-text">Copied!</span>';
        showToast(`Copied: ${textToCopy}`);

        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        showToast('Failed to copy');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Footer Year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
