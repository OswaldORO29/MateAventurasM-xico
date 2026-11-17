export function randInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        export function buildMatrixHTML(m) {
            return `<span class="math-matrix"><span>${m[0][0]}</span><span>${m[0][1]}</span><span>${m[1][0]}</span><span>${m[1][1]}</span></span>`;
        }

        export function generateProblemByGradeId(gradeId) {
            let p = {};

            switch (gradeId) {
                case 'p1': { // 1° Primaria: Sumas y restas 1-20
                    const isAdd = Math.random() > 0.45;
                    if (isAdd) {
                        const a = randInt(3, 11), b = randInt(2, 8);
                        p = {
                            gradeId, topic: '1° Primaria • Suma Básica',
                            context: `Tienes ${a} estrellas y ganas ${b} más en la misión.`,
                            equationHTML: `${a} + ${b} = ?`,
                            answer: a + b,
                            visual: `⭐ ${a} + ⭐ ${b}`,
                            formulaTitle: 'Adición o Suma de Unidades',
                            formulaText: 'Total = Cantidad Inicial + Cantidad Agregada',
                            exampleTitle: 'Ejemplo similar: 6 + 4',
                            exampleSteps: '1. Empezamos en el número 6.\n2. Contamos 4 lugares hacia adelante: 7, 8, 9, 10.\n3. Resultado = 10.',
                            hint: `Cuenta desde ${a} sumando ${b} pasos hacia adelante. El resultado es ${a + b}.`
                        };
                    } else {
                        const a = randInt(8, 18), b = randInt(2, a - 2);
                        p = {
                            gradeId, topic: '1° Primaria • Resta Básica',
                            context: `Había ${a} manzanas en la canasta y se comieron ${b}.`,
                            equationHTML: `${a} - ${b} = ?`,
                            answer: a - b,
                            visual: `🍎 Total: ${a} | Quitamos: ${b}`,
                            formulaTitle: 'Sustracción o Resta',
                            formulaText: 'Resto = Minuendo (Total) - Sustraendo (Lo que quitamos)',
                            exampleTitle: 'Ejemplo similar: 12 - 5',
                            exampleSteps: '1. Partimos de 12.\n2. Retrocedemos 5 unidades: 11, 10, 9, 8, 7.\n3. Resultado = 7.',
                            hint: `A ${a} quítale ${b} contando hacia atrás.`
                        };
                    }
                    break;
                }

                case 'p2': { // 2° Primaria: 2 dígitos y tablas 2, 5, 10
                    const mode = randInt(1, 2);
                    if (mode === 1) {
                        const a = randInt(14, 48), b = randInt(11, 35);
                        p = {
                            gradeId, topic: '2° Primaria • Suma de Dos Dígitos',
                            context: `En la biblioteca hay ${a} libros de cuentos y ${b} de ciencias.`,
                            equationHTML: `${a} + ${b} = ?`,
                            answer: a + b,
                            visual: `Decenas: ${Math.floor(a/10)*10} + ${Math.floor(b/10)*10} | Unidades: ${a%10} + ${b%10}`,
                            formulaTitle: 'Suma por Descomposición en Decenas y Unidades',
                            formulaText: '(D₁ + D₂) + (U₁ + U₂)',
                            exampleTitle: 'Ejemplo similar: 24 + 15',
                            exampleSteps: '1. Suma las decenas: 20 + 10 = 30.\n2. Suma las unidades: 4 + 5 = 9.\n3. Junta ambos resultados: 30 + 9 = 39.',
                            hint: `Suma las decenas (${Math.floor(a/10)*10} + ${Math.floor(b/10)*10}) y luego las unidades (${a%10} + ${b%10}).`
                        };
                    } else {
                        const t = [2, 5, 10][randInt(0, 2)], m = randInt(3, 9);
                        p = {
                            gradeId, topic: `2° Primaria • Tabla del ${t}`,
                            context: `Hay ${m} paquetes con ${t} lápices cada uno.`,
                            equationHTML: `${t} × ${m} = ?`,
                            answer: t * m,
                            visual: `Sumar ${m} veces el número ${t}`,
                            formulaTitle: 'Concepto de Multiplicación',
                            formulaText: 'a × b = a + a + ... + a (b veces)',
                            exampleTitle: 'Ejemplo similar: 5 × 4',
                            exampleSteps: '1. Sumamos 4 veces el 5: 5 + 5 + 5 + 5.\n2. 10 + 10 = 20.\n3. Resultado = 20.',
                            hint: `Multiplica ${t} por ${m} contando de ${t} en ${t}.`
                        };
                    }
                    break;
                }

                case 'p3': { // 3° Primaria: Tablas 3-9
                    const a = randInt(3, 9), b = randInt(4, 9);
                    p = {
                        gradeId, topic: '3° Primaria • Multiplicación',
                        context: `Un auditorio tiene ${a} filas con ${b} asientos en cada fila.`,
                        equationHTML: `${a} × ${b} = ?`,
                        answer: a * b,
                        visual: `${a} grupos de ${b}`,
                        formulaTitle: 'Propiedad Conmutativa de la Multiplicación',
                        formulaText: 'a × b = b × a',
                        exampleTitle: 'Ejemplo similar: 6 × 7',
                        exampleSteps: '1. Sabemos que 6 × 5 = 30.\n2. Sabemos que 6 × 2 = 12.\n3. Sumamos 30 + 12 = 42.',
                        hint: `Recuerda que ${a} × ${b - 1} = ${a * (b - 1)}. Súmale ${a} más.`
                    };
                    break;
                }

                case 'p4': { // 4° Primaria: Divisiones exactas y perímetros
                    if (Math.random() > 0.45) {
                        const div = randInt(3, 9), quot = randInt(4, 11);
                        const total = div * quot;
                        p = {
                            gradeId, topic: '4° Primaria • División Exacta',
                            context: `Se reparten ${total} monedas en partes iguales entre ${div} cofres.`,
                            equationHTML: `${total} ÷ ${div} = ?`,
                            answer: quot,
                            visual: `Busca qué número multiplicado por ${div} da ${total}`,
                            formulaTitle: 'Relación entre División y Multiplicación',
                            formulaText: 'Si D ÷ d = c, entonces d × c = D',
                            exampleTitle: 'Ejemplo similar: 36 ÷ 4',
                            exampleSteps: '1. Buscamos en la tabla del 4 qué número da 36.\n2. 4 × 9 = 36.\n3. Por lo tanto, 36 ÷ 4 = 9.',
                            hint: `Piensa: ¿${div} multiplicado por qué número es igual a ${total}?`
                        };
                    } else {
                        const base = randInt(5, 14), alt = randInt(3, 10);
                        p = {
                            gradeId, topic: '4° Primaria • Perímetro del Rectángulo',
                            context: `Calcula el perímetro de una cancha rectangular de base ${base} m y altura ${alt} m.`,
                            equationHTML: `P = 2(${base}) + 2(${alt}) = ?`,
                            answer: 2 * (base + alt),
                            visual: `Lados: ${base} + ${alt} + ${base} + ${alt}`,
                            formulaTitle: 'Perímetro de un Rectángulo',
                            formulaText: 'P = 2·b + 2·h = 2·(b + h)',
                            exampleTitle: 'Ejemplo similar: Base = 8 m, Altura = 5 m',
                            exampleSteps: '1. Sumamos base + altura: 8 + 5 = 13 m.\n2. Multiplicamos por 2: 13 × 2 = 26 m.\n3. Perímetro = 26.',
                            hint: `Suma ${base} + ${alt} = ${base + alt} y multiplícalo por 2.`
                        };
                    }
                    break;
                }

                case 'p5': { // 5° Primaria: Fracciones y Jerarquía con paréntesis
                    if (Math.random() > 0.45) {
                        const denom = [2, 3, 4, 5][randInt(0, 3)];
                        const num = randInt(1, denom - 1);
                        const factor = randInt(3, 9);
                        const total = denom * factor;
                        const ans = num * factor;
                        p = {
                            gradeId, topic: '5° Primaria • Fracción de una Cantidad',
                            context: `Calcula las ${num}/${denom} partes de un total de ${total} alumnos.`,
                            equationHTML: `${num}/${denom} de ${total} = ?`,
                            answer: ans,
                            visual: `Divide ${total} entre ${denom} y multiplica por ${num}`,
                            formulaTitle: 'Fracción de un Número',
                            formulaText: '(a / b) de N = (N ÷ b) × a',
                            exampleTitle: 'Ejemplo similar: 3/4 de 20',
                            exampleSteps: '1. Dividimos el total entre el denominador: 20 ÷ 4 = 5.\n2. Multiplicamos por el numerador: 5 × 3 = 15.\n3. Resultado = 15.',
                            hint: `Primero divide ${total} ÷ ${denom} = ${factor}, y luego multiplica ${factor} × ${num}.`
                        };
                    } else {
                        const a = randInt(3, 8), b = randInt(2, 7), c = randInt(2, 6);
                        p = {
                            gradeId, topic: '5° Primaria • Jerarquía con Paréntesis',
                            context: `Resuelve respetando el orden de los paréntesis:`,
                            equationHTML: `(${a} + ${b}) × ${c} = ?`,
                            answer: (a + b) * c,
                            visual: `Primero el paréntesis (${a} + ${b})`,
                            formulaTitle: 'Jerarquía de Operaciones (PEMDAS)',
                            formulaText: '1° Paréntesis ( )  ➔  2° Potencias  ➔  3° Multiplicación/División  ➔  4° Suma/Resta',
                            exampleTitle: 'Ejemplo similar: (4 + 3) × 5',
                            exampleSteps: '1. Resolvemos dentro del paréntesis: 4 + 3 = 7.\n2. Multiplicamos por el número exterior: 7 × 5 = 35.',
                            hint: `Suma ${a} + ${b} = ${a + b} y multiplica el resultado por ${c}.`
                        };
                    }
                    break;
                }

                case 'p6': { // 6° Primaria: Porcentajes y Potencias
                    if (Math.random() > 0.45) {
                        const pcts = [10, 20, 25, 50];
                        const pct = pcts[randInt(0, pcts.length - 1)];
                        const mult = randInt(2, 12);
                        const total = (100 / (pct === 20 ? 20 : pct)) * mult;
                        const ans = (pct * total) / 100;
                        p = {
                            gradeId, topic: '6° Primaria • Cálculo de Porcentajes',
                            context: `Obtén el ${pct}% de una cantidad de ${total}.`,
                            equationHTML: `${pct}% de ${total} = ?`,
                            answer: ans,
                            visual: `Fórmula: (${pct} × ${total}) ÷ 100`,
                            formulaTitle: 'Cálculo de Porcentaje',
                            formulaText: 'P% de N = (P × N) / 100',
                            exampleTitle: 'Ejemplo similar: 25% de 80',
                            exampleSteps: '1. Multiplicamos 25 × 80 = 2000.\n2. Dividimos entre 100: 2000 ÷ 100 = 20.\n(O bien, 25% es la cuarta parte: 80 ÷ 4 = 20).',
                            hint: `Multiplica ${pct} por ${total} y divide entre 100.`
                        };
                    } else {
                        const base = randInt(4, 12);
                        p = {
                            gradeId, topic: '6° Primaria • Potencias al Cuadrado',
                            context: `Calcula el área de un cuadrado cuyo lado mide ${base} cm.`,
                            equationHTML: `${base}² = ?`,
                            answer: base * base,
                            visual: `${base}² = ${base} × ${base}`,
                            formulaTitle: 'Potencia al Cuadrado y Área del Cuadrado',
                            formulaText: 'A = L² = L × L',
                            exampleTitle: 'Ejemplo similar: 7²',
                            exampleSteps: '1. Elevar al cuadrado significa multiplicar la base por sí misma.\n2. 7 × 7 = 49 (¡No confundir con 7 × 2!).',
                            hint: `Multiplica ${base} × ${base}.`
                        };
                    }
                    break;
                }

                case 's1': { // 1° Secundaria: Ecuaciones de 1er Grado y área de triángulo
                    if (Math.random() > 0.4) {
                        const a = randInt(2, 7), x = randInt(2, 11), b = randInt(3, 15);
                        const c = a * x + b;
                        p = {
                            gradeId, topic: '1° Secundaria • Ecuación Lineal 1er Grado',
                            context: `Encuentra el valor de la incógnita x que cumple la igualdad:`,
                            equationHTML: `${a}x + ${b} = ${c}`,
                            answer: x,
                            visual: `Despeja x: primero resta ${b} y luego divide entre ${a}`,
                            formulaTitle: 'Despeje de Ecuación de Primer Grado',
                            formulaText: 'a·x + b = c   ➔   a·x = c - b   ➔   x = (c - b) / a',
                            exampleTitle: 'Ejemplo similar: 3x + 5 = 20',
                            exampleSteps: '1. Restamos 5 en ambos lados: 3x = 20 - 5 = 15.\n2. Dividimos entre 3: x = 15 / 3 = 5.',
                            hint: `Calcula ${c} - ${b} = ${c - b}, y divide ese resultado entre ${a}.`
                        };
                    } else {
                        const b = randInt(4, 12) * 2, h = randInt(3, 10);
                        p = {
                            gradeId, topic: '1° Secundaria • Área del Triángulo',
                            context: `Calcula el área de un triángulo con base b = ${b} cm y altura h = ${h} cm.`,
                            equationHTML: `A = (${b} × ${h}) / 2 = ?`,
                            answer: (b * h) / 2,
                            visual: `Base = ${b} cm | Altura = ${h} cm`,
                            formulaTitle: 'Fórmula del Área de un Triángulo',
                            formulaText: 'A = (base × altura) / 2',
                            exampleTitle: 'Ejemplo similar: Base = 10 cm, Altura = 6 cm',
                            exampleSteps: '1. Multiplicamos base por altura: 10 × 6 = 60.\n2. Dividimos entre 2: 60 ÷ 2 = 30 cm².',
                            hint: `Multiplica ${b} × ${h} = ${b * h} y sácale la mitad.`
                        };
                    }
                    break;
                }

                case 's2': { // 2° Secundaria: Leyes de los exponentes y Sistemas 2x2
                    if (Math.random() > 0.45) {
                        const m = randInt(2, 6), n = randInt(2, 5);
                        p = {
                            gradeId, topic: '2° Secundaria • Leyes de los Exponentes',
                            context: `¿Cuál es el exponente resultante al simplificar el producto de potencias de igual base?`,
                            equationHTML: `x<sup>${m}</sup> · x<sup>${n}</sup> = x<sup>?</sup>`,
                            answer: m + n,
                            visual: `En multiplicación de igual base, los exponentes se suman`,
                            formulaTitle: 'Ley del Producto de Potencias de la Misma Base',
                            formulaText: 'a^m · a^n = a^(m + n)',
                            exampleTitle: 'Ejemplo similar: x³ · x⁴',
                            exampleSteps: '1. La base x se mantiene igual.\n2. Sumamos los exponentes: 3 + 4 = 7.\n3. El exponente resultante es 7.',
                            hint: `Suma directamente los exponentes: ${m} + ${n}.`
                        };
                    } else {
                        const x = randInt(4, 12), y = randInt(1, x - 1);
                        const sum = x + y, diff = x - y;
                        p = {
                            gradeId, topic: '2° Secundaria • Sistema de Ecuaciones 2×2',
                            context: `Si x + y = ${sum}  y además  x - y = ${diff}, ¿cuánto vale x?`,
                            equationHTML: `x + y = ${sum} &nbsp;|&nbsp; x - y = ${diff} &nbsp;➔&nbsp; x = ?`,
                            answer: x,
                            visual: `Método de reducción: suma ambas ecuaciones (2x = ${sum + diff})`,
                            formulaTitle: 'Sistema Lineal 2×2 por Reducción (Suma y Resta)',
                            formulaText: '(x + y) + (x - y) = S + D   ➔   2x = S + D   ➔   x = (S + D) / 2',
                            exampleTitle: 'Ejemplo similar: x + y = 14,  x - y = 4',
                            exampleSteps: '1. Sumamos ambas ecuaciones para eliminar y: 2x = 14 + 4 = 18.\n2. Dividimos entre 2: x = 18 / 2 = 9.',
                            hint: `Suma ${sum} + ${diff} = ${sum + diff} y divídelo entre 2.`
                        };
                    }
                    break;
                }

                case 's3': { // 3° Secundaria: Teorema de Pitágoras y Ecuaciones Cuadráticas
                    if (Math.random() > 0.45) {
                        const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]];
                        const [a, b, c] = triples[randInt(0, triples.length - 1)];
                        p = {
                            gradeId, topic: '3° Secundaria • Teorema de Pitágoras',
                            context: `Un triángulo rectángulo tiene catetos a = ${a} y b = ${b}. Calcula la hipotenusa c:`,
                            equationHTML: `c = √(${a}² + ${b}²) = ?`,
                            answer: c,
                            visual: `a² = ${a*a}, b² = ${b*b} ➔ Suma = ${a*a + b*b}`,
                            formulaTitle: 'Teorema de Pitágoras',
                            formulaText: 'c² = a² + b²   ➔   c = √(a² + b²)',
                            exampleTitle: 'Ejemplo similar: Catetos a = 3, b = 4',
                            exampleSteps: '1. Elevamos al cuadrado: 3² = 9 y 4² = 16.\n2. Sumamos: 9 + 16 = 25.\n3. Sacamos raíz cuadrada: √25 = 5.',
                            hint: `Suma ${a*a} + ${b*b} = ${a*a + b*b} y calcula su raíz cuadrada exacta.`
                        };
                    } else {
                        const r1 = randInt(2, 7), r2 = randInt(r1 + 1, 9);
                        const B = -(r1 + r2), C = r1 * r2;
                        p = {
                            gradeId, topic: '3° Secundaria • Ecuación Cuadrática',
                            context: `Encuentra la raíz mayor (x) de la siguiente ecuación de segundo grado:`,
                            equationHTML: `x² - ${r1 + r2}x + ${C} = 0`,
                            answer: r2,
                            visual: `Factorización: (x - ${r1})(x - ${r2}) = 0`,
                            formulaTitle: 'Fórmula General y Factorización Cuadrática',
                            formulaText: 'x = [ -b ± √(b² - 4ac) ] / 2a   |   (x - r₁)(x - r₂) = 0',
                            exampleTitle: 'Ejemplo similar: x² - 7x + 12 = 0 (Raíz mayor)',
                            exampleSteps: '1. Buscamos dos números que sumados den 7 y multiplicados den 12: son 3 y 4.\n2. Factorizamos: (x - 3)(x - 4) = 0.\n3. La raíz mayor es x = 4.',
                            hint: `Las dos soluciones son ${r1} y ${r2}. Elige la raíz mayor (${r2}).`
                        };
                    }
                    break;
                }

                case 'b1': { // 1° Preparatoria: Trigonometría y Geometría Analítica
                    if (Math.random() > 0.45) {
                        const x1 = randInt(1, 5), y1 = randInt(1, 6);
                        const m = randInt(2, 6), dx = randInt(2, 5);
                        const x2 = x1 + dx, y2 = y1 + m * dx;
                        p = {
                            gradeId, topic: '1° Prepa • Geometría Analítica (Pendiente)',
                            context: `Calcula la pendiente (m) de la recta que pasa por A(${x1}, ${y1}) y B(${x2}, ${y2}):`,
                            equationHTML: `m = (${y2} - ${y1}) / (${x2} - ${x1}) = ?`,
                            answer: m,
                            visual: `Δy = ${y2 - y1}  |  Δx = ${x2 - x1}`,
                            formulaTitle: 'Pendiente de una Recta entre Dos Puntos',
                            formulaText: 'm = (y₂ - y₁) / (x₂ - x₁)',
                            exampleTitle: 'Ejemplo similar: P₁(2, 3) y P₂(5, 15)',
                            exampleSteps: '1. Restamos ordenadas: y₂ - y₁ = 15 - 3 = 12.\n2. Restamos abscisas: x₂ - x₁ = 5 - 2 = 3.\n3. Dividimos: m = 12 / 3 = 4.',
                            hint: `Divide ${y2 - y1} entre ${x2 - x1}.`
                        };
                    } else {
                        const k = randInt(2, 12) * 2;
                        const isSin = Math.random() > 0.5;
                        const label = isSin ? `${k} · sen(30°)` : `${k} · cos(60°)`;
                        p = {
                            gradeId, topic: '1° Prepa • Trigonometría (Ángulos Notables)',
                            context: `Evalúa la siguiente expresión trigonométrica exacta:`,
                            equationHTML: `${label} + ${k} · tan(45°) = ?`,
                            answer: (k / 2) + k,
                            visual: `Recuerda: sen(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1`,
                            formulaTitle: 'Valores Trigonométricos de Ángulos Notables (30°, 45°, 60°)',
                            formulaText: 'sen(30°) = 1/2 = 0.5   |   cos(60°) = 1/2 = 0.5   |   tan(45°) = 1',
                            exampleTitle: 'Ejemplo similar: 10·sen(30°) + 10·tan(45°)',
                            exampleSteps: '1. Como sen(30°) = 0.5, tenemos 10 × 0.5 = 5.\n2. Como tan(45°) = 1, tenemos 10 × 1 = 10.\n3. Sumamos: 5 + 10 = 15.',
                            hint: `${label} vale ${k/2}, y ${k}·tan(45°) vale ${k}. Súmalos.`
                        };
                    }
                    break;
                }

                case 'b2': { // 2° Preparatoria: MATRICES 2x2 (Determinantes y Operaciones)
                    const mode = randInt(1, 2);
                    if (mode === 1) {
                        const a = randInt(3, 8), d = randInt(3, 7);
                        const b = randInt(1, 4), c = randInt(1, 4);
                        const det = (a * d) - (b * c);
                        const matHTML = buildMatrixHTML([[a, b], [c, d]]);
                        p = {
                            gradeId, topic: '2° Prepa • Determinante de Matriz 2×2',
                            context: `Calcula el determinante det(A) de la siguiente matriz de 2×2:`,
                            equationHTML: `det ${matHTML} = ?`,
                            answer: det,
                            visual: `Diagonal principal (${a}×${d}) menos secundaria (${b}×${c})`,
                            formulaTitle: 'Determinante de una Matriz de 2×2',
                            formulaText: 'det |a  b ; c  d| = (a · d) - (b · c)',
                            exampleTitle: 'Ejemplo similar: det |5  2 ; 3  4|',
                            exampleSteps: '1. Multiplicamos la diagonal principal: 5 × 4 = 20.\n2. Multiplicamos la diagonal secundaria: 2 × 3 = 6.\n3. Restamos: 20 - 6 = 14.',
                            hint: `Multiplica (${a} × ${d}) = ${a*d} y réstale (${b} × ${c}) = ${b*c}.`
                        };
                    } else {
                        const a1 = randInt(2, 9), b1 = randInt(1, 6), c1 = randInt(1, 6), d1 = randInt(2, 8);
                        const a2 = randInt(2, 9), b2 = randInt(1, 6), c2 = randInt(1, 6), d2 = randInt(2, 8);
                        const k = randInt(2, 3);
                        const m1HTML = buildMatrixHTML([[a1, b1], [c1, d1]]);
                        const m2HTML = buildMatrixHTML([[a2, b2], [c2, d2]]);
                        const ans = a1 + k * a2;
                        p = {
                            gradeId, topic: '2° Prepa • Álgebra de Matrices 2×2',
                            context: `Dada la operación matricial A + ${k}B, calcula el valor de la entrada superior izquierda (posición 1,1):`,
                            equationHTML: `${m1HTML} + ${k}${m2HTML} ➔ Posición (1,1) = ?`,
                            answer: ans,
                            visual: `Suma la posición (1,1) de A con ${k} veces la posición (1,1) de B`,
                            formulaTitle: 'Suma de Matrices y Multiplicación por Escalar',
                            formulaText: '(A + k·B)₁₁ = a₁₁ + k · b₁₁',
                            exampleTitle: 'Ejemplo similar: Posición (1,1) de |4  1; 2  3| + 2·|5  0; 1  2|',
                            exampleSteps: '1. Tomamos el elemento (1,1) de la primera matriz: 4.\n2. Multiplicamos por 2 el elemento (1,1) de la segunda matriz: 2 × 5 = 10.\n3. Sumamos: 4 + 10 = 14.',
                            hint: `Toma el primer número ${a1} y súmale ${k} × ${a2} = ${k * a2}.`
                        };
                    }
                    break;
                }

                case 'b3': { // 3° Preparatoria: CÁLCULO DIFERENCIAL Y LÍMITES TRIGONOMÉTRICOS
                    const mode = randInt(1, 3);
                    if (mode === 1) {
                        // Límite trigonométrico notable: lim_{x->0} sin(kx) / (ax)
                        const a = randInt(1, 4);
                        const mult = randInt(2, 9);
                        const k = a * mult;
                        const denomStr = a === 1 ? 'x' : `${a}x`;
                        p = {
                            gradeId, topic: '3° Prepa • Límites Trigonométricos',
                            context: `Evalúa el siguiente límite trigonométrico fundamental cuando x tiende a 0:`,
                            equationHTML: `lím<sub>x→0</sub> [ sen(${k}x) / ${denomStr} ] = ?`,
                            answer: mult,
                            visual: `Propiedad notable: lím(x→0) [sen(kx) / (ax)] = k / a`,
                            formulaTitle: 'Límites Trigonométricos Notables en x → 0',
                            formulaText: 'lím(x→0) [sen(x)/x] = 1   |   lím(x→0) [sen(k·x)/(a·x)] = k/a   |   lím(x→0) [tan(k·x)/(a·x)] = k/a',
                            exampleTitle: 'Ejemplo similar: lím(x→0) [ sen(12x) / 3x ]',
                            exampleSteps: '1. Por el teorema del límite trigonométrico fundamental, sen(kx) ≈ kx cuando x → 0.\n2. Dividimos los coeficientes de x: 12 / 3 = 4.\n3. El límite es 4.',
                            hint: `Divide el coeficiente del argumento del seno (${k}) entre el coeficiente del denominador (${a}).`
                        };
                    } else if (mode === 2) {
                        // Límite trigonométrico con tangente + coseno: lim_{x->0} [tan(kx)/x + c*cos(x)]
                        const k = randInt(2, 9), c = randInt(2, 8);
                        p = {
                            gradeId, topic: '3° Prepa • Límites Trigonométricos Combinados',
                            context: `Calcula el valor exacto del siguiente límite trigonométrico:`,
                            equationHTML: `lím<sub>x→0</sub> [ tan(${k}x)/x + ${c}·cos(x) ] = ?`,
                            answer: k + c,
                            visual: `Recuerda: lím(x→0) tan(kx)/x = k  y  cos(0) = 1`,
                            formulaTitle: 'Límite de la Tangente y Continuidad del Coseno',
                            formulaText: 'lím(x→0) [tan(k·x) / x] = k   y   lím(x→0) cos(x) = cos(0) = 1',
                            exampleTitle: 'Ejemplo similar: lím(x→0) [ tan(5x)/x + 3·cos(x) ]',
                            exampleSteps: '1. El primer término lím(x→0) tan(5x)/x vale 5.\n2. En el segundo término sustituimos x = 0: 3·cos(0) = 3(1) = 3.\n3. Sumamos ambos límites: 5 + 3 = 8.',
                            hint: `El límite de tan(${k}x)/x es ${k}, y ${c}·cos(0) es ${c}. Súmalos.`
                        };
                    } else {
                        // Derivada evaluada en un punto
                        const a = randInt(2, 5), x0 = randInt(2, 5), b = randInt(2, 9);
                        const ans = 2 * a * x0 + b;
                        p = {
                            gradeId, topic: '3° Prepa • Cálculo Diferencial (Derivadas)',
                            context: `Si f(x) = ${a}x² + ${b}x, calcula el valor de la derivada f'(${x0}):`,
                            equationHTML: `f(x) = ${a}x² + ${b}x &nbsp;➔&nbsp; f'(${x0}) = ?`,
                            answer: ans,
                            visual: `Primero deriva: f'(x) = ${2*a}x + ${b}, luego sustituye x = ${x0}`,
                            formulaTitle: 'Regla de la Potencia para Derivadas',
                            formulaText: 'd/dx [a·x^n] = a·n·x^(n-1)   |   d/dx [b·x] = b',
                            exampleTitle: 'Ejemplo similar: f(x) = 3x² + 4x, hallar f\'(2)',
                            exampleSteps: '1. Derivamos término a término: f\'(x) = 2(3)x + 4 = 6x + 4.\n2. Evaluamos en x = 2: f\'(2) = 6(2) + 4 = 12 + 4 = 16.',
                            hint: `La derivada es f'(x) = ${2*a}x + ${b}. Sustituye x = ${x0}: (${2*a} × ${x0}) + ${b}.`
                        };
                    }
                    break;
                }
            }

            return p;
        }

        // ======================================================================
        // FLUJO DE PRÁCTICA, MINI EXAMEN, RETO DIARIO Y REPASO DE ERRORES
        // ======================================================================
