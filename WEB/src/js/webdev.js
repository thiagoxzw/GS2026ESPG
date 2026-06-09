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
    const prefereEscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const salvo = localStorage.getItem('hp_tema') || (prefereEscuro ? 'galaxia' : 'ciano');
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
    const slideshow = document.querySelector('.slideshow');
    if (!document.querySelector('.slide') || !slideshow) return;
    mostrarSlide(0);
    reiniciarTimerSlide();

    const prev = document.getElementById('slidePrev');
    const next = document.getElementById('slideNext');
    if (prev) prev.addEventListener('click', () => moverSlide(-1));
    if (next) next.addEventListener('click', () => moverSlide(1));

    document.querySelectorAll('.slide-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => irParaSlide(i));
    });

    let startX = 0;
    slideshow.addEventListener('touchstart', evento => {
      startX = evento.touches[0].clientX;
    }, { passive: true });
    slideshow.addEventListener('touchend', evento => {
      const delta = evento.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) moverSlide(delta > 0 ? -1 : 1);
    }, { passive: true });
  }

  // ==========================================================
  // 3. QUIZ (10 perguntas sobre o tema)
  // ==========================================================
  const PERGUNTAS_BASE = [
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

  let perguntasQuiz = [];
  let quizInicio = 0;
  let quizTimer = null;

  function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function prepararQuiz() {
    perguntasQuiz = embaralhar(PERGUNTAS_BASE).map(pergunta => {
      const opcoes = embaralhar(pergunta.opcoes.map((texto, index) => ({
        texto,
        correta: index === pergunta.correta
      })));
      return { q: pergunta.q, opcoes };
    });
    quizInicio = Date.now();
  }

  function melhorPontuacao() {
    const raw = localStorage.getItem('hp_quiz_best');
    return raw ? JSON.parse(raw) : null;
  }

  function salvarMelhorPontuacao(acertos, tempoSeg) {
    const atual = melhorPontuacao();
    if (!atual || acertos > atual.acertos || (acertos === atual.acertos && tempoSeg < atual.tempoSeg)) {
      localStorage.setItem('hp_quiz_best', JSON.stringify({ acertos, tempoSeg }));
    }
  }

  function formatarTempo(seg) {
    const m = Math.floor(seg / 60);
    const s = String(seg % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function atualizarProgressoQuiz() {
    const total = perguntasQuiz.length;
    const respondidas = document.querySelectorAll('#quizPerguntas input:checked').length;
    const pct = total ? Math.round((respondidas / total) * 100) : 0;
    const fill = document.getElementById('quizProgressFill');
    const label = document.getElementById('quizProgressLabel');
    const timer = document.getElementById('quizTimer');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = `${respondidas}/${total}`;
    if (timer && quizInicio) timer.textContent = formatarTempo(Math.floor((Date.now() - quizInicio) / 1000));
  }

  function atualizarMelhorQuiz() {
    const best = melhorPontuacao();
    const el = document.getElementById('quizBest');
    if (!el) return;
    el.textContent = best
      ? `Melhor: ${best.acertos}/${PERGUNTAS_BASE.length} · ${formatarTempo(best.tempoSeg)}`
      : 'Melhor: --';
  }

  function renderizarQuiz() {
    const container = document.getElementById('quizPerguntas');
    if (!container) return;

    prepararQuiz();
    clearInterval(quizTimer);
    quizTimer = setInterval(atualizarProgressoQuiz, 1000);

    container.innerHTML = `
      <div class="quiz-head">
        <div class="quiz-progress" aria-label="Progresso do quiz">
          <i id="quizProgressFill"></i>
        </div>
        <span id="quizProgressLabel">0/${perguntasQuiz.length}</span>
        <span id="quizTimer">0:00</span>
        <span id="quizBest">Melhor: --</span>
      </div>
    ` + perguntasQuiz.map((p, i) => `
      <div class="quiz-q" id="quiz-q-${i}">
        <div class="quiz-q-title">${i + 1}. ${p.q}</div>
        <div class="quiz-opcoes">
          ${p.opcoes.map((op, j) => `
            <label class="quiz-opcao">
              <input type="radio" name="q${i}" value="${j}" data-correta="${op.correta ? '1' : '0'}">
              <span>${op.texto}</span>
            </label>
          `).join('')}
        </div>
        <div class="quiz-feedback" aria-live="polite"></div>
      </div>
    `).join('');

    container.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', evento => {
        const bloco = evento.target.closest('.quiz-q');
        if (bloco) {
          bloco.classList.add('respondida');
          const feedback = bloco.querySelector('.quiz-feedback');
          if (feedback) feedback.textContent = 'Resposta registrada.';
        }
        atualizarProgressoQuiz();
      });
    });

    atualizarMelhorQuiz();
    atualizarProgressoQuiz();
  }

  function corrigirQuiz() {
    let acertos = 0;
    let respondidas = 0;

    perguntasQuiz.forEach((p, i) => {
      const escolhida = document.querySelector(`input[name="q${i}"]:checked`);
      const bloco = document.getElementById(`quiz-q-${i}`);
      const feedback = bloco ? bloco.querySelector('.quiz-feedback') : null;
      if (bloco) bloco.classList.remove('certo', 'errado');

      if (escolhida) {
        respondidas++;
        if (escolhida.dataset.correta === '1') {
          acertos++;
          if (bloco) bloco.classList.add('certo');
          if (feedback) feedback.textContent = 'Correto.';
        } else if (bloco) {
          bloco.classList.add('errado');
          const correta = p.opcoes.find(op => op.correta)?.texto;
          if (feedback) feedback.textContent = `Resposta correta: ${correta}.`;
        }
      }
    });

    const resultado = document.getElementById('quizResultado');
    if (!resultado) return;

    if (respondidas < perguntasQuiz.length) {
      resultado.className = 'quiz-resultado aviso show';
      resultado.textContent = `Responda todas as ${perguntasQuiz.length} perguntas — faltam ${perguntasQuiz.length - respondidas}.`;
      return;
    }

    clearInterval(quizTimer);
    const tempoSeg = Math.floor((Date.now() - quizInicio) / 1000);
    salvarMelhorPontuacao(acertos, tempoSeg);
    atualizarMelhorQuiz();

    const pct = Math.round((acertos / perguntasQuiz.length) * 100);
    let msg;
    if (pct === 100)      msg = 'Perfeito! Você domina o tema espacial. 🛰️';
    else if (pct >= 70)   msg = 'Muito bom! Conhecimento sólido sobre o HoloPass.';
    else if (pct >= 40)   msg = 'Quase lá — revise o GNSS e os satélites do INPE.';
    else                  msg = 'Vale revisar o material e tentar de novo!';

    resultado.className = 'quiz-resultado show ' + (pct >= 70 ? 'bom' : pct >= 40 ? 'medio' : 'ruim');
    resultado.innerHTML = `Você acertou <strong>${acertos}/${perguntasQuiz.length}</strong> (${pct}%) em ${formatarTempo(tempoSeg)}. ${msg}`;
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
