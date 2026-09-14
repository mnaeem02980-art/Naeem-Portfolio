// ==========================================================================
// MUHAMMAD NAEEM PORTFOLIO - FULL ADVANCED SYSTEM LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Toast Notification Helper
  function showToast(msg) {
    let toast = document.getElementById('portfolio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolio-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('toast-show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('toast-show');
    }, 2500);
  }
  window.showToast = showToast;

  // 2. White & Black Theme Switcher Logic
  const btnBlack = document.getElementById('theme-btn-black');
  const btnWhite = document.getElementById('theme-btn-white');

  function getStoredTheme() {
    try {
      return localStorage.getItem('theme_mode') || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  function setStoredTheme(mode) {
    try {
      localStorage.setItem('theme_mode', mode);
    } catch (e) {}
  }

  function applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    if (mode === 'light') {
      btnWhite?.classList.add('active');
      btnBlack?.classList.remove('active');
    } else {
      btnBlack?.classList.add('active');
      btnWhite?.classList.remove('active');
    }
  }

  // Initialize Theme
  applyTheme(getStoredTheme());

  if (btnBlack) {
    btnBlack.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme('dark');
      setStoredTheme('dark');
      showToast('Switched to Black Mode');
    });
  }

  if (btnWhite) {
    btnWhite.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme('light');
      setStoredTheme('light');
      showToast('Switched to White Mode');
    });
  }

  // 3. Mobile Header Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    const toggleIcon = mobileToggle.querySelector('i');

    function closeMobileMenu() {
      navMenu.classList.remove('show-mobile');
      if (toggleIcon) {
        toggleIcon.className = 'fas fa-bars';
      }
    }

    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('show-mobile');
      if (toggleIcon) {
        toggleIcon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
      }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-menu-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Reset when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920 && navMenu.classList.contains('show-mobile')) {
        closeMobileMenu();
      }
    });
  }

  // 4. Custom Cursor Follower (Desktop only)
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });
  }

  // 5. Reading Scroll Progress Bar & Floating Scroll-to-Top Button
  const progressBar = document.getElementById('scroll-progress-bar');
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const circleProgress = scrollToTopBtn ? scrollToTopBtn.querySelector('circle') : null;

  function handleScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    if (scrollToTopBtn) {
      if (scrollTop > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }

      if (circleProgress) {
        // Circumference is approx 126 (2 * PI * 20)
        const offset = 126 - (scrollPercent / 100) * 126;
        circleProgress.style.strokeDashoffset = Math.max(offset, 0);
      }
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Interactive Constellation Canvas Engine
  const canvas = document.getElementById('bg-canvas-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseOnCanvas = false;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnCanvas = true;
    });

    window.addEventListener('mouseleave', () => {
      isMouseOnCanvas = false;
    });

    const particleCount = Math.min(Math.floor(width / 32), 45);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 1.8 + 1,
      });
    }

    let isAnimationRunning = true;
    document.addEventListener('visibilitychange', () => {
      isAnimationRunning = !document.hidden;
      if (isAnimationRunning) requestAnimationFrame(renderCanvas);
    });

    function renderCanvas() {
      if (!isAnimationRunning) return;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const nodeColor = isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(0, 242, 254, 0.55)';
      const lineColor = isLight ? 'rgba(79, 70, 229, 0.08)' : 'rgba(99, 102, 241, 0.12)';

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8 * (1 - dist / 115);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    requestAnimationFrame(renderCanvas);
  }

  // 7. Dynamic Typewriter Role Switcher
  const typewriterTarget = document.getElementById('typewriter-role');
  if (typewriterTarget) {
    const roles = [
      'Junior Web Developer',
      'HTML, CSS & Bootstrap Specialist',
      'JavaScript & DOM Developer',
      'PHP Backend Developer',
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const fullText = roles[currentRoleIdx];

      if (isDeleting) {
        currentCharIdx--;
        typingSpeed = 45;
      } else {
        currentCharIdx++;
        typingSpeed = 90;
      }

      typewriterTarget.textContent = fullText.substring(0, currentCharIdx);

      if (!isDeleting && currentCharIdx === fullText.length) {
        typingSpeed = 2200; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % roles.length;
        typingSpeed = 500; // Brief pause before typing next word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // 8. 3D Spotlight Glassmorphism Card Hover Tracker
  const spotlightCards = document.querySelectorAll('.spotlight-card, .hero-profile-card, .project-card, .skill-category-card');
  spotlightCards.forEach((card) => {
    card.classList.add('spotlight-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 9. Scroll-Driven Reveal Animations (IntersectionObserver)
  const revealTargets = document.querySelectorAll('.page-header, .timeline-card, .project-card, .skill-category-card, .hero-profile-card, .hero-content');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-revealed'));
  }

  // 10. Interactive macOS Code Terminal Widget Tabs
  const terminalCodeSnippet = document.getElementById('terminal-code-snippet');
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');

  const snippets = {
    'naeem.js': `<span class="t-kw">const</span> <span class="t-var">developer</span> = {
  <span class="t-prop">name</span>: <span class="t-str">"Muhammad Naeem"</span>,
  <span class="t-prop">title</span>: <span class="t-str">"Junior Web Developer"</span>,
  <span class="t-prop">location</span>: <span class="t-str">"Kohat, KPK, Pakistan"</span>,
  <span class="t-prop">skills</span>: [<span class="t-str">"HTML"</span>, <span class="t-str">"CSS"</span>, <span class="t-str">"Bootstrap"</span>, <span class="t-str">"JavaScript"</span>, <span class="t-str">"DOM"</span>, <span class="t-str">"PHP"</span>],
  <span class="t-prop">availableForHire</span>: <span class="t-kw">true</span>,
  <span class="t-fn">buildExperience</span>() {
    <span class="t-kw">return</span> <span class="t-str">"Fast, clean & responsive web apps"</span>;
  }
};`,
    'stack.json': `{
  <span class="t-prop">"markup_styling"</span>: [<span class="t-str">"HTML5"</span>, <span class="t-str">"CSS3"</span>, <span class="t-str">"Bootstrap 5"</span>],
  <span class="t-prop">"client_scripting"</span>: [<span class="t-str">"JavaScript (ES6+)"</span>, <span class="t-str">"DOM Manipulation"</span>],
  <span class="t-prop">"server_backend"</span>: [<span class="t-str">"PHP"</span>, <span class="t-str">"Form Handling"</span>, <span class="t-str">"Sessions"</span>]
}`,
    'contact.sh': `<span class="t-com"># Contact Muhammad Naeem</span>
$ curl -X POST https://api.naeem.dev/hire \\
  -d <span class="t-str">'{"role": "Web Developer", "hire": true}'</span>
<span class="t-str">"Status 200 OK: Ready for new web challenge!"</span>`,
  };

  if (terminalCodeSnippet && terminalTabs.length > 0) {
    terminalTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        terminalTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const fileKey = tab.getAttribute('data-file');
        if (snippets[fileKey]) {
          terminalCodeSnippet.innerHTML = snippets[fileKey];
        }
      });
    });
  }

  // 11. Project Filter Buttons (on projects.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        filterButtons.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || category === filterValue || category.indexOf(filterValue) !== -1) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.display = 'none';
          }
        });

        showToast(`Filtered: ${this.textContent.trim()}`);
      });
    });
  }

  // 12. Contact Form Submission
  const contactForm = document.getElementById('contact-form') || document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('user-name') || document.getElementById('contact-name'))?.value.trim() || 'Visitor';
      const email = (document.getElementById('user-email') || document.getElementById('contact-email'))?.value.trim();
      const message = (document.getElementById('user-message') || document.getElementById('contact-message'))?.value.trim();

      if (!email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      showToast(`Thank you, ${name}! Your message has been sent to Naeem.`);
      contactForm.reset();
    });
  }
});