import { AVATAR_CATALOG } from '../models/avatarCatalog.js';

export function createAvatarCustomizer({ state, saveUserProfileToCloud, playTone, showToast, createConfetti }) {
        function selectAvatarCategory(cat) {
            playTone('click');
            state.activeAvatarCategory = cat;

            ['skin', 'hair', 'hat', 'glasses', 'shirt', 'backpack', 'shoes'].forEach(c => {
                const btn = document.getElementById(`cat-btn-${c}`);
                if (btn) {
                    btn.className = c === cat
                        ? 'avatar-cat-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow'
                        : 'avatar-cat-btn px-3 py-1.5 rounded-xl text-xs font-bold ios-glass-strong';
                }
            });

            const hairBar = document.getElementById('hair-color-picker-bar');
            if (cat === 'hair') {
                hairBar.classList.remove('hidden');
                renderHairColorSwatches();
            } else {
                hairBar.classList.add('hidden');
            }

            renderAvatarCategoryItems();
        }

        function renderHairColorSwatches() {
            const container = document.getElementById('hair-color-swatches');
            const fragment = document.createDocumentFragment();
            AVATAR_CATALOG.hairColors.forEach(hc => {
                const btn = document.createElement('button');
                const isSelected = state.avatar.hairColor === hc.id;
                btn.className = `w-7 h-7 rounded-full border-2 transition-transform ${isSelected ? 'scale-125 border-white shadow-lg' : 'border-white/40'}`;
                btn.style.backgroundColor = hc.id;
                btn.title = hc.name;
                btn.onclick = () => {
                    playTone('click');
                    state.avatar.hairColor = hc.id;
                    saveUserProfileToCloud(false);
                };
                fragment.appendChild(btn);
            });
            container.replaceChildren(fragment);
        }

        function renderAvatarCategoryItems() {
            const grid = document.getElementById('avatar-items-grid');
            if (!grid) return;
            const fragment = document.createDocumentFragment();

            const cat = state.activeAvatarCategory;
            const items = AVATAR_CATALOG[cat] || [];

            items.forEach(item => {
                const isOwned = item.price === 0 || state.ownedItems.includes(item.id);
                const isEquipped = (cat === 'skin' && state.avatar.skin === item.color) || (state.avatar[cat] === item.id);

                const card = document.createElement('button');
                card.className = `p-3.5 rounded-2xl text-left flex flex-col justify-between transition-all ios-btn ${
                    isEquipped ? 'bg-indigo-600/40 border-2 border-indigo-400' : 'ios-glass-strong'
                }`;

                let previewBadge = `<span class="text-2xl">${item.icon || '✨'}</span>`;
                if (cat === 'skin') {
                    previewBadge = `<span class="w-8 h-8 rounded-full border-2 border-white shadow" style="background:${item.color}"></span>`;
                }

                let actionLabel = '';
                if (isEquipped) {
                    actionLabel = `<span class="text-[11px] font-extrabold text-emerald-300">✓ Equipado</span>`;
                } else if (isOwned) {
                    actionLabel = `<span class="text-[11px] font-bold text-sky-300">Equipar gratis</span>`;
                } else {
                    actionLabel = `<span class="text-[11px] font-extrabold text-amber-300">🪙 Comprar (${item.price})</span>`;
                }

                card.innerHTML = `
                    <div class="flex items-center justify-between gap-2 mb-2">
                        ${previewBadge}
                        ${!isOwned ? `<span class="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">🔒 ${item.price} 🪙</span>` : ''}
                    </div>
                    <div>
                        <h4 class="font-bold text-xs sm:text-sm leading-tight mb-1">${item.name}</h4>
                        ${actionLabel}
                    </div>
                `;

                card.onclick = () => handleAvatarItemClick(cat, item);
                fragment.appendChild(card);
            });
            grid.replaceChildren(fragment);
        }

        function handleAvatarItemClick(cat, item) {
            const isOwned = item.price === 0 || state.ownedItems.includes(item.id);

            if (isOwned) {
                playTone('click');
                if (cat === 'skin') {
                    state.avatar.skin = item.color;
                } else {
                    state.avatar[cat] = item.id;
                }
                saveUserProfileToCloud(false);
                return;
            }

            // Proceso de compra con monedas
            if (state.coins < item.price) {
                playTone('wrong');
                showToast('🪙', `Te faltan ${item.price - state.coins} monedas. ¡Haz un Reto Diario o Mini Examen!`);
                return;
            }

            state.coins -= item.price;
            state.ownedItems.push(item.id);
            if (cat === 'skin') {
                state.avatar.skin = item.color;
            } else {
                state.avatar[cat] = item.id;
            }
            playTone('coin');
            createConfetti(20);
            showToast('🛍️', `¡Compraste y equipaste ${item.name}!`);
            saveUserProfileToCloud(false);
        }

        function randomizeAvatar() {
            playTone('click');
            const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];
            state.avatar.skin = randomPick(AVATAR_CATALOG.skin).color;
            state.avatar.hairColor = randomPick(AVATAR_CATALOG.hairColors).id;

            ['hair', 'hat', 'glasses', 'shirt', 'backpack', 'shoes'].forEach(cat => {
                const unlocked = AVATAR_CATALOG[cat].filter(i => i.price === 0 || state.ownedItems.includes(i.id));
                if (unlocked.length > 0) {
                    state.avatar[cat] = randomPick(unlocked).id;
                }
            });
            saveUserProfileToCloud(false);
            showToast('🎲', '¡Estilo aleatorio equipado!');
        }

        // ======================================================================
        // GENERADOR DE PROBLEMAS DE 1° DE PRIMARIA A 3° DE PREPARATORIA
        // ======================================================================

    return { selectAvatarCategory, randomizeAvatar, renderAvatarCategoryItems };
}