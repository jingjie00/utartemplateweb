document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find target content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 3D Tilt Effect for Hero Image
    const heroCard = document.querySelector('.hero-image-card');
    if (heroCard) {
        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Invert for natural feel
            const rotateY = ((x - centerX) / centerX) * 5;

            heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(-5deg)'; // Return to default
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations on scroll
    const updateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        updateObserver.observe(section);
    });

    // Simple functionality to toggle 'visible' class
    // We override the inline styles added above when the class is added
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .section.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        function setTheme(theme) {
            if (theme === 'dark') {
                html.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                html.removeAttribute('data-theme');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            localStorage.setItem('theme', theme);
        }

        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    }
});

function copyCitation() {
    const text = document.getElementById('citation-text').innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
