import { state } from '../models/appState.js';
import { GRADES_CURRICULUM } from '../models/curriculum.js';
import { generateProblemByGradeId, randInt } from '../utils/math.js';

export function createQuizController({ switchMainTab, playTone, saveUserProfileToCloud, setFeedbackBanner, createConfetti, showToast }) {
        function startGradeSession(gradeId, mode) {
            playTone('click');
            state.quiz = {
                mode, // 'practice' o 'exam'
                gradeId,
                difficulty: 'basico',
                questionIndex: 0,
                totalQuestions: 5,
                correctCount: 0,
                mistakesOnCurrent: 0,
                currentProblem: null,
                reviewMistakeId: null,
                isProcessing: false
            };

            openQuizView();
            nextQuizQuestion();
        }

        function startDailyChallenge(difficulty) {
            playTone('click');
            state.quiz = {
                mode: 'daily',
                gradeId: 'daily',
                difficulty, // 'basico' | 'medio' | 'dificil'
                questionIndex: 0,
                totalQuestions: 5,
                correctCount: 0,
                mistakesOnCurrent: 0,
                currentProblem: null,
                reviewMistakeId: null,
                isProcessing: false
            };

            openQuizView();
            nextQuizQuestion();
        }

        function startReviewMistake(mistakeId) {
            playTone('click');
            const found = state.mistakes.find(m => m.id === mistakeId);
            if (!found) return;

            state.quiz = {
                mode: 'review',
                gradeId: found.gradeId || 'p1',
                difficulty: 'basico',
                questionIndex: 1,
                totalQuestions: 1,
                correctCount: 0,
                mistakesOnCurrent: 0,
                currentProblem: found,
                reviewMistakeId: mistakeId,
                isProcessing: false
            };

            openQuizView();
            renderActiveProblem(found);
        }

        function openQuizView() {
            ['grades', 'daily', 'avatar', 'mistakes', 'summary'].forEach(v => {
                const el = document.getElementById(`view-${v}`);
                if (el) { el.classList.add('hidden'); el.classList.remove('flex'); }
            });
            document.getElementById('view-quiz').classList.remove('hidden');
        }

        function exitQuizToPreviousView() {
            if (state.quiz.mode === 'daily') switchMainTab('daily');
            else if (state.quiz.mode === 'review') switchMainTab('mistakes');
            else switchMainTab('grades');
        }

        function skipCurrentQuestion() {
            if (state.quiz.isProcessing) return;
            playTone('click');
            loadNewProblemForCurrentSession();
        }

        function nextQuizQuestion() {
            if (state.quiz.questionIndex >= state.quiz.totalQuestions) {
                finishQuizSession();
                return;
            }
            state.quiz.questionIndex++;
            state.quiz.mistakesOnCurrent = 0;
            loadNewProblemForCurrentSession();
        }

        function loadNewProblemForCurrentSession() {
            let targetGradeId = state.quiz.gradeId;

            if (state.quiz.mode === 'daily') {
                const pools = {
                    basico: ['p2', 'p3', 'p4', 'p5', 'p6'],
                    medio: ['p6', 's1', 's2', 's3', 'b1'],
                    dificil: ['s3', 'b1', 'b2', 'b3']
                };
                const pool = pools[state.quiz.difficulty] || pools.basico;
                targetGradeId = pool[randInt(0, pool.length - 1)];
            }

            const problem = generateProblemByGradeId(targetGradeId);
            state.quiz.currentProblem = problem;
            renderActiveProblem(problem);
        }

        function renderActiveProblem(problem) {
            state.quiz.isProcessing = false;

            // Título del Modo
            const gradeObj = GRADES_CURRICULUM.find(g => g.id === state.quiz.gradeId);
            let headerTitle = gradeObj ? gradeObj.title : 'Reto Matemático';
            if (state.quiz.mode === 'exam') headerTitle = `🎓 Mini Examen • ${headerTitle}`;
            if (state.quiz.mode === 'daily') headerTitle = `⚡ Reto Diario (${state.quiz.difficulty.toUpperCase()})`;
            if (state.quiz.mode === 'review') headerTitle = `🔄 Repaso de Error`;

            document.getElementById('quiz-mode-title').innerText = headerTitle;
            document.getElementById('quiz-counter-text').innerText = `${state.quiz.questionIndex} de ${state.quiz.totalQuestions}`;
            const pct = (state.quiz.questionIndex / state.quiz.totalQuestions) * 100;
            document.getElementById('quiz-progress-bar').style.width = `${pct}%`;

            // En Mini Examen ocultamos el botón de Pista directa pero dejamos Formulario
            const hintBtn = document.getElementById('hint-toggle-btn');
            if (state.quiz.mode === 'exam') {
                hintBtn.classList.add('hidden');
            } else {
                hintBtn.classList.remove('hidden');
            }

            document.getElementById('hint-drawer').classList.add('hidden');
            document.getElementById('hint-btn-label').innerText = 'Pista';

            document.getElementById('quiz-topic-badge').innerText = `🧮 ${problem.topic}`;
            document.getElementById('problem-context').innerText = problem.context;
            document.getElementById('equation-display').innerHTML = problem.equationHTML;
            document.getElementById('visual-aid-box').innerText = problem.visual || '';
            document.getElementById('hint-content').innerText = problem.hint;

            setFeedbackBanner('neutral', '👆', 'Selecciona la respuesta correcta o usa las teclas 1 a 4.');
            renderAnswerButtons(problem.answer);
        }

        function renderAnswerButtons(correctAnswer) {
            const options = [correctAnswer];
            const spread = Math.max(4, Math.ceil(Math.abs(correctAnswer) * 0.35));

            while (options.length < 4) {
                let offset = randInt(-spread, spread);
                if (offset === 0) offset = randInt(1, 4);
                let candidate = correctAnswer + offset;
                if (correctAnswer >= 0 && candidate < 0) candidate = correctAnswer + Math.abs(offset);
                if (!options.includes(candidate)) {
                    options.push(candidate);
                }
            }

            // Mezclar opciones
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            const container = document.getElementById('options-container');
            const fragment = document.createDocumentFragment();

            const styles = [
                'from-indigo-500/85 to-blue-600/85 text-white',
                'from-pink-500/85 to-rose-600/85 text-white',
                'from-amber-400/90 to-orange-500/90 text-slate-950',
                'from-purple-500/85 to-fuchsia-600/85 text-white'
            ];

            options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = `bg-gradient-to-br ${styles[idx]} font-display text-2xl sm:text-3xl py-4 sm:py-5 px-5 rounded-2xl ios-btn flex items-center justify-between shadow-lg`;
                btn.innerHTML = `
                    <span class="w-7 h-7 rounded-full bg-black/20 text-xs font-sans font-bold flex items-center justify-center">${idx + 1}</span>
                    <span class="flex-1 text-center">${opt}</span>
                    <span class="w-7 text-lg opacity-0 status-marker">✓</span>
                `;
                btn.onclick = () => evaluateAnswer(opt, btn);
                fragment.appendChild(btn);
            });
            container.replaceChildren(fragment);
        }

        function evaluateAnswer(selectedVal, btnElement) {
            if (state.quiz.isProcessing || btnElement.disabled) return;

            const problem = state.quiz.currentProblem;
            const isCorrect = selectedVal === problem.answer;
            const marker = btnElement.querySelector('.status-marker');

            if (isCorrect) {
                state.quiz.isProcessing = true;
                playTone('correct');

                if (state.quiz.mistakesOnCurrent === 0) {
                    state.quiz.correctCount++;
                }

                const xpGain = state.quiz.mistakesOnCurrent === 0 ? 15 : 8;
                const coinGain = state.quiz.mistakesOnCurrent === 0 ? 5 : 2;
                state.score += xpGain;
                state.coins += coinGain;
                state.streak++;

                btnElement.className = 'bg-gradient-to-br from-emerald-400 to-green-600 text-white font-display text-2xl sm:text-3xl py-4 sm:py-5 px-5 rounded-2xl ios-btn flex items-center justify-between shadow-xl animate-bounce-short';
                if (marker) { marker.innerText = '✓'; marker.classList.remove('opacity-0'); }

                // Si estaba en modo Repaso de Errores, eliminar la pregunta de la lista de errores y dar bono
                if (state.quiz.mode === 'review' && state.quiz.reviewMistakeId) {
                    state.mistakes = state.mistakes.filter(m => m.id !== state.quiz.reviewMistakeId);
                    state.coins += 15;
                    state.score += 25;
                    showToast('🎉', '¡Error dominado! +15 🪙 y +25 ⭐');
                    saveUserProfileToCloud(false);
                    setTimeout(() => switchMainTab('mistakes'), 1200);
                    return;
                }

                setFeedbackBanner('success', '🎉', `¡Correcto! Ganaste +${xpGain} ⭐ y +${coinGain} 🪙`);
                createConfetti(22);
                saveUserProfileToCloud(false);

                setTimeout(() => {
                    nextQuizQuestion();
                }, 1250);

            } else {
                // Respuesta Incorrecta -> Guardar automáticamente en Repaso de Errores
                playTone('wrong');
                state.streak = 0;
                state.quiz.mistakesOnCurrent++;

                btnElement.disabled = true;
                btnElement.classList.add('animate-shake', 'opacity-40', 'grayscale');
                if (marker) { marker.innerText = '✕'; marker.classList.remove('opacity-0'); }

                recordMistakeQuestion(problem);

                if (state.quiz.mode === 'exam') {
                    setFeedbackBanner('error', '⚠️', 'Respuesta incorrecta. Se guardó en Repaso. Intenta otra opción.');
                } else {
                    setFeedbackBanner('error', '💡', 'Esa no es. Se guardó en tu sección de Repaso y abrimos la pista abajo.');
                    document.getElementById('hint-drawer').classList.remove('hidden');
                    document.getElementById('hint-btn-label').innerText = 'Ocultar';
                }
                saveUserProfileToCloud(false);
            }
        }

        function recordMistakeQuestion(problem) {
            if (!problem) return;
            const exists = state.mistakes.some(m => m.equationHTML === problem.equationHTML && m.topic === problem.topic);
            if (!exists) {
                state.mistakes.unshift({
                    id: 'err_' + Date.now() + '_' + Math.floor(Math.random() * 999),
                    ...problem,
                    failedAt: new Date().toLocaleDateString('es-MX')
                });
            }
        }

        function finishQuizSession() {
            document.getElementById('view-quiz').classList.add('hidden');
            const summary = document.getElementById('view-summary');
            summary.classList.remove('hidden');

            let bonusCoins = 0;
            let bonusXP = 0;
            let modeTitle = 'Práctica Completada';
            let mainHeading = '¡Buen entrenamiento!';
            let subText = 'Sigue practicando o presenta el Mini Examen del grado.';

            if (state.quiz.mode === 'practice') {
                bonusCoins = 25;
                bonusXP = 40;
                const stars = state.quiz.correctCount >= 5 ? 3 : (state.quiz.correctCount >= 3 ? 2 : 1);
                const prevStars = state.gradeStars[state.quiz.gradeId] || 0;
                if (stars > prevStars) state.gradeStars[state.quiz.gradeId] = stars;
            } else if (state.quiz.mode === 'exam') {
                const passed = state.quiz.correctCount >= 4;
                if (passed) {
                    bonusCoins = 80;
                    bonusXP = 120;
                    state.examsPassed[state.quiz.gradeId] = true;
                    state.gradeStars[state.quiz.gradeId] = 3;
                    modeTitle = '🎓 ¡Mini Examen Aprobado!';
                    mainHeading = '¡Medalla de Grado Obtenida!';
                    subText = 'Demostraste dominio del grado y ganaste el bono completo.';
                } else {
                    bonusCoins = 20;
                    bonusXP = 30;
                    modeTitle = '🎓 Mini Examen Finalizado';
                    mainHeading = '¡Casi lo logras!';
                    subText = `Obtuviste ${state.quiz.correctCount}/5 aciertos al primer intento (se requieren 4/5 para aprobar). Repasa tus errores e inténtalo de nuevo.`;
                }
            } else if (state.quiz.mode === 'daily') {
                const rewards = {
                    basico: { coins: 60, xp: 100 },
                    medio: { coins: 150, xp: 250 },
                    dificil: { coins: 300, xp: 500 }
                };
                const r = rewards[state.quiz.difficulty] || rewards.basico;
                bonusCoins = r.coins;
                bonusXP = r.xp;
                state.dailyCompleted[state.quiz.difficulty] = true;
                modeTitle = `⚡ Reto Diario (${state.quiz.difficulty.toUpperCase()})`;
                mainHeading = '¡Recompensa Diaria Obtenida!';
                subText = 'Usa tus nuevas monedas para comprar tenis, huaraches, mochilas o lentes en la tienda.';
            }

            state.coins += bonusCoins;
            state.score += bonusXP;

            document.getElementById('summary-mode-pill').innerText = modeTitle;
            document.getElementById('summary-title').innerText = mainHeading;
            document.getElementById('summary-subtitle').innerText = subText;
            document.getElementById('summary-coins').innerText = `+${bonusCoins} 🪙`;
            document.getElementById('summary-xp').innerText = `+${bonusXP} ⭐`;
            document.getElementById('summary-accuracy').innerText = `${state.quiz.correctCount}/${state.quiz.totalQuestions}`;

            playTone('coin');
            createConfetti(45);
            saveUserProfileToCloud(false);
        }

        // ======================================================================
        // RENDERIZADO DE LA SECCIÓN DE REPASO DE ERRORES
        // ======================================================================
        function renderMistakesList() {
            const container = document.getElementById('mistakes-list-container');
            if (!container) return;

            if (state.mistakes.length === 0) {
                container.innerHTML = `
                    <div class="ios-glass-strong rounded-3xl p-8 text-center">
                        <div class="text-5xl mb-3">🌟</div>
                        <h3 class="font-display text-xl font-bold mb-1">¡No tienes preguntas pendientes por repasar!</h3>
                        <p class="text-xs sm:text-sm opacity-80">
                            Cuando falles algún ejercicio en Práctica, Mini Examen o Reto Diario, aparecerá aquí con su fórmula para que puedas dominarlo.
                        </p>
                    </div>
                `;
                return;
            }

            const fragment = document.createDocumentFragment();
            state.mistakes.forEach(item => {
                const card = document.createElement('div');
                card.className = 'ios-glass-strong rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-rose-400/30';
                card.innerHTML = `
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300">${item.topic}</span>
                            <span class="text-[11px] opacity-60">${item.failedAt || 'Reciente'}</span>
                        </div>
                        <p class="text-xs sm:text-sm opacity-85">${item.context}</p>
                        <div class="font-display text-lg sm:text-xl font-bold text-sky-300 pt-1">${item.equationHTML}</div>
                        <p class="text-xs text-amber-300/90 pt-0.5">📐 <strong>Fórmula:</strong> ${item.formulaText}</p>
                    </div>
                    <div class="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                        <button onclick="startReviewMistake('${item.id}')" class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl ios-btn shadow">
                            ⚡ Repasar (+15 🪙)
                        </button>
                        <button onclick="removeMistakeById('${item.id}')" class="ios-glass px-3 py-1.5 rounded-xl text-xs font-bold opacity-75 hover:opacity-100 ios-btn">
                            Descartar
                        </button>
                    </div>
                `;
                fragment.appendChild(card);
            });
            container.replaceChildren(fragment);
        }

        function removeMistakeById(id) {
            playTone('click');
            state.mistakes = state.mistakes.filter(m => m.id !== id);
            saveUserProfileToCloud(false);
        }

        // ======================================================================
        // MODALES DE FORMULARIO Y EJEMPLO PASO A PASO
        // ======================================================================

    return {
        startGradeSession,
        startDailyChallenge,
        startReviewMistake,
        exitQuizToPreviousView,
        skipCurrentQuestion,
        removeMistakeById,
        renderMistakesList
    };
}