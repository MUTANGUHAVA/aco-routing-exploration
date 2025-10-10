document.addEventListener('DOMContentLoaded', () => {
    // --- LANGUAGE AND TRANSLATION LOGIC ---
    const translations = {
        en: {
            pageTitle: "Interactive Ant Colony Optimization Algorithm",
            mainHeader: "Ant Colony Optimization (ACO) Algorithm",
            algoDescription: "Ant Colony Optimization is an algorithm inspired by the foraging behavior of ants. Virtual 'ants' deposit pheromones on paths they travel. Shorter paths are completed faster, accumulating pheromones more quickly, which in turn attracts more ants. This feedback loop helps the colony converge on the shortest possible path between multiple points.",
            instructionsHeader: "How to Use",
            instruction1: "<strong>Add Cities:</strong> Click on the white canvas to place your cities (nodes).",
            instruction2: "<strong>Set Parameters:</strong> Adjust the algorithm's parameters using the sliders on the right.",
            instruction3: "<strong>Run:</strong> Press the 'Start' button to begin the simulation.",
            instruction4: "<strong>Observe:</strong> Watch as the ants find the optimal path, highlighted in green. The results will update in the panel below the controls.",
            paramsHeader: "Parameters",
            numAntsLabel: "Number of ants:",
            alphaLabel: "Pheromone influence (α):",
            betaLabel: "Distance influence (β):",
            evaporationLabel: "Pheromone evaporation (ρ):",
            speedLabel: "Animation speed:",
            startButton: "Start",
            stopButton: "Stop",
            resetButton: "Reset",
            resultsHeader: "Results",
            infoPath: "Best path found:",
            infoSequence: "Path sequence:",
            infoIteration: "Current Iteration:",
            infoBestIteration: "Found at iteration:",
            alertMsg: "Please add at least 2 cities.",
            numAntsTooltip: "The number of 'virtual' ants searching for the path simultaneously. A larger number explores more options.",
            alphaTooltip: "Determines how much the ants rely on the pheromone trail. A high value (α > 1) makes them follow popular paths.",
            betaTooltip: "Determines how much ants prefer shorter paths. A high value (β > 1) makes choosing the nearest city more likely.",
            evaporationTooltip: "The pheromone evaporation rate (ρ). It allows 'forgetting' old, possibly suboptimal paths, giving a chance to find new ones.",
            speedTooltip: "Adjusts the speed of the algorithm's iterations and animation."
        },
        ru: {
            pageTitle: "Интерактивный алгоритм муравьиной колонии",
            mainHeader: "Алгоритм муравьиной колонии (ACO)",
            algoDescription: "Алгоритм муравьиной колонии — это метод, вдохновлённый поведением муравьёв в поиске пищи. Виртуальные «муравьи» оставляют феромоны на пройденных путях. Короткие пути проходятся быстрее, накапливая феромоны активнее, что, в свою очередь, привлекает больше муравьёв. Этот механизм обратной связи помогает колонии найти кратчайший маршрут между несколькими точками.",
            instructionsHeader: "Как пользоваться",
            instruction1: "<strong>Добавьте города:</strong> Кликайте на белом холсте, чтобы разместить города (узлы).",
            instruction2: "<strong>Настройте параметры:</strong> Измените параметры алгоритма с помощью ползунков справа.",
            instruction3: "<strong>Запустите:</strong> Нажмите кнопку «Старт», чтобы начать симуляцию.",
            instruction4: "<strong>Наблюдайте:</strong> Смотрите, как муравьи находят оптимальный путь (выделен зелёным). Результаты будут обновляться на панели под настройками.",
            paramsHeader: "Параметры",
            numAntsLabel: "Количество муравьёв:",
            alphaLabel: "Влияние феромона (α):",
            betaLabel: "Влияние расстояния (β):",
            evaporationLabel: "Испарение феромона (ρ):",
            speedLabel: "Скорость анимации:",
            startButton: "Старт",
            stopButton: "Стоп",
            resetButton: "Сброс",
            resultsHeader: "Результаты",
            infoPath: "Найденный путь:",
            infoSequence: "Последовательность:",
            infoIteration: "Текущая итерация:",
            infoBestIteration: "Найден на итерации:",
            alertMsg: "Пожалуйста, добавьте хотя бы 2 города.",
            numAntsTooltip: "Количество 'виртуальных' муравьёв, которые одновременно ищут путь. Большее количество исследует больше вариантов.",
            alphaTooltip: "Определяет, насколько сильно муравьи будут полагаться на феромонный след. Высокое значение (α > 1) заставляет их следовать по уже популярным дорожкам.",
            betaTooltip: "Определяет, насколько муравьи предпочитают короткие пути. Высокое значение (β > 1) делает более вероятным выбор ближайшего города.",
            evaporationTooltip: "Коэффициент испарения феромона (ρ). Позволяет 'забывать' старые, возможно, неоптимальные пути, давая шанс найти новые.",
            speedTooltip: "Регулирует скорость выполнения итераций алгоритма и анимации."
        },
        fr: {
            pageTitle: "Algorithme interactif de colonie de fourmis",
            mainHeader: "Algorithme de colonie de fourmis (ACO)",
            algoDescription: "L'optimisation par colonie de fourmis est un algorithme inspiré du comportement de recherche de nourriture des fourmis. Des 'fourmis' virtuelles déposent des phéromones sur les chemins qu'elles parcourent. Les chemins plus courts sont complétés plus rapidement, accumulant ainsi des phéromones plus vite, ce qui attire davantage de fourmis. Cette boucle de rétroaction aide la colonie à converger vers le chemin le plus court possible entre plusieurs points.",
            instructionsHeader: "Comment utiliser",
            instruction1: "<strong>Ajouter des villes :</strong> Cliquez sur la toile blanche pour placer vos villes (nœuds).",
            instruction2: "<strong>Définir les paramètres :</strong> Ajustez les paramètres de l'algorithme à l'aide des curseurs à droite.",
            instruction3: "<strong>Exécuter :</strong> Appuyez sur le bouton 'Démarrer' pour commencer la simulation.",
            instruction4: "<strong>Observer :</strong> Regardez les fourmis trouver le chemin optimal, surligné en vert. Les résultats seront mis à jour dans le panneau sous les contrôles.",
            paramsHeader: "Paramètres",
            numAntsLabel: "Nombre de fourmis:",
            alphaLabel: "Influence des phéromones (α):",
            betaLabel: "Influence de la distance (β):",
            evaporationLabel: "Évaporation des phéromones (ρ):",
            speedLabel: "Vitesse d'animation:",
            startButton: "Démarrer",
            stopButton: "Arrêter",
            resetButton: "Réinitialiser",
            resultsHeader: "Résultats",
            infoPath: "Meilleur chemin trouvé:",
            infoSequence: "Séquence du chemin:",
            infoIteration: "Itération actuelle:",
            infoBestIteration: "Trouvé à l'itération:",
            alertMsg: "Veuillez ajouter au moins 2 villes.",
            numAntsTooltip: "Le nombre de fourmis 'virtuelles' qui cherchent le chemin simultanément. Un plus grand nombre explore plus d'options.",
            alphaTooltip: "Détermine à quel point les fourmis se fient à la piste de phéromones. Une valeur élevée (α > 1) les incite à suivre des chemins populaires.",
            betaTooltip: "Détermine à quel point les fourmis préfèrent les chemins courts. Une valeur élevée (β > 1) rend plus probable le choix de la ville la plus proche.",
            evaporationTooltip: "Le taux d'évaporation des phéromones (ρ). Il permet d' 'oublier' les anciens chemins, potentiellement sous-optimaux, donnant une chance d'en trouver de nouveaux.",
            speedTooltip: "Ajuste la vitesse des itérations et de l'animation de l'algorithme."
        }
    };

    let currentLang = 'en'; // Default language

    function setLanguage(lang) {
        currentLang = lang;
        const langData = translations[lang];
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (!langData[key]) return;

            // If the key ends with 'Tooltip', apply it as a title attribute
            if (key.endsWith('Tooltip')) {
                element.title = langData[key];
            }
            // Handle elements with HTML content like <strong> or <li>
            else if (element.tagName === 'LI' || element.tagName === 'STRONG') {
                element.innerHTML = langData[key];
            }
            // Handle the Start/Stop button state toggle
            else if (element.id === 'startButton' && isRunning) {
                element.textContent = langData['stopButton'];
            }
            // Handle all other text elements
            else {
                element.textContent = langData[key];
            }
        });

        // Update active language button style
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    // --- DOM ELEMENTS ---
    const canvas = document.getElementById('acoCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const bestPathLengthSpan = document.getElementById('bestPathLength');
    const bestPathSequenceSpan = document.getElementById('bestPathSequence');
    const iterationCountSpan = document.getElementById('iterationCount');
    const bestIterationCountSpan = document.getElementById('bestIterationCount');
    
    // --- CANVAS RESIZING LOGIC ---
    function resizeCanvas() {
        // Get the actual display size of the canvas element from CSS
        const displayWidth  = canvas.clientWidth;
        
        // Check if a resize is necessary to avoid redundant redraws
        if (canvas.width !== displayWidth) {
            // Set the canvas drawing buffer resolution to match its display size
            // We maintain a 4:3 aspect ratio (based on original 800x600)
            canvas.width = displayWidth;
            canvas.height = displayWidth * (600 / 800);
            
            // Redraw the scene after resizing
            draw(); 
        }
    }
    // Call the resize function whenever the browser window size changes
    window.addEventListener('resize', resizeCanvas);
    
    // --- GLOBAL VARIABLES AND PARAMETERS ---
    let cities = [], ants = [], pheromones = [], distances = [];
    let bestPath = [], bestPathLength = Infinity, bestIteration = 0;
    let isRunning = false, animationFrameId, iteration = 0;
    let numAnts, alpha, beta, evaporation, Q, speed;

    // --- EVENT LISTENERS ---
    
    // Updates parameter variables when sliders are moved
    function updateParametersFromUI() {
        numAnts = parseInt(document.getElementById('numAnts').value);
        alpha = parseFloat(document.getElementById('alpha').value);
        beta = parseFloat(document.getElementById('beta').value);
        evaporation = parseFloat(document.getElementById('evaporation').value);
        speed = parseInt(document.getElementById('speed').value);
        Q = 100; // Pheromone quantity
        
        // Update the text values next to the sliders
        document.getElementById('numAntsValue').textContent = numAnts;
        document.getElementById('alphaValue').textContent = alpha.toFixed(1);
        document.getElementById('betaValue').textContent = beta.toFixed(1);
        document.getElementById('evaporationValue').textContent = evaporation.toFixed(2);
        document.getElementById('speedValue').textContent = speed;
    }
    document.querySelectorAll('#controls input').forEach(input => input.addEventListener('input', updateParametersFromUI));
    
    // Handles placing cities on the canvas
    canvas.addEventListener('click', (e) => {
        if (isRunning) return; // Don't allow adding cities while simulation is running
        
        const rect = canvas.getBoundingClientRect(); // Get the canvas's actual size and position on the page

        // Calculate the scale between the drawing buffer and the display size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Apply the scale to get the correct coordinates within the canvas's coordinate system
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        cities.push({ x, y });
        draw();
    });

    // Handles the Start/Stop button logic
    startButton.addEventListener('click', () => {
        if (cities.length < 2) {
            alert(translations[currentLang].alertMsg);
            return;
        }
        if (isRunning) {
            stopAlgorithm();
        } else {
            startAlgorithm();
        }
    });

    // Resets the entire simulation
    resetButton.addEventListener('click', () => {
        stopAlgorithm();
        cities = [];
        bestPath = [];
        bestPathLength = Infinity;
        iteration = 0;
        bestIteration = 0;
        bestPathLengthSpan.textContent = "-";
        bestPathSequenceSpan.textContent = "-";
        iterationCountSpan.textContent = "0";
        bestIterationCountSpan.textContent = "-";
        draw();
    });

    // --- ACO CORE FUNCTIONS ---

    function startAlgorithm() {
        isRunning = true;
        startButton.textContent = translations[currentLang].stopButton;
        initialize();
        animate();
    }

    function stopAlgorithm() {
        isRunning = false;
        startButton.textContent = translations[currentLang].startButton;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        draw();
    }

    // Initializes or re-initializes the simulation state
    function initialize() {
        iteration = 0;
        bestIteration = 0;
        bestPathLength = Infinity;
        bestPath = [];
        const numCities = cities.length;
        
        // Calculate the distance matrix between all cities
        distances = Array(numCities).fill(0).map(() => Array(numCities).fill(0));
        for (let i = 0; i < numCities; i++) {
            for (let j = i; j < numCities; j++) {
                const dist = Math.hypot(cities[i].x - cities[j].x, cities[i].y - cities[j].y);
                distances[i][j] = dist;
                distances[j][i] = dist;
            }
        }
        
        // Initialize the pheromone matrix with a base value
        pheromones = Array(numCities).fill(0).map(() => Array(numCities).fill(1));
        
        // Create the ants and place them at random starting cities
        ants = [];
        for (let i = 0; i < numAnts; i++) {
            const startCity = Math.floor(Math.random() * numCities);
            ants.push({ currentCity: startCity, path: [startCity], pathLength: 0 });
        }
    }

    // A single step of the ACO simulation
    function updateACO() {
        if (!isRunning) return;
        
        // 1. Move each ant to the next city
        ants.forEach(ant => {
            if (ant.path.length < cities.length) {
                const nextCity = chooseNextCity(ant);
                ant.pathLength += distances[ant.currentCity][nextCity];
                ant.currentCity = nextCity;
                ant.path.push(nextCity);
            }
        });

        // 2. If all ants have completed their tours, update pheromones
        if (ants.every(ant => ant.path.length === cities.length)) {
            iteration++;
            iterationCountSpan.textContent = iteration;

            // 2.1. Pheromone evaporation
            for (let i = 0; i < cities.length; i++) {
                for (let j = 0; j < cities.length; j++) {
                    pheromones[i][j] *= (1 - evaporation);
                }
            }
            
            // 2.2. Pheromone deposit
            ants.forEach(ant => {
                // Complete the tour by adding the distance from the last city back to the first
                ant.pathLength += distances[ant.path[ant.path.length - 1]][ant.path[0]];
                const pheromoneDeposit = Q / ant.pathLength;
                
                // Deposit pheromones on the edges of the ant's path
                for (let i = 0; i < ant.path.length - 1; i++) {
                    pheromones[ant.path[i]][ant.path[i + 1]] += pheromoneDeposit;
                    pheromones[ant.path[i + 1]][ant.path[i]] += pheromoneDeposit;
                }
                // Deposit on the last edge connecting back to the start
                pheromones[ant.path[ant.path.length - 1]][ant.path[0]] += pheromoneDeposit;
                pheromones[ant.path[0]][ant.path[ant.path.length - 1]] += pheromoneDeposit;

                // 2.3. Update the best path found so far
                if (ant.pathLength < bestPathLength) {
                    bestPathLength = ant.pathLength;
                    bestPath = [...ant.path];
                    bestIteration = iteration;
                    
                    // Update the results display
                    bestPathLengthSpan.textContent = bestPathLength.toFixed(2);
                    bestIterationCountSpan.textContent = bestIteration;
                    const pathString = bestPath.map(cityIndex => cityIndex + 1).join(' → ');
                    bestPathSequenceSpan.textContent = pathString + ' → ' + (bestPath[0] + 1);
                }
            });
            
            // 3. Reset ants for the next iteration
            ants.forEach(ant => {
                const startCity = Math.floor(Math.random() * cities.length);
                ant.currentCity = startCity;
                ant.path = [startCity];
                ant.pathLength = 0;
            });
        }
    }

    // Probabilistically choose the next city for an ant
    function chooseNextCity(ant) {
        const probabilities = [];
        let totalProbability = 0;
        const unvisited = [];
        
        // Find all unvisited cities
        for (let i = 0; i < cities.length; i++) {
            if (!ant.path.includes(i)) unvisited.push(i);
        }
        
        // Calculate the probability for each unvisited city
        unvisited.forEach(city => {
            const pheromone = Math.pow(pheromones[ant.currentCity][city], alpha);
            const heuristic = Math.pow(1 / distances[ant.currentCity][city], beta); // Attractiveness (1 / distance)
            const probability = pheromone * heuristic;
            probabilities.push({ city, probability });
            totalProbability += probability;
        });
        
        // Select the next city using a roulette wheel selection
        const random = Math.random();
        let cumulative = 0;
        for (const p of probabilities) {
            cumulative += p.probability / totalProbability;
            if (random <= cumulative) return p.city;
        }
        
        // Fallback in case of floating point issues
        return unvisited[unvisited.length - 1];
    }

    // --- DRAWING AND ANIMATION ---

    // Draws the entire scene on the canvas
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw pheromone trails (edges)
        if (isRunning && pheromones.length > 0) {
            let maxPheromone = Math.max(...pheromones.flat());
            for (let i = 0; i < cities.length; i++) {
                for (let j = i + 1; j < cities.length; j++) {
                    ctx.beginPath();
                    ctx.moveTo(cities[i].x, cities[i].y);
                    ctx.lineTo(cities[j].x, cities[j].y);
                    const intensity = pheromones[i][j] / maxPheromone;
                    ctx.lineWidth = Math.min(5, intensity * 5);
                    ctx.strokeStyle = `rgba(0, 0, 255, ${Math.min(1, intensity)})`;
                    ctx.stroke();
                }
            }
        }
        
        // Draw the best path found
        if (bestPath.length > 0) {
            ctx.beginPath();
            ctx.moveTo(cities[bestPath[0]].x, cities[bestPath[0]].y);
            for (let i = 1; i < bestPath.length; i++) {
                ctx.lineTo(cities[bestPath[i]].x, cities[bestPath[i]].y);
            }
            ctx.closePath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#28a745';
            ctx.stroke();
        }

        // Draw the cities (nodes)
        cities.forEach((city, index) => {
            ctx.beginPath();
            ctx.arc(city.x, city.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#dc3545';
            ctx.fill();
            ctx.font = '14px Arial';
            ctx.fillStyle = '#000';
            ctx.fillText(index + 1, city.x + 10, city.y + 5);
        });
        
        // Draw the ants
        if (isRunning) {
            ants.forEach(ant => {
                 ctx.beginPath();
                 ctx.arc(cities[ant.currentCity].x, cities[ant.currentCity].y, 4, 0, 2 * Math.PI);
                 ctx.fillStyle = 'black';
                 ctx.fill();
            });
        }
    }
    
    // The main animation loop
    let lastTime = 0;
    function animate(timestamp = 0) {
        if (!isRunning) return;
        
        // Control the simulation speed
        const deltaTime = timestamp - lastTime;
        if (deltaTime > (101 - speed)) {
            updateACO();
            draw();
            lastTime = timestamp;
        }
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // --- INITIALIZATION ---
    updateParametersFromUI();
    setLanguage('en');
    resizeCanvas(); // Set initial canvas size
    draw(); // Initial draw
});