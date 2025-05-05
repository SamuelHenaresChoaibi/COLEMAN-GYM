document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const dropdownMenu = document.getElementById('dropdown-menu');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Close menu when clicking a link
    dropdownMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Smooth scrolling and active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Check if href is an in-page anchor (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60,
                        behavior: 'smooth'
                    });
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // External links (e.g., clases.html, index.html#shop) navigate normally
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Only update active class for in-page anchors
            if (href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Reservation button functionality
    document.querySelectorAll('.reserve-btn').forEach(button => {
        button.addEventListener('click', () => {
            const className = button.getAttribute('data-class');
            alert(`¡Reserva confirmada para la clase de ${className}! Te enviaremos un correo con los detalles.`);
        });
    });

    // Placeholder for shop cart functionality
    document.querySelectorAll('.shop-item button').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement.querySelector('h3').textContent;
            alert(`${product} añadido al carrito.`);
        });
    });

    // Exit animation on page unload
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('exit-animation');
    });

    // Trigger animations on section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-section');
                entry.target.querySelectorAll('.class-card, .shop-item, .blog-post, .ver-mas').forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.2}s`;
                    el.classList.add('animate-card');
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});