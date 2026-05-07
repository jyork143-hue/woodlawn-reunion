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
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Countdown Timer Logic
    const targetDate = new Date("September 1, 2026 12:00:00 EDT").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.querySelectorAll('.countdown-timer').forEach(el => {
                el.innerHTML = "RSVP CLOSED";
            });
            return;
        }

        // Time calculations
        const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
        const weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Build output string
        const output = `
            <div class="time-block"><span>${months}</span><small>Months</small></div>
            <div class="time-block"><span>${weeks}</span><small>Weeks</small></div>
            <div class="time-block"><span>${days}</span><small>Days</small></div>
            <div class="time-block"><span>${hours}</span><small>Hours</small></div>
            <div class="time-block"><span>${minutes}</span><small>Mins</small></div>
            <div class="time-block"><span>${seconds}</span><small>Secs</small></div>
        `;

        document.querySelectorAll('.countdown-timer').forEach(el => {
            el.innerHTML = output;
        });
    }

    // Initialize and run every second
    if (document.querySelector('.countdown-timer')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Visual Log for Antigravity verification
    console.log("Woodlawn 2006 Landing Page Initialized.");
});

