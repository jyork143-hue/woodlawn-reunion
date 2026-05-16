// Main Interactivity - Woodlawn Reunion

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation (existing)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
    }

    // Smooth Scroll for Anchor Links (already in old code, keep)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-item .question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('open');
        });
    });

    // Sticky Mobile CTA visibility on scroll
    const stickyCTA = document.querySelector('.sticky-cta');
    if (stickyCTA) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                stickyCTA.classList.add('visible');
            } else {
                stickyCTA.classList.remove('visible');
            }
        });
    }

    // Formspree now handles form submissions natively via the HTML action attributes.

    // Chatbot placeholder
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.addEventListener('click', () => {
            alert("Alumni Chatbot: 'Welcome back, Class of 06! I'm currently syncing with the Sidekick servers... Ask me anything about the reunion soon!'");
        });
    }

    console.log('Woodlawn Reunion site initialized.');
});
