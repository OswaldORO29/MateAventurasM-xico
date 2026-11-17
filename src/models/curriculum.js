export const GRADES_CURRICULUM = [
            // PRIMARIA (1° a 6°)
            { id: 'p1', stage: 'primaria', title: '1° de Primaria', subtitle: 'Sumas y restas (1 al 20)', icon: '🌱', badge: 'from-emerald-400 to-teal-500', desc: 'Conteo básico, sumas y restas sin números negativos.' },
            { id: 'p2', stage: 'primaria', title: '2° de Primaria', subtitle: 'Dos dígitos y tablas 2, 5, 10', icon: '🎈', badge: 'from-sky-400 to-blue-500', desc: 'Sumas y restas de decenas e inicio a la multiplicación.' },
            { id: 'p3', stage: 'primaria', title: '3° de Primaria', subtitle: 'Tablas del 3 al 9 y cálculo mental', icon: '🚀', badge: 'from-amber-400 to-orange-500', desc: 'Multiplicación ágil y restas de tres cifras.' },
            { id: 'p4', stage: 'primaria', title: '4° de Primaria', subtitle: 'Divisiones exactas y perímetros', icon: '🧭', badge: 'from-pink-500 to-rose-500', desc: 'Reparto exacto y perímetro de cuadrados y rectángulos.' },
            { id: 'p5', stage: 'primaria', title: '5° de Primaria', subtitle: 'Fracciones, decimales y paréntesis', icon: '⚡', badge: 'from-purple-500 to-indigo-600', desc: 'Fracción de una cantidad, decimales y jerarquía.' },
            { id: 'p6', stage: 'primaria', title: '6° de Primaria', subtitle: 'Porcentajes, áreas y potencias', icon: '👑', badge: 'from-fuchsia-500 to-purple-600', desc: 'Cálculo de descuentos (10%, 25%, 50%), áreas y cuadrados.' },
            // SECUNDARIA (1° a 3°)
            { id: 's1', stage: 'secundaria', title: '1° de Secundaria', subtitle: 'Ecuaciones 1er grado y áreas', icon: '📐', badge: 'from-cyan-500 to-blue-600', desc: 'Despeje de la incógnita x en ecuaciones lineales y área del triángulo.' },
            { id: 's2', stage: 'secundaria', title: '2° de Secundaria', subtitle: 'Leyes de exponentes y sistemas', icon: '🧬', badge: 'from-violet-500 to-purple-600', desc: 'Producto y cociente de potencias y sistemas 2×2 sencillos.' },
            { id: 's3', stage: 'secundaria', title: '3° de Secundaria', subtitle: 'Pitágoras y Ec. Cuadráticas', icon: '🏛️', badge: 'from-rose-500 to-orange-500', desc: 'Hipotenusa con el Teorema de Pitágoras y raíces cuadráticas.' },
            // PREPARATORIA (1° a 3°)
            { id: 'b1', stage: 'prepa', title: '1° de Preparatoria', subtitle: 'Trigonometría y Geom. Analítica', icon: '📡', badge: 'from-blue-500 to-indigo-700', desc: 'Razones trigonométricas notables, pendiente y distancia entre puntos.' },
            { id: 'b2', stage: 'prepa', title: '2° de Preparatoria', subtitle: 'Matrices 2×2 y Funciones', icon: '🧮', badge: 'from-emerald-500 to-cyan-600', desc: 'Determinante 2×2, suma de matrices, multiplicación escalar y evaluación.' },
            { id: 'b3', stage: 'prepa', title: '3° de Preparatoria', subtitle: 'Derivadas y Límites Trigonométricos', icon: '♾️', badge: 'from-fuchsia-600 to-rose-600', desc: 'Cálculo diferencial (derivadas) y límites trigonométricos notables.' }
        ];

        // ======================================================================
        // BIBLIOTECA GENERAL DE FÓRMULAS MATEMÁTICAS
        // ======================================================================
        const GENERAL_FORMULAS = [
            { title: 'Geometría: Perímetros y Áreas (Primaria / Secundaria)', formula: 'P_rect = 2(b + h)   |   A_rect = b × h   |   A_triángulo = (b × h) / 2', note: 'El perímetro suma todos los lados; el área mide la superficie interior.' },
            { title: 'Porcentajes Rápidos (6° Primaria)', formula: 'P% de N = (P × N) / 100   |   10% = N÷10,  25% = N÷4,  50% = N÷2', note: 'Divide entre 100 y multiplica por el porcentaje deseado.' },
            { title: 'Ecuación Lineal de 1er Grado (1° Secundaria)', formula: 'a·x + b = c   ➔   x = (c - b) / a', note: 'Lo que está sumando pasa restando y lo que multiplica pasa dividiendo.' },
            { title: 'Leyes de los Exponentes (2° Secundaria)', formula: 'a^m · a^n = a^(m+n)   |   a^m / a^n = a^(m-n)   |   (a^m)^n = a^(m·n)', note: 'Al multiplicar potencias de la misma base, los exponentes se suman.' },
            { title: 'Teorema de Pitágoras y Fórmula Cuadrática (3° Secundaria)', formula: 'c = √(a² + b²)   |   x = [ -b ± √(b² - 4ac) ] / 2a', note: 'En todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.' },
            { title: 'Trigonometría y Pendiente de la Recta (1° Preparatoria)', formula: 'm = (y₂ - y₁)/(x₂ - x₁)   |   sen(30°)=0.5, cos(60°)=0.5, tan(45°)=1', note: 'La pendiente m mide la inclinación de la recta que une dos puntos.' },
            { title: 'Álgebra de Matrices 2×2 y Determinante (2° Preparatoria)', formula: 'det |a  b; c  d| = (a·d) - (b·c)   |   k·[A] multiplica cada entrada por k', note: 'El determinante 2×2 es el producto de la diagonal principal menos la diagonal secundaria.' },
            { title: 'Derivadas y Límites Trigonométricos (3° Preparatoria)', formula: 'd/dx [a·x^n] = a·n·x^(n-1)   |   lím(x→0) [sen(k·x) / x] = k   |   lím(x→0) [tan(k·x) / x] = k', note: 'El límite fundamental lím(x→0) sen(x)/x = 1 permite resolver límites trigonométricos por sustitución directa de k.' }
        ];

        // ======================================================================
        // ESTADO GLOBAL DE LA APLICACIÓN
        // ======================================================================
