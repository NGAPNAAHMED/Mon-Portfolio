document.addEventListener('DOMContentLoaded', () => {

    // --- INITIALISATION GLOBALE DES LIBRAIRIES ---
    AOS.init({ duration: 800, once: true });

    // --- LOGIQUE COMMUNE À TOUTES LES PAGES ---

    // Initialisation de Particles.js
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        let particleConfig = {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#64FFDA' },
                shape: { type: 'circle' },
                opacity: { value: 0.2, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 150, color: '#64FFDA', opacity: 0.1, width: 1 },
                move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
            },
            retina_detect: true
        };
        if (document.body.classList.contains('home-page')) {
            particleConfig.particles.number.value = 80;
            particleConfig.particles.line_linked.opacity = 0.2;
            particleConfig.particles.opacity.value = 0.4;
            particleConfig.particles.move.speed = 1;
            particleConfig.interactivity.events = { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true };
            particleConfig.interactivity.modes = { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } };
        }
        particlesJS('particles-js', particleConfig);
    }

    // Gestion du menu hamburger
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    if (hamburger && mobileNav && overlay) {
        const closeMenu = () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            overlay.classList.remove('open');
        };
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            overlay.classList.toggle('open');
        });
        overlay.addEventListener('click', closeMenu);
        mobileNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                closeMenu();
            }
        });
    }

    // === SECTION ENTIÈREMENT REVUE POUR UNE FIABILITÉ MAXIMALE ===
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        const checkScrollIndicatorVisibility = () => {
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            
            // Si la page n'est pas plus grande que la fenêtre, l'indicateur doit être caché.
            if (documentHeight <= viewportHeight) {
                scrollIndicator.classList.add('hidden');
                return;
            }
            
            // Calcule la position actuelle du bas de la fenêtre.
            const scrollBottom = window.scrollY + viewportHeight;
            
            // Si le bas de la fenêtre a atteint (ou dépassé) le bas de la page, on cache l'indicateur.
            // On utilise une marge de 1px pour être sûr.
            if (scrollBottom >= documentHeight - 1) {
                scrollIndicator.classList.add('hidden');
            } else {
                // Sinon, sur une page qui peut défiler, on le montre.
                scrollIndicator.classList.remove('hidden');
            }
        };

        // On attache notre fonction aux événements de scroll et de redimensionnement.
        window.addEventListener('scroll', checkScrollIndicatorVisibility);
        window.addEventListener('resize', checkScrollIndicatorVisibility);

        // LE POINT CLÉ DE LA CORRECTION :
        // On attend que TOUTE la page soit chargée (images incluses) avant de faire la première vérification.
        window.addEventListener('load', () => {
             setTimeout(checkScrollIndicatorVisibility, 100); // Un petit délai pour être sûr que tout est bien en place
        });
    }


    // --- LOGIQUES SPÉCIFIQUES À CERTAINES PAGES ---

    // 1. Logique pour la page d'accueil (index.html)
    if (document.body.classList.contains('home-page')) {
        const body = document.body;
        const preloader = document.querySelector('.preloader-elements');
        const percentageElement = document.querySelector('.preloader-percentage');
        const progressCircle = document.getElementById('progress-circle');

        if (preloader) {
            const radius = progressCircle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
            progressCircle.style.strokeDashoffset = circumference;

            let percent = 0;
            const interval = setInterval(() => {
                if (percent < 100) {
                    percent++;
                    percentageElement.textContent = percent + '%';
                    const offset = circumference - percent / 100 * circumference;
                    progressCircle.style.strokeDashoffset = offset;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            body.classList.remove('loading');
                            preloader.style.display = 'none';
                            new Typed('#typed-text', {
                                strings: ["un Spécialiste IA.", "un Créateur de Modèles.", "un Visionnaire Data."],
                                typeSpeed: 60, backSpeed: 30, loop: true, smartBackspace: true, startDelay: 500
                            });
                        }, 500);
                    }, 300);
                }
            }, 45);
        }
    }

    // 2. Logique pour la page des compétences (competences.html)
    const skillsPage = document.querySelector('.skills-page-layout');
    if (skillsPage) {
        const skillsData = {
            langages: [ { name: 'Python', level: 95, desc: 'C\'est mon langage de prédilection et le pilier de l\'écosystème IA. Je l\'utilise pour le développement de bout en bout : de la manipulation de données avec Pandas et NumPy à la construction de modèles de Deep Learning complexes, en passant par la création d\'APIs avec Flask ou FastAPI pour le déploiement.' }, { name: 'SQL', level: 85, desc: 'Une maîtrise solide de SQL est indispensable pour extraire et transformer efficacement les données depuis les bases de données relationnelles. Je suis compétent dans la rédaction de requêtes complexes, l\'optimisation des performances et la conception de schémas de données pour les applications analytiques.' }, { name: 'JavaScript', level: 75, desc: 'J\'utilise JavaScript, principalement avec des frameworks comme React ou Vue.js, pour donner vie aux données côté client. C\'est essentiel pour créer des dashboards interactifs, visualiser les prédictions des modèles et construire des interfaces utilisateur intuitives pour les applications d\'IA.' }, { name: 'Bash/Shell', level: 70, desc: 'L\'automatisation est la clé de l\'efficacité en MLOps. J\'utilise les scripts Shell pour automatiser les tâches répétitives, gérer les environnements serveur, et orchestrer les pipelines de données et d\'entraînement sur des systèmes Linux.' } ],
            frameworks: [ { name: 'TensorFlow', level: 85, desc: 'J\'ai une expérience approfondie de TensorFlow, notamment via son API de haut niveau Keras, pour construire et entraîner des réseaux de neurones. Je l\'ai appliqué à des problématiques de vision par ordinateur (CNNs) et de traitement du langage naturel (RNNs, Transformers).' }, { name: 'PyTorch', level: 80, desc: 'PyTorch est mon outil de choix pour le prototypage rapide et la recherche en Deep Learning, grâce à sa flexibilité et son approche "pythonique". J\'apprécie particulièrement sa gestion dynamique des graphes de calcul pour des architectures de modèles non conventionnelles.' }, { name: 'Scikit-learn', level: 95, desc: 'C\'est l\'outil fondamental de mon arsenal pour le Machine Learning classique. De la régression logistique aux forêts aléatoires et au clustering, j\'utilise Scikit-learn pour le prétraitement des données, la sélection de modèles et l\'évaluation rigoureuse des performances.' }, { name: 'Pandas', level: 90, desc: 'Aucun projet de Data Science ne commence sans Pandas. C\'est mon outil quotidien pour le nettoyage, la transformation, l\'analyse exploratoire et la manipulation de données tabulaires. Sa puissance permet de préparer les données les plus complexes pour l\'entraînement des modèles.' }, { name: 'NumPy', level: 90, desc: 'Au cœur de l\'écosystème scientifique Python, NumPy est indispensable pour les opérations mathématiques et matricielles à haute performance. Je l\'utilise constamment pour l\'implémentation d\'algorithmes personnalisés et la manipulation de tenseurs.' } ],
            outils: [ { name: 'Git & GitHub', level: 90, desc: 'Je considère Git comme un outil non négociable pour tout projet de développement sérieux. Je l\'utilise pour le versioning du code, la collaboration en équipe via des pull requests, et la gestion des différentes branches d\'expérimentation sur les modèles.' }, { name: 'Docker', level: 75, desc: 'J\'utilise Docker pour résoudre le fameux problème du "ça marche sur ma machine". En conteneurisant mes applications et mes environnements d\'entraînement, je garantis la reproductibilité des expériences et je simplifie grandement le déploiement en production.' }, { name: 'Jupyter Notebooks', level: 95, desc: 'C\'est mon environnement de travail principal pour l\'exploration de données, le prototypage de modèles et la communication des résultats. J\'y combine code, visualisations et texte pour créer des analyses claires et reproductibles.' }, { name: 'Cloud (AWS/GCP/Azure)', level: 65, desc: 'Je possède une connaissance fondamentale des principaux fournisseurs de cloud. J\'ai utilisé leurs services pour le stockage de données (S3, GCS), le calcul (EC2, AI Platform) et le déploiement de modèles, ce qui me permet de passer à l\'échelle des solutions IA.' }, { name: 'CI/CD (GitHub Actions)', level: 60, desc: 'J\'ai mis en place des pipelines d\'Intégration Continue et de Déploiement Continu pour automatiser les tests et le déploiement de modèles. Cela garantit la qualité du code et accélère la mise en production des nouvelles fonctionnalités IA.' } ]
        };
        const selectorItems = document.querySelectorAll('.skills-selector li'), displayPanel = document.querySelector('.skills-display');
        function displaySkills(category) { displayPanel.innerHTML = ''; const skills = skillsData[category]; skills.forEach((skill, index) => { const skillNode = document.createElement('div'); skillNode.className = 'skill-node'; skillNode.style.animationDelay = `${index * 100}ms`; skillNode.innerHTML = `<span>${skill.name}</span>`; skillNode.addEventListener('click', () => displaySkillDetail(skill, category)); displayPanel.appendChild(skillNode); }); }
        function displaySkillDetail(skill, category) { displayPanel.innerHTML = `<div class="skill-detail"><button class="back-button">&larr; Retour</button><h3>${skill.name}</h3><div class="progress-bar-container"><div class="progress-bar"><div class="progress-level" style="width: 0;"></div></div><span class="progress-percent" style="opacity: 0;">${skill.level}%</span></div><p>${skill.desc}</p></div>`; setTimeout(() => { const progressBar = document.querySelector('.progress-level'), progressPercent = document.querySelector('.progress-percent'); if(progressBar) { progressBar.style.width = `${skill.level}%`; setTimeout(() => { progressPercent.style.opacity = '1'; }, 1000); } }, 100); document.querySelector('.back-button').addEventListener('click', () => displaySkills(category)); }
        selectorItems.forEach(item => { item.addEventListener('click', () => { selectorItems.forEach(i => i.classList.remove('active')); item.classList.add('active'); displaySkills(item.dataset.category); }); });
        displaySkills('langages');
    }

    // 3. Logique pour la page "À propos" (apropos.html)
    const pdfOverlay = document.getElementById('pdf-viewer-overlay');
    const notificationOverlay = document.getElementById('notification-overlay');
    if (pdfOverlay) {
        const viewButtons = document.querySelectorAll('.view-btn');
        const pdfContent = document.getElementById('pdf-content');
        const closeButton = document.getElementById('pdf-close-button');
        const openPdfViewer = (filePath) => {
            pdfContent.innerHTML = `<iframe src="${filePath}#toolbar=0&navpanes=0" style="width:100%; height:100%; border:none;"></iframe>`;
            pdfOverlay.style.display = 'flex';
            setTimeout(() => pdfOverlay.style.opacity = '1', 10);
        };
        const closePdfViewer = () => {
            pdfOverlay.style.opacity = '0';
            setTimeout(() => {
                pdfOverlay.style.display = 'none';
                pdfContent.innerHTML = '';
            }, 300);
        };
        viewButtons.forEach(button => {
            button.addEventListener('click', () => openPdfViewer(button.dataset.pdf));
        });
        closeButton.addEventListener('click', closePdfViewer);
        pdfOverlay.addEventListener('click', (e) => { if (e.target === pdfOverlay) closePdfViewer(); });
    }
    if (notificationOverlay) {
        const requestButtons = document.querySelectorAll('.request-access-btn');
        const notificationCloseBtn = document.getElementById('notification-close-btn');
        requestButtons.forEach(button => {
            button.addEventListener('click', () => {
                const subject = encodeURIComponent(button.dataset.subject);
                const mailtoLink = `mailto:ngapnaahmed7823@gmail.com?subject=${subject}`;
                window.location.href = mailtoLink;
                notificationOverlay.classList.add('visible');
            });
        });
        const closeNotification = () => {
            notificationOverlay.classList.remove('visible');
        }
        notificationCloseBtn.addEventListener('click', closeNotification);
        notificationOverlay.addEventListener('click', (e) => {
            if (e.target === notificationOverlay) {
                closeNotification();
            }
        });
    }
});