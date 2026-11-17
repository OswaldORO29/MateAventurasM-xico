import { AVATAR_CATALOG } from '../models/avatarCatalog.js';

export function buildAvatarSVG(avatarCfg, isMini = false) {
            const skin = avatarCfg.skin || '#F1C27D';
            const hairColor = avatarCfg.hairColor || '#1e293b';
            const shirtObj = AVATAR_CATALOG.shirt.find(s => s.id === avatarCfg.shirt) || AVATAR_CATALOG.shirt[0];
            const bagObj = AVATAR_CATALOG.backpack.find(b => b.id === avatarCfg.backpack) || AVATAR_CATALOG.backpack[0];
            const shoeObj = AVATAR_CATALOG.shoes.find(sh => sh.id === avatarCfg.shoes) || AVATAR_CATALOG.shoes[0];

            // 1. Capa de Mochila (detrás del torso)
            let backpackSvg = '';
            if (avatarCfg.backpack === 'bag_school' || avatarCfg.backpack === 'bag_camper') {
                const c = bagObj.color || '#3b82f6';
                backpackSvg = `
                    <rect x="26" y="76" width="68" height="48" rx="14" fill="${c}" stroke="#0f172a" stroke-width="2.5"/>
                    <rect x="30" y="68" width="12" height="12" rx="4" fill="${c}"/>
                    <rect x="78" y="68" width="12" height="12" rx="4" fill="${c}"/>
                `;
            } else if (avatarCfg.backpack === 'bag_gamer') {
                backpackSvg = `
                    <rect x="24" y="74" width="72" height="50" rx="14" fill="#1e1b4b" stroke="#ec4899" stroke-width="3"/>
                    <circle cx="30" cy="95" r="4" fill="#22d3ee"/>
                    <circle cx="90" cy="95" r="4" fill="#22d3ee"/>
                `;
            } else if (avatarCfg.backpack === 'bag_jetpack') {
                backpackSvg = `
                    <rect x="20" y="72" width="16" height="46" rx="7" fill="#cbd5e1" stroke="#334155" stroke-width="2.5"/>
                    <rect x="84" y="72" width="16" height="46" rx="7" fill="#cbd5e1" stroke="#334155" stroke-width="2.5"/>
                    <path d="M23 118 L28 134 L33 118 Z" fill="#f97316"/>
                    <path d="M87 118 L92 134 L97 118 Z" fill="#f97316"/>
                `;
            }

            // 2. Capa de Calzado (Tenis o Huaraches)
            let shoesSvg = '';
            if (shoeObj.type === 'huarache') {
                // Diseño de Huaraches Tradicionales / Artesanales con correas cruzadas y suela
                shoesSvg = `
                    <!-- Huarache Izquierdo -->
                    <g>
                        <rect x="34" y="156" width="22" height="11" rx="5" fill="${skin}"/>
                        <rect x="32" y="164" width="25" height="5" rx="2.5" fill="#451a03"/>
                        <path d="M34 159 L55 163 M34 163 L55 159 M40 156 L40 165 M49 156 L49 165" stroke="${shoeObj.color}" stroke-width="2.6" stroke-linecap="round"/>
                        <circle cx="44" cy="160" r="1.8" fill="${shoeObj.accent}"/>
                    </g>
                    <!-- Huarache Derecho -->
                    <g>
                        <rect x="64" y="156" width="22" height="11" rx="5" fill="${skin}"/>
                        <rect x="63" y="164" width="25" height="5" rx="2.5" fill="#451a03"/>
                        <path d="M65 159 L86 163 M65 163 L86 159 M71 156 L71 165 M80 156 L80 165" stroke="${shoeObj.color}" stroke-width="2.6" stroke-linecap="round"/>
                        <circle cx="75" cy="160" r="1.8" fill="${shoeObj.accent}"/>
                    </g>
                `;
            } else {
                // Diseño de Tenis Deportivos
                shoesSvg = `
                    <!-- Tenis Izquierdo -->
                    <g>
                        <path d="M32 155 H55 V166 H30 C28 166 28 159 32 155 Z" fill="${shoeObj.color}" stroke="#0f172a" stroke-width="2"/>
                        <rect x="29" y="164" width="27" height="4.5" rx="2" fill="#ffffff"/>
                        <path d="M38 159 L48 162" stroke="${shoeObj.accent}" stroke-width="2.5" stroke-linecap="round"/>
                    </g>
                    <!-- Tenis Derecho -->
                    <g>
                        <path d="M65 155 H88 C92 159 92 166 90 166 H65 V155 Z" fill="${shoeObj.color}" stroke="#0f172a" stroke-width="2"/>
                        <rect x="64" y="164" width="27" height="4.5" rx="2" fill="#ffffff"/>
                        <path d="M72 162 L82 159" stroke="${shoeObj.accent}" stroke-width="2.5" stroke-linecap="round"/>
                    </g>
                `;
            }

            // 3. Capa de Playera / Sudadera
            let shirtDecor = '';
            if (avatarCfg.shirt === 'shirt_hoodie') {
                shirtDecor = `
                    <path d="M48 78 L48 96 M72 78 L72 96" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                    <rect x="44" y="104" width="32" height="14" rx="5" fill="rgba(0,0,0,0.18)"/>
                `;
            } else if (avatarCfg.shirt === 'shirt_mexico') {
                shirtDecor = `
                    <rect x="55" y="78" width="10" height="44" fill="#ffffff"/>
                    <rect x="65" y="78" width="12" height="44" fill="#ef4444" opacity="0.85"/>
                    <circle cx="60" cy="95" r="4" fill="#f59e0b"/>
                `;
            } else if (avatarCfg.shirt === 'shirt_varsity') {
                shirtDecor = `
                    <rect x="57" y="78" width="6" height="44" fill="#ffffff"/>
                    <text x="45" y="102" font-size="12" font-weight="bold" fill="#ffffff" font-family="sans-serif">M</text>
                `;
            } else if (avatarCfg.shirt === 'shirt_cyber') {
                shirtDecor = `
                    <circle cx="60" cy="98" r="8" fill="#22d3ee" stroke="#ffffff" stroke-width="2"/>
                    <path d="M38 88 H82" stroke="#22d3ee" stroke-width="2"/>
                `;
            }

            // 4. Capa de Cabello
            let hairSvg = '';
            if (avatarCfg.hair === 'hair_short') {
                hairSvg = `<path d="M34 40 C34 20, 86 20, 86 40 C82 31, 38 31, 34 40 Z" fill="${hairColor}"/>`;
            } else if (avatarCfg.hair === 'hair_curly') {
                hairSvg = `
                    <circle cx="38" cy="30" r="10" fill="${hairColor}"/>
                    <circle cx="52" cy="24" r="11" fill="${hairColor}"/>
                    <circle cx="68" cy="24" r="11" fill="${hairColor}"/>
                    <circle cx="82" cy="30" r="10" fill="${hairColor}"/>
                    <circle cx="33" cy="40" r="8" fill="${hairColor}"/>
                    <circle cx="87" cy="40" r="8" fill="${hairColor}"/>
                `;
            } else if (avatarCfg.hair === 'hair_long') {
                hairSvg = `
                    <path d="M32 38 C32 18, 88 18, 88 38 L92 76 C92 80, 82 80, 82 74 L82 42 C70 32, 50 32, 38 42 L38 74 C38 80, 28 80, 28 76 Z" fill="${hairColor}"/>
                `;
            } else if (avatarCfg.hair === 'hair_ponytail') {
                hairSvg = `
                    <path d="M34 40 C34 20, 86 20, 86 40 C80 31, 40 31, 34 40 Z" fill="${hairColor}"/>
                    <path d="M84 36 C98 34, 102 52, 92 60 C86 52, 86 42, 84 36 Z" fill="${hairColor}"/>
                    <circle cx="85" cy="37" r="4" fill="#ec4899"/>
                `;
            } else if (avatarCfg.hair === 'hair_spikes') {
                hairSvg = `
                    <path d="M34 40 L38 22 L49 30 L60 16 L71 30 L82 22 L86 40 Z" fill="${hairColor}"/>
                `;
            } else if (avatarCfg.hair === 'hair_fade') {
                hairSvg = `<rect x="38" y="25" width="44" height="9" rx="4" fill="${hairColor}"/>`;
            }

            // 5. Capa de Cachuchas / Gorros
            let hatSvg = '';
            if (avatarCfg.hat === 'hat_cap_red') {
                hatSvg = `
                    <path d="M34 36 C34 19, 86 19, 86 36 Z" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
                    <path d="M52 32 H98 C98 37, 84 38, 52 36 Z" fill="#dc2626"/>
                `;
            } else if (avatarCfg.hat === 'hat_cap_back') {
                hatSvg = `
                    <path d="M34 36 C34 19, 86 19, 86 36 Z" fill="#2563eb" stroke="#1e40af" stroke-width="2"/>
                    <path d="M22 33 H48 V37 H22 C20 37, 20 33, 22 33 Z" fill="#1d4ed8"/>
                `;
            } else if (avatarCfg.hat === 'hat_beanie') {
                hatSvg = `
                    <path d="M33 38 C33 17, 87 17, 87 38 Z" fill="#f59e0b"/>
                    <rect x="31" y="33" width="58" height="7" rx="3.5" fill="#d97706"/>
                    <circle cx="60" cy="17" r="5" fill="#fde047"/>
                `;
            } else if (avatarCfg.hat === 'hat_grad') {
                hatSvg = `
                    <polygon points="60,14 24,26 60,36 96,26" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
                    <rect x="42" y="31" width="36" height="7" rx="2" fill="#334155"/>
                    <path d="M86 28 V44" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round"/>
                `;
            } else if (avatarCfg.hat === 'hat_crown') {
                hatSvg = `
                    <polygon points="36,35 38,18 50,28 60,14 70,28 82,18 84,35" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
                    <circle cx="60" cy="26" r="2.5" fill="#ec4899"/>
                `;
            }

            // 6. Capa de Lentes
            let glassesSvg = '';
            if (avatarCfg.glasses === 'glass_read') {
                glassesSvg = `
                    <rect x="40" y="44" width="16" height="11" rx="3" fill="none" stroke="#1e293b" stroke-width="2.5"/>
                    <rect x="64" y="44" width="16" height="11" rx="3" fill="none" stroke="#1e293b" stroke-width="2.5"/>
                    <line x1="56" y1="49" x2="64" y2="49" stroke="#1e293b" stroke-width="2.5"/>
                `;
            } else if (avatarCfg.glasses === 'glass_sun') {
                glassesSvg = `
                    <rect x="39" y="44" width="18" height="12" rx="3" fill="#0f172a" stroke="#ffffff" stroke-width="1.5"/>
                    <rect x="63" y="44" width="18" height="12" rx="3" fill="#0f172a" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="57" y1="48" x2="63" y2="48" stroke="#0f172a" stroke-width="3"/>
                `;
            } else if (avatarCfg.glasses === 'glass_round') {
                glassesSvg = `
                    <circle cx="48" cy="50" r="8" fill="rgba(56,189,248,0.2)" stroke="#eab308" stroke-width="2.5"/>
                    <circle cx="72" cy="50" r="8" fill="rgba(56,189,248,0.2)" stroke="#eab308" stroke-width="2.5"/>
                    <line x1="56" y1="50" x2="64" y2="50" stroke="#eab308" stroke-width="2.5"/>
                `;
            } else if (avatarCfg.glasses === 'glass_cyber') {
                glassesSvg = `
                    <rect x="37" y="44" width="46" height="11" rx="5" fill="#06b6d4" opacity="0.88" stroke="#ffffff" stroke-width="2"/>
                `;
            }

            const viewBox = isMini ? "25 12 70 68" : "12 8 96 168";

            return `
                <svg viewBox="${viewBox}" class="w-full h-full drop-shadow">
                    ${!isMini ? backpackSvg : ''}
                    ${!isMini ? `
                        <!-- Piernas / Pantalón -->
                        <rect x="38" y="118" width="18" height="40" rx="6" fill="#1e293b"/>
                        <rect x="64" y="118" width="18" height="40" rx="6" fill="#1e293b"/>
                        <!-- Brazos -->
                        <rect x="22" y="80" width="14" height="36" rx="7" fill="${skin}"/>
                        <rect x="84" y="80" width="14" height="36" rx="7" fill="${skin}"/>
                        <!-- Torso / Playera -->
                        <rect x="33" y="76" width="54" height="46" rx="14" fill="${shirtObj.color}" stroke="#0f172a" stroke-width="2"/>
                        <!-- Mangas -->
                        <rect x="21" y="77" width="16" height="18" rx="6" fill="${shirtObj.color}"/>
                        <rect x="83" y="77" width="16" height="18" rx="6" fill="${shirtObj.color}"/>
                        ${shirtDecor}
                        ${shoesSvg}
                    ` : ''}
                    <!-- Cuello -->
                    <rect x="52" y="66" width="16" height="14" rx="5" fill="${skin}"/>
                    <!-- Orejas -->
                    <circle cx="33" cy="52" r="5" fill="${skin}"/>
                    <circle cx="87" cy="52" r="5" fill="${skin}"/>
                    <!-- Cabeza -->
                    <rect x="35" y="28" width="50" height="44" rx="22" fill="${skin}" stroke="#0f172a" stroke-width="2"/>
                    <!-- Mejillas -->
                    <ellipse cx="44" cy="57" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.35"/>
                    <ellipse cx="76" cy="57" rx="4.5" ry="2.5" fill="#f43f5e" opacity="0.35"/>
                    <!-- Ojos -->
                    <circle cx="48" cy="50" r="3.8" fill="#0f172a"/>
                    <circle cx="46.8" cy="48.8" r="1.3" fill="#ffffff"/>
                    <circle cx="72" cy="50" r="3.8" fill="#0f172a"/>
                    <circle cx="70.8" cy="48.8" r="1.3" fill="#ffffff"/>
                    <!-- Sonrisa -->
                    <path d="M52 60 Q60 66 68 60" stroke="#0f172a" stroke-width="2.8" stroke-linecap="round" fill="none"/>
                    <!-- Cabello, Lentes y Cachucha -->
                    ${hairSvg}
                    ${glassesSvg}
                    ${hatSvg}
                </svg>
            `;
        }
