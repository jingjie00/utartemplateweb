function showMessage() {
    const message = document.getElementById('message');
    const messages = [
        'Welcome to UTAR Thesis Template! 📚',
        'Remember to include proper attribution! ✍️',
        'This template is ready for Firebase deployment! 🚀',
        'Thank you for using this template! 🙏'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.textContent = randomMessage;
    message.classList.remove('hidden');
    
    setTimeout(() => {
        message.classList.add('hidden');
    }, 3000);
}

// Add some interactive animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animatedElements = document.querySelectorAll('.feature-card, .info-section, .hero-content, footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('scroll-animate');
        // Add staggered delay for feature cards
        if (el.classList.contains('feature-card')) {
            el.style.transitionDelay = `${index * 100}ms`;
        }
        observer.observe(el);
    });

    // Show welcome message
    setTimeout(showMessage, 1000);
});
