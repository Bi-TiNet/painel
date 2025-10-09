// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM totalmente carregado. Iniciando script...");

    // SUAS CONFIGURAÇÕES DE LINKS E FUNCIONÁRIOS
    const links = [
      { nome: "Comercial", url: "https://app.powerbi.com/reportEmbed?reportId=0d1ef2a2-5887-408f-84d8-a46d411a1bdc&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true", type: "powerbi" },
      { nome: "Reduzidos", url: "https://app.powerbi.com/reportEmbed?reportId=f64af684-ac51-4ece-87f5-b63379e59acf&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true", type: "powerbi" },
      { nome: "Bloqueados", url: "https://app.powerbi.com/reportEmbed?reportId=af9c50de-33ce-4281-93dd-d86d61c94e60&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true", type: "powerbi" },
      { nome: "Técnicos", url: "https://app.powerbi.com/reportEmbed?reportId=e71d279f-c612-4c46-b89b-7da1a1d2759c&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true", type: "powerbi" },
      { nome: "Suporte Técnico", url: "https://app.powerbi.com/reportEmbed?reportId=28dcc1da-2fbf-4d2b-9dfc-2321c215096e&autoAuth=true&ctid=51e25658-c82f-4bfc-b491-2f350e67fe2c&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true", type: "powerbi" },
      { nome: "WOW Chat", url: "https://app.powerbi.com/view?r=eyJrIjoiOWZlNGI5ODItOWZkNC00MGRmLTk4N2YtYmE0OTkxOGQxMWU1IiwidCI6IjhiNDkxZGJmLTU4ZTEtNGNkNS05OGQ3LTEyYjY4ZWNkNDEzNCJ9&navContentPaneEnabled=false&filterPaneEnabled=false&fullscreen=true", type: "powerbi" },
      { nome: "Aniversariantes", url: null, type: "aniversariantes" }
    ];

    const funcionarios = [
        { nome: "Nathalia Gama", diaAniversario: 8, mesAniversario: 1, foto: "fotos/nathalia.jpg", frase: "Que seu dia seja tão especial quanto você!" },
        { nome: "Quezia Ribeiro", diaAniversario: 24, mesAniversario: 2, foto: "fotos/quezia.jpg", frase: "Parabéns e muitas felicidades neste novo ciclo!" },
        { nome: "Taiane Lima", diaAniversario: 8, mesAniversario: 3, foto: "fotos/taiane.jpg", frase: "Um dia repleto de sorrisos e realizações!" },
        { nome: "Vagner Garcia", diaAniversario: 11, mesAniversario: 3, foto: "fotos/vagner.jpg", frase: "Que a vida te surpreenda com muitas bençãos!" },
        { nome: "Rafael Santos", diaAniversario: 26, mesAniversario: 3, foto: "fotos/rafael.jpg", frase: "Celebre com alegria, você merece o melhor!" },
        { nome: "Luana Almeida", diaAniversario: 9, mesAniversario: 4, foto: "fotos/luana.jpg", frase: "Desejamos um aniversário mágico e inesquecível!" },
        { nome: "Edmilson Rocha", diaAniversario: 12, mesAniversario: 4, foto: "fotos/edmilson_rocha.jpg", frase: "Muitas felicidades e conquistas nesse novo ano!" },
        { nome: "Lucas Oliveira", diaAniversario: 20, mesAniversario: 5, foto: "fotos/lucas_oliveira.jpg", frase: "Felicidade, paz e muito sucesso para você!" },
        { nome: "Jean Oliveira", diaAniversario: 23, mesAniversario: 5, foto: "fotos/jean.jpg", frase: "Que a vida lhe sorria em todos os momentos!" },
        { nome: "Joyce Pinna", diaAniversario: 23, mesAniversario: 5, foto: "fotos/joyce.jpg", frase: "Um dia especial para uma pessoa especial!" },
        { nome: "Dalila Meira", diaAniversario: 9, mesAniversario: 6, foto: "fotos/dalila.jpg", frase: "Que este novo ano seja repleto de realizações!" },
        { nome: "Edvanildo Rodrigues", diaAniversario: 14, mesAniversario: 6, foto: "fotos/edvanildo.jpg", frase: "Feliz aniversário! Muita luz e alegria!" },
        { nome: "Jefersson Abade", diaAniversario: 19, mesAniversario: 7, foto: "fotos/jefersson.jpg", frase: "Que a vida te surpreenda com muitas bençãos!" },
        { nome: "Daniele França", diaAniversario: 20, mesAniversario: 7, foto: "fotos/daniele_frança.jpg", frase: "Feliz aniversário! Que a sua beleza, inteligência e alegria continuem a inspirar a todos ao seu redor." },
        { nome: "Carlos Júnior", diaAniversario: 30, mesAniversario: 7, foto: "fotos/carlos.jpg", frase: "Celebre cada momento, a vida é uma festa!" },
        { nome: "Valdete", diaAniversario: 6, mesAniversario: 8, foto: "fotos/valdete.jpg", frase: "Feliz aniversário! Paz, saúde e muitas alegrias!" },
        { nome: "Gabriel Ferreira", diaAniversario: 8, mesAniversario: 8, foto: "fotos/gabriel_ferreira.jpg", frase: "Que a vida continue te presenteando!" },
        { nome: "Leandro Roberto", diaAniversario: 17, mesAniversario: 8, foto: "fotos/leandro.jpg", frase: "Parabéns! Um novo ciclo de sucesso e felicidade!" },
        { nome: "Matheus Silva", diaAniversario: 23, mesAniversario: 8, foto: "fotos/matheus_silva.jpg", frase: "Que a felicidade te acompanhe em cada passo!" },
        { nome: "Daniela Bento", diaAniversario: 9, mesAniversario: 10, foto: "fotos/daniela.jpg", frase: "Feliz aniversário! Que a vida só te traga aquilo de bom que você merece" },
        { nome: "Diego França", diaAniversario: 4, mesAniversario: 11, foto: "fotos/diego_frança.png", frase: "Feliz aniversário! Sua busca constante por evolução e sua liderança organizada são uma inspiração para todos nós." },
        { nome: "Roberth Davino", diaAniversario: 11, mesAniversario: 11, foto: "fotos/roberth.jpg", frase: "Parabéns e muitas bençãos neste novo ciclo!" },
        { nome: "Gisele São Miguel", diaAniversario: 18, mesAniversario: 11, foto: "fotos/gisele.jpg", frase: "Felicidade, paz e muito sucesso para você!" },
        { nome: "Matheus Santos", diaAniversario: 21, mesAniversario: 11, foto: "fotos/matheus_santos.jpg", frase: "Que a vida lhe sorria em todos os momentos!" },
        { nome: "Edmilson Silva", diaAniversario: 4, mesAniversario: 12, foto: "fotos/edmilson_silva.jpg", frase: "Parabéns! Que a vida seja sempre uma festa!" }
    ];

    // --- NOVO: ELEMENTOS E CONFIGURAÇÕES DO PAINEL SUSPENSO ---
    const birthdayAudio = document.getElementById('birthday-audio');
    const birthdayOverlay = document.getElementById('birthday-overlay');
    const birthdayOverlayPhoto = document.getElementById('birthday-overlay-photo');
    const birthdayOverlayName = document.getElementById('birthday-overlay-name');
    
    // Horários e caminhos para cada música
    const birthdaySongs = [
        { time: '10:00', path: 'singles/padrao.mp3' },
        { time: '16:30', path: 'singles/padrao.mp3' }
    ];
    let musicPlayLog = {};

    // --- ELEMENTOS GERAIS DO DASHBOARD ---
    const titulo = document.getElementById("tituloPainel");
    const container = document.querySelector(".container");
    const menuButtons = document.querySelectorAll(".menu-button");
    const aniversariantesWrapper = document.getElementById("aniversariantes-wrapper");
    const aniversariantesList = document.getElementById("aniversariantes-list");

    let displayOrderIndices;
    let autoRotateInterval;
    let reloadInterval;
    
    // --- NOVO: FUNÇÕES DE CONTROLE DO PAINEL SUSPENSO ---

    function showBirthdayOverlay(aniversariante) {
        if (!aniversariante || !birthdayOverlay) return;
        
        console.log(`Exibindo painel para ${aniversariante.nome}`);
        birthdayOverlayPhoto.src = aniversariante.foto;
        birthdayOverlayName.textContent = aniversariante.nome;
        
        birthdayOverlay.classList.add('visible');
        
        clearInterval(autoRotateInterval);
        console.log("Rotação de dashboards pausada.");
    }

    function hideBirthdayOverlay() {
        if (!birthdayOverlay) return;

        console.log("Escondendo painel de aniversário.");
        birthdayOverlay.classList.remove('visible');

        startAutoRotation();
    }
    
    // --- NOVO: LÓGICA DE MÚSICA ATUALIZADA ---

    function playBirthdayMusic(songPath) {
        if (birthdayAudio && songPath) {
            console.log(`Tentando tocar a música: ${songPath}`);
            birthdayAudio.src = songPath;
            birthdayAudio.play().catch(error => {
                console.error("Erro ao tocar música:", error);
                hideBirthdayOverlay();
            });
        }
    }

    function checkAndPlayMusic() {
        const now = new Date();
        const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        if (!musicPlayLog[todayKey]) {
            musicPlayLog = { [todayKey]: [] };
            console.log("Novo dia! Resetando log de músicas de aniversário.");
        }

        const diaAtual = now.getDate();
        const mesAtual = now.getMonth() + 1;
        const aniversariantesHoje = funcionarios.filter(f => f.diaAniversario === diaAtual && f.mesAniversario === mesAtual);

        if (aniversariantesHoje.length > 0) {
            const aniversarianteDoDia = aniversariantesHoje[0];

            const songToPlay = birthdaySongs.find(song => song.time === currentTime);

            if (songToPlay && !musicPlayLog[todayKey].includes(songToPlay.time)) {
                console.log(`Hora de tocar a música! ${currentTime} - ${songToPlay.path}`);
                musicPlayLog[todayKey].push(songToPlay.time);
                
                showBirthdayOverlay(aniversarianteDoDia);
                playBirthdayMusic(songToPlay.path);
            }
        }
    }

    birthdayAudio.addEventListener('ended', () => {
        console.log("A música terminou.");
        hideBirthdayOverlay();
    });

    // --- SEU CÓDIGO DE CONTROLE DE DASHBOARD (integrado) ---
    
    const dashboardElements = links.map((linkInfo, i) => {
        if (linkInfo.type === "powerbi") {
            const frame = document.getElementById(`frame${i}`);
            if (!frame) return null;
            const wrapper = frame.closest('.iframe-wrapper');
            return { frame, wrapper, spinner: wrapper.querySelector('.loading-spinner'), name: linkInfo.nome, url: linkInfo.url, type: linkInfo.type, id: i };
        } else if (linkInfo.type === "aniversariantes") {
            return { wrapper: aniversariantesWrapper, name: linkInfo.nome, type: linkInfo.type, id: i, frame: null, spinner: null };
        }
        return null;
    }).filter(el => el !== null);

    function showSpinner(spinner) { if (spinner) spinner.style.display = 'flex'; }
    function hideSpinner(spinner) { if (spinner) spinner.style.display = 'none'; }

    dashboardElements.filter(el => el.type === "powerbi").forEach(({ frame, spinner, url, name }) => {
      showSpinner(spinner);
      frame.src = url;
      frame.title = name;
      frame.onload = () => hideSpinner(spinner);
      frame.onerror = () => hideSpinner(spinner);
    });

    const positionalClasses = ["dashboard-main", "dashboard-side-top", "dashboard-side-middle", "dashboard-side-bottom"];

    function applyVisualRoles() {
        const currentMainDashboard = dashboardElements[displayOrderIndices[0]];
        titulo.textContent = currentMainDashboard.name;

        dashboardElements.forEach(({ wrapper }) => {
            positionalClasses.forEach(cls => wrapper.classList.remove(cls));
            wrapper.style.opacity = '0';
            wrapper.style.zIndex = '0';
        });
        
        aniversariantesWrapper.classList.add('aniversariantes-hidden');

        if (currentMainDashboard.type === "aniversariantes") {
            currentMainDashboard.wrapper.classList.remove('aniversariantes-hidden');
            currentMainDashboard.wrapper.classList.add(positionalClasses[0]);
            currentMainDashboard.wrapper.style.opacity = '1';
            currentMainDashboard.wrapper.style.zIndex = '10';
            exibirAniversariantesDoMes();

            const aniversariantesHoje = funcionarios.filter(func => func.diaAniversario === (new Date().getDate()) && func.mesAniversario === (new Date().getMonth() + 1));
            if (aniversariantesHoje.length > 0 && typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.6, x: 0.5 } });
            }
        } else {
            currentMainDashboard.wrapper.classList.remove('aniversariantes-hidden');
            currentMainDashboard.wrapper.classList.add(positionalClasses[0]);
            currentMainDashboard.wrapper.style.opacity = '1';
            currentMainDashboard.wrapper.style.zIndex = '10';

            let sideIndex = 1;
            for (let i = 1; i < displayOrderIndices.length; i++) {
                const sideDashboard = dashboardElements[displayOrderIndices[i]];
                if (sideDashboard && sideDashboard.type === "powerbi" && sideIndex < positionalClasses.length) {
                    sideDashboard.wrapper.classList.remove('aniversariantes-hidden');
                    sideDashboard.wrapper.classList.add(positionalClasses[sideIndex]);
                    sideDashboard.wrapper.style.opacity = '1';
                    sideDashboard.wrapper.style.zIndex = (positionalClasses.length - sideIndex);
                    sideIndex++;
                }
            }
        }
    }

    function rotateDashboards() {
        const first = displayOrderIndices.shift();
        displayOrderIndices.push(first);
        applyVisualRoles();
    }

    function startAutoRotation() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(rotateDashboards, 25000);
        console.log("Rotação automática iniciada/reiniciada.");
    }

    function startReloadInterval() {
        clearInterval(reloadInterval);
        reloadInterval = setInterval(() => {
            console.log("Recarregando dashboards e aniversariantes...");
            dashboardElements.filter(el => el.type === "powerbi").forEach(({ frame, spinner, url }) => {
                showSpinner(spinner);
                frame.src = url;
            });
            exibirAniversariantesDoMes();
        }, 600000);
    }

    function manualSelectDashboard(index) {
        clearInterval(autoRotateInterval);
        const currentPosition = displayOrderIndices.indexOf(index);
        if (currentPosition !== -1) {
            displayOrderIndices.splice(currentPosition, 1);
        }
        displayOrderIndices.unshift(index);
        applyVisualRoles();
        startAutoRotation();
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const panelIndex = parseInt(button.dataset.panelIndex);
            manualSelectDashboard(panelIndex);
        });
    });

    function exibirAniversariantesDoMes() {
        const dataAtual = new Date();
        const diaAtual = dataAtual.getDate();
        const mesAtual = dataAtual.getMonth() + 1;
        const aniversariantesDoMes = funcionarios.filter(f => f.mesAniversario === mesAtual);
        aniversariantesList.innerHTML = '';
        if (aniversariantesDoMes.length === 0) {
            aniversariantesList.innerHTML = "<p>Nenhum aniversariante neste mês.</p>";
            return;
        }
        aniversariantesDoMes.forEach(f => {
            const divAniversariante = document.createElement("div");
            divAniversariante.classList.add("aniversariante-card");
            if (f.diaAniversario === diaAtual && f.mesAniversario === mesAtual) {
                divAniversariante.classList.add("aniversariante-today");
            }
            divAniversariante.innerHTML = `
                <img src="${f.foto}" alt="${f.nome}" onerror="this.onerror=null;this.src='https://placehold.co/120x120/0a1e3e/fff?text=Foto';">
                <h3>${f.nome}</h3>
                <p>${f.frase}</p>
                <small>Aniversário: ${f.diaAniversario}/${String(f.mesAniversario).padStart(2, '0')}</small>
            `;
            aniversariantesList.appendChild(divAniversariante);
        });
    }

    const dataAtualInicial = new Date();
    const aniversariantesDoDiaHoje = funcionarios.filter(f => f.diaAniversario === dataAtualInicial.getDate() && f.mesAniversario === dataAtualInicial.getMonth() + 1);
    displayOrderIndices = links.map((_, i) => i);
    if (aniversariantesDoDiaHoje.length > 0) {
        const aniversariantesLinkIndex = links.findIndex(link => link.type === "aniversariantes");
        const currentPos = displayOrderIndices.indexOf(aniversariantesLinkIndex);
        if (currentPos !== -1) {
            displayOrderIndices.splice(currentPos, 1);
        }
        displayOrderIndices.unshift(aniversariantesLinkIndex);
    }
    
    applyVisualRoles();
    startAutoRotation();
    startReloadInterval();
    
    console.log("Iniciando o verificador de música de aniversário (a cada minuto).");
    setInterval(checkAndPlayMusic, 60000);
    checkAndPlayMusic();
});