
import { buildAvatarSVG } from './components/avatar.js';
import { createAvatarCustomizer } from './components/avatarCustomizer.js';
import { createQuizController } from './controllers/quizController.js';
import { state, WALLPAPERS } from './models/appState.js';
import { GRADES_CURRICULUM } from './models/curriculum.js';
import { createFirebaseProfileService } from './services/firebaseProfile.js';

        const firebaseProfileService = createFirebaseProfileService({
            onProfileLoaded(data) {
                state.username = data.username || state.username;
                state.coins = typeof data.coins === 'number' ? data.coins : state.coins;
                state.score = typeof data.score === 'number' ? data.score : state.score;
                if (data.avatar) state.avatar = { ...state.avatar, ...data.avatar };
                if (Array.isArray(data.ownedItems)) state.ownedItems = data.ownedItems;
                if (data.gradeStars) state.gradeStars = data.gradeStars;
                if (data.examsPassed) state.examsPassed = data.examsPassed;
                if (data.dailyCompleted) state.dailyCompleted = data.dailyCompleted;
                if (Array.isArray(data.mistakes)) state.mistakes = data.mistakes;
                refreshAllUI();
            },
            onError(error) {
                console.error('No se pudo cargar el perfil de Firebase.', error);
                showToast('⚠️', 'No se pudo sincronizar el progreso desde la nube.');
            }
        });

        async function initFirebase() {
            try {
                await firebaseProfileService.initialize(getCurrentProfile);
            } catch (error) {
                console.error('No se pudo inicializar Firebase.', error);
                showToast('⚠️', 'No se pudo conectar con Firebase; puedes continuar en esta sesión.');
            }
        }

        async function loadUserProfileFromCloud() {
            await firebaseProfileService.loadProfile(getCurrentProfile);
        }

        async function saveUserProfileToCloud(showMessage = false) {
            refreshAllUI();
            try {
                const savedToCloud = await firebaseProfileService.saveProfile(getCurrentProfile());
                if (showMessage) {
                    showToast('💾', savedToCloud
                        ? '¡Avatar y progreso guardados en tu perfil!'
                        : 'Progreso actualizado en esta sesión.');
                }
            } catch (error) {
                console.error('No se pudo guardar el perfil en Firebase.', error);
                showToast('⚠️', 'No se pudo sincronizar el progreso; inténtalo de nuevo.');
            }
        }

        function getCurrentProfile() {
            return {
                username: state.username,
                coins: state.coins,
                score: state.score,
                avatar: state.avatar,
                ownedItems: state.ownedItems,
                gradeStars: state.gradeStars,
                examsPassed: state.examsPassed,
                dailyCompleted: state.dailyCompleted,
                mistakes: state.mistakes
            };
        }

        // ======================================================================
        // RENDERIZADOR SVG DEL AVATAR PERSONALIZABLE (CUERPO COMPLETO Y MINI)
        // Soporta piel, cabello, cachuchas, lentes, playeras, mochilas, tenis y huaraches
        // ======================================================================
        // ======================================================================
        // SONIDOS WEB AUDIO API
        // ======================================================================
        let audioCtx = null;
        function playTone(type) {
            if (!state.soundEnabled) return;
            try {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                if (audioCtx.state === 'suspended') audioCtx.resume();
                const now = audioCtx.currentTime;

                if (type === 'correct') {
                    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now + i * 0.06);
                        gain.gain.setValueAtTime(0.11, now + i * 0.06);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.24);
                        osc.connect(gain); gain.connect(audioCtx.destination);
                        osc.start(now + i * 0.06); osc.stop(now + i * 0.06 + 0.25);
                    });
                } else if (type === 'wrong') {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(230, now);
                    osc.frequency.linearRampToValueAtTime(165, now + 0.22);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
                    osc.connect(gain); gain.connect(audioCtx.destination);
                    osc.start(now); osc.stop(now + 0.25);
                } else if (type === 'coin') {
                    [987.77, 1318.51].forEach((freq, i) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now + i * 0.07);
                        gain.gain.setValueAtTime(0.12, now + i * 0.07);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.2);
                        osc.connect(gain); gain.connect(audioCtx.destination);
                        osc.start(now + i * 0.07); osc.stop(now + i * 0.07 + 0.22);
                    });
                } else {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(620, now);
                    gain.gain.setValueAtTime(0.04, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    osc.connect(gain); gain.connect(audioCtx.destination);
                    osc.start(now); osc.stop(now + 0.06);
                }
            } catch (e) {}
        }

        function showToast(icon, message) {
            const toast = document.getElementById('toast-notification');
            document.getElementById('toast-icon').innerText = icon;
            document.getElementById('toast-text').innerText = message;
            toast.classList.remove('opacity-0', '-translate-y-3');
            toast.classList.add('opacity-100', 'translate-y-0');
            setTimeout(() => {
                toast.classList.add('opacity-0', '-translate-y-3');
                toast.classList.remove('opacity-100', 'translate-y-0');
            }, 2600);
        }

        // ======================================================================
        // NAVEGACIÓN ENTRE PESTAÑAS Y ACTUALIZACIÓN DE INTERFAZ
        // ======================================================================
        function switchMainTab(tabName) {
            playTone('click');
            state.activeMainTab = tabName;

            const views = ['grades', 'daily', 'avatar', 'mistakes', 'quiz', 'summary'];
            views.forEach(v => {
                const el = document.getElementById(`view-${v}`);
                if (el) {
                    el.classList.add('hidden');
                    el.classList.remove('flex');
                }
            });

            const activeEl = document.getElementById(`view-${tabName}`);
            if (activeEl) {
                activeEl.classList.remove('hidden');
                if (['grades', 'daily', 'avatar', 'mistakes'].includes(tabName)) {
                    activeEl.classList.add('flex');
                }
            }

            // Resaltar pestaña activa
            ['grades', 'daily', 'avatar', 'mistakes'].forEach(t => {
                const btn = document.getElementById(`tab-btn-${t}`);
                if (!btn) return;
                if (t === tabName) {
                    btn.className = 'flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow';
                } else {
                    btn.className = 'flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10';
                }
            });

            refreshAllUI();
        }

        let renderedAvatarState = '';

        function refreshAllUI() {
            // Header & Dynamic Island
            document.getElementById('coins-display').innerText = state.coins;
            document.getElementById('score-display').innerText = state.score;
            document.getElementById('streak-display').innerText = state.streak;
            document.getElementById('header-username').innerText = state.username;
            document.getElementById('welcome-username').innerText = state.username;
            document.getElementById('avatar-studio-name').innerText = state.username;
            document.getElementById('shop-coins-balance').innerText = state.coins;
            document.getElementById('mistakes-badge-count').innerText = state.mistakes.length;

            // Los SVG solo cambian al personalizar el avatar, no en cada respuesta del quiz.
            const avatarState = JSON.stringify(state.avatar);
            if (avatarState !== renderedAvatarState) {
                renderedAvatarState = avatarState;
                const miniSvg = buildAvatarSVG(state.avatar, true);
                const fullSvg = buildAvatarSVG(state.avatar, false);
                document.getElementById('header-avatar-mini').innerHTML = miniSvg;
                document.getElementById('hero-avatar-box').innerHTML = fullSvg;
                document.getElementById('avatar-large-preview').innerHTML = fullSvg;
                document.getElementById('quiz-mini-avatar').innerHTML = miniSvg;
                document.getElementById('auth-modal-avatar').innerHTML = fullSvg;
            }

            // Contador de exámenes aprobados
            const passedCount = Object.values(state.examsPassed).filter(Boolean).length;
            document.getElementById('completed-exams-pill').innerText = `🏆 ${passedCount}/12 Exámenes Aprobados`;

            // Estado del Reto Diario
            ['basico', 'medio', 'dificil'].forEach(diff => {
                const el = document.getElementById(`daily-status-${diff}`);
                if (el) {
                    el.innerText = state.dailyCompleted[diff] ? '✅ Completado hoy' : '🔥 Disponible';
                }
            });

            if (!document.getElementById('view-grades').classList.contains('hidden')) renderGradesGrid();
            if (!document.getElementById('view-avatar').classList.contains('hidden')) renderAvatarCategoryItems();
            if (!document.getElementById('view-mistakes').classList.contains('hidden')) renderMistakesList();
        }

        // ======================================================================
        // RENDERIZADO DE LOS 12 GRADOS + BOTONES DE PRÁCTICA Y MINI EXAMEN
        // ======================================================================
        function filterGradesByStage(stage) {
            playTone('click');
            state.stageFilter = stage;
            ['all', 'primaria', 'secundaria', 'prepa'].forEach(s => {
                const btn = document.getElementById(`stage-filter-${s}`);
                if (btn) {
                    btn.className = s === stage
                        ? 'stage-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow'
                        : 'stage-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold opacity-80 hover:opacity-100';
                }
            });
            renderGradesGrid();
        }

        function renderGradesGrid() {
            const grid = document.getElementById('grades-grid');
            if (!grid) return;
            const fragment = document.createDocumentFragment();

            const filtered = GRADES_CURRICULUM.filter(g => state.stageFilter === 'all' || g.stage === state.stageFilter);

            filtered.forEach(item => {
                const stars = state.gradeStars[item.id] || 0;
                const examPassed = !!state.examsPassed[item.id];
                const stageLabel = item.stage === 'primaria' ? 'Primaria' : (item.stage === 'secundaria' ? 'Secundaria' : 'Preparatoria');

                const card = document.createElement('div');
                card.className = 'ios-glass-strong rounded-3xl p-5 flex flex-col justify-between transition-all hover:translate-y-[-2px]';

                const starsHtml = [1, 2, 3].map(s => `<span class="${s <= stars ? 'opacity-100' : 'opacity-25'}">⭐</span>`).join('');

                card.innerHTML = `
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <div class="flex items-center gap-2.5">
                                <span class="w-11 h-11 rounded-2xl bg-gradient-to-br ${item.badge} text-white flex items-center justify-center text-2xl shadow-md">
                                    ${item.icon}
                                </span>
                                <div>
                                    <span class="text-[10px] font-extrabold uppercase tracking-wider opacity-70 block">${stageLabel}</span>
                                    <h3 class="font-display text-lg sm:text-xl font-bold leading-tight">${item.title}</h3>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-1">
                                <div class="text-xs px-2.5 py-0.5 rounded-full bg-black/15 dark:bg-white/10 font-bold">
                                    ${starsHtml}
                                </div>
                                ${examPassed ? `<span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/40">🎓 Aprobado</span>` : ''}
                            </div>
                        </div>
                        <p class="text-xs font-extrabold text-sky-400 mb-1">${item.subtitle}</p>
                        <p class="text-xs opacity-80 leading-relaxed mb-4">${item.desc}</p>
                    </div>

                    <div class="pt-3 border-t border-white/15 grid grid-cols-2 gap-2">
                        <button onclick="startGradeSession('${item.id}', 'practice')" class="py-2.5 px-3 rounded-xl font-bold text-xs ios-glass ios-btn flex items-center justify-center gap-1.5">
                            <span>📘</span>
                            <span>Práctica (+25 🪙)</span>
                        </button>
                        <button onclick="startGradeSession('${item.id}', 'exam')" class="py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r ${item.badge} text-white ios-btn flex items-center justify-center gap-1.5 shadow">
                            <span>🎓</span>
                            <span>Mini Examen (+80 🪙)</span>
                        </button>
                    </div>
                `;
                fragment.appendChild(card);
            });
            grid.replaceChildren(fragment);
        }

        // ======================================================================
        // LÓGICA DEL CREADOR DE AVATAR Y TIENDA CON MONEDAS
        // ======================================================================
        function openFormulaModal(mode = 'current') {
            playTone('click');
            const body = document.getElementById('formula-modal-body');
            body.innerHTML = '';

            if (mode === 'current' && state.quiz.currentProblem) {
                const p = state.quiz.currentProblem;
                const currentCard = document.createElement('div');
                currentCard.className = 'p-4 rounded-2xl bg-sky-500/20 border-2 border-sky-400 mb-4';
                currentCard.innerHTML = `
                    <span class="text-[11px] font-extrabold uppercase tracking-wider text-sky-300 block mb-1">⭐ Fórmula para este ejercicio (${p.topic})</span>
                    <h4 class="font-display text-lg font-bold mb-1">${p.formulaTitle}</h4>
                    <div class="font-mono text-sm sm:text-base font-bold p-3 rounded-xl bg-slate-950/60 text-amber-300 mb-2">${p.formulaText}</div>
                    <p class="text-xs opacity-90">${p.visual || ''}</p>
                `;
                body.appendChild(currentCard);
            }

            const title = document.createElement('h4');
            title.className = 'font-display text-base font-bold opacity-85 pt-1';
            title.innerText = '📚 Catálogo Completo de Fórmulas (Primaria a Preparatoria):';
            body.appendChild(title);

            GENERAL_FORMULAS.forEach(f => {
                const item = document.createElement('div');
                item.className = 'ios-glass p-3.5 rounded-2xl space-y-1';
                item.innerHTML = `
                    <h5 class="font-bold text-xs sm:text-sm text-indigo-300">${f.title}</h5>
                    <div class="font-mono text-xs sm:text-sm font-bold text-white bg-slate-900/50 px-3 py-2 rounded-xl">${f.formula}</div>
                    <p class="text-xs opacity-75">${f.note}</p>
                `;
                body.appendChild(item);
            });

            const modal = document.getElementById('formula-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeFormulaModal() {
            playTone('click');
            const modal = document.getElementById('formula-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function openExampleModal() {
            playTone('click');
            const p = state.quiz.currentProblem;
            if (!p) return;

            const body = document.getElementById('example-modal-body');
            const stepsHtml = (p.exampleSteps || '').split('\n').map(line =>
                `<div class="p-2.5 rounded-xl ios-glass font-medium">${line}</div>`
            ).join('');

            body.innerHTML = `
                <div class="p-4 rounded-2xl bg-purple-500/20 border border-purple-400/50 mb-3">
                    <span class="text-xs font-extrabold uppercase text-pink-300 block mb-1">${p.topic}</span>
                    <h4 class="font-display text-xl font-bold">${p.exampleTitle}</h4>
                </div>
                <div class="space-y-2 text-xs sm:text-sm">
                    ${stepsHtml}
                </div>
                <div class="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-xs mt-3">
                    <strong>📐 Fórmula aplicada:</strong> <span class="font-mono">${p.formulaText}</span>
                </div>
            `;

            const modal = document.getElementById('example-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeExampleModal() {
            playTone('click');
            const modal = document.getElementById('example-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // ======================================================================
        // MODAL DE LOGIN / REGISTRO Y CAMBIO DE PERFIL
        // ======================================================================
        function openAuthModal() {
            playTone('click');
            document.getElementById('auth-nickname-input').value = state.username;
            document.getElementById('auth-current-user-title').innerText = state.username;
            document.getElementById('auth-modal-coins').innerText = state.coins;
            document.getElementById('auth-modal-xp').innerText = state.score;
            document.getElementById('auth-feedback-msg').innerText = '';

            const modal = document.getElementById('auth-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeAuthModal() {
            playTone('click');
            const modal = document.getElementById('auth-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function handleQuickNicknameUpdate() {
            const nick = document.getElementById('auth-nickname-input').value.trim();
            if (!nick) {
                document.getElementById('auth-feedback-msg').innerText = 'Escribe un nombre o apodo válido.';
                return;
            }
            state.username = nick;
            saveUserProfileToCloud(true);
            closeAuthModal();
        }

        async function handleUserLoginOrRegister() {
            const nick = document.getElementById('auth-nickname-input').value.trim() || 'Estudiante Pro';
            const email = document.getElementById('auth-email-input').value.trim();
            const pass = document.getElementById('auth-pass-input').value;
            const msgEl = document.getElementById('auth-feedback-msg');

            state.username = nick;

            if (!email || pass.length < 6) {
                await saveUserProfileToCloud(true);
                closeAuthModal();
                return;
            }

            msgEl.innerText = 'Sincronizando cuenta en la nube...';
            try {
                const authenticated = await firebaseProfileService.signInOrRegister(email, pass);
                if (!authenticated) {
                    await saveUserProfileToCloud(true);
                    closeAuthModal();
                    return;
                }
                await loadUserProfileFromCloud();
                state.username = nick;
                await saveUserProfileToCloud(true);
                closeAuthModal();
            } catch (error) {
                console.error('No se pudo iniciar o registrar la cuenta.', error);
                msgEl.innerText = 'No se pudo sincronizar la cuenta. Revisa tus datos e inténtalo de nuevo.';
            }
        }

        // ======================================================================
        // UTILIDADES DE INTERFAZ Y CONFites
        // ======================================================================
        function setFeedbackBanner(type, icon, text) {
            const banner = document.getElementById('feedback-banner');
            document.getElementById('feedback-icon').innerText = icon;
            document.getElementById('feedback-text').innerText = text;

            banner.className = 'min-h-[46px] rounded-2xl px-4 py-2.5 mb-4 flex items-center justify-between gap-3 transition-all duration-300 ';
            if (type === 'success') {
                banner.className += 'bg-emerald-500/25 border border-emerald-400 text-emerald-100';
            } else if (type === 'error') {
                banner.className += 'bg-rose-500/25 border border-rose-400 text-rose-100';
            } else {
                banner.className += 'ios-glass';
            }
        }

        function toggleHintDrawer() {
            playTone('click');
            const drawer = document.getElementById('hint-drawer');
            const label = document.getElementById('hint-btn-label');
            if (drawer.classList.contains('hidden')) {
                drawer.classList.remove('hidden');
                label.innerText = 'Ocultar';
            } else {
                drawer.classList.add('hidden');
                label.innerText = 'Pista';
            }
        }

        function toggleSound() {
            state.soundEnabled = !state.soundEnabled;
            document.getElementById('sound-icon').innerText = state.soundEnabled ? '🔊' : '🔇';
            if (state.soundEnabled) playTone('click');
        }

        function cycleWallpaper() {
            playTone('click');
            const body = document.getElementById('app-body');
            body.classList.remove(WALLPAPERS[state.wallpaperIndex].id);
            state.wallpaperIndex = (state.wallpaperIndex + 1) % WALLPAPERS.length;
            const next = WALLPAPERS[state.wallpaperIndex];
            body.classList.add(next.id);
            if (next.dark) body.classList.add('theme-night', 'dark');
            else body.classList.remove('theme-night', 'dark');
            document.getElementById('theme-label').innerText = next.name;
        }

        function toggleUxModal(show) {
            playTone('click');
            const modal = document.getElementById('ux-modal');
            if (show) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
            else { modal.classList.add('hidden'); modal.classList.remove('flex'); }
        }

            const confettiParticles = [];
            let confettiFrameId = 0;
            let confettiPreviousTime = 0;
            let confettiCanvas;
            let confettiContext;
            let confettiWidth = 0;
            let confettiHeight = 0;

            function animateConfetti(time) {
                confettiFrameId = 0;
                if (document.hidden) {
                    confettiParticles.length = 0;
                    confettiContext.clearRect(0, 0, confettiWidth, confettiHeight);
                    confettiCanvas.hidden = true;
                    confettiPreviousTime = 0;
                    return;
                }

                const frameScale = confettiPreviousTime
                    ? Math.min((time - confettiPreviousTime) / (1000 / 60), 2)
                    : 1;
                confettiPreviousTime = time;
                confettiContext.clearRect(0, 0, confettiWidth, confettiHeight);

                for (let i = confettiParticles.length - 1; i >= 0; i--) {
                    const particle = confettiParticles[i];
                    particle.x += particle.vx * frameScale;
                    particle.y += particle.vy * frameScale;
                    particle.vy += particle.gravity * frameScale;
                    particle.rotation += particle.spin * frameScale;
                    particle.age += frameScale;

                    if (particle.age >= particle.lifetime || particle.y > confettiHeight + 24) {
                        confettiParticles.splice(i, 1);
                        continue;
                    }

                    const fadeStart = particle.lifetime * 0.7;
                    confettiContext.globalAlpha = particle.age > fadeStart
                        ? 1 - (particle.age - fadeStart) / (particle.lifetime - fadeStart)
                        : 1;
                    confettiContext.fillStyle = particle.color;
                    confettiContext.save();
                    confettiContext.translate(particle.x, particle.y);
                    confettiContext.rotate(particle.rotation);
                    confettiContext.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
                    confettiContext.restore();
                }

                confettiContext.globalAlpha = 1;
                if (confettiParticles.length) {
                    confettiFrameId = requestAnimationFrame(animateConfetti);
                } else {
                    confettiCanvas.hidden = true;
                    confettiPreviousTime = 0;
                }
            }

            function createConfetti(amount = 28) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                confettiCanvas = document.getElementById('confetti-canvas');
                confettiContext = confettiCanvas.getContext('2d');
                if (!confettiContext) {
                    console.error('No se pudo iniciar el canvas de confeti.');
                    return;
                }

                const colors = ['#ec4899', '#38bdf8', '#fbbf24', '#34d399', '#a855f7', '#ffffff'];
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                confettiWidth = window.innerWidth;
                confettiHeight = window.innerHeight;
                confettiCanvas.width = Math.round(confettiWidth * dpr);
                confettiCanvas.height = Math.round(confettiHeight * dpr);
                confettiContext.setTransform(dpr, 0, 0, dpr, 0, 0);
                confettiCanvas.hidden = false;

                const particleCount = Math.min(90, Math.max(0, Math.floor(amount)));
                for (let i = 0; i < particleCount; i++) {
                    confettiParticles.push({
                        x: Math.random() * confettiWidth,
                        y: -20 - Math.random() * confettiHeight * 0.35,
                        vx: (Math.random() - 0.5) * 5,
                        vy: 4 + Math.random() * 4,
                        gravity: 0.04 + Math.random() * 0.04,
                        rotation: Math.random() * Math.PI * 2,
                        spin: (Math.random() - 0.5) * 0.18,
                        width: 5 + Math.random() * 6,
                        height: 8 + Math.random() * 9,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        age: 0,
                        lifetime: 90 + Math.random() * 45
                    });
                }

                if (!confettiFrameId && confettiParticles.length) {
                    confettiFrameId = requestAnimationFrame(animateConfetti);
                }
            }
        

        const {
            selectAvatarCategory,
            randomizeAvatar,
            renderAvatarCategoryItems
        } = createAvatarCustomizer({
            state,
            saveUserProfileToCloud,
            playTone,
            showToast,
            createConfetti
        });
        const {
            startGradeSession,
            startDailyChallenge,
            startReviewMistake,
            exitQuizToPreviousView,
            skipCurrentQuestion,
            removeMistakeById,
            renderMistakesList
        } = createQuizController({
            switchMainTab,
            playTone,
            saveUserProfileToCloud,
            setFeedbackBanner,
            createConfetti,
            showToast
        });

        // Exponer funciones al ámbito global para los botones HTML
        Object.assign(window, {
            switchMainTab,
            filterGradesByStage,
            startGradeSession,
            startDailyChallenge,
            startReviewMistake,
            removeMistakeById,
            exitQuizToPreviousView,
            skipCurrentQuestion,
            selectAvatarCategory,
            randomizeAvatar,
            saveUserProfileToCloud,
            openFormulaModal,
            closeFormulaModal,
            openExampleModal,
            closeExampleModal,
            openAuthModal,
            closeAuthModal,
            handleQuickNicknameUpdate,
            handleUserLoginOrRegister,
            toggleHintDrawer,
            toggleSound,
            cycleWallpaper,
            toggleUxModal
        });

        // Atajos de teclado (1, 2, 3, 4 para responder, F para Formulario, E para Ejemplo)
        window.addEventListener('keydown', (e) => {
            const quizVisible = !document.getElementById('view-quiz').classList.contains('hidden');
            if (!quizVisible || state.quiz.isProcessing) return;

            if (['1', '2', '3', '4'].includes(e.key)) {
                const idx = parseInt(e.key, 10) - 1;
                const btns = document.getElementById('options-container').querySelectorAll('button');
                if (btns[idx] && !btns[idx].disabled) btns[idx].click();
            }
        });

        window.onload = () => {
            refreshAllUI();
            initFirebase();
        };
    