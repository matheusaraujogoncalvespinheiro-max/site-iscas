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
        1: {
            name: 'Frog Anti-enrosco',
            price: 25.00,
            desc: 'Isca de superfície ideal para locais com muita vegetação. Possui corpo em silicone macio e anzóis voltados para cima, evitando enroscos em plantas aquáticas. Nado em Z (ZIG-ZAG) perfeito para atrair traíras e tucunarés.',
            badge: 'Topwater',
            category: 'superficie',
            images: ['images/lure_1.png', 'images/lure_4.png'],
            colors: [
                { name: 'Verde Limão (UV)', hex: '#ccff00', uv: true },
                { name: 'Osso (UV)', hex: '#fdf6e2', uv: true },
                { name: 'Preto/Amarelo', hex: '#111111', hex2: '#fbbf24', uv: false }
            ],
            sizes: ['6.0 cm (12g)', '7.5 cm (18g)']
        },
        2: {
            name: 'Jerkbait Minnow',
            price: 35.00,
            desc: 'Isca de meia-água com nado errático que simula um peixe ferido. Possui sistema de transferência de peso para arremessos longos e precisos. Excelente para dias em que os predadores estão menos ativos.',
            badge: 'Meia-água',
            category: 'meia-agua',
            images: ['images/lure_2.png', 'images/lure_5.png'],
            colors: [
                { name: 'Holográfica Prata', hex: '#e2e8f0', uv: false },
                { name: 'Cromada Head Vermelho', hex: '#ffffff', hex2: '#ef4444', uv: false },
                { name: 'Limão UV', hex: '#ccff00', uv: true }
            ],
            sizes: ['9.0 cm (13g)', '11.0 cm (18g)']
        },
        3: {
            name: 'Spinnerbait Neon',
            price: 42.00,
            desc: 'A combinação perfeita de vibração e brilho. Suas lâminas criam ondas de choque na água, enquanto a saia de silicone neon garante alta visibilidade em qualquer condição de água.',
            badge: 'Fundo/Meia-água',
            category: 'fundo',
            images: ['images/lure_3.png', 'images/lure_1.png'],
            colors: [
                { name: 'Amarelo Limão (UV)', hex: '#ccff00', uv: true },
                { name: 'Rosa Neon (UV)', hex: '#ec4899', uv: true },
                { name: 'Branco/Azul', hex: '#ffffff', hex2: '#3b82f6', uv: false }
            ],
            sizes: ['10g (Leve)', '14g (Médio)']
        },
        4: {
            name: 'Isca Popper',
            price: 28.00,
            desc: 'Isca de superfície clássica. Sua boca côncava produz um som de "pop" e bolhas que despertam a agressividade dos peixes na superfície. Ideal para pescarias emocionantes com ataques visuais.',
            badge: 'Superfície',
            category: 'superficie',
            images: ['images/lure_4.png', 'images/lure_2.png'],
            colors: [
                { name: 'Dourado Real', hex: '#fbbf24', uv: false },
                { name: 'Osso (UV)', hex: '#fdf6e2', uv: true },
                { name: 'Verde Tigre', hex: '#16a34a', hex2: '#000000', uv: false }
            ],
            sizes: ['8.0 cm (14g)', '10.5 cm (22g)']
        },
        5: {
            name: 'Crankbait Fundo',
            price: 32.00,
            desc: 'Isca de barbela longa projetada para atingir rapidamente as camadas mais profundas. Possui rattlin estridente que atrai peixes à longa distância. Essencial para explorar estruturas no fundo.',
            badge: 'Fundo/Profundidade',
            category: 'fundo',
            images: ['images/lure_5.png', 'images/lure_3.png'],
            colors: [
                { name: 'Cenoura UV', hex: '#f97316', uv: true },
                { name: 'Verde Musgo', hex: '#14532d', uv: false },
                { name: 'Pérola/Laranja', hex: '#fafaf9', hex2: '#f97316', uv: false }
            ],
            sizes: ['7.0 cm (15g)', '9.0 cm (24g)']
        },
        6: {
            name: 'Isca Zara / Stick',
            price: 29.00,
            desc: 'Uma isca extremamente versátil. Pode ser trabalhada como Zara (nado em Z) ou como Stick (simulando peixe moribundo). Ótima para atrair grandes tucunarés em espraiados.',
            badge: 'Superfície/Zara',
            category: 'superficie',
            images: ['images/lure_2.png', 'images/lure_4.png'],
            colors: [
                { name: 'Osso Matte (UV)', hex: '#fdf6e2', uv: true },
                { name: 'Holográfica Peixinho', hex: '#94a3b8', uv: false },
                { name: 'Verde Limão Extremo', hex: '#ccff00', uv: true }
            ],
            sizes: ['9.0 cm (12g)', '11.5 cm (20g)']
    };

    // --- CATALOG DYNAMIC RENDERING & FILTERING ---
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentCategory = 'todos';
    let currentSearch = '';

    function renderCatalog() {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';
        let filteredCount = 0;

        Object.keys(products).forEach(id => {
            const product = products[id];
            
            // Check category filter
            const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
            
            // Check search query filter
            const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                  product.desc.toLowerCase().includes(currentSearch.toLowerCase()) ||
                                  product.badge.toLowerCase().includes(currentSearch.toLowerCase());

            if (matchesCategory && matchesSearch) {
                filteredCount++;
                const card = document.createElement('div');
                card.className = 'product-card reveal';
                card.dataset.id = id;
                card.innerHTML = `
                    <div class="product-image-wrapper product-trigger">
                        <img src="${product.images[0]}" alt="${product.name}" class="product-image" loading="lazy">
                        <div class="product-badge">${product.badge}</div>
                        <div class="product-hover-hint">Clique para ver detalhes</div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-trigger">${product.name}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="product-footer">
                            <span class="price">R$ ${product.price.toFixed(2)}</span>
                            <div class="product-actions">
                                <button class="btn-add-cart" title="Adicionar ao carrinho">
                                    <i class="ph ph-shopping-cart-simple"></i>
                                </button>
                                <button class="btn-buy" data-produto="${product.name}">
                                    <i class="ph-bold ph-whatsapp-logo"></i> Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(card);
            }
        });

        if (filteredCount === 0) {
            productsGrid.innerHTML = `
                <div class="no-products-msg" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <i class="ph ph-warning-circle" style="font-size: 3.5rem; color: var(--accent-neon); margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.15rem; font-weight: 500; font-family: var(--font-heading);">Nenhuma isca encontrada para a sua busca.</p>
                </div>
            `;
        }

        // Initialize scroll reveal on newly rendered cards
        if (typeof initScrollReveal === 'function') {
            initScrollReveal();
        }
    }

    // Filter Buttons Event Listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderCatalog();
        });
    });

    // Search Input Event Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderCatalog();
        });
    }

    // Event Delegation on Products Grid for interactions
    if (productsGrid) {
        productsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            const id = card.dataset.id;

            if (e.target.closest('.product-trigger')) {
                openModal(id);
            } else if (e.target.closest('.btn-add-cart')) {
                e.stopPropagation();
                addToCart(id);
            } else if (e.target.closest('.btn-buy')) {
                e.stopPropagation();
                const product = products[id];
                const message = `Olá! Gostaria de comprar a isca *${product.name}* que vi no site.`;
                sendWhatsAppMessage(message);
            }
        });
    }

    // Render initially
    renderCatalog();

    // --- CART LOGIC ---
    let cart = JSON.parse(localStorage.getItem('pescashop_cart')) || [];

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
                if (!product) return;
                total += product.price * item.qty;
                count += item.qty;

                let variantInfoHtml = '';
                if (item.color || item.size) {
                    const colorBadge = item.color ? `${item.color.name}${item.color.uv ? ' <span style="background:#8b5cf6;color:white;font-size:0.6rem;padding:1px 4px;border-radius:4px;font-weight:800;box-shadow:0 0 5px rgba(139,92,246,0.6);margin-left:2px;">UV</span>' : ''}` : '';
                    const sizeInfo = item.size ? `${item.size}` : '';
                    variantInfoHtml = `<div class="cart-item-variant" style="font-size:0.75rem;color:var(--text-muted);margin:0.1rem 0 0.4rem 0;line-height:1.2;">
                        ${item.color ? `<span>Cor: <strong>${colorBadge}</strong></span>` : ''}
                        ${item.color && item.size ? `<span style="margin:0 0.3rem">|</span>` : ''}
                        ${item.size ? `<span>Tam: <strong>${sizeInfo}</strong></span>` : ''}
                    </div>`;
                }

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${product.images[0]}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 style="font-family:var(--font-heading);font-weight:700;font-size:0.95rem;">${product.name}</h4>
                        ${variantInfoHtml}
                        <span class="price" style="font-size:0.95rem;color:var(--accent-neon);font-weight:700;">R$ ${product.price.toFixed(2)}</span>
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
        localStorage.setItem('pescashop_cart', JSON.stringify(cart));
    }

    function addToCart(id, colorObj = null, sizeStr = null) {
        const product = products[id];
        if (!product) return;

        // Fallback to default if not specified (grid add button)
        const chosenColor = colorObj || (product.colors ? product.colors[0] : null);
        const chosenSize = sizeStr || (product.sizes ? product.sizes[0] : null);

        const colorName = chosenColor ? chosenColor.name : '';
        const sizeName = chosenSize || '';
        const cartKey = `${id}_${colorName}_${sizeName}`;

        const existingItem = cart.find(item => item.key === cartKey);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({
                key: cartKey,
                id: id,
                qty: 1,
                color: chosenColor,
                size: chosenSize
            });
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
        if (typeof closeCheckoutModal === 'function') {
            closeCheckoutModal();
        }
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

    const modalColors = document.getElementById('modal-colors');
    const modalSizes = document.getElementById('modal-sizes');
    const modalColorLabel = document.getElementById('modal-selected-color-label');
    const modalSizeLabel = document.getElementById('modal-selected-size-label');

    let currentModalProductId = null;
    let selectedColor = null;
    let selectedSize = null;

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

        // Colors
        modalColors.innerHTML = '';
        selectedColor = null;
        if (product.colors && product.colors.length > 0) {
            selectedColor = product.colors[0];
            modalColorLabel.textContent = selectedColor.name;

            product.colors.forEach((color, idx) => {
                const bubble = document.createElement('div');
                bubble.className = `color-bubble ${idx === 0 ? 'active' : ''}`;
                
                if (color.hex2) {
                    bubble.style.background = `linear-gradient(135deg, ${color.hex} 50%, ${color.hex2} 50%)`;
                } else {
                    bubble.style.backgroundColor = color.hex;
                }

                if (color.uv) {
                    const uvBadge = document.createElement('span');
                    uvBadge.className = 'uv-indicator';
                    uvBadge.textContent = 'UV';
                    bubble.appendChild(uvBadge);
                }

                bubble.addEventListener('click', () => {
                    selectedColor = color;
                    modalColorLabel.textContent = color.name;
                    document.querySelectorAll('.color-bubble').forEach(b => b.classList.remove('active'));
                    bubble.classList.add('active');

                    if (color.image) {
                        modalImg.src = color.image;
                    } else if (product.images[idx]) {
                        modalImg.src = product.images[idx];
                        document.querySelectorAll('.thumb').forEach((t, tIdx) => {
                            if (tIdx === idx) t.classList.add('active');
                            else t.classList.remove('active');
                        });
                    }
                });

                modalColors.appendChild(bubble);
            });
        } else {
            modalColorLabel.textContent = '';
        }

        // Sizes
        modalSizes.innerHTML = '';
        selectedSize = null;
        if (product.sizes && product.sizes.length > 0) {
            selectedSize = product.sizes[0];
            modalSizeLabel.textContent = selectedSize;

            product.sizes.forEach((size, idx) => {
                const pill = document.createElement('button');
                pill.className = `size-pill ${idx === 0 ? 'active' : ''}`;
                pill.textContent = size;

                pill.addEventListener('click', () => {
                    selectedSize = size;
                    modalSizeLabel.textContent = size;
                    document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                });

                modalSizes.appendChild(pill);
            });
        } else {
            modalSizeLabel.textContent = '';
        }

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

    modalAddBtn.addEventListener('click', () => {
        addToCart(currentModalProductId, selectedColor, selectedSize);
        closeModal();
    });

    // --- WHATSAPP CHECKOUT & FORM LOGIC ---
    const whatsappNumber = '5500000000000'; // O número da loja com DDD

    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutClose = document.getElementById('checkout-close');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutBtn = document.getElementById('checkout-btn');

    const checkoutName = document.getElementById('checkout-name');
    const checkoutPhone = document.getElementById('checkout-phone');
    const checkoutCep = document.getElementById('checkout-cep');
    const checkoutAddress = document.getElementById('checkout-address');
    const checkoutNumber = document.getElementById('checkout-number');
    const checkoutNeighborhood = document.getElementById('checkout-neighborhood');
    const checkoutCity = document.getElementById('checkout-city');
    const checkoutComplement = document.getElementById('checkout-complement');
    const checkoutDelivery = document.getElementById('checkout-delivery');
    const checkoutPayment = document.getElementById('checkout-payment');

    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');

    function sendWhatsAppMessage(text) {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    function updateCheckoutTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            const product = products[item.id];
            if (product) {
                subtotal += product.price * item.qty;
            }
        });

        const deliveryMethod = checkoutDelivery.value;
        let shippingCost = 0;
        let shippingText = 'Grátis';

        if (deliveryMethod === 'Motoboy') {
            shippingCost = 10;
            shippingText = 'R$ 10,00';
        } else if (deliveryMethod === 'Correios') {
            shippingCost = 0;
            shippingText = 'A combinar';
        } else if (deliveryMethod === 'Retirada') {
            shippingCost = 0;
            shippingText = 'Grátis';
        }

        const total = subtotal + shippingCost;

        summarySubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
        summaryShipping.textContent = shippingText;
        summaryTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    function openCheckoutModal() {
        if (cart.length === 0) return alert('Seu carrinho está vazio!');
        closeCart();
        updateCheckoutTotals();
        checkoutModal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeCheckoutModal() {
        checkoutModal.classList.remove('active');
        overlay.classList.remove('active');
    }

    checkoutBtn.addEventListener('click', openCheckoutModal);
    checkoutClose.addEventListener('click', closeCheckoutModal);

    checkoutDelivery.addEventListener('change', updateCheckoutTotals);

    // Formatar Telefone: (XX) XXXXX-XXXX
    checkoutPhone.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 6) {
            value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
        } else if (value.length > 2) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        e.target.value = value;
    });

    // Buscar CEP automaticamente via viaCEP
    checkoutCep.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;

        const cepRaw = value.replace('-', '');
        if (cepRaw.length === 8) {
            checkoutAddress.value = 'Buscando...';
            checkoutNeighborhood.value = 'Buscando...';
            checkoutCity.value = 'Buscando...';

            fetch(`https://viacep.com.br/ws/${cepRaw}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (data.erro) {
                        checkoutAddress.value = '';
                        checkoutNeighborhood.value = '';
                        checkoutCity.value = '';
                        alert('CEP não encontrado! Por favor, digite os dados manualmente.');
                    } else {
                        checkoutAddress.value = data.logradouro || '';
                        checkoutNeighborhood.value = data.bairro || '';
                        checkoutCity.value = `${data.localidade} - ${data.uf}`;
                        checkoutNumber.focus();
                    }
                })
                .catch(err => {
                    checkoutAddress.value = '';
                    checkoutNeighborhood.value = '';
                    checkoutCity.value = '';
                    console.error('Erro ao buscar CEP:', err);
                });
        }
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = checkoutName.value;
        const phone = checkoutPhone.value;
        const cep = checkoutCep.value;
        const address = checkoutAddress.value;
        const number = checkoutNumber.value;
        const neighborhood = checkoutNeighborhood.value;
        const city = checkoutCity.value;
        const complement = checkoutComplement.value ? ` (${checkoutComplement.value})` : '';

        const deliveryMethod = checkoutDelivery.value;
        const paymentMethod = checkoutPayment.value;

        let subtotal = 0;
        let itemsText = '';

        cart.forEach(item => {
            const product = products[item.id];
            if (product) {
                const itemSubtotal = product.price * item.qty;
                subtotal += itemSubtotal;
                
                let variantDetails = '';
                if (item.color) {
                    variantDetails += `\n  - Cor: ${item.color.name}${item.color.uv ? ' 🟣 (UV Reativo)' : ''}`;
                }
                if (item.size) {
                    variantDetails += `\n  - Tam: ${item.size}`;
                }

                itemsText += `• ${item.qty}x *${product.name}* - R$ ${itemSubtotal.toFixed(2)}${variantDetails}\n\n`;
            }
        });

        let shippingCost = 0;
        let shippingText = 'Grátis';

        if (deliveryMethod === 'Motoboy') {
            shippingCost = 10;
            shippingText = 'R$ 10,00';
        } else if (deliveryMethod === 'Correios') {
            shippingCost = 0;
            shippingText = 'A combinar';
        } else if (deliveryMethod === 'Retirada') {
            shippingCost = 0;
            shippingText = 'Grátis';
        }

        const total = subtotal + shippingCost;

        let message = `🔥 *NOVO PEDIDO - PESCA SHOP PMW* 🔥\n`;
        message += `----------------------------------------\n`;
        message += `👤 *Cliente:* ${name}\n`;
        message += `📞 *WhatsApp:* ${phone}\n\n`;
        message += `📍 *Endereço de Entrega:*\n`;
        message += `• CEP: ${cep}\n`;
        message += `• Logradouro: ${address}, nº ${number}${complement}\n`;
        message += `• Bairro: ${neighborhood}\n`;
        message += `• Cidade/UF: ${city}\n\n`;
        message += `🚚 *Forma de Entrega:* ${deliveryMethod} (${shippingText})\n`;
        message += `💳 *Forma de Pagamento:* ${paymentMethod}\n`;
        message += `----------------------------------------\n\n`;
        message += `🛒 *Itens do Pedido:*\n\n${itemsText}`;
        message += `----------------------------------------\n`;
        message += `📦 *Resumo Financeiro:*\n`;
        message += `• Subtotal: R$ ${subtotal.toFixed(2)}\n`;
        message += `• Envio: ${shippingText}\n`;
        message += `• *Total Geral: R$ ${total.toFixed(2)}*\n`;
        message += `----------------------------------------\n\n`;
        message += `Gostaria de confirmar os dados do meu pedido e receber as instruções de pagamento! 🎣`;

        // Clear cart
        cart = [];
        updateCartUI();
        closeCheckoutModal();

        sendWhatsAppMessage(message);
    });

    modalBuyNow.addEventListener('click', () => {
        const product = products[currentModalProductId];
        if (!product) return;
        const colorText = selectedColor ? ` na cor *${selectedColor.name}*` : '';
        const sizeText = selectedSize ? ` no tamanho *${selectedSize}*` : '';
        const message = `Olá! Gostaria de comprar a isca *${product.name}*${colorText}${sizeText} que vi no site.`;
        sendWhatsAppMessage(message);
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // Initialize UI & Animations
    updateCartUI();
    initScrollReveal();
});
