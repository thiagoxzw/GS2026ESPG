// ============================================================
// HOLOPASS — WEB DEVELOPMENT (JS puro)
// Recursos da disciplina Web Development:
//   1. Troca de tema (3 cores de fundo da página)
//   2. Slideshow com 3 imagens do tema
//   3. Quiz com 10 perguntas + resultado
//   4. Formulário de feedback com validação
// Arquivo separado para não alterar o script.js principal.
// ============================================================

(function () {
  'use strict';

  // ==========================================================
  // 1. TROCA DE TEMA (3 opções de cor de fundo)
  // ==========================================================
  const TEMAS = ['ciano', 'galaxia', 'aurora'];

  function aplicarTema(nome) {
    if (!TEMAS.includes(nome)) nome = 'ciano';
    document.body.dataset.theme = nome;
    localStorage.setItem('hp_tema', nome);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tema === nome);
    });
  }

  function initTema() {
    const salvo = localStorage.getItem('hp_tema') || 'ciano';
    aplicarTema(salvo);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => aplicarTema(btn.dataset.tema));
    });
  }

  // ==========================================================
  // 2. SLIDESHOW (3 imagens)
  // ==========================================================
  let slideAtual = 0;
  let slideTimer = null;

  function mostrarSlide(indice) {
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.slide-dot');
    if (!slides.length) return;

    slideAtual = (indice + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle('active', i === slideAtual));
    dots.forEach((d, i) => d.classList.toggle('active', i === slideAtual));
  }

  function moverSlide(passo) {
    mostrarSlide(slideAtual + passo);
    reiniciarTimerSlide();
  }

  function irParaSlide(indice) {
    mostrarSlide(indice);
    reiniciarTimerSlide();
  }

  function reiniciarTimerSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => mostrarSlide(slideAtual + 1), 4500);
  }

  function initSlideshow() {
    if (!document.querySelector('.slide')) return;
    mostrarSlide(0);
    reiniciarTimerSlide();

    const prev = document.getElementById('slidePrev');
    const next = document.getElementById('slideNext');
    if (prev) prev.addEventListener('click', () => moverSlide(-1));
    if (next) next.addEventListener('click', () => moverSlide(1));

    document.querySelectorAll('.slide-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => irParaSlide(i));
    });
  }

  // ==========================================================
  // 3. QUIZ (10 perguntas sobre o tema)
  // ==========================================================
  const PERGUNTAS = [
    { q: 'O que significa a sigla GNSS?',
      opcoes: ['Sistema Global de Navegação por Satélite', 'Rede Global de Sensores', 'Sinal Nacional de Som', 'Sistema de Gás Natural'],
      correta: 0 },
    { q: 'Qual fórmula o HoloPass usa para a distância real entre dois pontos da Terra?',
      opcoes: ['Pitágoras', 'Haversine', 'Bhaskara', 'Regra de três'],
      correta: 1 },
    { q: 'Em qual altitude aproximada estão os satélites GNSS (órbita média)?',
      opcoes: ['500 km', '2.000 km', '20.000 km', '100.000 km'],
      correta: 2 },
    { q: 'Qual destas é a constelação de navegação europeia?',
      opcoes: ['GPS', 'GLONASS', 'BeiDou', 'Galileo'],
      correta: 3 },
    { q: 'Por qual tecnologia o HoloPass paga a passagem?',
      opcoes: ['NFC', 'Bluetooth', 'Wi-Fi', 'Infravermelho'],
      correta: 0 },
    { q: 'Qual satélite de observação é 100% projetado e operado pelo Brasil?',
      opcoes: ['CBERS-4A', 'Amazonia-1', 'Landsat-8', 'Sentinel-2'],
      correta: 1 },
    { q: 'Qual é o ODS principal conectado ao HoloPass?',
      opcoes: ['ODS 3 — Saúde', 'ODS 4 — Educação', 'ODS 9 — Indústria, Inovação e Infraestrutura', 'ODS 14 — Vida na Água'],
      correta: 2 },
    { q: 'Quantos satélites, no mínimo, o GNSS precisa para fixar uma posição 3D?',
      opcoes: ['1', '2', '3', '4'],
      correta: 3 },
    { q: 'Em Edge Computing, o processamento dos dados acontece onde?',
      opcoes: ['No próprio dispositivo (na borda)', 'Só na nuvem', 'Em outro país', 'Em um satélite'],
      correta: 0 },
    { q: 'O satélite CBERS-4A é fruto de cooperação do Brasil com qual país?',
      opcoes: ['China', 'Estados Unidos', 'Rússia', 'Japão'],
      correta: 0 }
  ];

  function renderizarQuiz() {
    const container = document.getElementById('quizPerguntas');
    if (!container) return;

    container.innerHTML = PERGUNTAS.map((p, i) => `
      <div class="quiz-q" id="quiz-q-${i}">
        <div class="quiz-q-title">${i + 1}. ${p.q}</div>
        <div class="quiz-opcoes">
          ${p.opcoes.map((op, j) => `
            <label class="quiz-opcao">
              <input type="radio" name="q${i}" value="${j}">
              <span>${op}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function corrigirQuiz() {
    let acertos = 0;
    let respondidas = 0;

    PERGUNTAS.forEach((p, i) => {
      const escolhida = document.querySelector(`input[name="q${i}"]:checked`);
      const bloco = document.getElementById(`quiz-q-${i}`);
      if (bloco) bloco.classList.remove('certo', 'errado');

      if (escolhida) {
        respondidas++;
        if (Number(escolhida.value) === p.correta) {
          acertos++;
          if (bloco) bloco.classList.add('certo');
        } else if (bloco) {
          bloco.classList.add('errado');
        }
      }
    });

    const resultado = document.getElementById('quizResultado');
    if (!resultado) return;

    if (respondidas < PERGUNTAS.length) {
      resultado.className = 'quiz-resultado aviso show';
      resultado.textContent = `Responda todas as ${PERGUNTAS.length} perguntas — faltam ${PERGUNTAS.length - respondidas}.`;
      return;
    }

    const pct = Math.round((acertos / PERGUNTAS.length) * 100);
    let msg;
    if (pct === 100)      msg = 'Perfeito! Você domina o tema espacial. 🛰️';
    else if (pct >= 70)   msg = 'Muito bom! Conhecimento sólido sobre o HoloPass.';
    else if (pct >= 40)   msg = 'Quase lá — revise o GNSS e os satélites do INPE.';
    else                  msg = 'Vale revisar o material e tentar de novo!';

    resultado.className = 'quiz-resultado show ' + (pct >= 70 ? 'bom' : pct >= 40 ? 'medio' : 'ruim');
    resultado.innerHTML = `Você acertou <strong>${acertos}/${PERGUNTAS.length}</strong> (${pct}%). ${msg}`;
  }

  function reiniciarQuiz() {
    renderizarQuiz();
    const resultado = document.getElementById('quizResultado');
    if (resultado) { resultado.className = 'quiz-resultado'; resultado.textContent = ''; }
  }

  function initQuiz() {
    renderizarQuiz();
    const btnCorrigir = document.getElementById('btnCorrigirQuiz');
    const btnReiniciar = document.getElementById('btnReiniciarQuiz');
    if (btnCorrigir)  btnCorrigir.addEventListener('click', corrigirQuiz);
    if (btnReiniciar) btnReiniciar.addEventListener('click', reiniciarQuiz);
  }

  // ==========================================================
  // 4. FORMULÁRIO DE FEEDBACK (com validação)
  // ==========================================================
  function initFormulario() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', evento => {
      evento.preventDefault();
      const nome  = document.getElementById('fbNome');
      const email = document.getElementById('fbEmail');
      const msg   = document.getElementById('fbMsg');
      const saida = document.getElementById('feedbackResultado');

      const erros = [];
      if (!nome.value.trim())  erros.push('Informe seu nome.');
      if (!email.value.trim()) erros.push('Informe seu e-mail.');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) erros.push('E-mail inválido.');
      if (!msg.value.trim())   erros.push('Escreva uma mensagem.');

      if (erros.length) {
        saida.className = 'feedback-resultado erro show';
        saida.textContent = '⚠ ' + erros.join(' ');
        return;
      }

      saida.className = 'feedback-resultado sucesso show';
      saida.textContent = `✓ Obrigado, ${nome.value.trim()}! Sua mensagem foi registrada.`;
      form.reset();
    });
  }

  // ==========================================================
  // INICIALIZAÇÃO
  // ==========================================================
  document.addEventListener('DOMContentLoaded', () => {
    initTema();
    initSlideshow();
    initQuiz();
    initFormulario();
  });
})();
