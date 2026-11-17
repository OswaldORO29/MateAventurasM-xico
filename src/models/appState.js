export const state = {
            username: 'Estudiante Pro',
            email: '',
            coins: 120,
            score: 0,
            streak: 0,
            soundEnabled: true,
            wallpaperIndex: 0,
            activeMainTab: 'grades',
            stageFilter: 'all',
            activeAvatarCategory: 'skin',
            avatar: {
                skin: '#F1C27D',
                hair: 'hair_short',
                hairColor: '#1e293b',
                hat: 'hat_none',
                glasses: 'glass_none',
                shirt: 'shirt_basic_blue',
                backpack: 'bag_school',
                shoes: 'shoe_huarache_trad'
            },
            ownedItems: [
                'skin_1', 'skin_2', 'skin_3', 'skin_4', 'skin_5', 'skin_6',
                'hair_short', 'hair_curly', 'hair_long',
                'hat_none', 'glass_none', 'glass_read',
                'shirt_basic_blue', 'shirt_rosa_mex',
                'bag_none', 'bag_school',
                'shoe_white_sneakers', 'shoe_huarache_trad'
            ],
            gradeStars: {},      // { p1: 3, ... }
            examsPassed: {},     // { p1: true, ... }
            dailyCompleted: {},  // { basico: true, ... }
            mistakes: [],        // Lista de objetos de preguntas falladas
            // Estado de la partida activa
            quiz: {
                mode: 'practice', // 'practice' | 'exam' | 'daily' | 'review'
                gradeId: 'p1',
                difficulty: 'basico',
                questionIndex: 0,
                totalQuestions: 5,
                correctCount: 0,
                mistakesOnCurrent: 0,
                currentProblem: null,
                reviewMistakeId: null,
                isProcessing: false
            }
        };
export const WALLPAPERS = [
            { id: 'wallpaper-night', name: 'Noche iOS', dark: true },
            { id: 'wallpaper-talavera', name: 'Cristal Azul', dark: false },
            { id: 'wallpaper-ajolote', name: 'Cristal Rosa', dark: false },
            { id: 'wallpaper-emerald', name: 'Cristal Esmeralda', dark: false }
        ];

        // ======================================================================
        // FIREBASE INITIALIZATION & CLOUD SYNC (Cumpliendo las 3 Reglas)
        // ======================================================================
