/* ========================================
   Francesca Di Giovanni - Designer Portfolio
   JavaScript - Animations & Interactions
   GSAP ScrollTrigger - Mobile First
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== PAGE LOADER =====
    const pageLoader = document.querySelector('.page-loader');
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
    }, 1200);
    
    // ===== CUSTOM CURSOR =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (cursorDot && cursorRing && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();
        
        // Cursor hover effect
        const hoverElements = document.querySelectorAll('a, button, .project-row, .service-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }
    
    // ===== SCROLL PROGRESS =====
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function getTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return prefersDark.matches ? 'dark' : 'light';
    }
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    setTheme(getTheme());
    
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });
    
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===== BURGER MENU =====
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SHRINK ON SCROLL =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== GSAP ANIMATIONS =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero Animation - Initial load
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        heroTl
            .fromTo('.hero-eyebrow', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
            )
            .fromTo('.hero-title .hero-line:first-child', 
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1 },
                '-=0.4'
            )
            .fromTo('.hero-title .hero-line.italic', 
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1 },
                '-=0.6'
            )
            .fromTo('.hero-subtitle', 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.4'
            )
            .fromTo('.hero-cta', 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.2'
            );
        
        // Scroll Indicator Animation
        gsap.fromTo('.scroll-indicator', 
            { opacity: 0 },
            { opacity: 1, duration: 1, delay: 1.5 }
        );
        
        // Section Headers - Scroll Reveal
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Service Cards - Staggered Scroll Reveal
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.1
                }
            );
        });
        
        // Portfolio - Simple Card Grid Animation
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            const img = card.querySelector('.project-card-image img');
            const content = card.querySelector('.project-card-content');
            
            // Image animation
            if (img) {
                gsap.fromTo(img,
                    { 
                        opacity: 0, 
                        y: 20 
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
            
            // Content animation
            if (content) {
                gsap.fromTo(content,
                    { 
                        opacity: 0, 
                        y: 15 
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        delay: 0.1
                    }
                );
            }
        });
        
        // About Section - Editorial Animation
        gsap.fromTo('.about-image-wrapper',
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-spread',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        gsap.fromTo('.about-content',
            { opacity: 0, x: 60 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-spread',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                delay: 0.2
            }
        );
        
        // Contact Section
        gsap.fromTo('.contact-text',
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-content',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        gsap.utils.toArray('.contact-link').forEach((link, i) => {
            gsap.fromTo(link,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: link,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.1
                }
            );
        });
        
    } else {
        // Fallback - show elements without animation
        document.querySelectorAll('.hero-content > *, .section-header, .service-card, .project-card, .about-spread, .contact-text, .contact-link').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // ===== PORTFOLIO HOVER EFFECT =====
    const portfolioItems = document.querySelectorAll('.project-card');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            if (img && typeof gsap !== 'undefined') {
                gsap.to(img, { scale: 1.03, duration: 0.5, ease: 'power2.out' });
            } else if (img) {
                img.style.transform = 'scale(1.03)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img && typeof gsap !== 'undefined') {
                gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
            } else if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close mobile menu if resized to desktop
            if (window.innerWidth > 768) {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
            // Refresh ScrollTrigger
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250);
    });

    // ===== HANDLE BROKEN IMAGES =====
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Immagine non disponibile';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                min-height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--color-bg-secondary);
                color: var(--color-text-muted);
                font-size: 13px;
            `;
            this.replaceWith(placeholder);
        });
    });

}); // End DOMContentLoaded
