document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const realizarPago = document.getElementById('realizar-pago');

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

    // Cart functionality with localStorage
    // Initialize cart in localStorage if not present
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Add product to cart
    document.querySelectorAll('.shop-item button').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('€', ''));

            // Get current cart from localStorage
            const cart = JSON.parse(localStorage.getItem('cart'));

            // Check if product is already in cart
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} añadido al carrito.`);
        });
    });

    // Display cart items in cesta.html
    if (window.location.pathname.includes('cesta.html')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-gray-600">El carrito está vacío.</p>';
            cartTotalElement.textContent = '0.00€';
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                const itemElement = document.createElement('div');
                itemElement.className = 'shop-item bg-white p-6 rounded-lg text-center border-2 border-transparent shadow-md hover:shadow-xl hover:scale-105 hover:bg-gray-50 hover:border-black transition-all duration-300 fadeSlideUp';
                itemElement.style.animationDelay = `${0.2 * (index + 1)}s`;
                itemElement.innerHTML = `
                    <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
                    <p class="mb-2">Precio: ${item.price.toFixed(2)}€</p>
                    <p class="mb-2">Cantidad: ${item.quantity}</p>
                    <p class="mb-4">Subtotal: ${subtotal.toFixed(2)}€</p>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
            cartTotalElement.textContent = `${total.toFixed(2)}€`;
        }
    }

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

    realizarPago.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('El carrito está vacío. Añade productos antes de realizar el pago.');
        } else {
            alert('Redirigiendo a la página de pago...');
            window.location.href = 'index.html'; 
            cart.length = 0; 
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('¡Compra realizada con éxito!');

        }
    });

    sections.forEach(section => observer.observe(section));
});