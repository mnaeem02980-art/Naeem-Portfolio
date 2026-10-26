// ==========================================================================
// MR NAEEM PORTFOLIO - JQUERY & ADVANCED SYSTEM LOGIC (3.7.1 COMPATIBLE)
// ==========================================================================

(function ($) {
  'use strict';

  // Log jQuery initialization
  if (typeof jQuery !== 'undefined') {
    console.log('%c[jQuery 3.7.1 Active] Mr Naeem Portfolio Loaded Successfully', 'color:#00F2FE; font-weight:bold;');
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
        const nodeColor = isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(0, 242, 254, 0.55)';
        const lineColor = isLight ? 'rgba(79, 70, 229, 0.08)' : 'rgba(99, 102, 241, 0.12)';

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();

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
  <span class="t-prop">name</span>: <span class="t-str">"Mr Naeem"</span>,
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
      'contact.sh': `<span class="t-com"># Contact Mr Naeem</span>
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

  });
})(jQuery);