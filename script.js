// ==========================================================================
// MUHAMMAD NAEEM PORTFOLIO - JQUERY & ADVANCED SYSTEM LOGIC (3.7.1 COMPATIBLE)
// ==========================================================================

(function ($) {
  'use strict';

  // Log jQuery initialization
  if (typeof jQuery !== 'undefined') {
    console.log('%c[jQuery 3.7.1 Active] Muhammad Naeem Portfolio Loaded Successfully', 'color:#00F2FE; font-weight:bold;');
  }

  $(function () {

    // ------------------------------------------------------------------------
    // 1. jQuery Toast Notification Helper
    // ------------------------------------------------------------------------
    let $toast = $('#portfolio-toast');
    if (!$toast.length) {
      $toast = $('<div id="portfolio-toast"></div>').appendTo('body');
    }

    function showToast(msg) {
      $toast
        .stop(true, true)
        .text(msg)
        .addClass('toast-show')
        .fadeIn(200)
        .delay(2200)
        .fadeOut(300, function () {
          $(this).removeClass('toast-show');
        });
    }
    window.showToast = showToast;

    // ------------------------------------------------------------------------
    // 2. White & Black Theme Switcher Logic
    // ------------------------------------------------------------------------
    const $btnBlack = $('#theme-btn-black');
    const $btnWhite = $('#theme-btn-white');

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
      $('html').attr('data-theme', mode);
      if (mode === 'light') {
        $btnWhite.addClass('active');
        $btnBlack.removeClass('active');
      } else {
        $btnBlack.addClass('active');
        $btnWhite.removeClass('active');
      }
    }

    // Initialize Theme
    applyTheme(getStoredTheme());

    $btnBlack.on('click', function (e) {
      e.preventDefault();
      applyTheme('dark');
      setStoredTheme('dark');
      showToast('Switched to Dark Mode');
    });

    $btnWhite.on('click', function (e) {
      e.preventDefault();
      applyTheme('light');
      setStoredTheme('light');
      showToast('Switched to Light Mode');
    });

    // ------------------------------------------------------------------------
    // 3. jQuery Mobile Navigation Toggle
    // ------------------------------------------------------------------------
    const $mobileToggle = $('#mobile-toggle');
    const $navMenu = $('.nav-menu');

    function closeMobileMenu() {
      $navMenu.removeClass('show-mobile');
      $mobileToggle.find('i').removeClass('fa-xmark').addClass('fa-bars');
    }

    $mobileToggle.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = $navMenu.toggleClass('show-mobile').hasClass('show-mobile');
      $(this).find('i').toggleClass('fa-bars', !isOpen).toggleClass('fa-xmark', isOpen);
    });

    $navMenu.find('.nav-menu-link').on('click', function () {
      closeMobileMenu();
    });

    $(document).on('click', function (e) {
      if (!$navMenu.is(e.target) && $navMenu.has(e.target).length === 0 &&
          !$mobileToggle.is(e.target) && $mobileToggle.has(e.target).length === 0) {
        closeMobileMenu();
      }
    });

    $(window).on('resize', function () {
      if ($(window).width() > 920 && $navMenu.hasClass('show-mobile')) {
        closeMobileMenu();
      }
    });

    // ------------------------------------------------------------------------
    // 4. jQuery Active Nav Link Highlight
    // ------------------------------------------------------------------------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-menu-link').each(function () {
      const href = $(this).attr('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        $(this).addClass('active');
      }
    });

    // ------------------------------------------------------------------------
    // 5. Custom Cursor Follower (Desktop only)
    // ------------------------------------------------------------------------
    const $cursorDot = $('#cursor-dot');
    const $cursorRing = $('#cursor-ring');

    if ($cursorDot.length && $cursorRing.length && window.matchMedia('(pointer: fine)').matches) {
      $(window).on('mousemove', function (e) {
        $cursorDot.css({ left: e.clientX + 'px', top: e.clientY + 'px' });
        $cursorRing.css({ left: e.clientX + 'px', top: e.clientY + 'px' });
      });
    }

    // ------------------------------------------------------------------------
    // 6. jQuery Smooth Scroll for Internal Anchors
    // ------------------------------------------------------------------------
    $('a[href^="#"]').on('click', function (e) {
      const targetHash = $(this).attr('href');
      if (targetHash && targetHash.length > 1) {
        const $target = $(targetHash);
        if ($target.length) {
          e.preventDefault();
          $('html, body').stop().animate({
            scrollTop: $target.offset().top - 80
          }, 600);
        }
      }
    });

    // ------------------------------------------------------------------------
    // 7. Scroll Progress Bar & Floating Back-to-Top Button
    // ------------------------------------------------------------------------
    const $progressBar = $('#scroll-progress-bar');
    let $backToTop = $('#back-to-top');

    if (!$backToTop.length) {
      $backToTop = $('<button id="back-to-top" title="Back to top" aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>').appendTo('body');
    }

    $(window).on('scroll', function () {
      const scrollTop = $(this).scrollTop();
      const docHeight = $(document).height() - $(window).height();
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if ($progressBar.length) {
        $progressBar.css('width', Math.min(scrollPercent, 100) + '%');
      }

      if (scrollTop > 350) {
        $backToTop.stop(true, true).fadeIn(250).css('display', 'flex');
      } else {
        $backToTop.stop(true, true).fadeOut(250);
      }
    });

    $backToTop.on('click', function (e) {
      e.preventDefault();
      $('html, body').stop().animate({ scrollTop: 0 }, 500);
    });

    // ------------------------------------------------------------------------
    // 8. Interactive Constellation Canvas Engine
    // ------------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas-particles');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      let mouseX = width / 2;
      let mouseY = height / 2;

      $(window).on('resize', function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      $(window).on('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
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

        const isLight = $('html').attr('data-theme') === 'light';
        const nodeColor = isLight ? 'rgba(234, 88, 12, 0.50)' : 'rgba(255, 94, 98, 0.65)';
        const lineColor = isLight ? 'rgba(234, 88, 12, 0.08)' : 'rgba(255, 122, 0, 0.12)';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.25, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.shadowBlur = 12;
          ctx.shadowColor = nodeColor;
          ctx.fill();
        }
        requestAnimationFrame(renderCanvas);
      }
      requestAnimationFrame(renderCanvas);
    }

    // ------------------------------------------------------------------------
    // 9. Dynamic Typewriter Role Switcher
    // ------------------------------------------------------------------------
    const $typewriterTarget = $('#typewriter-role');
    if ($typewriterTarget.length) {
      const roles = [
        'Junior Full-Stack Developer',
        'React & Frontend Specialist',
        'HTML, CSS & Bootstrap Specialist',
        'JavaScript, jQuery & DOM Developer',
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

        $typewriterTarget.text(fullText.substring(0, currentCharIdx));

        if (!isDeleting && currentCharIdx === fullText.length) {
          typingSpeed = 2200;
          isDeleting = true;
        } else if (isDeleting && currentCharIdx === 0) {
          isDeleting = false;
          currentRoleIdx = (currentRoleIdx + 1) % roles.length;
          typingSpeed = 500;
        }

        setTimeout(typeLoop, typingSpeed);
      }

      typeLoop();
    }

    // ------------------------------------------------------------------------
    // 10. 3D Spotlight Card Hover Effect
    // ------------------------------------------------------------------------
    $('.spotlight-card, .hero-profile-card, .project-card, .skill-category-card').each(function () {
      const $card = $(this);
      $card.addClass('spotlight-card');
      $card.on('mousemove', function (e) {
        const offset = $card.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        $card.css({
          '--mouse-x': x + 'px',
          '--mouse-y': y + 'px'
        });
      });
    });

    // ------------------------------------------------------------------------
    // 11. jQuery Animated Skill Bars
    // ------------------------------------------------------------------------
    function triggerSkillBars() {
      $('.skill-fill').each(function () {
        const $fill = $(this);
        const topOfElem = $fill.offset().top;
        const bottomOfWindow = $(window).scrollTop() + $(window).height();

        if (bottomOfWindow > topOfElem + 20) {
          const currentStyle = $fill.attr('style') || '';
          const match = currentStyle.match(/width:\s*(\d+)%/);
          if (match && !$fill.data('animated')) {
            $fill.data('animated', true);
            const targetPct = match[1] + '%';
            $fill.css('width', '0%').stop().animate({ width: targetPct }, 900);
          }
        }
      });
    }
    $(window).on('scroll', triggerSkillBars);
    triggerSkillBars();

    // ------------------------------------------------------------------------
    // 12. Interactive macOS Code Terminal Widget Tabs
    // ------------------------------------------------------------------------
    const $terminalCode = $('#terminal-code-snippet');
    const $terminalTabs = $('.terminal-tab-btn');

    const snippets = {
      'naeem.js': `<span class="t-kw">const</span> <span class="t-var">developer</span> = {
  <span class="t-prop">name</span>: <span class="t-str">"Muhammad Naeem"</span>,
  <span class="t-prop">title</span>: <span class="t-str">"Junior Full-Stack Developer"</span>,
  <span class="t-prop">location</span>: <span class="t-str">"Kohat, KPK, Pakistan"</span>,
  <span class="t-prop">skills</span>: [<span class="t-str">"HTML"</span>, <span class="t-str">"CSS"</span>, <span class="t-str">"Bootstrap"</span>, <span class="t-str">"JavaScript"</span>, <span class="t-str">"DOM"</span>, <span class="t-str">"jQuery"</span>, <span class="t-str">"React"</span>, <span class="t-str">"PHP"</span>],
  <span class="t-prop">availableForHire</span>: <span class="t-kw">true</span>,
  <span class="t-fn">buildExperience</span>() {
    <span class="t-kw">return</span> <span class="t-str">"Fast, interactive React & full-stack web apps"</span>;
  }
};`,
      'stack.json': `{
  <span class="t-prop">"frontend_ui"</span>: [<span class="t-str">"React 18"</span>, <span class="t-str">"jQuery 3.7+"</span>, <span class="t-str">"Bootstrap 5"</span>],
  <span class="t-prop">"core_web"</span>: [<span class="t-str">"HTML5"</span>, <span class="t-str">"CSS3"</span>, <span class="t-str">"JavaScript ES6+"</span>, <span class="t-str">"DOM API"</span>],
  <span class="t-prop">"server_backend"</span>: [<span class="t-str">"PHP"</span>, <span class="t-str">"Form Handling"</span>, <span class="t-str">"Sessions"</span>]
}`,
      'contact.sh': `<span class="t-com"># Contact Muhammad Naeem</span>
$ curl -X POST https://api.naeem.dev/hire \\
  -d <span class="t-str">'{"role": "Full-Stack Developer", "hire": true}'</span>
<span class="t-str">"Status 200 OK: Ready for new web challenge!"</span>`,
    };

    if ($terminalCode.length && $terminalTabs.length) {
      $terminalTabs.on('click', function (e) {
        e.preventDefault();
        $terminalTabs.removeClass('active');
        $(this).addClass('active');

        const fileKey = $(this).attr('data-file');
        if (snippets[fileKey]) {
          $terminalCode.fadeOut(90, function () {
            $(this).html(snippets[fileKey]).fadeIn(130);
          });
        }
      });
    }

    // ------------------------------------------------------------------------
    // 13. jQuery Project Filter (on projects.html)
    // ------------------------------------------------------------------------
    const $filterBtns = $('.filter-btn');
    const $projectCards = $('.project-card');

    if ($filterBtns.length && $projectCards.length) {
      $filterBtns.on('click', function (e) {
        e.preventDefault();
        $filterBtns.removeClass('active');
        $(this).addClass('active');

        const filterValue = $(this).attr('data-filter');

        $projectCards.each(function () {
          const $card = $(this);
          const category = $card.attr('data-category') || '';

          if (filterValue === 'all' || category === filterValue || category.indexOf(filterValue) !== -1) {
            $card.stop(true, true).fadeIn(300);
          } else {
            $card.stop(true, true).fadeOut(200);
          }
        });

        showToast(`Filtered: ${$(this).text().trim()}`);
      });
    }

    // ------------------------------------------------------------------------
    // 14. jQuery Contact & Hire Me Form Submission
    // ------------------------------------------------------------------------
    const $contactForm = $('#contact-form, #portfolio-contact-form, #hire-form');
    if ($contactForm.length) {
      $contactForm.on('submit', function (e) {
        e.preventDefault();
        const name = $('#user-name, #contact-name, #client-name').val()?.trim() || 'Visitor';
        const email = $('#user-email, #contact-email, #client-email').val()?.trim();
        const message = $('#user-message, #contact-message, #project-details').val()?.trim();

        if (!email || !message) {
          showToast('Please fill out all required fields.');
          return;
        }

        showToast(`Thank you, ${name}! Your message has been sent to Naeem.`);
        this.reset();
      });
    }

    // ------------------------------------------------------------------------
    // 15. React 18 Interactive Component Mounting
    // ------------------------------------------------------------------------
    if (window.React && window.ReactDOM && document.getElementById('react-skills-showcase')) {
      const e = React.createElement;
      const { useState } = React;

      function SkillsInteractiveApp() {
        const [activeFilter, setActiveFilter] = useState('all');
        const [likes, setLikes] = useState(142);
        const [hasLiked, setHasLiked] = useState(false);
        const [search, setSearch] = useState('');

        const items = [
          { name: 'React 18 & Virtual DOM', cat: 'react', pct: 90, color: '#00D8FF', icon: 'fab fa-react', desc: 'SPA component structure, reconciliation algorithm, and declarative UI hierarchy.' },
          { name: 'React Hooks (useState / useEffect)', cat: 'react', pct: 88, color: '#00D8FF', icon: 'fas fa-arrows-split-up-and-left', desc: 'Stateful logic separation, lifecycle synchronization, and custom hooks.' },
          { name: 'jQuery 3.7+ DOM Engine', cat: 'jquery', pct: 94, color: '#22A7F0', icon: 'fas fa-bolt', desc: 'High-speed DOM query selection, chained event listeners, and interactive UI widgets.' },
          { name: 'jQuery AJAX & API Calls', cat: 'jquery', pct: 90, color: '#22A7F0', icon: 'fas fa-arrows-rotate', desc: '$.ajax, $.getJSON, asynchronous requests, and real-time DOM injection.' },
          { name: 'HTML5 Semantic Web', cat: 'core', pct: 97, color: '#E34F26', icon: 'fab fa-html5', desc: 'Semantic layouts, accessibility, metadata, and modern responsive structures.' },
          { name: 'CSS3 Cyberpunk & Glassmorphism', cat: 'core', pct: 95, color: '#1572B6', icon: 'fab fa-css3-alt', desc: 'Custom CSS variables, flexbox, CSS grid, and ultra-smooth animations.' },
          { name: 'Bootstrap 5 Responsive Grid', cat: 'core', pct: 94, color: '#7952B3', icon: 'fab fa-bootstrap', desc: 'Mobile-first 12-column layouts, navigation bars, modals, and helper utilities.' },
          { name: 'PHP Server Logic & CRUD', cat: 'backend', pct: 88, color: '#777BB4', icon: 'fab fa-php', desc: 'Secure form handling, sessions, server-side data processing, and routing.' },
        ];

        const filtered = items.filter(item => {
          const matchesCat = activeFilter === 'all' || item.cat === activeFilter;
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
          return matchesCat && matchesSearch;
        });

        const handleLike = () => {
          if (!hasLiked) {
            setLikes(likes + 1);
            setHasLiked(true);
            if (typeof showToast === 'function') {
              showToast('React 18 state updated: +1 Recommendation!');
            }
          }
        };

        return e('div', { className: 'react-app-container', style: {
          background: 'var(--grad-card)',
          border: '1.5px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          overflow: 'hidden'
        }},
          e('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.2rem' } },
            e('div', null,
              e('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: 'rgba(0, 216, 255, 0.12)', border: '1px solid rgba(0, 216, 255, 0.35)', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, color: '#00D8FF', marginBottom: '0.5rem' } },
                e('i', { className: 'fab fa-react fa-spin', style: { animationDuration: '6s' } }),
                'Live React 18 Interactive Component'
              ),
              e('h3', { style: { fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-heading)' } },
                'Interactive ',
                e('span', { style: { color: '#00D8FF' } }, 'React 18'),
                ' & ',
                e('span', { style: { color: '#22A7F0' } }, 'jQuery'),
                ' State Explorer'
              ),
              e('p', { style: { fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' } },
                'Rendered dynamically in real-time using React 18 Virtual DOM state management with jQuery animation synchronization.'
              )
            ),
            e('button', {
              onClick: handleLike,
              style: {
                background: hasLiked ? 'rgba(0, 216, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: hasLiked ? '1px solid #00D8FF' : '1px solid var(--border-subtle)',
                color: hasLiked ? '#00D8FF' : 'var(--text-body)',
                borderRadius: '999px',
                padding: '0.55rem 1.2rem',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }
            },
              e('i', { className: hasLiked ? 'fas fa-heart' : 'far fa-heart', style: { color: hasLiked ? '#FB7185' : '#00D8FF' } }),
              e('span', null, hasLiked ? 'Recommended!' : 'Recommend Stack'),
              e('span', { style: { background: 'rgba(0,0,0,0.3)', padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.78rem' } }, likes)
            )
          ),

          e('div', { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' } },
            e('div', { style: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' } },
              [
                { id: 'all', label: 'All Technologies' },
                { id: 'react', label: 'React.js (18)' },
                { id: 'jquery', label: 'jQuery (3.7+)' },
                { id: 'core', label: 'Core Frontend' },
                { id: 'backend', label: 'PHP Backend' }
              ].map(tab =>
                e('button', {
                  key: tab.id,
                  onClick: () => {
                    setActiveFilter(tab.id);
                    if (typeof showToast === 'function') {
                      showToast(`React State: Active filter switched to "${tab.label}"`);
                    }
                  },
                  style: {
                    background: activeFilter === tab.id ? 'linear-gradient(90deg, #00D8FF, #22A7F0)' : 'rgba(255, 255, 255, 0.04)',
                    color: activeFilter === tab.id ? '#040d1a' : 'var(--text-muted)',
                    border: activeFilter === tab.id ? 'none' : '1px solid var(--border-subtle)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }
                }, tab.label)
              )
            ),
            e('div', { style: { position: 'relative', minWidth: '220px' } },
              e('input', {
                type: 'text',
                placeholder: 'Live search skills...',
                value: search,
                onChange: (ev) => setSearch(ev.target.value),
                style: {
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-heading)',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.85rem',
                  outline: 'none'
                }
              })
            )
          ),

          e('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' } },
            filtered.length > 0 ? filtered.map((item, idx) =>
              e('div', {
                key: idx,
                style: {
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.2rem',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }
              },
                e('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem' } },
                  e('div', { style: { display: 'flex', alignItems: 'center', gap: '0.6rem' } },
                    e('i', { className: item.icon, style: { color: item.color, fontSize: '1.25rem' } }),
                    e('strong', { style: { fontSize: '0.95rem', color: 'var(--text-heading)' } }, item.name)
                  ),
                  e('span', { style: { fontSize: '0.82rem', fontWeight: 800, color: item.color, fontFamily: 'var(--font-mono)' } }, item.pct + '%')
                ),
                e('p', { style: { fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 0.8rem 0' } }, item.desc),
                e('div', { style: { width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' } },
                  e('div', { style: { width: item.pct + '%', height: '100%', background: item.color, borderRadius: '999px' } })
                )
              )
            ) : e('div', { style: { textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', gridColumn: '1 / -1' } },
              'No skills matched your search filter.'
            )
          ),

          e('div', { style: { marginTop: '1.4rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' } },
            e('span', null,
              e('i', { className: 'fas fa-check-circle', style: { color: '#10B981', marginRight: '0.35rem' } }),
              'React 18 State: ',
              e('strong', { style: { color: 'var(--text-body)' } }, filtered.length),
              ' skills active'
            ),
            e('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.74rem' } },
              'Virtual DOM: React.useState + jQuery 3.7.1 Events'
            )
          )
        );
      }

      const rootElem = document.getElementById('react-skills-showcase');
      if (ReactDOM.createRoot) {
        const root = ReactDOM.createRoot(rootElem);
        root.render(e(SkillsInteractiveApp));
      } else if (ReactDOM.render) {
        ReactDOM.render(e(SkillsInteractiveApp), rootElem);
      }
    }

  });
})(jQuery);