document.addEventListener('DOMContentLoaded', () => {
    // --- BASIC UI ---
    document.getElementById('year').textContent = new Date().getFullYear();

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('ph-list');
        menuIcon.classList.toggle('ph-x');
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 17, 21, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 17, 21, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- PRODUCT DATA ---
    const products = {
        1: { name: 'Frog Anti-enrosco', price: 25.00, desc: 'Isca de superfície ideal para locais com muita vegetação. Possui corpo em silicone macio e anzóis voltados para cima, evitando enroscos em plantas aquáticas. Nado em Z (ZIG-ZAG) perfeito para atrair traíras e tucunarés.', badge: 'Topwater', images: ['images/lure_1.png', 'images/lure_4.png'] },
        2: { name: 'Jerkbait Minnow', price: 35.00, desc: 'Isca de meia-água com nado errático que simula um peixe ferido. Possui sistema de transferência de peso para arremessos longos e precisos. Excelente para dias em que os predadores estão menos ativos.', badge: 'Meia-água', images: ['images/lure_2.png', 'images/lure_5.png'] },
        3: { name: 'Spinnerbait Neon', price: 42.00, desc: 'A combinação perfeita de vibração e brilho. Suas lâminas criam ondas de choque na água, enquanto a saia de silicone neon garante alta visibilidade em qualquer condição de água.', badge: 'Fundo/Meia-água', images: ['images/lure_3.png', 'images/lure_1.png'] },
        4: { name: 'Isca Popper', price: 28.00, desc: 'Isca de superfície clássica. Sua boca côncava produz um som de "pop" e bolhas que despertam a agressividade dos peixes na superfície. Ideal para pescarias emocionantes com ataques visuais.', badge: 'Superfície', images: ['images/lure_4.png', 'images/lure_2.png'] },
        5: { name: 'Crankbait Fundo', price: 32.00, desc: 'Isca de barbela longa projetada para atingir rapidamente as camadas mais profundas. Possui rattlin estridente que atrai peixes à longa distância. Essencial para explorar estruturas no fundo.', badge: 'Fundo/Profundidade', images: ['images/lure_5.png', 'images/lure_3.png'] },
        6: { name: 'Isca Zara / Stick', price: 29.00, desc: 'Uma isca extremamente versátil. Pode ser trabalhada como Zara (nado em Z) ou como Stick (simulando peixe moribundo). Ótima para atrair grandes tucunarés em espraiados.', badge: 'Superfície/Zara', images: ['images/lure_2.png', 'images/lure_4.png'] }
    };

    // --- CART LOGIC ---
    let cart = JSON.parse(localStorage.getItem('pesqueshop_cart')) || [];

    const cartSidebar = document.getElementById('cart-sidebar');
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const cartCountLabel = document.querySelector('.cart-count');

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Seu carrinho está vazio.</div>';
        } else {
            cart.forEach((item, index) => {
                const product = products[item.id];
                total += product.price * item.qty;
                count += item.qty;

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${product.images[0]}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <span class="price">R$ ${product.price.toFixed(2)}</span>
                        <div class="cart-item-controls">
                            <button class="qty-btn minus" data-index="${index}">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn plus" data-index="${index}">+</button>
                            <button class="remove-btn" data-index="${index}"><i class="ph ph-trash"></i></button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartTotalValue.textContent = `R$ ${total.toFixed(2)}`;
        cartCountLabel.textContent = count;
        localStorage.setItem('pesqueshop_cart', JSON.stringify(cart));
    }

    function addToCart(id) {
        const existingItem = cart.find(item => item.id == id);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ id: id, qty: 1 });
        }
        updateCartUI();
        openCart();
    }

    function openCart() {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function closeCart() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    overlay.addEventListener('click', () => {
        closeCart();
        closeModal();
    });

    cartItemsContainer.addEventListener('click', (e) => {
        const index = e.target.closest('button')?.dataset.index;
        if (index === undefined) return;

        if (e.target.closest('.plus')) {
            cart[index].qty++;
        } else if (e.target.closest('.minus')) {
            if (cart[index].qty > 1) cart[index].qty--;
            else cart.splice(index, 1);
        } else if (e.target.closest('.remove-btn')) {
            cart.splice(index, 1);
        }
        updateCartUI();
    });

    // --- MODAL LOGIC ---
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalThumbs = document.getElementById('modal-thumbs');
    const modalTitle = document.getElementById('modal-title');
    const modalBadge = document.getElementById('modal-badge');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const modalAddBtn = document.getElementById('modal-add-cart');
    const modalBuyNow = document.getElementById('modal-buy-now');

    let currentModalProductId = null;

    function openModal(id) {
        const product = products[id];
        currentModalProductId = id;

        modalTitle.textContent = product.name;
        modalBadge.textContent = product.badge;
        modalDesc.textContent = product.desc;
        modalPrice.textContent = `R$ ${product.price.toFixed(2)}`;
        modalImg.src = product.images[0];

        // Thumbnails
        modalThumbs.innerHTML = '';
        product.images.forEach((img, idx) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = `thumb ${idx === 0 ? 'active' : ''}`;
            thumb.addEventListener('click', () => {
                modalImg.src = img;
                document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            modalThumbs.appendChild(thumb);
        });

        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        if (!cartSidebar.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    }

    modalClose.addEventListener('click', closeModal);

    document.querySelectorAll('.product-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const id = card.dataset.id;
            openModal(id);
        });
    });

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.closest('.product-card').dataset.id;
            addToCart(id);
        });
    });

    modalAddBtn.addEventListener('click', () => {
        addToCart(currentModalProductId);
        closeModal();
    });

    // --- WHATSAPP CHECKOUT ---
    const whatsappNumber = '5500000000000'; // O usuário deve alterar conforme instruções anteriores

    function sendWhatsAppMessage(text) {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) return alert('Seu carrinho está vazio!');

        let message = 'Olá Pesque Shop PMW! Gostaria de fazer o seguinte pedido:\n\n';
        let total = 0;

        cart.forEach(item => {
            const product = products[item.id];
            message += `• ${item.qty}x ${product.name} - R$ ${(product.price * item.qty).toFixed(2)}\n`;
            total += product.price * item.qty;
        });

        message += `\n*Total: R$ ${total.toFixed(2)}*\n\nComo posso proceder com o pagamento e envio?`;
        sendWhatsAppMessage(message);
    });

    modalBuyNow.addEventListener('click', () => {
        const product = products[currentModalProductId];
        const message = `Olá! Gostaria de comprar a isca *${product.name}* que vi no site.`;
        sendWhatsAppMessage(message);
    });

    // Re-bind original Buy buttons in grid
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const product = btn.dataset.produto;
            const message = `Olá! Gostaria de comprar a isca *${product}* que vi no site.`;
            sendWhatsAppMessage(message);
        });
    });

    // Initialize UI
    updateCartUI();
});
