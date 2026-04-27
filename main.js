/* Main Interactivity - Woodlawn Class of 2006 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });

    // Chatbot Trigger
    const chatbot = document.getElementById('chatbot');
    chatbot.addEventListener('click', () => {
        alert("Alumni Chatbot: 'Welcome back, Class of 06! I'm currently syncing with the Sidekick servers... Ask me anything about the reunion soon!'");
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Visual Log for Antigravity verification
    console.log("Woodlawn 2006 Landing Page Initialized.");
});
