/* ========================================
   Francesca Di Giovanni - Designer Portfolio
   JavaScript - Theme, Animations, Utilities
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
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

    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('mobile-menu-open');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('mobile-menu-open');
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

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== GSAP ANIMATIONS =====
    if (typeof gsap !== 'undefined') {
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero Animation - Initial reveal
        gsap.fromTo('.hero-subtitle', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
        
        gsap.fromTo('.hero-title',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
        );
        
        gsap.fromTo('.hero-tagline',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
        );
        
        gsap.fromTo('.hero .btn',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
        );
        
        // Scroll animations for sections
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const header = section.querySelector('.section-header');
            const items = section.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-text, .contact-text, .contact-link');
            
            if (header) {
                gsap.fromTo(header,
                    { opacity: 0, y: 40 },
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
            }
            
            if (items.length > 0) {
                gsap.fromTo(items,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });
        
        // About section special treatment
        gsap.fromTo('.about-image',
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        gsap.fromTo('.about-text',
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    } else {
        // Fallback if GSAP not loaded - simple fade in
        document.querySelectorAll('.hero-content > *').forEach((el, i) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // ===== PORTFOLIO HOVER EFFECT =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ===== SERVICE CARDS HOVER =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // ===== CONTACT LINKS ANIMATION =====
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { x: 8, duration: 0.3, ease: 'power2.out' });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { x: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('mobile-menu-open');
            }
        }, 250);
    });

    // ===== HANDLE BROKEN IMAGES =====
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Immagine non disponibile';
            this.replaceWith(placeholder);
        });
    });

}); // End DOMContentLoaded
