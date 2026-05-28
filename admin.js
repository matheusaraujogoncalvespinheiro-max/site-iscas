document.addEventListener('DOMContentLoaded', () => {

    // --- PRODUCT DATA INITIAL DATABASE FALLBACK ---
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
            desc: 'Uma isca extremamente versátil. Pode ser trabalhada como Zara (nado em Z) or como Stick (simulando peixe moribundo). Ótima para atrair grandes tucunarés em espraiados.',
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

    // --- CARREGAMENTO DO BANCO DE DADOS ---
    let products = JSON.parse(localStorage.getItem('pescashop_products')) || DEFAULT_PRODUCTS;

    function saveProducts() {
        localStorage.setItem('pescashop_products', JSON.stringify(products));
        // Disparar evento customizado de storage para sincronizar abas do mesmo navegador imediatamente
        window.dispatchEvent(new Event('storage'));
    }

    // --- CONTROLES DE AUTENTICAÇÃO ---
    const adminLoginView = document.getElementById('admin-login-view');
    const adminDashboardView = document.getElementById('admin-dashboard-view');
    const loginForm = document.getElementById('login-form');
    const adminPasswordInput = document.getElementById('admin-password');

    // Verificar se já está logado na sessão ativa
    if (sessionStorage.getItem('pescashop_admin_logged') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }

    function showLogin() {
        adminLoginView.style.display = 'flex';
        adminDashboardView.style.display = 'none';
        adminPasswordInput.focus();
    }

    function showDashboard() {
        adminLoginView.style.display = 'none';
        adminDashboardView.style.display = 'flex';
        renderAdminProducts();
    }

    // Processar Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = adminPasswordInput.value;
            if (password === 'pesca123') {
                sessionStorage.setItem('pescashop_admin_logged', 'true');
                showDashboard();
            } else {
                alert('Senha incorreta! Tente novamente.');
                adminPasswordInput.value = '';
                adminPasswordInput.focus();
            }
        });
    }

    // --- SMART COLOR PARSER ---
    function parseColors(input) {
        const value = input.trim();
        if (!value) return [];

        // 1. Try parsing as JSON first
        if (value.startsWith('[') || value.startsWith('{')) {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
                try {
                    // Try replacing single quotes with double quotes
                    const parsed = JSON.parse(value.replace(/'/g, '"'));
                    return Array.isArray(parsed) ? parsed : [parsed];
                } catch (e2) {
                    console.warn('Falhou ao analisar como JSON, tentando parse de texto livre', e2);
                }
            }
        }

        // 2. Parse as a comma/semicolon/newline separated list of colors
        const items = value.split(/[,\n;]+/).map(item => item.trim()).filter(Boolean);
        const colorMap = {
            'osso': { hex: '#fdf6e2', uv: true },
            'verde limao': { hex: '#ccff00', uv: true },
            'verde limão': { hex: '#ccff00', uv: true },
            'limao': { hex: '#ccff00', uv: true },
            'limão': { hex: '#ccff00', uv: true },
            'rosa': { hex: '#ec4899', uv: true },
            'laranja': { hex: '#f97316', uv: true },
            'cenoura': { hex: '#f97316', uv: true },
            'vermelho': { hex: '#ef4444', uv: false },
            'preto': { hex: '#111111', uv: false },
            'prata': { hex: '#e2e8f0', uv: false },
            'dourado': { hex: '#fbbf24', uv: false },
            'azul': { hex: '#3b82f6', uv: false },
            'branco': { hex: '#ffffff', uv: false },
            'verde': { hex: '#16a34a', uv: false },
            'musgo': { hex: '#14532d', uv: false },
            'peixe': { hex: '#94a3b8', uv: false },
            'peixinho': { hex: '#94a3b8', uv: false },
            'perola': { hex: '#fafaf9', uv: false },
            'pérola': { hex: '#fafaf9', uv: false },
            'amarelo': { hex: '#fbbf24', uv: false }
        };

        return items.map(item => {
            let name = item;
            let uv = false;

            // Check if name contains 'UV' (case insensitive)
            if (/\b(uv)\b/i.test(name)) {
                uv = true;
            }

            // Extract any hex codes (e.g. #ff0000 or #f00)
            const hexRegex = /#([0-9A-Fa-f]{3,6})\b/g;
            const hexMatches = [];
            let match;
            while ((match = hexRegex.exec(name)) !== null) {
                hexMatches.push(match[0]);
            }

            // Clean the name from hex codes, UV labels and empty parentheses
            name = name.replace(/#([0-9A-Fa-f]{3,6})/g, '')
                       .replace(/\(\s*uv\s*\)/i, '')
                       .replace(/\buv\b/i, '')
                       .replace(/\(\s*\/\s*\)/g, '')
                       .replace(/\(\s*\)/g, '')
                       .replace(/\s+/g, ' ')
                       .trim();

            let hex = null;
            let hex2 = null;

            if (hexMatches.length >= 2) {
                hex = hexMatches[0];
                hex2 = hexMatches[1];
            } else if (hexMatches.length === 1) {
                hex = hexMatches[0];
            }

            // If hex is not explicitly provided, try to guess from the clean name
            if (!hex) {
                const cleanLower = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                // Exact or partial match
                if (colorMap[cleanLower]) {
                    hex = colorMap[cleanLower].hex;
                    if (colorMap[cleanLower].uv) uv = true;
                } else if (name.includes('/')) {
                    // Split colors like "Preto/Amarelo"
                    const parts = name.split('/').map(p => p.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                    if (parts[0] && colorMap[parts[0]]) {
                        hex = colorMap[parts[0]].hex;
                        if (colorMap[parts[0]].uv) uv = true;
                    }
                    if (parts[1] && colorMap[parts[1]]) {
                        hex2 = colorMap[parts[1]].hex;
                        if (colorMap[parts[1]].uv) uv = true;
                    }
                } else {
                    // Fuzzy matching check in keys
                    const foundKey = Object.keys(colorMap).find(key => cleanLower.includes(key));
                    if (foundKey) {
                        hex = colorMap[foundKey].hex;
                        if (colorMap[foundKey].uv) uv = true;
                    }
                }
            }

            if (!hex) hex = '#888888'; // Default fallback grey

            const colorObj = { name, hex, uv };
            if (hex2) colorObj.hex2 = hex2;

            return colorObj;
        });
    }

    // --- ELEMENTOS DO WORKSPACE ---
    const adminProductsList = document.getElementById('admin-products-list');
    const adminAddProductBtn = document.getElementById('admin-add-product-btn');
    const adminResetBtn = document.getElementById('admin-reset-btn');
    const overlay = document.getElementById('overlay');

    // Elementos do Modal de Produto
    const adminProductModal = document.getElementById('admin-product-modal');
    const adminProductClose = document.getElementById('admin-product-close');
    const adminProductForm = document.getElementById('admin-product-form');
    const adminProductModalTitle = document.getElementById('admin-product-modal-title');

    // Inputs do Formulário
    const inputProductId = document.getElementById('admin-product-id');
    const inputProductName = document.getElementById('admin-product-name');
    const inputProductPrice = document.getElementById('admin-product-price');
    const inputProductStock = document.getElementById('admin-product-stock');
    const inputProductCategory = document.getElementById('admin-product-category');
    const inputProductBadge = document.getElementById('admin-product-badge');
    const inputProductDesc = document.getElementById('admin-product-desc');
    const inputProductSizes = document.getElementById('admin-product-sizes');
    const inputProductColors = document.getElementById('admin-product-colors');

    // --- RENDERIZAÇÃO DA TABELA ---
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
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); vertical-align: middle;">
                    <div class="product-meta-cell">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <span class="product-name-txt">${product.name}</span>
                    </div>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); vertical-align: middle;">
                    <span class="product-price-txt">R$ ${product.price.toFixed(2)}</span>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); text-transform: capitalize; color: var(--text-muted); vertical-align: middle;">
                    ${product.category}
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); text-align: center; vertical-align: middle;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
                        <div class="admin-stock-control">
                            <button class="admin-stock-btn stock-minus" data-id="${id}">-</button>
                            <span class="admin-stock-value">${product.stock !== undefined ? product.stock : 0}</span>
                            <button class="admin-stock-btn stock-plus" data-id="${id}">+</button>
                        </div>
                        ${stockBadge}
                    </div>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--border-color); text-align: right; vertical-align: middle;">
                    <button class="admin-action-btn edit-product" data-id="${id}" title="Editar"><i class="ph ph-pencil-simple"></i></button>
                    <button class="admin-action-btn delete delete-product" data-id="${id}" title="Excluir"><i class="ph ph-trash"></i></button>
                </td>
            `;
            adminProductsList.appendChild(tr);
        });
    }

    // --- CONTROLE RÁPIDO DE QUANTIDADE E AÇÕES ---
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
                }
            } else if (btn.classList.contains('stock-plus')) {
                if (products[id].stock === undefined) products[id].stock = 0;
                products[id].stock++;
                saveProducts();
                renderAdminProducts();
            } else if (btn.classList.contains('edit-product')) {
                openEditProductModal(id);
            } else if (btn.classList.contains('delete-product')) {
                if (confirm(`Tem certeza que deseja excluir a isca "${products[id].name}" do catálogo?`)) {
                    delete products[id];
                    saveProducts();
                    renderAdminProducts();
                }
            }
        });
    }

    // --- RESETAR CATÁLOGO ---
    if (adminResetBtn) {
        adminResetBtn.addEventListener('click', () => {
            if (confirm('Atenção: Isso redefinirá todo o estoque e catálogo de volta para as 6 iscas iniciais da Pesca Shop PMW. Deseja continuar?')) {
                products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
                saveProducts();
                renderAdminProducts();
                alert('Catálogo redefinido com sucesso!');
            }
        });
    }

    // --- CADASTRO E EDIÇÃO (MODAL) ---
    
    // Abrir Modal para Criar Novo
    if (adminAddProductBtn) {
        adminAddProductBtn.addEventListener('click', () => {
            adminProductModalTitle.textContent = 'Adicionar Nova Isca';
            adminProductForm.reset();
            inputProductId.value = '';
            
            // Sugestão padrão nos placeholders e valores prévios
            inputProductSizes.value = '6.0 cm (12g), 8.5 cm (18g)';
            inputProductColors.value = 'Verde Limão (UV), Osso (UV), Branco/Azul';
            
            adminProductModal.classList.add('active');
            overlay.classList.add('active');
        });
    }

    // Fechar Modal
    function closeModal() {
        adminProductModal.classList.remove('active');
        overlay.classList.remove('active');
    }

    if (adminProductClose) {
        adminProductClose.addEventListener('click', closeModal);
    }
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Abrir Modal para Editar Existente
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
        
        if (product.colors && Array.isArray(product.colors)) {
            const colorStrings = product.colors.map(c => {
                let s = c.name;
                if (c.hex && c.hex2) {
                    s += ` (${c.hex}/${c.hex2})`;
                } else if (c.hex) {
                    s += ` (${c.hex})`;
                }
                if (c.uv && !s.toLowerCase().includes('uv')) {
                    s += ' (UV)';
                }
                return s;
            });
            inputProductColors.value = colorStrings.join(', ');
        } else {
            inputProductColors.value = '';
        }

        adminProductModal.classList.add('active');
        overlay.classList.add('active');
    }

    // Salvar Dados do Formulário (Submit)
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

            // Formatar array de tamanhos
            const sizes = inputProductSizes.value.split(',').map(s => s.trim()).filter(s => s.length > 0);

            // Validar e formatar cores (suporta texto livre ou JSON)
            let colors = [];
            try {
                colors = parseColors(inputProductColors.value);
            } catch (err) {
                alert('Erro ao processar as cores! Por favor, verifique a formatação.');
                return;
            }

            // Gerar ID se for produto novo de forma robusta
            const numericKeys = Object.keys(products).map(Number).filter(n => !isNaN(n));
            const nextId = numericKeys.length > 0 ? Math.max(...numericKeys) + 1 : 1;
            const targetId = id || nextId.toString();

            // Configurar imagens fallback baseadas na categoria
            let images = ['images/lure_1.png', 'images/lure_4.png']; 
            if (id && products[id] && products[id].images) {
                images = products[id].images;
            } else {
                if (category === 'meia-agua') images = ['images/lure_2.png', 'images/lure_5.png'];
                else if (category === 'fundo') images = ['images/lure_3.png', 'images/lure_1.png'];
            }

            // Gravar objeto
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
            closeModal();
            renderAdminProducts();
            
            alert(id ? 'Isca atualizada com sucesso!' : 'Nova isca cadastrada com sucesso!');
        });
    }

    // Sincronizar painel em tempo real caso o catálogo seja modificado em outra aba
    window.addEventListener('storage', (e) => {
        if (!e.key || e.key === 'pescashop_products') {
            products = JSON.parse(localStorage.getItem('pescashop_products')) || DEFAULT_PRODUCTS;
            renderAdminProducts();
        }
    });

});
