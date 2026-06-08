// ============================================================
// HOLOPASS v3.0 — FASE 3: BANCO DE DADOS + AUTENTICAÇÃO
// script.js — localStorage DB · Firebase-Ready · Metrô + CPTM
// ============================================================

// ============================================================
// 1. REDE COMPLETA — METRÔ SP (Linhas 1–5)
// ============================================================

const redesMetro = {
  "Linha 1 - Azul": {
    cor: "#0066CC", corNeon: "#4db8ff", tipo: "metro",
    estacoes: [
      "Tucuruvi", "Parada Inglesa", "Jardim São Paulo",
      "Portuguesa-Tietê", "Carandiru", "Santana",
      "Luz", "República", "São Bento", "Sé",
      "Liberdade", "São Judas", "Saúde",
      "Praça da Árvore", "Santa Cruz", "Vila Mariana",
      "Ana Rosa", "Paraíso", "Vergueiro", "Jabaquara"
    ]
  },
  "Linha 2 - Verde": {
    cor: "#007E3A", corNeon: "#00ff88", tipo: "metro",
    estacoes: [
      "Vila Madalena", "Sumaré", "Clínicas",
      "Consolação", "Trianon-MASP", "Brigadeiro",
      "Paraíso", "Ana Rosa", "Chácara Klabin",
      "Santos-Imigrantes", "Alto do Ipiranga",
      "Sacomã", "Tamanduateí", "Vila Prudente"
    ]
  },
  "Linha 3 - Vermelha": {
    cor: "#CC0000", corNeon: "#ff6688", tipo: "metro",
    estacoes: [
      "Barra Funda", "Marechal Deodoro", "Santa Cecília",
      "República", "Anhangabaú", "Sé",
      "Pedro II", "Brás", "Bresser-Mooca",
      "Belém", "Tatuapé", "Carrão",
      "Penha", "Vila Matilde", "Guilhermina-Esperança",
      "Patriarca", "Artur Alvim", "Corinthians-Itaquera"
    ]
  },
  "Linha 4 - Amarela": {
    cor: "#FFD700", corNeon: "#ffdd44", tipo: "metro",
    estacoes: [
      "Luz", "Higienópolis-Mackenzie", "República",
      "Paulista", "Oscar Freire", "Fradique Coutinho",
      "Pinheiros", "Butantã", "São Paulo-Morumbi", "Vila Sônia"
    ]
  },
  "Linha 5 - Lilás": {
    cor: "#9B27AF", corNeon: "#dd66ff", tipo: "metro",
    estacoes: [
      "Capão Redondo", "Campo Limpo", "Vila das Belezas",
      "Giovanni Gronchi", "Santo Amaro", "Largo Treze",
      "Adolfo Pinheiro", "Alto da Boa Vista", "Borba Gato",
      "Brooklin", "Hospital São Paulo", "Santa Cruz",
      "Chácara Klabin"
    ]
  },
  // --- CPTM ---
  "Linha 7 - Rubi": {
    cor: "#CE1126", corNeon: "#ff8899", tipo: "cptm",
    estacoes: [
      "Luz", "Barra Funda", "Lapa", "Pirituba",
      "Jaraguá", "Perus", "Caieiras",
      "Franco da Rocha", "Baltazar Fidélis",
      "Francisco Morato", "Campo Limpo Paulista",
      "Várzea Paulista", "Jundiaí"
    ]
  },
  "Linha 8 - Diamante": {
    cor: "#97999B", corNeon: "#cccccc", tipo: "cptm",
    estacoes: [
      "Júlio Prestes", "Barra Funda", "Lapa",
      "Presidente Altino", "Osasco", "Quitaúna",
      "General Miguel Costa", "Carapicuíba",
      "Barueri", "Jardim Silveira", "Jandira",
      "Engenheiro Cardoso", "Itapevi", "Amador Bueno"
    ]
  },
  "Linha 9 - Esmeralda": {
    cor: "#007A4D", corNeon: "#44ffaa", tipo: "cptm",
    estacoes: [
      "Osasco", "Presidente Altino", "Ceasa",
      "Villa-Lobos-Jaguaré", "Cidade Universitária",
      "Pinheiros", "Hebraica-Rebouças", "Cidade Jardim",
      "Vila Olímpia", "Berrini", "Morumbi",
      "Granja Julieta", "Santo Amaro", "Jurubatuba",
      "Autódromo", "Primavera-Interlagos", "Grajaú"
    ]
  },
  "Linha 10 - Turquesa": {
    cor: "#007B8A", corNeon: "#00ffdd", tipo: "cptm",
    estacoes: [
      "Brás", "Tamanduateí", "Alto da Mooca",
      "Utinga", "Prefeito Celso Daniel-Santo André",
      "Capuava", "Mauá", "Ribeirão Pires",
      "Rio Grande da Serra"
    ]
  },
  "Linha 11 - Coral": {
    cor: "#E05206", corNeon: "#ffaa66", tipo: "cptm",
    estacoes: [
      "Luz", "Brás", "Tatuapé",
      "Penha", "Guilhermina-Esperança", "Patriarca",
      "Artur Alvim", "Corinthians-Itaquera", "Guaianases",
      "Ferraz de Vasconcelos", "Poá", "Suzano",
      "Mogi das Cruzes"
    ]
  },
  "Linha 12 - Safira": {
    cor: "#003DA5", corNeon: "#66aaff", tipo: "cptm",
    estacoes: [
      "Brás", "São Caetano do Sul", "Prefeito Saladino",
      "Santo André", "Pirelli", "Mauá",
      "Guapituba", "Ribeirão Pires",
      "Ferraz de Vasconcelos", "Calmon Viana"
    ]
  },
  "Linha 13 - Jade": {
    cor: "#00A651", corNeon: "#88ff44", tipo: "cptm",
    estacoes: ["Engenheiro Goulart", "Guarulhos-Cecap", "Aeroporto Guarulhos"]
  }
};

// ============================================================
// 2. MAPA DE BALDEAÇÕES
// ============================================================

const BALDEACOES = {
  "Sé":             ["Linha 1 - Azul",     "Linha 3 - Vermelha"],
  "Paraíso":        ["Linha 1 - Azul",     "Linha 2 - Verde"],
  "Ana Rosa":       ["Linha 1 - Azul",     "Linha 2 - Verde"],
  "Santa Cruz":     ["Linha 1 - Azul",     "Linha 5 - Lilás"],
  "Chácara Klabin": ["Linha 2 - Verde",    "Linha 5 - Lilás"],
  "República":      ["Linha 1 - Azul",     "Linha 3 - Vermelha", "Linha 4 - Amarela"],
  "Luz":            ["Linha 1 - Azul",     "Linha 4 - Amarela",  "Linha 7 - Rubi",  "Linha 11 - Coral"],
  "Barra Funda":    ["Linha 3 - Vermelha", "Linha 7 - Rubi",     "Linha 8 - Diamante"],
  "Tamanduateí":    ["Linha 2 - Verde",    "Linha 10 - Turquesa"],
  "Brás":           ["Linha 3 - Vermelha", "Linha 10 - Turquesa","Linha 11 - Coral", "Linha 12 - Safira"],
  "Tatuapé":        ["Linha 3 - Vermelha", "Linha 11 - Coral"],
  "Santo Amaro":    ["Linha 5 - Lilás",    "Linha 9 - Esmeralda"],
  "Osasco":         ["Linha 8 - Diamante", "Linha 9 - Esmeralda"],
  "Lapa":           ["Linha 7 - Rubi",     "Linha 8 - Diamante"]
};

const TRANSFERENCIAS_CORREDOR = [
  {
    nome: "Pinheiros",
    a: { linha: "Linha 4 - Amarela", estacao: "Pinheiros" },
    b: { linha: "Linha 9 - Esmeralda", estacao: "Pinheiros" },
    tempo: 4,
    distancia: 0.35
  },
  {
    nome: "Paulista/Consolação",
    a: { linha: "Linha 4 - Amarela", estacao: "Paulista" },
    b: { linha: "Linha 2 - Verde", estacao: "Consolação" },
    tempo: 6,
    distancia: 0.55
  }
];

// ============================================================
// 3. CONSTANTES DO SISTEMA
// ============================================================

const TARIFA         = 4.40;
const KM_POR_ESTACAO = 1.2;
const PENALIDADE_TRANSFERENCIA_GRAFO = 12;
const KM_OPERACIONAL_LINHA = {
  "Linha 1 - Azul": 1.12,
  "Linha 2 - Verde": 1.05,
  "Linha 3 - Vermelha": 1.18,
  "Linha 4 - Amarela": 1.40,
  "Linha 5 - Lilás": 1.30,
  "Linha 7 - Rubi": 2.45,
  "Linha 8 - Diamante": 2.25,
  "Linha 9 - Esmeralda": 3.00,
  "Linha 10 - Turquesa": 2.35,
  "Linha 11 - Coral": 2.55,
  "Linha 12 - Safira": 2.25,
  "Linha 13 - Jade": 3.20
};
const VELOCIDADE     = 35;
const PAUSA_EST      = 0.5;
const PENALIDADE_1   = 3;
const PENALIDADE_2   = 6;
const SALDO_INICIAL  = 45.50;

const PICO = [
  { inicio: 6.5,  fim: 9.5  },
  { inicio: 17.0, fim: 20.5 }
];

const INTERVALOS = {
  pico:   { min: 120, max: 180 },
  normal: { min: 240, max: 360 },
  baixo:  { min: 420, max: 600 }
};

const FUNCIONAMENTO = { inicio: 4.67, fim: 24.0 };

// ============================================================
// FASE 3 — BANCO DE DADOS (localStorage)
// ============================================================
//
// Esta camada abstrai o acesso aos dados.
// Para migrar para Firebase, siga os passos:
//
// 1. Crie um projeto em https://console.firebase.google.com
// 2. Ative Authentication → Email/Password
// 3. Crie Firestore Database → Modo de teste
// 4. No index.html, adicione antes do </body>:
//    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"></script>
//    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth-compat.js"></script>
//    <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore-compat.js"></script>
// 5. Descomente o bloco FIREBASE CONFIG abaixo
// 6. Substitua as chamadas DB.* pelas versões Firebase comentadas

/* ---- FIREBASE CONFIG (descomente para ativar) ----

const firebaseConfig = {
  apiKey:            "SUA_API_KEY",
  authDomain:        "SEU_PROJETO.firebaseapp.com",
  projectId:         "SEU_PROJETO",
  storageBucket:     "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId:             "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const fbAuth      = firebase.auth();
const fbFirestore = firebase.firestore();

// Versões Firebase das funções DB:
async function salvarUsuarioFirebase(user) {
  await fbFirestore.collection('usuarios').doc(user.email).set(user);
}
async function buscarUsuarioFirebase(email) {
  const snap = await fbFirestore.collection('usuarios').doc(email).get();
  return snap.exists ? snap.data() : null;
}
async function salvarViagemFirebase(email, viagem) {
  await fbFirestore.collection('usuarios').doc(email)
        .collection('historico').add(viagem);
}
async function buscarHistoricoFirebase(email) {
  const snap = await fbFirestore.collection('usuarios').doc(email)
               .collection('historico').orderBy('timestamp', 'desc').get();
  return snap.docs.map(d => d.data());
}
// Autenticação real com Firebase Auth:
// fbAuth.createUserWithEmailAndPassword(email, senha)
// fbAuth.signInWithEmailAndPassword(email, senha)
// fbAuth.signOut()

*/

// ---- IMPLEMENTAÇÃO LOCALSTORAGE (funciona sem backend) ----
const DB = {

  // Salva usuário no localStorage
  salvarUsuario(user) {
    localStorage.setItem(`hp_user_${user.email}`, JSON.stringify(user));
  },

  // Busca usuário pelo e-mail
  buscarUsuario(email) {
    const raw = localStorage.getItem(`hp_user_${email.toLowerCase()}`);
    return raw ? JSON.parse(raw) : null;
  },

  // Salva sessão atual (persiste entre abas e recargas)
  salvarSessao(email) {
    localStorage.setItem('hp_sessao', JSON.stringify({
      email: email.toLowerCase(),
      ts: Date.now()
    }));
  },

  // Carrega sessão salva
  carregarSessao() {
    const raw = localStorage.getItem('hp_sessao');
    return raw ? JSON.parse(raw) : null;
  },

  // Remove sessão (logout)
  limparSessao() {
    localStorage.removeItem('hp_sessao');
  },

  // Adiciona viagem ao histórico do usuário
  adicionarViagem(email, viagem) {
    const hist = this.buscarHistorico(email);
    hist.unshift(viagem);
    if (hist.length > 200) hist.splice(200); // Limite de 200 viagens
    localStorage.setItem(`hp_hist_${email.toLowerCase()}`, JSON.stringify(hist));
  },

  // Carrega histórico completo do usuário
  buscarHistorico(email) {
    const raw = localStorage.getItem(`hp_hist_${email.toLowerCase()}`);
    return raw ? JSON.parse(raw) : [];
  }
};

// ============================================================
// 4. ESTADO GLOBAL
// ============================================================

let saldoAtual    = 0;
let rotaCalculada = null;
let linhaAtiva    = null;
let usuarioAtual  = null;
let metodoRecarga = 'pix';

// ============================================================
// 5. INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  criarParticulas();
  iniciarRelogio();
  popularSelects();
  gerarAlertas();
  inicializarMapaEO();
  atualizarPeakBar();
  verificarSessao();         // Fase 3: restaura sessão salva
  inicializarPWA();          // registra SW, detecta APIs e conexão
  inicializarCentralOperacional();
});

// ============================================================
// 6. FUNDO — PARTÍCULAS
// ============================================================

function criarParticulas() {
  const c = document.getElementById('particles');
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left              = Math.random() * 100 + '%';
    p.style.width             = (1 + Math.random() * 2.5) + 'px';
    p.style.height            = p.style.width;
    p.style.animationDuration = (10 + Math.random() * 20) + 's';
    p.style.animationDelay    = (-Math.random() * 25) + 's';
    c.appendChild(p);
  }
}

// ============================================================
// 7. RELÓGIO + ATUALIZAÇÕES EM TEMPO REAL
// ============================================================

function iniciarRelogio() {
  const tick = () => {
    const d   = new Date();
    const pad = n => String(n).padStart(2, '0');
    const el  = document.getElementById('currentTime');
    if (el) el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    if (linhaAtiva) atualizarContadorTrem();

    if (d.getSeconds() === 0) {
      gerarAlertas();
      atualizarPeakBar();
    }
  };
  tick();
  setInterval(tick, 1000);
}

// ============================================================
// 8. BARRA DE HORÁRIO DE PICO
// ============================================================

function atualizarPeakBar() {
  const bar = document.getElementById('peakBar');
  if (!bar) return;
  const p = periodoAtual();

  if (!estaFuncionando()) {
    bar.className   = 'peak-bar normal';
    bar.textContent = '⚫ SISTEMA FORA DE OPERAÇÃO — Retorna às 04:40';
    return;
  }

  const msgs = {
    pico:   '🔴 HORÁRIO DE PICO — Trens a cada 2–3 min · Lotação ALTA esperada',
    normal: '🔵 HORÁRIO NORMAL — Trens a cada 4–6 min · Boa circulação',
    baixo:  '🟢 HORÁRIO DE VALE — Trens a cada 7–10 min · Pouco movimento'
  };

  bar.className   = `peak-bar ${p}`;
  bar.textContent = msgs[p] || '';
}

// ============================================================
// 9. SELECTS DE ESTAÇÕES (12 linhas)
// ============================================================

function popularSelects() {
  const sels = [
    document.getElementById('currentStation'),
    document.getElementById('destination')
  ];

  for (const [nomeLinha, dados] of Object.entries(redesMetro)) {
    const prefixo = dados.tipo === 'cptm' ? '[CPTM] ' : '[Metrô] ';
    sels.forEach(sel => {
      const g   = document.createElement('optgroup');
      g.label   = prefixo + nomeLinha;
      dados.estacoes.forEach(est => {
        const op       = document.createElement('option');
        op.value       = `${nomeLinha}|${est}`;
        op.textContent = est;
        g.appendChild(op);
      });
      sel.appendChild(g);
    });
  }
}

// ============================================================
// 10. DISPLAY DE SALDO
// ============================================================

function renderizarSaldo() {
  const el    = document.getElementById('balanceDisplay');
  const barra = document.getElementById('balanceFill');

  if (el) el.textContent = usuarioAtual
    ? `R$ ${saldoAtual.toFixed(2).replace('.', ',')}`
    : '---';

  if (barra) {
    const pct = Math.min((saldoAtual / 100) * 100, 100);
    barra.style.width = pct + '%';
    barra.style.background = saldoAtual < 8
      ? 'linear-gradient(90deg, #ff3366, #ff6688)'
      : saldoAtual < 20
      ? 'linear-gradient(90deg, #ffaa00, #ffcc44)'
      : 'linear-gradient(90deg, var(--neon-blue), var(--neon-cyan))';
  }
}

// ============================================================
// 11. FUNÇÕES DE TEMPO / PERÍODO
// ============================================================

function horaDecimal() {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60;
}

function periodoAtual() {
  const h = horaDecimal();
  for (const p of PICO) if (h >= p.inicio && h < p.fim) return 'pico';
  if ((h >= 9.5 && h < 11) || (h >= 15 && h < 17)) return 'normal';
  return 'baixo';
}

function estaFuncionando() {
  const h = horaDecimal();
  return h >= FUNCIONAMENTO.inicio && h < FUNCIONAMENTO.fim;
}

// ============================================================
// 12. DADOS EM TEMPO REAL — LOTAÇÃO, TREM, VAGÃO
// ============================================================

function calcularLotacao() {
  const p    = periodoAtual();
  const onda = Math.sin(Date.now() / 90000) * 0.12;
  const bases = { pico: 0.83, normal: 0.47, baixo: 0.21 };
  const pct   = Math.min(100, Math.round((bases[p] + onda) * 100));
  const niveis = {
    pico:   { texto: 'ALTA',  cor: '#ff3366' },
    normal: { texto: 'MÉDIA', cor: '#ffaa00' },
    baixo:  { texto: 'BAIXA', cor: '#00ff88' }
  };
  return { pct, ...niveis[p] };
}

function segundosProximoTrem(nomeLinha) {
  // Estimativa local para demonstracao. Nao consome API oficial de operacao.
  const p     = periodoAtual();
  const seed  = nomeLinha.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const int   = INTERVALOS[p];
  const ciclo = int.min + (seed % 30) + Math.floor((int.max - int.min) / 2);
  return ciclo - (Math.floor(Date.now() / 1000) % ciclo);
}

function sugerirVagao() {
  const p = periodoAtual();
  if (p === 'pico') {
    const opts = ['1º vagão', 'Último vagão', '2º vagão'];
    return opts[Math.floor(Date.now() / 30000) % opts.length];
  }
  return 'Qualquer vagão';
}

function atualizarContadorTrem() {
  const el = document.getElementById('nextTrainDisplay');
  if (!el || !linhaAtiva) return;
  const seg = segundosProximoTrem(linhaAtiva);
  const m   = Math.floor(seg / 60);
  const s   = seg % 60;
  el.textContent      = m > 0 ? `${m}m ${String(s).padStart(2,'0')}s` : `${s}s`;
  el.style.color      = seg < 30 ? 'var(--neon-green)' : 'var(--neon-cyan)';
  el.style.textShadow = seg < 30 ? '0 0 12px var(--neon-green)' : '';
}

// ============================================================
// 13. ALERTAS DINÂMICOS
// ============================================================

function gerarAlertas() {
  const container = document.getElementById('alertsContent');
  const countEl   = document.getElementById('alertsCount');
  if (!container) return;

  const p = periodoAtual();
  const alertas = [];

  if (!estaFuncionando()) {
    alertas.push({ cor: 'red', msg: 'Sistema fora do horário de operação (04:40–00:00)' });
  }

  if (p === 'pico') {
    alertas.push({ cor: 'yellow', msg: 'Horário de pico: todas as linhas com intervalo reduzido' });
    alertas.push({ cor: 'yellow', msg: 'L1-Azul e L3-Vermelha: lotação CRÍTICA no centro' });
  }

  const min = new Date().getMinutes();
  const rotativos = [
    { cor: 'green',  msg: 'L2-Verde: operação normal em todas as estações' },
    { cor: 'green',  msg: 'L9-Esmeralda: frota completa em circulação' },
    { cor: 'yellow', msg: 'L7-Rubi: obra em Pirituba — embarque no carro 1' },
    { cor: 'green',  msg: 'L11-Coral: trem especial para Mogi das Cruzes' },
    { cor: 'yellow', msg: 'L8-Diamante: velocidade reduzida entre Osasco e Carapicuíba' },
    { cor: 'green',  msg: 'L5-Lilás: elevadores funcionando em todas as estações' }
  ];
  alertas.push(rotativos[min % rotativos.length]);
  alertas.push({ cor: 'cyan', msg: 'NFC: pulseira sincronizada · 3 catracas disponíveis' });
  alertas.push({ cor: 'cyan', msg: `Menor lotação agora: ${sugerirVagao()} em todas as linhas` });

  container.innerHTML = alertas.map(a => `
    <div class="alert-item">
      <span class="alert-dot ${a.cor}"></span>
      <span>${a.msg}</span>
    </div>
  `).join('');

  if (countEl) countEl.textContent = `(${alertas.length})`;
}

// ============================================================
// CAMADA CONCEITUAL DE OBSERVAÇÃO DA TERRA
// ============================================================

const EO_REGIOES = [
  {
    nome: 'Extremo Leste',
    x: 78, y: 38, intensidade: 86, cor: '#ff3366',
    diagnostico: 'Alta prioridade: grande distância até estações e integração radial sobrecarregada.'
  },
  {
    nome: 'Sul periférico',
    x: 58, y: 74, intensidade: 72, cor: '#ffaa00',
    diagnostico: 'Prioridade média-alta: corredores longos e baixa redundância entre trem, metrô e ônibus.'
  },
  {
    nome: 'Noroeste',
    x: 25, y: 33, intensidade: 61, cor: '#ffd700',
    diagnostico: 'Prioridade média: boa malha ferroviária, mas grandes bolsões dependem de ônibus.'
  },
  {
    nome: 'Centro expandido',
    x: 47, y: 46, intensidade: 28, cor: '#00ff88',
    diagnostico: 'Baixa prioridade: maior concentração de estações e alternativas de baldeação.'
  }
];

function inicializarMapaEO() {
  const mapa = document.getElementById('eoHeatmap');
  const detail = document.getElementById('eoDetail');
  if (!mapa || !detail) return;

  mapa.innerHTML = `
    <div class="eo-grid-lines"></div>
    <div class="eo-line l1"></div>
    <div class="eo-line l2"></div>
    <div class="eo-line l3"></div>
    <div class="eo-station core"></div>
    <div class="eo-station east"></div>
    <div class="eo-station south"></div>
    <div class="eo-legend"><span></span> prioridade simulada</div>
  `;

  EO_REGIOES.forEach((regiao, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'eo-hotspot';
    btn.style.setProperty('--x', `${regiao.x}%`);
    btn.style.setProperty('--y', `${regiao.y}%`);
    btn.style.setProperty('--size', `${48 + regiao.intensidade * 0.6}px`);
    btn.style.setProperty('--hot-color', regiao.cor);
    btn.setAttribute('aria-label', `${regiao.nome}: prioridade ${regiao.intensidade}`);
    btn.innerHTML = `<span>${regiao.intensidade}</span>`;
    btn.addEventListener('click', () => selecionarRegiaoEO(index));
    mapa.appendChild(btn);
  });

  selecionarRegiaoEO(0);
}

function selecionarRegiaoEO(index) {
  const regiao = EO_REGIOES[index];
  const detail = document.getElementById('eoDetail');
  if (!regiao || !detail) return;

  document.querySelectorAll('.eo-hotspot').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  detail.innerHTML = `
    <strong>${regiao.nome}</strong>
    <span>Prioridade ${regiao.intensidade}/100</span>
    <p>${regiao.diagnostico}</p>
  `;
}

// ============================================================
// MOTOR HOLOROUTE - ROTAS, LOTAÇÃO E PADRÕES LOCAIS
// ============================================================

let resultadoHoloRouteAtual = null;
let rotaSugeridaHoloRoute = null;

function inicializarCentralOperacional() {
  executarHoloRoute(false);
}

function climaSimulado() {
  const h = new Date().getHours();
  const m = new Date().getMinutes();
  const chuvoso = (h >= 16 && h <= 20) || m % 13 < 3;
  return chuvoso
    ? { nome: 'chuva moderada', fator: 14 }
    : { nome: 'tempo estável', fator: 3 };
}

function pesoLinhaHoloRoute(nomeLinha) {
  const pesos = {
    'Linha 1 - Azul': 14,
    'Linha 2 - Verde': 9,
    'Linha 3 - Vermelha': 18,
    'Linha 4 - Amarela': 7,
    'Linha 5 - Lilás': 8,
    'Linha 7 - Rubi': 15,
    'Linha 8 - Diamante': 13,
    'Linha 9 - Esmeralda': 12,
    'Linha 10 - Turquesa': 10,
    'Linha 11 - Coral': 17,
    'Linha 12 - Safira': 16,
    'Linha 13 - Jade': 6
  };
  return pesos[nomeLinha] || 10;
}

function mediaLinhaHoloRoute(linhas) {
  return linhas.reduce((soma, linha) => soma + pesoLinhaHoloRoute(linha), 0) / Math.max(linhas.length, 1);
}

function riscoPorPeriodoHoloRoute() {
  const p = periodoAtual();
  if (p === 'pico') return 30;
  if (p === 'normal') return 14;
  return 6;
}

function calcularRiscoRotaHoloRoute(rota) {
  const clima = climaSimulado();
  const pesoLinha = mediaLinhaHoloRoute(rota.linhas);
  const baldeacao = (rota.transferencias?.length || 0) * 7;
  const paradas = Math.min(18, rota.paradas * 0.9);
  const risco = Math.min(96, Math.round(riscoPorPeriodoHoloRoute() + clima.fator + pesoLinha + baldeacao + paradas));
  const lotacao = Math.min(98, Math.round(calcularLotacao().pct * 0.55 + pesoLinha * 2 + baldeacao));
  return { risco, lotacao, clima };
}

function textoLotacaoHoloRoute(valor) {
  if (valor >= 76) return 'ALTA';
  if (valor >= 46) return 'MÉDIA';
  return 'BAIXA';
}

function pontuarRotaHoloRoute(rota) {
  const risco = calcularRiscoRotaHoloRoute(rota);
  return Number(rota.tempo) + risco.risco * 0.12 + risco.lotacao * 0.18 + (rota.transferencias?.length || 0) * 3;
}

function coletarRotasCandidatasHoloRoute(linhaO, estO, linhaD, estD, rotaBase) {
  const rotas = [];
  const adicionar = rota => {
    if (!rota) return;
    const chave = `${rota.linhas.join('|')}::${rota.transferencias.join('|')}::${rota.paradas}`;
    if (!rotas.some(r => r.chave === chave)) rotas.push({ chave, rota });
  };

  adicionar(rotaBase);
  if (linhaO === linhaD) adicionar(calcularRotaDireta(linhaO, estO, estD));

  for (const [estBal, linhas] of Object.entries(BALDEACOES)) {
    if (!linhas.includes(linhaO) || !linhas.includes(linhaD)) continue;
    const s1 = calcularRotaDireta(linhaO, estO, estBal);
    const s2 = calcularRotaDireta(linhaD, estBal, estD);
    if (!s1 || !s2) continue;
    adicionar(montarRota({
      tipo: 'baldeacao-holoroute',
      linhas: [linhaO, linhaD],
      estacoes: [...s1.estacoes, ...s2.estacoes.slice(1)],
      origem: estO,
      destino: estD,
      paradas: s1.paradas + s2.paradas,
      transferencias: [estBal],
      extra: PENALIDADE_1
    }));
  }

  adicionar(tentarDuasBaldeacoes(linhaO, estO, linhaD, estD));
  return rotas.map(item => item.rota);
}

function detectarPadraoUsuarioHoloRoute() {
  if (!usuarioAtual) return 'Login necessário para analisar padrão.';

  const hist = DB.buscarHistorico(usuarioAtual.email);
  if (!hist.length) return 'Sem histórico suficiente ainda.';

  const contagem = {};
  hist.forEach(v => {
    const chave = `${v.origem} -> ${v.destino}`;
    contagem[chave] = (contagem[chave] || 0) + 1;
  });

  const [trajeto, qtd] = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];
  const periodo = periodoAtual() === 'pico' ? 'horário de pico' : 'horário atual';
  return `${trajeto} aparece ${qtd}x. Sugestão automática ativada para ${periodo}.`;
}

function executarHoloRoute(mostrarAviso = true) {
  const delayText = document.getElementById('routeDelayRisk');
  const crowdText = document.getElementById('routeCrowdRisk');
  const routeText = document.getElementById('routeSuggestion');
  const patternText = document.getElementById('routePattern');
  const delayBar = document.getElementById('routeDelayBar');
  const crowdBar = document.getElementById('routeCrowdBar');

  if (!rotaCalculada) {
    if (delayText) delayText.textContent = '--';
    if (crowdText) crowdText.textContent = '--';
    if (routeText) routeText.textContent = 'Calcule uma rota para o HoloRoute avaliar.';
    if (patternText) patternText.textContent = detectarPadraoUsuarioHoloRoute();
    if (delayBar) delayBar.style.width = '0%';
    if (crowdBar) crowdBar.style.width = '0%';
    return;
  }

  const risco = calcularRiscoRotaHoloRoute(rotaCalculada);
  const atrasoMin = Math.max(1, Math.round(risco.risco / 14));

  const origemVal = document.getElementById('currentStation').value;
  const destinoVal = document.getElementById('destination').value;
  let melhor = rotaCalculada;

  if (origemVal && destinoVal) {
    const [linhaO, estO] = origemVal.split('|');
    const [linhaD, estD] = destinoVal.split('|');
    const candidatas = coletarRotasCandidatasHoloRoute(linhaO, estO, linhaD, estD, rotaCalculada);
    melhor = candidatas.sort((a, b) => pontuarRotaHoloRoute(a) - pontuarRotaHoloRoute(b))[0] || rotaCalculada;
  }

  rotaSugeridaHoloRoute = melhor;
  resultadoHoloRouteAtual = {
    risco: risco.risco,
    lotacao: risco.lotacao,
    lotacaoTexto: textoLotacaoHoloRoute(risco.lotacao),
    atrasoMin,
    clima: risco.clima.nome,
    rota: melhor
  };

  if (delayText) delayText.textContent = `${risco.risco}% (~${atrasoMin} min)`;
  if (crowdText) crowdText.textContent = `${textoLotacaoHoloRoute(risco.lotacao)} · ${risco.lotacao}%`;
  if (delayBar) delayBar.style.width = `${risco.risco}%`;
  if (crowdBar) crowdBar.style.width = `${risco.lotacao}%`;

  const rotaDiferente = melhor !== rotaCalculada;
  if (routeText) {
    routeText.textContent = rotaDiferente
      ? `${melhor.linhas.map(l => l.split(' - ')[1]).join(' > ')} · ${melhor.tempo} min · menor lotação prevista`
      : `Rota atual recomendada · ${melhor.tempo} min · clima: ${risco.clima.nome}`;
  }
  if (patternText) patternText.textContent = detectarPadraoUsuarioHoloRoute();

  if (mostrarAviso) exibirAviso('HoloRoute atualizado com risco, lotação e recomendação de rota.');
}

function aplicarRotaHoloRoute() {
  if (!rotaSugeridaHoloRoute) {
    executarHoloRoute(false);
  }

  if (!rotaSugeridaHoloRoute) {
    exibirAviso('Calcule uma rota antes de aplicar a recomendação.');
    return;
  }

  rotaCalculada = rotaSugeridaHoloRoute;
  linhaAtiva = rotaCalculada.linhas[0];
  exibirRota(rotaCalculada);
  executarHoloRoute(false);
  exibirAviso('Rota inteligente aplicada ao painel.');
}

// ============================================================
// PWA / DEVICE APIs
// ============================================================
//
// Esta seção transforma o HoloPass em um Progressive Web App.
// O usuário pode INSTALAR no celular e usar OFFLINE, com NFC
// real, vibração, notificações push e geolocalização.
//
// APIs usadas quando suportadas por navegadores modernos:
// - Service Worker (cache offline)
// - Web App Manifest (instalação)
// - Web NFC (Android Chrome)
// - Notification API
// - Vibration API
// - Geolocation API
// - Online/Offline events

// ---- Detecção de dispositivo ----
const isMobile  = /Android|iPhone|iPad/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);
const isIOS     = /iPhone|iPad/i.test(navigator.userAgent);

// Padrões de vibração (em milissegundos: vibra-pausa-vibra-pausa...)
const VIBRACOES = {
  pagamento:    [80, 40, 80],
  erro:         [200, 100, 200, 100, 200],
  notificacao:  [50],
  alarme:       [500, 200, 500, 200, 500],
  baldeacao:    [100, 50, 100, 50, 100, 50, 100]
};

// Coordenadas GPS reais das principais estações de SP
const ESTACOES_GPS = {
  // Linha 1 - Azul
  "Tucuruvi":   { lat: -23.4810, lng: -46.6024 },
  "Santana":    { lat: -23.5048, lng: -46.6275 },
  "Luz":        { lat: -23.5345, lng: -46.6356 },
  "Sé":         { lat: -23.5505, lng: -46.6333 },
  "Liberdade":  { lat: -23.5588, lng: -46.6336 },
  "Paraíso":    { lat: -23.5736, lng: -46.6403 },
  "Ana Rosa":   { lat: -23.5797, lng: -46.6377 },
  "Jabaquara":  { lat: -23.6463, lng: -46.6411 },
  // Linha 2 - Verde
  "Vila Madalena": { lat: -23.5469, lng: -46.6912 },
  "Consolação":    { lat: -23.5563, lng: -46.6597 },
  "Trianon-MASP":  { lat: -23.5614, lng: -46.6557 },
  "Brigadeiro":    { lat: -23.5683, lng: -46.6464 },
  "Vila Prudente": { lat: -23.5832, lng: -46.5818 },
  // Linha 3 - Vermelha
  "Barra Funda":           { lat: -23.5269, lng: -46.6657 },
  "República":             { lat: -23.5436, lng: -46.6428 },
  "Brás":                  { lat: -23.5446, lng: -46.6175 },
  "Tatuapé":               { lat: -23.5410, lng: -46.5775 },
  "Corinthians-Itaquera":  { lat: -23.5402, lng: -46.4731 },
  // Linha 4 - Amarela
  "Paulista":         { lat: -23.5546, lng: -46.6620 },
  "Butantã":          { lat: -23.5715, lng: -46.7079 },
  // Linha 5 - Lilás
  "Capão Redondo":    { lat: -23.6720, lng: -46.7766 },
  "Santo Amaro":      { lat: -23.6541, lng: -46.7081 },
  "Chácara Klabin":   { lat: -23.6047, lng: -46.6309 },
  // CPTM
  "Pinheiros":        { lat: -23.5670, lng: -46.7016 },
  "Berrini":          { lat: -23.5969, lng: -46.6900 },
  "Osasco":           { lat: -23.5320, lng: -46.7716 },
  "Aeroporto Guarulhos": { lat: -23.4356, lng: -46.4731 }
};

// Estado do prompt de instalação
let promptInstalacao = null;

// ============================================================
// REGISTRO DO SERVICE WORKER
// ============================================================

async function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    atualizarDeviceStatus('Offline', 'Não suportado', 'unavailable');
    return;
  }

  try {
    const registro = await navigator.serviceWorker.register('sw.js');
    console.log('[HoloPass] Service Worker registrado:', registro.scope);
    atualizarDeviceStatus('Offline', 'Ativo · cache pronto', 'available');
  } catch (erro) {
    console.error('[HoloPass] SW falhou:', erro);
    atualizarDeviceStatus('Offline', 'Erro: ' + erro.message, 'unavailable');
  }
}

// ============================================================
// INSTALAÇÃO (PWA)
// ============================================================

// Browser dispara este evento quando o app pode ser instalado
window.addEventListener('beforeinstallprompt', evento => {
  evento.preventDefault();
  promptInstalacao = evento;
  document.getElementById('installBtn').style.display = 'flex';
  atualizarDeviceStatus('Pwa', 'Pronto para instalar', 'available');
});

window.addEventListener('appinstalled', () => {
  document.getElementById('installBtn').style.display = 'none';
  atualizarDeviceStatus('Pwa', 'Instalado!', 'active');
  vibrar(VIBRACOES.pagamento);
  notificar('HoloPass Instalado', 'Agora você pode usar a pulseira como app!');
});

async function instalarApp() {
  if (!promptInstalacao) {
    exibirAviso('App já instalado ou navegador não suporta');
    return;
  }

  promptInstalacao.prompt();
  const escolha = await promptInstalacao.userChoice;

  if (escolha.outcome === 'accepted') {
    console.log('[HoloPass] Usuário aceitou instalar');
  } else {
    console.log('[HoloPass] Usuário recusou instalação');
  }

  promptInstalacao = null;
}

// ============================================================
// VIBRATION API
// ============================================================

function vibrar(padrao) {
  if ('vibrate' in navigator) {
    navigator.vibrate(padrao);
    return true;
  }
  return false;
}

// ============================================================
// NOTIFICATION API
// ============================================================

async function pedirPermissaoNotificacoes() {
  if (!('Notification' in window)) {
    atualizarDeviceStatus('Notif', 'Não suportado', 'unavailable');
    return false;
  }

  if (Notification.permission === 'granted') {
    atualizarDeviceStatus('Notif', 'Permitido ✓', 'active');
    return true;
  }

  if (Notification.permission === 'denied') {
    atualizarDeviceStatus('Notif', 'Bloqueado', 'unavailable');
    return false;
  }

  const resultado = await Notification.requestPermission();
  const ok = resultado === 'granted';
  atualizarDeviceStatus('Notif', ok ? 'Permitido ✓' : 'Negado', ok ? 'active' : 'unavailable');
  return ok;
}

function notificar(titulo, corpo) {
  if (Notification.permission !== 'granted') return false;

  new Notification(titulo, {
    body: corpo,
    icon: 'icon.svg',
    badge: 'icon.svg',
    tag: 'holopass',
    vibrate: VIBRACOES.notificacao
  });
  vibrar(VIBRACOES.notificacao);
  return true;
}

// ============================================================
// WEB NFC API (Android Chrome — leitura real de cartões NFC)
// ============================================================

async function lerNFC() {
  if (!('NDEFReader' in window)) {
    atualizarDeviceStatus('Nfc', 'Apenas Android Chrome', 'unavailable');
    exibirAviso('Web NFC só funciona no Chrome Android. Use o botão NFC para simular.');
    return null;
  }

  try {
    const reader = new NDEFReader();
    await reader.scan();

    // Mostra banner de "aguardando aproximação"
    mostrarBannerNFC();

    return new Promise((resolve, reject) => {
      // Timeout de 30 segundos
      const timeout = setTimeout(() => {
        ocultarBannerNFC();
        reject(new Error('Tempo esgotado'));
      }, 30000);

      reader.onreading = evento => {
        clearTimeout(timeout);
        ocultarBannerNFC();
        vibrar(VIBRACOES.pagamento);
        atualizarDeviceStatus('Nfc', 'Tag detectada!', 'active');
        resolve({
          serial: evento.serialNumber,
          registros: evento.message.records.length
        });
      };

      reader.onreadingerror = () => {
        clearTimeout(timeout);
        ocultarBannerNFC();
        reject(new Error('Erro ao ler tag NFC'));
      };
    });
  } catch (erro) {
    atualizarDeviceStatus('Nfc', 'Erro: ' + erro.message, 'unavailable');
    exibirAviso('NFC: ' + erro.message);
    return null;
  }
}

function mostrarBannerNFC() {
  const banner = document.createElement('div');
  banner.id          = 'nfcBanner';
  banner.className   = 'nfc-scanning';
  banner.textContent = 'APROXIME A PULSEIRA OU CARTÃO NFC...';
  document.body.appendChild(banner);
}

function ocultarBannerNFC() {
  const b = document.getElementById('nfcBanner');
  if (b) b.remove();
}

// ============================================================
// GEOLOCATION API — detecta estação mais próxima
// ============================================================

// Distância real entre dois pontos da Terra usando a fórmula de Haversine
// (considera a curvatura terrestre — preciso para coordenadas GNSS)
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // raio médio da Terra em km
  const rad = d => d * Math.PI / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function detectarEstacaoMaisProxima() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      atualizarDeviceStatus('Gps', 'Não suportado', 'unavailable');
      reject(new Error('GNSS não disponível'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;
        const precisaoM = Math.round(accuracy); // precisão REAL do fix GNSS (em metros)

        // Encontra a estação mais próxima usando Haversine (distância real na esfera)
        let menor = Infinity, estProx = null;
        for (const [nome, coord] of Object.entries(ESTACOES_GPS)) {
          const d = haversineKm(lat, lng, coord.lat, coord.lng);
          if (d < menor) { menor = d; estProx = nome; }
        }

        const kmAprox = menor.toFixed(2);
        // Exibe estação detectada + distância real + precisão GNSS em metros
        atualizarDeviceStatus(
          'Gps',
          `${estProx} (~${kmAprox} km · ±${precisaoM} m GNSS)`,
          'active'
        );
        resolve({ estacao: estProx, distancia: kmAprox, precisao: precisaoM });
      },
      erro => {
        atualizarDeviceStatus('Gps', 'Permissão negada', 'unavailable');
        reject(erro);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

// ============================================================
// AÇÕES DA BARRA MOBILE
// ============================================================

// 📍 GNSS — detecta e seleciona automaticamente a estação atual via satélite
async function acaoGPS() {
  try {
    vibrar(VIBRACOES.notificacao);
    const r = await detectarEstacaoMaisProxima();

    // Tenta selecionar essa estação no select de origem
    const select = document.getElementById('currentStation');
    for (const op of select.querySelectorAll('option')) {
      if (op.textContent === r.estacao) {
        select.value = op.value;
        notificar(
          'Estação detectada via satélite',
          `${r.estacao} (~${r.distancia} km · precisão GNSS: ±${r.precisao} m)`
        );
        exibirAviso(`🛰️ Estação detectada via GNSS: ${r.estacao}`);
        return;
      }
    }

    exibirAviso(`🛰️ Mais próxima: ${r.estacao} (fora da rede cadastrada)`);
  } catch (e) {
    exibirAviso('Não foi possível detectar localização por satélite');
  }
}

// ◈ NFC — lê tag real ou simula pagamento
async function acaoNFC() {
  if (!rotaCalculada) {
    exibirAviso('Calcule uma rota antes de aproximar a pulseira!');
    return;
  }

  vibrar(VIBRACOES.notificacao);

  if ('NDEFReader' in window) {
    // Tenta usar NFC real
    try {
      const tag = await lerNFC();
      if (tag) {
        notificar('NFC detectado', `Serial: ${tag.serial}`);
        pagarPassagem(); // Confirma pagamento após leitura
        return;
      }
    } catch (e) {
      // Cai para simulação
    }
  }

  // Fallback: simulação (mesmo comportamento do botão "Aproximar & Pagar")
  pagarPassagem();
}

// 🔔 Notificar — pede permissão e envia notificação de teste
async function acaoNotificar() {
  vibrar(VIBRACOES.notificacao);
  const ok = await pedirPermissaoNotificacoes();
  if (ok) {
    notificar('HoloPass Ativo', 'Você receberá alertas de chegada e atrasos.');
  } else {
    exibirAviso('Notificações bloqueadas — ative nas configurações do navegador');
  }
}

// ============================================================
// DETECÇÃO ONLINE / OFFLINE
// ============================================================

function atualizarConexao() {
  const el = document.getElementById('connStatus');
  if (!el) return;
  const online = navigator.onLine;
  el.textContent = online ? '◉ ONLINE' : '◯ OFFLINE';
  el.className   = `conn-status ${online ? 'online' : 'offline'}`;

  if (!online) {
    notificar('HoloPass Offline', 'Sem internet — usando dados em cache local');
    vibrar(VIBRACOES.notificacao);
  }
}

window.addEventListener('online',  atualizarConexao);
window.addEventListener('offline', atualizarConexao);

// ============================================================
// PAINEL DE STATUS DOS RECURSOS
// ============================================================

// Atualiza o status visual de um recurso no painel de devices
function atualizarDeviceStatus(chave, status, estado) {
  const item   = document.getElementById('dev-' + chave.toLowerCase());
  const statEl = document.getElementById('stat' + chave);
  if (!item || !statEl) return;

  statEl.textContent = status;
  item.classList.remove('available', 'unavailable', 'active');
  if (estado) item.classList.add(estado);
}

// Verifica todos os recursos disponíveis no dispositivo
function detectarRecursos() {
  // PWA / Service Worker
  if ('serviceWorker' in navigator) {
    atualizarDeviceStatus('Pwa', 'Suportado · aguardando install', 'available');
  } else {
    atualizarDeviceStatus('Pwa', 'Não suportado', 'unavailable');
  }

  // NFC
  if ('NDEFReader' in window) {
    atualizarDeviceStatus('Nfc', 'Suportado (Android)', 'available');
  } else {
    atualizarDeviceStatus('Nfc', isIOS ? 'iOS: não suportado' : 'Apenas Chrome Android', 'unavailable');
  }

  // Notificações
  if ('Notification' in window) {
    const perm = Notification.permission;
    atualizarDeviceStatus('Notif',
      perm === 'granted' ? 'Permitido ✓' :
      perm === 'denied'  ? 'Bloqueado' :
      'Pendente — toque em ALERTA',
      perm === 'granted' ? 'active' : perm === 'denied' ? 'unavailable' : 'available'
    );
  } else {
    atualizarDeviceStatus('Notif', 'Não suportado', 'unavailable');
  }

  // Vibração
  if ('vibrate' in navigator) {
    atualizarDeviceStatus('Vibe', isMobile ? 'Disponível' : 'Apenas mobile', isMobile ? 'available' : 'unavailable');
  } else {
    atualizarDeviceStatus('Vibe', 'Não suportado', 'unavailable');
  }

  // GPS
  if ('geolocation' in navigator) {
    atualizarDeviceStatus('Gps', 'Suportado — toque em GNSS', 'available');
  } else {
    atualizarDeviceStatus('Gps', 'Não suportado', 'unavailable');
  }
}

// Botão "ATIVAR & TESTAR TODOS"
async function testarTodosRecursos() {
  vibrar(VIBRACOES.baldeacao);
  exibirAviso('🧪 Testando todos os recursos do dispositivo...');

  // Pede permissão de notificação
  await pedirPermissaoNotificacoes();

  // Detecta GPS (silenciosamente — só atualiza painel)
  try { await detectarEstacaoMaisProxima(); } catch (e) {}

  setTimeout(() => {
    notificar('Teste concluído', 'Veja o painel para ver quais recursos estão ativos no seu dispositivo!');
  }, 1500);
}

// ============================================================
// INICIALIZAÇÃO PWA — chamada do DOMContentLoaded
// ============================================================

function inicializarPWA() {
  detectarRecursos();
  registrarServiceWorker();
  atualizarConexao();
}

// ============================================================
// FASE 3 — AUTENTICAÇÃO
// ============================================================

// Verifica se há sessão salva ao carregar a página
function verificarSessao() {
  const sessao = DB.carregarSessao();

  if (!sessao) { mostrarLogin(); return; }

  // Sessão expira em 7 dias
  const seteDias = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - sessao.ts > seteDias) {
    DB.limparSessao();
    mostrarLogin();
    return;
  }

  const user = DB.buscarUsuario(sessao.email);
  if (!user) { DB.limparSessao(); mostrarLogin(); return; }

  entrarComUsuario(user);
}

// Realiza login com e-mail e senha
function fazerLogin() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const senha = document.getElementById('loginPass').value;

  if (!email || !senha) {
    exibirErroLogin('loginError', 'Preencha e-mail e senha!');
    return;
  }

  const user = DB.buscarUsuario(email);

  if (!user || user.senha !== senha) {
    exibirErroLogin('loginError', 'E-mail ou senha incorretos!');
    return;
  }

  DB.salvarSessao(email);
  entrarComUsuario(user);
}

// Realiza cadastro de novo usuário
function fazerCadastro() {
  const nome  = document.getElementById('regNome').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const senha = document.getElementById('regPass').value;
  const tipo  = document.getElementById('regTipo').value;

  if (!nome || !email || !senha) {
    exibirErroLogin('registerError', 'Preencha todos os campos!');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    exibirErroLogin('registerError', 'E-mail inválido!');
    return;
  }

  if (senha.length < 4) {
    exibirErroLogin('registerError', 'Senha deve ter ao menos 4 caracteres!');
    return;
  }

  if (DB.buscarUsuario(email)) {
    exibirErroLogin('registerError', 'E-mail já cadastrado! Faça login.');
    return;
  }

  const novoUser = {
    email,
    nome,
    senha,
    tipo,
    saldo:       SALDO_INICIAL,  // Bônus de boas-vindas
    criadoEm:   Date.now(),
    viagens:     0,
    totalGasto:  0,
    linhaFavorita: null
  };

  DB.salvarUsuario(novoUser);
  DB.salvarSessao(email);
  entrarComUsuario(novoUser);
}

// Login rápido com conta Demo (dados pré-carregados)
function loginDemo() {
  const email = 'demo@holopass.com';
  let demo    = DB.buscarUsuario(email);

  if (!demo) {
    demo = {
      email,
      nome:   'Usuário Demo',
      senha:  'demo',
      tipo:   'trabalhador',
      saldo:  45.50,
      criadoEm:     Date.now(),
      viagens:       8,
      totalGasto:   35.20,
      linhaFavorita: 'Linha 2 - Verde'
    };
    DB.salvarUsuario(demo);
    criarHistoricoDemo(email); // Insere viagens de exemplo
  }

  DB.salvarSessao(email);
  entrarComUsuario(demo);
}

// Desloga o usuário e volta para a tela de login
function fazerLogout() {
  DB.limparSessao();
  usuarioAtual = null;
  saldoAtual   = 0;
  linhaAtiva   = null;
  renderizarSaldo();
  mostrarLogin();

  // Oculta painéis exclusivos de usuário logado
  document.getElementById('userPanel').style.display  = 'none';
  document.getElementById('statsPanel').style.display = 'none';
  document.getElementById('journeyPanel').style.display = 'none';
  document.getElementById('historyContent').innerHTML =
    '<div class="hist-empty">Faça login para ver seu histórico</div>';
}

// Ativa o usuário no sistema após login bem-sucedido
function entrarComUsuario(user) {
  usuarioAtual = user;
  saldoAtual   = user.saldo;
  ocultarLogin();
  atualizarPainelUsuario(user);
  renderizarSaldo();
  renderizarHistorico();
  renderizarEstatisticas();
  executarHoloRoute(false);
}

// ---- Tela de Login ----

function mostrarLogin() {
  const ov = document.getElementById('loginOverlay');
  ov.classList.remove('hidden');
  ov.style.display = 'flex';
}

function ocultarLogin() {
  const ov = document.getElementById('loginOverlay');
  ov.classList.add('hidden');
  setTimeout(() => { ov.style.display = 'none'; }, 400);
}

function mostrarTab(tab) {
  document.getElementById('formLogin').style.display    = tab === 'login'    ? 'flex' : 'none';
  document.getElementById('formRegister').style.display = tab === 'register' ? 'flex' : 'none';
  document.getElementById('tabBtnLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabBtnRegister').classList.toggle('active', tab === 'register');
  document.getElementById('loginError').textContent    = '';
  document.getElementById('registerError').textContent = '';
}

function exibirErroLogin(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = '⚠ ' + msg;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  }
}

// ============================================================
// FASE 3 — PAINEL DO USUÁRIO
// ============================================================

const TIPOS_USUARIO = {
  trabalhador: '👔 Trabalhador',
  estudante:   '🎓 Estudante',
  idoso:       '🧓 Idoso (60+)',
  pcd:         '♿ Pessoa c/ Deficiência'
};

function atualizarPainelUsuario(user) {
  const painel = document.getElementById('userPanel');
  if (!painel) return;
  painel.style.display = 'block';

  // Avatar = primeira letra do nome
  document.getElementById('userAvatar').textContent = user.nome[0].toUpperCase();
  document.getElementById('userName').textContent   = user.nome;
  document.getElementById('userType').textContent   = TIPOS_USUARIO[user.tipo] || user.tipo;
}

// ============================================================
// FASE 3 — HISTÓRICO DE VIAGENS
// ============================================================

function renderizarHistorico() {
  const container = document.getElementById('historyContent');
  if (!container || !usuarioAtual) return;

  const hist = DB.buscarHistorico(usuarioAtual.email);

  if (hist.length === 0) {
    container.innerHTML = '<div class="hist-empty">Nenhuma viagem registrada ainda</div>';
    return;
  }

  // Mostra as 5 mais recentes
  const visiveis = hist.slice(0, 5);

  container.innerHTML = visiveis.map(v => {
    // Extrai número da linha para o badge (ex: "Linha 2 - Verde" → "2")
    const numLinha  = v.linhas[0].match(/\d+/)?.[0] || '?';
    const nomeLinhaShort = v.linhas[0].split(' - ')[1] || '';

    return `
      <div class="history-item">
        <span class="hist-line l${numLinha}">L${numLinha}</span>
        <span class="hist-route">${v.origem} → ${v.destino}</span>
        <span class="hist-value">- R$ ${v.valor.toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="hist-detail">${v.data} ${v.hora} · ${v.distancia}km · ~${v.tempo}min · ${nomeLinhaShort}</div>
    `;
  }).join('');

  if (hist.length > 5) {
    container.innerHTML += `
      <div class="hist-more">+ ${hist.length - 5} viagens anteriores</div>
    `;
  }
}

// Cria histórico de exemplo para a conta Demo
function criarHistoricoDemo(email) {
  const hoje = new Date();

  const VIAGENS_DEMO = [
    { hora: '08:32', origem: 'Vila Madalena',  destino: 'Paraíso',       linhas: ['Linha 2 - Verde'],    distancia: '3.6', tempo: 11, valor: 4.40 },
    { hora: '18:48', origem: 'Paraíso',         destino: 'Consolação',    linhas: ['Linha 2 - Verde'],    distancia: '2.4', tempo: 8,  valor: 4.40 },
    { hora: '07:55', origem: 'Sé',              destino: 'Tatuapé',       linhas: ['Linha 3 - Vermelha'], distancia: '6.0', tempo: 18, valor: 4.40 },
    { hora: '19:20', origem: 'Tatuapé',         destino: 'República',     linhas: ['Linha 3 - Vermelha'], distancia: '4.8', tempo: 15, valor: 4.40 },
    { hora: '09:10', origem: 'Luz',             destino: 'Paulista',      linhas: ['Linha 4 - Amarela'],  distancia: '3.6', tempo: 11, valor: 4.40 },
    { hora: '20:05', origem: 'Pinheiros',       destino: 'Santo Amaro',   linhas: ['Linha 9 - Esmeralda'],distancia: '8.4', tempo: 25, valor: 4.40 },
    { hora: '08:12', origem: 'Santana',         destino: 'Ana Rosa',      linhas: ['Linha 1 - Azul'],     distancia: '13.2',tempo: 40, valor: 4.40 },
    { hora: '17:55', origem: 'Ana Rosa',        destino: 'Santana',       linhas: ['Linha 1 - Azul'],     distancia: '13.2',tempo: 40, valor: 4.40 }
  ];

  VIAGENS_DEMO.forEach((v, i) => {
    // Distribui as viagens nos últimos 4 dias
    const d = new Date(hoje);
    d.setDate(hoje.getDate() - Math.floor(i / 2));
    DB.adicionarViagem(email, {
      id:        `demo_${i}`,
      data:      d.toLocaleDateString('pt-BR'),
      timestamp: d.getTime(),
      ...v
    });
  });
}

// ============================================================
// FASE 3 — ESTATÍSTICAS DO MÊS
// ============================================================

function renderizarEstatisticas() {
  const statsPanel = document.getElementById('statsPanel');
  if (!statsPanel || !usuarioAtual) return;
  statsPanel.style.display = 'block';

  const hist     = DB.buscarHistorico(usuarioAtual.email);
  const mesHoje  = new Date().toLocaleDateString('pt-BR').slice(3); // "MM/YYYY" ou "MM/AAAA"

  // Filtra viagens do mês corrente
  const viagensMes = hist.filter(v => v.data && v.data.slice(3) === mesHoje);

  const totalViagens = viagensMes.length;
  const totalGasto   = viagensMes.reduce((s, v) => s + v.valor, 0);

  // Conta qual linha foi mais usada
  const contLinha = {};
  viagensMes.forEach(v => {
    const l = v.linhas[0];
    contLinha[l] = (contLinha[l] || 0) + 1;
  });

  const linhaMaisUsada = Object.entries(contLinha)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  // Formata nome curto (ex: "Linha 2 - Verde" → "L2 Verde")
  const linhaFav = linhaMaisUsada
    ? `L${linhaMaisUsada.match(/\d+/)?.[0]} ${linhaMaisUsada.split(' - ')[1]}`
    : usuarioAtual.linhaFavorita
      ? `L${usuarioAtual.linhaFavorita.match(/\d+/)?.[0]}`
      : '-';

  document.getElementById('statViagens').textContent = totalViagens;
  document.getElementById('statGasto').textContent   = `R$ ${totalGasto.toFixed(2).replace('.', ',')}`;
  document.getElementById('statLinha').textContent   = linhaFav;
}

// ============================================================
// FASE 3 — RECARGA DE SALDO
// ============================================================

function abrirRecarga() {
  if (!usuarioAtual) {
    exibirAviso('Faça login para recarregar!');
    return;
  }
  document.getElementById('rechargeModal').style.display = 'flex';
}

function fecharRecarga() {
  document.getElementById('rechargeModal').style.display = 'none';
}

function selecionarMetodo(el) {
  document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  metodoRecarga = el.textContent.toLowerCase().includes('pix') ? 'pix' : 'cartao';
}

function recarregar(valor) {
  if (!usuarioAtual) return;

  saldoAtual            += valor;
  usuarioAtual.saldo     = saldoAtual;
  DB.salvarUsuario(usuarioAtual);
  renderizarSaldo();
  fecharRecarga();

  // Feedback visual de recarga
  const el   = document.getElementById('paymentStatus');
  const anel = document.getElementById('ringGlow');

  el.className  = 'payment-status success show';
  el.innerHTML  = `
    <div class="payment-icon" style="color:var(--neon-green)">↑</div>
    <div class="payment-message" style="color:var(--neon-green)">RECARGA CONFIRMADA</div>
    <div class="payment-detail">Método: ${metodoRecarga.toUpperCase()}</div>
    <div class="payment-detail">+ R$ ${valor.toFixed(2).replace('.', ',')}</div>
    <div class="payment-detail">Novo saldo: R$ ${saldoAtual.toFixed(2).replace('.', ',')}</div>
  `;

  if (anel) {
    anel.style.borderColor = 'var(--neon-green)';
    anel.style.boxShadow   = '0 0 50px var(--neon-green)';
    setTimeout(() => { anel.style.borderColor = ''; anel.style.boxShadow = ''; }, 2500);
  }

  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => { el.className = 'payment-status'; }, 350);
  }, 3000);
}

// ============================================================
// 14. ROTEAMENTO — CALCULAR ROTA
// ============================================================

function calcularRota() {
  const valO = document.getElementById('currentStation').value;
  const valD = document.getElementById('destination').value;

  if (!valO || !valD) { exibirAviso('Selecione a estação atual e o destino!'); return; }
  if (valO === valD)  { exibirAviso('Origem e destino são a mesma estação!'); return; }

  const foraOperacao = !estaFuncionando();

  const [linhaO, estO] = valO.split('|');
  const [linhaD, estD] = valD.split('|');

  const rota = calcularRotaEmGrafo(linhaO, estO, linhaD, estD)
    || (linhaO === linhaD
      ? calcularRotaDireta(linhaO, estO, estD)
      : (tentarUmaBaldeacao(linhaO, estO, linhaD, estD)
      || tentarDuasBaldeacoes(linhaO, estO, linhaD, estD)
      || calcularEstimativa(linhaO, estO, linhaD, estD)));

  if (!rota) { exibirAviso('Não foi possível calcular rota.'); return; }

  if (foraOperacao) exibirAviso('Sistema fora do horário de operação (04:40–00:00) · rota em modo planejamento');

  rotaCalculada = rota;
  linhaAtiva    = rota.linhas[0];
  exibirRota(rota);
  executarHoloRoute(false);
}

function calcularRotaDireta(nomeLinha, origem, destino) {
  const linha = redesMetro[nomeLinha];
  const iO    = linha.estacoes.indexOf(origem);
  const iD    = linha.estacoes.indexOf(destino);
  if (iO === -1 || iD === -1) return null;

  const paradas  = Math.abs(iD - iO);
  const inicio   = Math.min(iO, iD);
  const fim      = Math.max(iO, iD);
  const trecho   = linha.estacoes.slice(inicio, fim + 1);
  if (iO > iD) trecho.reverse();

  return montarRota({
    tipo: 'direta',
    linhas: [nomeLinha],
    estacoes: trecho,
    origem, destino, paradas, transferencias: [], extra: 0
  });
}

function chaveNo(linha, estacao) {
  return `${linha}|${estacao}`;
}

function adicionarAresta(grafo, de, para, dados) {
  if (!grafo.has(de)) grafo.set(de, []);
  grafo.get(de).push({ para, ...dados });
}

function construirGrafoRotas() {
  const grafo = new Map();

  Object.entries(redesMetro).forEach(([linha, dados]) => {
    const km = KM_OPERACIONAL_LINHA[linha] || KM_POR_ESTACAO;
    dados.estacoes.forEach((estacao, index) => {
      const atual = chaveNo(linha, estacao);
      if (!grafo.has(atual)) grafo.set(atual, []);
      const proxima = dados.estacoes[index + 1];
      if (!proxima) return;
      const destino = chaveNo(linha, proxima);
      const trecho = {
        tipo: "trecho",
        linha,
        estacao,
        km,
        tempo: Math.max(2, Math.round((km / VELOCIDADE) * 60 + PAUSA_EST))
      };
      adicionarAresta(grafo, atual, destino, trecho);
      adicionarAresta(grafo, destino, atual, { ...trecho, estacao: proxima });
    });
  });

  Object.entries(BALDEACOES).forEach(([estacao, linhas]) => {
    linhas.forEach(linhaA => {
      linhas.forEach(linhaB => {
        if (linhaA === linhaB) return;
        if (!redesMetro[linhaA]?.estacoes.includes(estacao)) return;
        if (!redesMetro[linhaB]?.estacoes.includes(estacao)) return;
        adicionarAresta(grafo, chaveNo(linhaA, estacao), chaveNo(linhaB, estacao), {
          tipo: "transferencia",
          linha: linhaB,
          estacao,
          nomeTransferencia: estacao,
          km: 0.15,
          tempo: 4
        });
      });
    });
  });

  TRANSFERENCIAS_CORREDOR.forEach(t => {
    const a = chaveNo(t.a.linha, t.a.estacao);
    const b = chaveNo(t.b.linha, t.b.estacao);
    adicionarAresta(grafo, a, b, {
      tipo: "transferencia",
      linha: t.b.linha,
      estacao: t.b.estacao,
      nomeTransferencia: t.nome,
      km: t.distancia,
      tempo: t.tempo
    });
    adicionarAresta(grafo, b, a, {
      tipo: "transferencia",
      linha: t.a.linha,
      estacao: t.a.estacao,
      nomeTransferencia: t.nome,
      km: t.distancia,
      tempo: t.tempo
    });
  });

  return grafo;
}

function calcularRotaEmGrafo(linhaO, estO, linhaD, estD) {
  const origem = chaveNo(linhaO, estO);
  const destino = chaveNo(linhaD, estD);
  const grafo = construirGrafoRotas();
  if (!grafo.has(origem) || !grafo.has(destino)) return null;

  const dist = new Map([[origem, 0]]);
  const prev = new Map();
  const fila = [{ no: origem, custo: 0 }];

  while (fila.length) {
    fila.sort((a, b) => a.custo - b.custo);
    const atual = fila.shift();
    if (!atual || atual.custo !== dist.get(atual.no)) continue;
    if (atual.no === destino) break;

    for (const aresta of grafo.get(atual.no) || []) {
      const custo = atual.custo + aresta.tempo + (aresta.tipo === "transferencia" ? PENALIDADE_TRANSFERENCIA_GRAFO : 0);
      if (custo >= (dist.get(aresta.para) ?? Infinity)) continue;
      dist.set(aresta.para, custo);
      prev.set(aresta.para, { anterior: atual.no, aresta });
      fila.push({ no: aresta.para, custo });
    }
  }

  if (!prev.has(destino) && origem !== destino) return null;

  const passos = [];
  let cursor = destino;
  while (cursor !== origem) {
    const item = prev.get(cursor);
    if (!item) return null;
    passos.unshift({ de: item.anterior, para: cursor, aresta: item.aresta });
    cursor = item.anterior;
  }

  const estacoes = [estO];
  const linhas = [linhaO];
  const transferencias = [];
  let kmTotal = 0;
  let tempoTotal = 0;
  let paradas = 0;

  passos.forEach(passo => {
    const [, estacaoPara] = passo.para.split("|");
    kmTotal += passo.aresta.km;
    tempoTotal += passo.aresta.tempo;

    if (passo.aresta.tipo === "transferencia") {
      transferencias.push(passo.aresta.nomeTransferencia || estacaoPara);
      if (!linhas.includes(passo.aresta.linha)) linhas.push(passo.aresta.linha);
      const marcador = passo.aresta.nomeTransferencia || estacaoPara;
      if (estacoes[estacoes.length - 1] !== marcador) estacoes.push(marcador);
      if (estacoes[estacoes.length - 1] !== estacaoPara) estacoes.push(estacaoPara);
    } else {
      paradas++;
      if (!linhas.includes(passo.aresta.linha)) linhas.push(passo.aresta.linha);
      if (estacoes[estacoes.length - 1] !== estacaoPara) estacoes.push(estacaoPara);
    }
  });

  const tipo = transferencias.length === 0
    ? "direta"
    : transferencias.length === 1 ? "baldeacao" : "baldeacao2";

  return {
    tipo,
    linhas,
    estacoes,
    origem: estO,
    destino: estD,
    paradas,
    transferencias,
    distancia: kmTotal.toFixed(1),
    distanciaMetodo: "operacional estimada por trechos da rede",
    tempo: Math.max(1, tempoTotal),
    tarifa: TARIFA
  };
}

function tentarUmaBaldeacao(linhaO, estO, linhaD, estD) {
  const candidatos = [];

  for (const [estBal, linhas] of Object.entries(BALDEACOES)) {
    if (!linhas.includes(linhaO) || !linhas.includes(linhaD)) continue;
    if (!redesMetro[linhaO].estacoes.includes(estBal)) continue;
    if (!redesMetro[linhaD].estacoes.includes(estBal)) continue;

    const s1 = calcularRotaDireta(linhaO, estO, estBal);
    const s2 = calcularRotaDireta(linhaD, estBal, estD);
    if (!s1 || !s2) continue;

    candidatos.push({ s1, s2, estBal, total: s1.paradas + s2.paradas });
  }

  if (!candidatos.length) return null;

  const { s1, s2, estBal } = candidatos.sort((a, b) => a.total - b.total)[0];

  return montarRota({
    tipo: 'baldeacao',
    linhas: [linhaO, linhaD],
    estacoes: [...s1.estacoes, ...s2.estacoes.slice(1)],
    origem: estO, destino: estD,
    paradas: s1.paradas + s2.paradas,
    transferencias: [estBal], extra: PENALIDADE_1
  });
}

function tentarDuasBaldeacoes(linhaO, estO, linhaD, estD) {
  for (const [estBal1, linhas1] of Object.entries(BALDEACOES)) {
    if (!linhas1.includes(linhaO)) continue;
    if (!redesMetro[linhaO].estacoes.includes(estBal1)) continue;

    for (const linhaM of linhas1) {
      if (linhaM === linhaO) continue;

      for (const [estBal2, linhas2] of Object.entries(BALDEACOES)) {
        if (estBal2 === estBal1) continue;
        if (!linhas2.includes(linhaM) || !linhas2.includes(linhaD)) continue;
        if (!redesMetro[linhaM].estacoes.includes(estBal1)) continue;
        if (!redesMetro[linhaM].estacoes.includes(estBal2)) continue;
        if (!redesMetro[linhaD].estacoes.includes(estBal2)) continue;

        const s1 = calcularRotaDireta(linhaO, estO, estBal1);
        const s2 = calcularRotaDireta(linhaM, estBal1, estBal2);
        const s3 = calcularRotaDireta(linhaD, estBal2, estD);
        if (!s1 || !s2 || !s3) continue;

        return montarRota({
          tipo: 'baldeacao2',
          linhas: [linhaO, linhaM, linhaD],
          estacoes: [...s1.estacoes, ...s2.estacoes.slice(1), ...s3.estacoes.slice(1)],
          origem: estO, destino: estD,
          paradas: s1.paradas + s2.paradas + s3.paradas,
          transferencias: [estBal1, estBal2], extra: PENALIDADE_2
        });
      }
    }
  }
  return null;
}

function calcularEstimativa(linhaO, estO, linhaD, estD) {
  const iO     = redesMetro[linhaO].estacoes.indexOf(estO);
  const iD     = redesMetro[linhaD].estacoes.indexOf(estD);
  const paradas = Math.max(iO, 0) + Math.max(iD, 0) + 5;

  return montarRota({
    tipo: 'estimada',
    linhas: [linhaO, linhaD],
    estacoes: [estO, '···', estD],
    origem: estO, destino: estD,
    paradas, transferencias: [], extra: 8
  });
}

function montarRota({ tipo, linhas, estacoes, origem, destino, paradas, transferencias, extra }) {
  const dist  = paradas * KM_POR_ESTACAO;
  const tempo = Math.round((dist / VELOCIDADE) * 60 + paradas * PAUSA_EST + extra);
  return { tipo, linhas, estacoes, origem, destino, paradas,
           distancia: dist.toFixed(1), tempo, transferencias, tarifa: TARIFA };
}

// ============================================================
// 15. EXIBIR ROTA NA INTERFACE
// ============================================================

function exibirRota(rota) {
  const painel = document.getElementById('journeyPanel');
  painel.style.display = 'block';
  painel.classList.remove('animated-in');
  void painel.offsetWidth;
  painel.classList.add('animated-in');

  // Linha(s)
  const linhaEl = document.getElementById('lineInfo');
  const corNeon = redesMetro[rota.linhas[0]].corNeon;

  if (rota.tipo === 'baldeacao') {
    linhaEl.textContent = `${rota.linhas[0].split(' - ')[1]} › BAL. ${rota.transferencias[0]} › ${rota.linhas[1].split(' - ')[1]}`;
  } else if (rota.tipo === 'baldeacao2') {
    const nomes = rota.linhas.map(l => l.split(' - ')[1]);
    linhaEl.textContent = nomes.join(' › ');
  } else {
    linhaEl.textContent = rota.linhas[0];
  }

  linhaEl.style.color      = corNeon;
  linhaEl.style.textShadow = `0 0 10px ${corNeon}`;

  document.getElementById('distanceInfo').textContent = `${rota.distancia} km`;
  document.getElementById('timeInfo').textContent     = `~${rota.tempo} min`;
  document.getElementById('stopsInfo').textContent    = `${rota.paradas} est.`;
  document.getElementById('fareDisplay').textContent  =
    `R$ ${rota.tarifa.toFixed(2).replace('.', ',')}`;

  // Dados em tempo real
  const lotacao  = calcularLotacao();
  const occText  = document.getElementById('occupancyText');
  const occFill  = document.getElementById('occFill');
  if (occText) { occText.textContent = lotacao.texto; occText.style.color = lotacao.cor; }
  if (occFill) { occFill.style.width = lotacao.pct + '%'; occFill.style.background = lotacao.cor; }

  const wagonEl = document.getElementById('wagonSuggest');
  if (wagonEl) wagonEl.textContent = sugerirVagao();

  atualizarContadorTrem();

  // Avisos de operação
  const aviso  = document.getElementById('opWarning');
  const minRest = Math.round((FUNCIONAMENTO.fim - horaDecimal()) * 60);
  if (aviso) {
    if (!estaFuncionando()) {
      aviso.style.display = 'block';
      aviso.textContent = '⚠ Sistema fora do horário de operação (04:40–00:00) · rota exibida para planejamento';
    } else {
      aviso.style.display = (minRest <= 60 && minRest > 0) ? 'block' : 'none';
    }
    if (estaFuncionando() && minRest <= 60 && minRest > 0)
      aviso.textContent = `⚠ Sistema encerra em ~${minRest} minutos`;
  }

  if (!estaFuncionando()) {
    const trem = document.getElementById('nextTrainDisplay');
    if (trem) {
      trem.textContent = 'Retorna às 04:40';
      trem.style.color = 'var(--neon-yellow)';
      trem.style.textShadow = '0 0 12px var(--neon-yellow)';
    }
  }

  renderizarRotaVisual(rota);
  painel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderizarRotaVisual(rota) {
  const c = document.getElementById('routeDisplay');
  c.innerHTML = '';
  c.className = 'route-display route-timeline';

  let lista = rota.estacoes.map((est, index) => ({ est, index }));
  if (lista.length > 16) {
    lista = [
      ...rota.estacoes.slice(0, 3).map((est, index) => ({ est, index })),
      { est: '···', index: -1 },
      ...rota.estacoes.slice(-3).map((est, offset) => ({
        est,
        index: rota.estacoes.length - 3 + offset
      }))
    ];
  }

  lista.forEach(({ est, index }, i) => {
    const step = document.createElement('span');

    if (est === '···') {
      step.className   = 'route-step route-gap';
      step.textContent = '···';
    } else {
      step.className   = 'route-step';
      step.style.setProperty('--step-delay', `${Math.min(i, 8) * 90}ms`);
      step.innerHTML = `<span class="route-node"></span><span class="route-label">${est}</span>`;
      if (est === rota.origem) step.classList.add('current');
      if (est === rota.destino) step.classList.add('destination');
      if (rota.transferencias && rota.transferencias.includes(est)) step.classList.add('transfer');
      if (index >= 0) step.title = `Parada ${index + 1} de ${rota.estacoes.length}`;
    }

    c.appendChild(step);
  });
}

// ============================================================
// 16. PAGAMENTO NFC — AGORA SALVA NO BANCO DE DADOS
// ============================================================

function pagarPassagem() {
  if (!rotaCalculada) { exibirAviso('Calcule uma rota antes de pagar!'); return; }

  if (!usuarioAtual) { exibirAviso('Faça login para pagar!'); return; }

  const { tarifa } = rotaCalculada;

  if (saldoAtual < tarifa) {
    mostrarStatusPagamento(false, tarifa);
    vibrar(VIBRACOES.erro);  // vibração de erro quando suportada
    return;
  }

  // Debita saldo
  saldoAtual = Math.round((saldoAtual - tarifa) * 100) / 100;

  // Atualiza dados do usuário no banco
  usuarioAtual.saldo       = saldoAtual;
  usuarioAtual.viagens     = (usuarioAtual.viagens || 0) + 1;
  usuarioAtual.totalGasto  = Math.round(((usuarioAtual.totalGasto || 0) + tarifa) * 100) / 100;
  usuarioAtual.linhaFavorita = rotaCalculada.linhas[0];
  DB.salvarUsuario(usuarioAtual);

  // Registra a viagem no histórico
  const agora = new Date();
  DB.adicionarViagem(usuarioAtual.email, {
    id:        Date.now().toString(),
    data:      agora.toLocaleDateString('pt-BR'),
    hora:      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    timestamp: agora.getTime(),
    origem:    rotaCalculada.origem,
    destino:   rotaCalculada.destino,
    linhas:    rotaCalculada.linhas,
    distancia: rotaCalculada.distancia,
    tempo:     rotaCalculada.tempo,
    valor:     tarifa
  });

  // Atualiza UI com nova viagem e novo saldo
  renderizarSaldo();
  renderizarHistorico();
  renderizarEstatisticas();
  mostrarStatusPagamento(true, tarifa);

  // Feedback háptico + notificação quando suportado
  vibrar(VIBRACOES.pagamento);
  if (rotaCalculada.tipo && rotaCalculada.tipo.includes('baldeacao')) {
    setTimeout(() => vibrar(VIBRACOES.baldeacao), 400);
    notificar('Baldeação necessária', `Troque para ${rotaCalculada.linhas[1].split(' - ')[1]} em ${rotaCalculada.transferencias[0]}`);
  } else {
    notificar('Embarque autorizado', `Próximo trem em ${Math.ceil(segundosProximoTrem(linhaAtiva)/60)} min — ${rotaCalculada.origem} → ${rotaCalculada.destino}`);
  }
}

function mostrarStatusPagamento(aprovado, valor) {
  const el   = document.getElementById('paymentStatus');
  const anel = document.getElementById('ringGlow');

  el.className = `payment-status ${aprovado ? 'success' : 'error'}`;

  if (aprovado) {
    el.innerHTML = `
      <div class="payment-icon">✓</div>
      <div class="payment-message" style="color:var(--neon-green)">PAGAMENTO APROVADO</div>
      <div class="payment-detail">Débito: R$ ${valor.toFixed(2).replace('.', ',')}</div>
      <div class="payment-detail">Saldo restante: R$ ${saldoAtual.toFixed(2).replace('.', ',')}</div>
      <div class="payment-detail" style="margin-top:12px;color:var(--neon-cyan);letter-spacing:2px">
        ◈ NFC SINCRONIZADO · VIAGEM SALVA ◈
      </div>
    `;
    if (anel) { anel.style.borderColor = 'var(--neon-green)'; anel.style.boxShadow = '0 0 50px var(--neon-green)'; }
  } else {
    el.innerHTML = `
      <div class="payment-icon" style="color:var(--neon-red)">✗</div>
      <div class="payment-message" style="color:var(--neon-red)">SALDO INSUFICIENTE</div>
      <div class="payment-detail">Saldo: R$ ${saldoAtual.toFixed(2).replace('.', ',')}</div>
      <div class="payment-detail">Necessário: R$ ${valor.toFixed(2).replace('.', ',')}</div>
      <div class="payment-detail" style="margin-top:12px;color:#ff6688">
        Toque em ↑ RECARREGAR na pulseira
      </div>
    `;
    if (anel) { anel.style.borderColor = 'var(--neon-red)'; anel.style.boxShadow = '0 0 50px var(--neon-red)'; }
  }

  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => {
      el.className = 'payment-status';
      if (anel) { anel.style.borderColor = ''; anel.style.boxShadow = ''; }
    }, 350);
  }, 3500);
}

// ============================================================
// 17. AVISO GENÉRICO
// ============================================================

function exibirAviso(mensagem) {
  const el     = document.getElementById('paymentStatus');
  el.className = 'payment-status error show';
  el.innerHTML = `
    <div class="payment-icon" style="color:var(--neon-gold)">⚠</div>
    <div class="payment-message" style="color:var(--neon-gold)">${mensagem}</div>
  `;
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => { el.className = 'payment-status'; }, 350);
  }, 2800);
}
