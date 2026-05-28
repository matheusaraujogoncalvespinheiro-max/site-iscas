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
    const DEFAULT_PRODUCTS = {
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
            sizes: ['6.0 cm (12g)', '7.5 cm (18g)'],
            stock: 12
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
            sizes: ['9.0 cm (13g)', '11.0 cm (18g)'],
            stock: 8
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
            sizes: ['10g (Leve)', '14g (Médio)'],
            stock: 5
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
            sizes: ['8.0 cm (14g)', '10.5 cm (22g)'],
            stock: 15
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
            sizes: ['7.0 cm (15g)', '9.0 cm (24g)'],
            stock: 10
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
            sizes: ['9.0 cm (12g)', '11.5 cm (20g)'],
            stock: 6
        }
    };

    let products = JSON.parse(localStorage.getItem('pescashop_products')) || DEFAULT_PRODUCTS;

    function saveProducts() {
        localStorage.setItem('pescashop_products', JSON.stringify(products));
    }

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

                const isOutOfStock = product.stock !== undefined && product.stock <= 0;
                const stockBadgeHtml = isOutOfStock 
                    ? `<div class="product-badge" style="background:#ef4444;border-color:#ef4444;">Esgotado</div>` 
                    : `<div class="product-badge">${product.badge}</div>`;
                
                const buttonActionsHtml = isOutOfStock 
                    ? `<span style="font-size:0.8rem;color:#ef4444;font-weight:700;display:inline-flex;align-items:center;gap:0.25rem;padding:0.5rem 0;"><i class="ph-bold ph-x-circle"></i> Esgotado</span>` 
                    : `
                        <button class="btn-add-cart" title="Adicionar ao carrinho">
                            <i class="ph ph-shopping-cart-simple"></i>
                        </button>
                        <button class="btn-buy" data-produto="${product.name}">
                            <i class="ph-bold ph-whatsapp-logo"></i> Comprar
                        </button>
                    `;

                card.innerHTML = `
                    <div class="product-image-wrapper product-trigger">
                        <img src="${product.images[0]}" alt="${product.name}" class="product-image" loading="lazy" style="${isOutOfStock ? 'filter: grayscale(0.8) opacity(0.5);' : ''}">
                        ${stockBadgeHtml}
                        <div class="product-hover-hint">Clique para ver detalhes</div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-trigger">${product.name}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="product-footer">
                            <span class="price">R$ ${product.price.toFixed(2)}</span>
                            <div class="product-actions">
                                ${buttonActionsHtml}
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
        const currentQtyInCart = existingItem ? existingItem.qty : 0;

        if (product.stock !== undefined && currentQtyInCart >= product.stock) {
            alert(`Desculpe, temos apenas ${product.stock} unidade(s) de "${product.name}" em estoque.`);
            return;
        }

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
            const item = cart[index];
            const product = products[item.id];
            if (product && product.stock !== undefined && item.qty >= product.stock) {
                alert(`Desculpe, temos apenas ${product.stock} unidade(s) de "${product.name}" em estoque.`);
            } else {
                item.qty++;
            }
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

        const isOutOfStock = product.stock !== undefined && product.stock <= 0;
        if (isOutOfStock) {
            modalAddBtn.disabled = true;
            modalAddBtn.innerHTML = `<i class="ph ph-x-circle"></i> Indisponível`;
            modalAddBtn.style.opacity = '0.5';
            modalAddBtn.style.cursor = 'not-allowed';
            
            modalBuyNow.disabled = true;
            modalBuyNow.innerHTML = `<i class="ph ph-x-circle"></i> Esgotado`;
            modalBuyNow.style.opacity = '0.5';
            modalBuyNow.style.cursor = 'not-allowed';
        } else {
            modalAddBtn.disabled = false;
            modalAddBtn.innerHTML = `<i class="ph ph-shopping-cart-simple"></i> Adicionar ao Carrinho`;
            modalAddBtn.style.opacity = '1';
            modalAddBtn.style.cursor = 'pointer';
            
            modalBuyNow.disabled = false;
            modalBuyNow.innerHTML = `<i class="ph ph-whatsapp-logo"></i> Comprar Agora`;
            modalBuyNow.style.opacity = '1';
            modalBuyNow.style.cursor = 'pointer';
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

    // --- ADMIN PANEL LOGIC ---
    const adminTrigger = document.getElementById('admin-trigger');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginClose = document.getElementById('admin-login-close');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasswordInput = document.getElementById('admin-password');

    const adminPanelModal = document.getElementById('admin-panel-modal');
    const adminPanelClose = document.getElementById('admin-panel-close');
    const adminProductsList = document.getElementById('admin-products-list');
    const adminAddProductBtn = document.getElementById('admin-add-product-btn');
    const adminResetBtn = document.getElementById('admin-reset-btn');

    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    const adminTabContents = document.querySelectorAll('.admin-tab-content');
    const adminExporterCode = document.getElementById('admin-exporter-code');
    const adminCopyCodeBtn = document.getElementById('admin-copy-code-btn');

    const adminProductModal = document.getElementById('admin-product-modal');
    const adminProductClose = document.getElementById('admin-product-close');
    const adminProductForm = document.getElementById('admin-product-form');
    const adminProductModalTitle = document.getElementById('admin-product-modal-title');

    // Form inputs
    const inputProductId = document.getElementById('admin-product-id');
    const inputProductName = document.getElementById('admin-product-name');
    const inputProductPrice = document.getElementById('admin-product-price');
    const inputProductStock = document.getElementById('admin-product-stock');
    const inputProductCategory = document.getElementById('admin-product-category');
    const inputProductBadge = document.getElementById('admin-product-badge');
    const inputProductDesc = document.getElementById('admin-product-desc');
    const inputProductSizes = document.getElementById('admin-product-sizes');
    const inputProductColors = document.getElementById('admin-product-colors');

    // Open Admin Trigger
    if (adminTrigger) {
        adminTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            adminPasswordInput.value = '';
            adminLoginModal.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (adminLoginClose) {
        adminLoginClose.addEventListener('click', () => {
            adminLoginModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Submit Password Form
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = adminPasswordInput.value;
            if (password === 'pesca123') {
                adminLoginModal.classList.remove('active');
                openAdminPanel();
            } else {
                alert('Senha incorreta! Tente novamente.');
                adminPasswordInput.value = '';
                adminPasswordInput.focus();
            }
        });
    }

    function openAdminPanel() {
        renderAdminProducts();
        adminPanelModal.classList.add('active');
        overlay.classList.add('active');
    }

    if (adminPanelClose) {
        adminPanelClose.addEventListener('click', () => {
            adminPanelModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Render Products Table in Admin
    function renderAdminProducts() {
        if (!adminProductsList) return;
        adminProductsList.innerHTML = '';

        Object.keys(products).forEach(id => {
            const product = products[id];
            const isOutOfStock = product.stock !== undefined && product.stock <= 0;
            const stockBadge = isOutOfStock 
                ? `<span class="stock-badge out-of-stock">Esgotado</span>` 
                : `<span class="stock-badge in-stock">Em Estoque</span>`;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem; color: #fff; font-weight: 600;">
                    <img src="${product.images[0]}" class="admin-product-thumb" alt="${product.name}">
                    <span>${product.name}</span>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); color: #fff;">R$ ${product.price.toFixed(2)}</td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); text-transform: capitalize; color: var(--text-muted);">${product.category}</td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); text-align: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
                        <div class="admin-stock-control">
                            <button class="admin-stock-btn stock-minus" data-id="${id}">-</button>
                            <span class="admin-stock-value">${product.stock !== undefined ? product.stock : 0}</span>
                            <button class="admin-stock-btn stock-plus" data-id="${id}">+</button>
                        </div>
                        ${stockBadge}
                    </div>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); text-align: right;">
                    <button class="admin-action-btn edit-product" data-id="${id}" title="Editar"><i class="ph ph-pencil-simple"></i></button>
                    <button class="admin-action-btn delete delete-product" data-id="${id}" title="Excluir"><i class="ph ph-trash"></i></button>
                </td>
            `;
            adminProductsList.appendChild(tr);
        });

        // Generate exporter code
        generateExporterCode();
    }

    // Handle Quick Stock and Actions in Table
    if (adminProductsList) {
        adminProductsList.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = btn.dataset.id;
            if (btn.classList.contains('stock-minus')) {
                if (products[id].stock > 0) {
                    products[id].stock--;
                    saveProducts();
                    renderAdminProducts();
                    renderCatalog();
                }
            } else if (btn.classList.contains('stock-plus')) {
                if (products[id].stock === undefined) products[id].stock = 0;
                products[id].stock++;
                saveProducts();
                renderAdminProducts();
                renderCatalog();
            } else if (btn.classList.contains('edit-product')) {
                openEditProductModal(id);
            } else if (btn.classList.contains('delete-product')) {
                if (confirm(`Tem certeza que deseja excluir a isca "${products[id].name}" do catálogo?`)) {
                    delete products[id];
                    saveProducts();
                    renderAdminProducts();
                    renderCatalog();
                }
            }
        });
    }

    // Tabs Navigation Lógica
    adminTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            adminTabBtns.forEach(b => {
                b.classList.remove('active');
                b.style.color = 'var(--text-muted)';
            });
            btn.classList.add('active');
            btn.style.color = '#000';

            const tabName = btn.dataset.tab;
            adminTabContents.forEach(content => {
                if (content.id === `admin-tab-${tabName}`) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // Copy Exporter Code
    if (adminCopyCodeBtn) {
        adminCopyCodeBtn.addEventListener('click', () => {
            adminExporterCode.select();
            document.execCommand('copy');
            alert('Código do catálogo copiado para a área de transferência!');
        });
    }

    function generateExporterCode() {
        if (!adminExporterCode) return;
        // Strip out keys for storage, output clean formatted JavaScript object
        const code = `// Cole este objeto no início do seu arquivo script.js para atualizar permanentemente
const INITIAL_PRODUCTS_DATABASE = ${JSON.stringify(products, null, 4)};`;
        adminExporterCode.value = code;
    }

    // Reset Catalog to Default
    if (adminResetBtn) {
        adminResetBtn.addEventListener('click', () => {
            if (confirm('Atenção: Isso redefinirá todo o estoque e produtos para as 6 iscas padrões iniciais. Deseja continuar?')) {
                products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
                saveProducts();
                renderAdminProducts();
                renderCatalog();
                alert('Catálogo redefinido com sucesso!');
            }
        });
    }

    // Add Product Modal Trigger
    if (adminAddProductBtn) {
        adminAddProductBtn.addEventListener('click', () => {
            adminProductModalTitle.textContent = 'Adicionar Nova Isca';
            adminProductForm.reset();
            inputProductId.value = '';
            
            // Set some default colors/sizes in form for helper
            inputProductSizes.value = '6.0 cm (12g), 8.5 cm (18g)';
            inputProductColors.value = '[\n  {"name": "Verde Limão (UV)", "hex": "#ccff00", "uv": true},\n  {"name": "Osso (UV)", "hex": "#fdf6e2", "uv": true}\n]';
            
            adminProductModal.classList.add('active');
        });
    }

    if (adminProductClose) {
        adminProductClose.addEventListener('click', () => {
            adminProductModal.classList.remove('active');
        });
    }

    // Edit Product Modal
    function openEditProductModal(id) {
        const product = products[id];
        adminProductModalTitle.textContent = `Editar Isca: ${product.name}`;
        
        inputProductId.value = id;
        inputProductName.value = product.name;
        inputProductPrice.value = product.price;
        inputProductStock.value = product.stock !== undefined ? product.stock : 10;
        inputProductCategory.value = product.category;
        inputProductBadge.value = product.badge;
        inputProductDesc.value = product.desc;
        
        inputProductSizes.value = product.sizes ? product.sizes.join(', ') : '';
        inputProductColors.value = product.colors ? JSON.stringify(product.colors, null, 2) : '[]';

        adminProductModal.classList.add('active');
    }

    // Submit Add/Edit Form
    if (adminProductForm) {
        adminProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const id = inputProductId.value;
            const name = inputProductName.value;
            const price = parseFloat(inputProductPrice.value);
            const stock = parseInt(inputProductStock.value);
            const category = inputProductCategory.value;
            const badge = inputProductBadge.value;
            const desc = inputProductDesc.value;

            // Formatar sizes array
            const sizes = inputProductSizes.value.split(',').map(s => s.trim()).filter(s => s.length > 0);

            // Validar e formatar colors JSON
            let colors = [];
            try {
                if (inputProductColors.value.trim().length > 0) {
                    colors = JSON.parse(inputProductColors.value);
                }
            } catch (err) {
                alert('Erro de formatação na caixa de Cores JSON! Certifique-se de digitar um JSON válido.');
                return;
            }

            // Se for novo produto, gera id numérico incremental
            const targetId = id || (Math.max(...Object.keys(products).map(Number)) + 1).toString();

            // Set images array (keep existing or set defaults based on category)
            let images = ['images/lure_1.png', 'images/lure_4.png']; // Fallback
            if (id && products[id] && products[id].images) {
                images = products[id].images;
            } else {
                // Assign sensible lure images based on category
                if (category === 'meia-agua') images = ['images/lure_2.png', 'images/lure_5.png'];
                else if (category === 'fundo') images = ['images/lure_3.png', 'images/lure_1.png'];
            }

            products[targetId] = {
                name,
                price,
                desc,
                badge,
                category,
                images,
                colors,
                sizes,
                stock
            };

            saveProducts();
            adminProductModal.classList.remove('active');
            renderAdminProducts();
            renderCatalog();
            
            alert(id ? 'Produto atualizado com sucesso!' : 'Novo produto adicionado com sucesso!');
        });
    }

    // Initialize UI & Animations
    updateCartUI();
    initScrollReveal();
});
