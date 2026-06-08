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
      "Butantã", "São Paulo-Morumbi", "Vila Sônia"
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
  // --- CPTM (Fase 2) ---
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

// ============================================================
// 3. CONSTANTES DO SISTEMA
// ============================================================

const TARIFA         = 4.40;
const KM_POR_ESTACAO = 1.2;
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
  atualizarPeakBar();
  verificarSessao();         // Fase 3: restaura sessão salva
  inicializarPWA();          // Fase 4: registra SW, detecta APIs, conexão
  inicializarPrototipo3D();  // Fase 5: ativa canvas legado se existir
  inicializarFasesAvancadas(); // Fases 6 e 7: holograma, RA, gesto e IA
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
// FASE 6 — HOLOGRAMA 3D, RA E GESTO DE PULSO
// ============================================================

let arSessionAtual = null;
let gestoPulsoAtivo = false;
let ultimoGestoPulso = 0;
let resultadoIAAtual = null;
let rotaSugeridaIA = null;

const holoFase6 = {
  scene: null,
  camera: null,
  renderer: null,
  group: null,
  texture: null,
  canvasText: null,
  ctxText: null,
  particles: null,
  active: false,
  started: false,

  init() {
    const canvas = document.getElementById('holo3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return false;

    const box = canvas.parentElement.getBoundingClientRect();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, box.width / box.height, 0.1, 100);
    this.camera.position.set(0, 1.4, 5.2);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(box.width, box.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.scene.add(new THREE.AmbientLight(0x66ccff, 0.6));
    const light = new THREE.PointLight(0x00f5ff, 2.2, 12);
    light.position.set(0, 2.6, 2.8);
    this.scene.add(light);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.01, 8, 96), ringMat);
    ring.rotation.x = Math.PI / 2;
    this.group.add(ring);

    this.canvasText = document.createElement('canvas');
    this.canvasText.width = 768;
    this.canvasText.height = 384;
    this.ctxText = this.canvasText.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvasText);

    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.85, 1.42),
      new THREE.MeshBasicMaterial({
        map: this.texture,
        transparent: true,
        side: THREE.DoubleSide
      })
    );
    panel.position.y = 0.35;
    this.group.add(panel);

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.92, 1.4, 5, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    cone.position.y = -0.45;
    cone.rotation.x = Math.PI;
    this.group.add(cone);

    const geom = new THREE.BufferGeometry();
    const pontos = new Float32Array(90);
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2;
      const r = 0.75 + Math.random() * 0.65;
      pontos[i * 3] = Math.cos(a) * r;
      pontos[i * 3 + 1] = -0.35 + Math.random() * 1.45;
      pontos[i * 3 + 2] = Math.sin(a) * r;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pontos, 3));
    this.particles = new THREE.Points(
      geom,
      new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 0.04,
        transparent: true,
        opacity: 0.72
      })
    );
    this.group.add(this.particles);

    this.group.visible = false;
    this.update();
    this.animate();
    window.addEventListener('resize', () => this.resize());
    return true;
  },

  resize() {
    const canvas = document.getElementById('holo3dCanvas');
    if (!canvas || !this.renderer || !this.camera) return;
    const box = canvas.parentElement.getBoundingClientRect();
    this.camera.aspect = box.width / box.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(box.width, box.height);
  },

  update() {
    if (!this.ctxText || !this.texture) return;
    const ctx = this.ctxText;
    const W = this.canvasText.width;
    const H = this.canvasText.height;
    const rota = rotaCalculada;
    const ia = resultadoIAAtual;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0, 18, 32, 0.72)';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(0,245,255,0.75)';
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, W - 24, H - 24);

    ctx.fillStyle = '#00f5ff';
    ctx.font = 'bold 28px Courier New';
    ctx.fillText('HOLOPASS // DISPLAY HOLOGRAFICO', 32, 54);

    ctx.font = 'bold 54px Courier New';
    ctx.fillStyle = '#00ff88';
    const saldo = usuarioAtual ? `R$ ${saldoAtual.toFixed(2).replace('.', ',')}` : 'LOGIN NECESSARIO';
    ctx.fillText(saldo, 32, 126);

    ctx.font = 'bold 30px Courier New';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(rota ? `${rota.origem}  ->  ${rota.destino}` : 'Selecione uma rota no painel principal', 32, 190);

    ctx.font = '24px Courier New';
    ctx.fillStyle = '#00f5ff';
    ctx.fillText(rota ? `Linha: ${rota.linhas.map(l => l.split(' - ')[1]).join(' > ')}` : 'Linha: --', 32, 238);
    ctx.fillText(rota ? `ETA: ${rota.tempo} min  |  Dist: ${rota.distancia} km` : 'ETA: --', 32, 278);

    ctx.fillStyle = '#ffd700';
    ctx.fillText(ia ? `IA: atraso ${ia.atrasoMin} min | lotacao ${ia.lotacaoTexto}` : 'IA: aguardando analise', 32, 322);

    this.texture.needsUpdate = true;
  },

  setActive(on) {
    this.active = on;
    if (this.group) this.group.visible = on;
    const status = document.getElementById('holoStatus');
    if (status) status.textContent = on
      ? 'Holograma ativo: dados da rota sincronizados.'
      : 'Holograma pronto: toque em ATIVAR HOLOGRAMA.';
    this.update();
  },

  animate() {
    if (this.started) return;
    this.started = true;
    const loop = () => {
      requestAnimationFrame(loop);
      if (this.group) {
        const t = Date.now() * 0.001;
        this.group.rotation.y = Math.sin(t * 0.6) * 0.12;
        this.group.position.y = Math.sin(t * 1.2) * 0.04;
      }
      if (this.particles) this.particles.rotation.y += 0.008;
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    loop();
  }
};

function inicializarFasesAvancadas() {
  const statusThree = document.getElementById('statusThree');
  const statusHolo = document.getElementById('holoStatus');

  if (typeof THREE === 'undefined') {
    if (statusThree) statusThree.textContent = 'Falhou CDN';
    if (statusHolo) statusHolo.textContent = 'Three.js não carregou. Verifique conexão.';
  } else {
    const ok = holoFase6.init();
    if (statusThree) statusThree.textContent = ok ? 'Ativo' : 'Sem canvas';
    if (statusHolo) statusHolo.textContent = ok
      ? 'Holograma pronto: toque em ATIVAR HOLOGRAMA.'
      : 'Canvas do holograma não encontrado.';
  }

  verificarWebXR();
  executarIA(false);
}

async function verificarWebXR() {
  const el = document.getElementById('statusWebXR');
  if (!el) return;

  if (!('xr' in navigator)) {
    el.textContent = 'Simulado';
    return;
  }

  try {
    const ok = await navigator.xr.isSessionSupported('immersive-ar');
    el.textContent = ok ? 'AR real disponível' : 'Simulado';
  } catch (erro) {
    el.textContent = 'Simulado';
  }
}

function ativarHolograma3D() {
  if (!holoFase6.scene) {
    exibirAviso('Holograma 3D ainda não está disponível.');
    return;
  }
  holoFase6.setActive(!holoFase6.active);
  vibrar(VIBRACOES.notificacao);
}

async function iniciarRA() {
  preencherOverlayRA();

  if ('xr' in navigator) {
    try {
      const ok = await navigator.xr.isSessionSupported('immersive-ar');
      if (ok) {
        arSessionAtual = await navigator.xr.requestSession('immersive-ar', {
          optionalFeatures: ['dom-overlay'],
          domOverlay: { root: document.body }
        });
        document.getElementById('statusWebXR').textContent = 'Sessão AR ativa';
      }
    } catch (erro) {
      document.getElementById('statusWebXR').textContent = 'RA simulada';
    }
  }

  document.getElementById('arOverlay').style.display = 'block';
  vibrar(VIBRACOES.notificacao);
}

function preencherOverlayRA() {
  const linha = document.getElementById('arLine');
  const rota = document.getElementById('arRoute');
  const eta = document.getElementById('arEta');

  if (!rotaCalculada) {
    if (linha) linha.textContent = 'Linha: --';
    if (rota) rota.textContent = 'Calcule uma rota para visualizar em RA.';
    if (eta) eta.textContent = 'ETA: --';
    return;
  }

  if (linha) linha.textContent = `Linha: ${rotaCalculada.linhas.map(l => l.split(' - ')[1]).join(' > ')}`;
  if (rota) rota.textContent = `${rotaCalculada.origem} -> ${rotaCalculada.destino}`;
  if (eta) eta.textContent = `ETA: ${rotaCalculada.tempo} min | Próximo trem: ${Math.ceil(segundosProximoTrem(linhaAtiva) / 60)} min`;
}

function fecharRA() {
  const overlay = document.getElementById('arOverlay');
  if (overlay) overlay.style.display = 'none';

  if (arSessionAtual) {
    arSessionAtual.end().catch(() => {});
    arSessionAtual = null;
  }
}

async function ativarGestosPulso() {
  const status = document.getElementById('statusGesture');
  if (gestoPulsoAtivo) {
    if (status) status.textContent = 'Já ativo';
    return;
  }

  if (!('DeviceMotionEvent' in window)) {
    if (status) status.textContent = 'Simulação';
    exibirAviso('Sensor indisponível neste aparelho. Use SIMULAR PULSO.');
    return;
  }

  try {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      const permissao = await DeviceMotionEvent.requestPermission();
      if (permissao !== 'granted') {
        if (status) status.textContent = 'Negado';
        return;
      }
    }

    window.addEventListener('devicemotion', detectarMovimentoPulso);
    gestoPulsoAtivo = true;
    if (status) status.textContent = 'Ativo';
    exibirAviso('Gesto ativado: levante o pulso para abrir o display.');
  } catch (erro) {
    if (status) status.textContent = 'Simulação';
    exibirAviso('Não foi possível ativar sensor. Use SIMULAR PULSO.');
  }
}

function detectarMovimentoPulso(evento) {
  const acc = evento.accelerationIncludingGravity;
  if (!acc) return;

  const intensidade = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
  const agora = Date.now();

  if (intensidade > 18 && agora - ultimoGestoPulso > 2500) {
    registrarGestoPulso(false);
  }
}

function simularLevantarPulso() {
  registrarGestoPulso(true);
}

function registrarGestoPulso(simulado) {
  ultimoGestoPulso = Date.now();
  const status = document.getElementById('statusGesture');
  if (status) status.textContent = simulado ? 'Simulado' : 'Detectado';

  if (holoFase6.scene) holoFase6.setActive(true);
  executarIA(false);
  vibrar(VIBRACOES.notificacao);
  exibirAviso(simulado ? 'Pulso levantado: display ativado.' : 'Gesto detectado: display ativado.');
}

// ============================================================
// FASE 7 — IA DE ATRASOS, LOTAÇÃO, ROTAS E PADRÕES
// ============================================================

function climaSimulado() {
  const h = new Date().getHours();
  const m = new Date().getMinutes();
  const chuvoso = (h >= 16 && h <= 20) || m % 13 < 3;
  return chuvoso
    ? { nome: 'chuva moderada', fator: 14 }
    : { nome: 'tempo estável', fator: 3 };
}

function pesoLinhaIA(nomeLinha) {
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

function mediaLinhaIA(linhas) {
  return linhas.reduce((soma, linha) => soma + pesoLinhaIA(linha), 0) / Math.max(linhas.length, 1);
}

function riscoPorPeriodoIA() {
  const p = periodoAtual();
  if (p === 'pico') return 30;
  if (p === 'normal') return 14;
  return 6;
}

function calcularRiscoRotaIA(rota) {
  const clima = climaSimulado();
  const pesoLinha = mediaLinhaIA(rota.linhas);
  const baldeacao = (rota.transferencias?.length || 0) * 7;
  const paradas = Math.min(18, rota.paradas * 0.9);
  const risco = Math.min(96, Math.round(riscoPorPeriodoIA() + clima.fator + pesoLinha + baldeacao + paradas));
  const lotacao = Math.min(98, Math.round(calcularLotacao().pct * 0.55 + pesoLinha * 2 + baldeacao));
  return { risco, lotacao, clima };
}

function textoLotacaoIA(valor) {
  if (valor >= 76) return 'ALTA';
  if (valor >= 46) return 'MÉDIA';
  return 'BAIXA';
}

function pontuarRotaIA(rota) {
  const risco = calcularRiscoRotaIA(rota);
  return Number(rota.tempo) + risco.risco * 0.12 + risco.lotacao * 0.18 + (rota.transferencias?.length || 0) * 3;
}

function coletarRotasCandidatasIA(linhaO, estO, linhaD, estD, rotaBase) {
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
      tipo: 'baldeacao-ia',
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

function detectarPadraoUsuarioIA() {
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

function executarIA(mostrarAviso = true) {
  const delayText = document.getElementById('aiDelayRisk');
  const crowdText = document.getElementById('aiCrowdRisk');
  const routeText = document.getElementById('aiRouteSuggestion');
  const patternText = document.getElementById('aiPattern');
  const delayBar = document.getElementById('aiDelayBar');
  const crowdBar = document.getElementById('aiCrowdBar');

  if (!rotaCalculada) {
    if (delayText) delayText.textContent = '--';
    if (crowdText) crowdText.textContent = '--';
    if (routeText) routeText.textContent = 'Calcule uma rota para a IA analisar.';
    if (patternText) patternText.textContent = detectarPadraoUsuarioIA();
    if (delayBar) delayBar.style.width = '0%';
    if (crowdBar) crowdBar.style.width = '0%';
    return;
  }

  const risco = calcularRiscoRotaIA(rotaCalculada);
  const atrasoMin = Math.max(1, Math.round(risco.risco / 14));

  const origemVal = document.getElementById('currentStation').value;
  const destinoVal = document.getElementById('destination').value;
  let melhor = rotaCalculada;

  if (origemVal && destinoVal) {
    const [linhaO, estO] = origemVal.split('|');
    const [linhaD, estD] = destinoVal.split('|');
    const candidatas = coletarRotasCandidatasIA(linhaO, estO, linhaD, estD, rotaCalculada);
    melhor = candidatas.sort((a, b) => pontuarRotaIA(a) - pontuarRotaIA(b))[0] || rotaCalculada;
  }

  rotaSugeridaIA = melhor;
  resultadoIAAtual = {
    risco: risco.risco,
    lotacao: risco.lotacao,
    lotacaoTexto: textoLotacaoIA(risco.lotacao),
    atrasoMin,
    clima: risco.clima.nome,
    rota: melhor
  };

  if (delayText) delayText.textContent = `${risco.risco}% (~${atrasoMin} min)`;
  if (crowdText) crowdText.textContent = `${textoLotacaoIA(risco.lotacao)} · ${risco.lotacao}%`;
  if (delayBar) delayBar.style.width = `${risco.risco}%`;
  if (crowdBar) crowdBar.style.width = `${risco.lotacao}%`;

  const rotaDiferente = melhor !== rotaCalculada;
  if (routeText) {
    routeText.textContent = rotaDiferente
      ? `${melhor.linhas.map(l => l.split(' - ')[1]).join(' > ')} · ${melhor.tempo} min · menor lotação prevista`
      : `Rota atual recomendada · ${melhor.tempo} min · clima: ${risco.clima.nome}`;
  }
  if (patternText) patternText.textContent = detectarPadraoUsuarioIA();

  holoFase6.update();
  preencherOverlayRA();

  if (mostrarAviso) exibirAviso('IA atualizada com previsão de atraso, lotação e rota.');
}

function aplicarRotaIA() {
  if (!rotaSugeridaIA) {
    executarIA(false);
  }

  if (!rotaSugeridaIA) {
    exibirAviso('Calcule uma rota antes de aplicar IA.');
    return;
  }

  rotaCalculada = rotaSugeridaIA;
  linhaAtiva = rotaCalculada.linhas[0];
  exibirRota(rotaCalculada);
  executarIA(false);
  exibirAviso('Rota inteligente aplicada ao painel.');
}

// ============================================================
// FASE 5 — PROTÓTIPO 3D COM THREE.JS
// ============================================================
//
// Renderiza a pulseira HoloPass em 3D dentro do canvas.
// Componentes modelados:
//   1. Banda de couro trançado (torus + textura procedural)
//   2. Módulo central metálico (caixa com bordas de neon)
//   3. Fecho magnético inox (2 cilindros na parte de trás)
//   4. Display AMOLED no topo do módulo (canvas dinâmico)
//   5. Projeção holográfica (cone + sprites + partículas)
//
// O usuário pode:
//   - Arrastar para girar (OrbitControls)
//   - Scroll para zoom
//   - Trocar a cor do couro
//   - Ligar/desligar holograma
//   - Resetar a visão
// ============================================================

const proto3D = {
  scene: null, camera: null, renderer: null, controls: null,
  // Componentes do device
  bracelet: null, braceletTop: null, braceletBottom: null,
  couroMateriais: null,
  modulo: null, vidro: null, botaoLateral: null, ledStatus: null, nfcLabel: null,
  fecho: null, fechoBase: null,
  display: null, displayCanvas: null, displayCtx: null, displayTexture: null,
  // Contexto: pulso humano
  pulso: null,
  // Holograma (opcional / premium)
  hologramGroup: null, particulas: null,
  // Estado
  autoRotate: false, showHologram: false, showPulso: true,
  ultimaAtualizacaoDisplay: 0,

  // -- INICIALIZAÇÃO --
  init() {
    if (typeof THREE === 'undefined') return false;

    const canvas  = document.getElementById('proto3dCanvas');
    if (!canvas) return false;

    const wrapper = canvas.parentElement;
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    // Cena
    this.scene = new THREE.Scene();

    // Câmera (ângulo de "smartwatch no pulso visto de cima e do lado")
    this.camera = new THREE.PerspectiveCamera(39, w / h, 0.1, 100);
    this.camera.position.set(2.35, 4.9, 7.8);
    this.camera.lookAt(0, 0.25, 0);

    // Renderer com fundo transparente (mostra o background CSS)
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    // -- ILUMINAÇÃO --
    // Luz ambiente fraca (não deixa nada totalmente escuro)
    this.scene.add(new THREE.AmbientLight(0x556677, 0.6));

    // Luz principal direcional (sol artificial)
    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1.0);
    luzPrincipal.position.set(5, 10, 7);
    this.scene.add(luzPrincipal);

    // Luz secundária branca do outro lado (preenchimento)
    const luzFill = new THREE.DirectionalLight(0xffffff, 0.4);
    luzFill.position.set(-5, 3, -5);
    this.scene.add(luzFill);

    // Luz de borda ciano (dá o "feel" holográfico)
    const luzRim = new THREE.PointLight(0x00f5ff, 2.5, 18);
    luzRim.position.set(-3, 2, -2);
    this.scene.add(luzRim);

    // Luz roxa do outro lado (cria contraste interessante)
    const luzPurple = new THREE.PointLight(0xbf00ff, 1.2, 15);
    luzPurple.position.set(4, 1, -3);
    this.scene.add(luzPurple);

    // -- CONSTRUÇÃO DOS COMPONENTES --
    // Ordem importante: pulso primeiro (no fundo), depois device em cima
    this.construirPulso();        // Pulso humano semi-transparente (contexto)
    this.construirPulseira();     // Banda de couro com abertura para o módulo
    this.construirFecho();        // Fecho magnético visível atrás
    this.construirModulo();       // Smartwatch (caixa metálica)
    this.construirBotaoLateral(); // Botão tipo coroa do Apple Watch
    this.construirLedStatus();    // LED verde de status
    this.construirNfcLabel();     // Indicador "NFC" lateral
    this.construirDisplay();      // Tela AMOLED com UI completa
    this.construirVidro();        // Vidro glossy reflexivo sobre a tela
    this.construirHolograma();    // Holograma opcional (começa desligado)

    // -- CONTROLES DE ÓRBITA (arrastar/scroll) --
    if (THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, canvas);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.08;
      this.controls.target.set(0, 0.25, 0);
      this.controls.minDistance   = 5;
      this.controls.maxDistance   = 18;
      this.controls.maxPolarAngle = Math.PI * 0.85;  // não vira de cabeça pra baixo
      this.controls.saveState();
    }

    // Redimensionamento responsivo
    window.addEventListener('resize', () => this.onResize());

    // Inicia loop de animação
    this.animate();
    return true;
  },

  // -- 0. PULSO HUMANO (contexto/escala) --
  construirPulso() {
    // Cilindro semi-transparente representando o braço
    const geo = new THREE.CylinderGeometry(1.45, 1.45, 4.0, 32);
    const mat = new THREE.MeshStandardMaterial({
      color:       0xd4a883,
      transparent: true,
      opacity:     0.18,
      roughness:   0.9
    });
    this.pulso = new THREE.Mesh(geo, mat);
    this.pulso.rotation.z = Math.PI / 2;  // deita horizontalmente (braço estendido)
    this.scene.add(this.pulso);
  },

  // -- 1. PULSEIRA DE COURO COM ABERTURA PARA MÓDULO EMBUTIDO --
  construirPulseira() {
    const raioPulso   = 1.72;
    const largura     = 1.06;  // largura confortável: mais smartband, menos bracelete largo
    const espessura   = 0.14;
    const aberturaTop = 0.20;  // abertura justa para o berço do módulo
    const arcos = [
      [ aberturaTop,  Math.PI * 0.96],
      [-Math.PI * 0.96, -aberturaTop]
    ];

    const tex = this.criarTexturaCouro();
    const couroMat = new THREE.MeshStandardMaterial({
      color:      0x8b6f47,
      roughness:  0.86,
      metalness:  0.04,
      map:        tex,
      bumpMap:    tex,
      bumpScale:  0.035,
      side:       THREE.DoubleSide
    });

    const couroInternoMat = couroMat.clone();
    couroInternoMat.color = new THREE.Color(0x3a2818);
    couroInternoMat.roughness = 0.95;

    const bordaMat = couroMat.clone();
    bordaMat.color = new THREE.Color(0x4f341d);

    const costuraMat = new THREE.MeshStandardMaterial({
      color: 0xd2b183,
      roughness: 0.72,
      metalness: 0.02
    });

    this.couroMateriais = [couroMat, couroInternoMat, bordaMat];
    this.bracelet = new THREE.Group();

    const criarSuperficie = (inicio, fim, raio, material) => {
      const geo = new THREE.PlaneGeometry(1, 1, 96, 6);
      const pos = geo.attributes.position;
      const uv  = geo.attributes.uv;

      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i) + 0.5;
        const v = pos.getY(i) + 0.5;
        const a = inicio + u * (fim - inicio);
        const x = (v - 0.5) * largura;
        const y = Math.cos(a) * raio;
        const z = Math.sin(a) * raio;

        pos.setXYZ(i, x, y, z);
        uv.setXY(i, u * 4, v);
      }

      pos.needsUpdate = true;
      uv.needsUpdate = true;
      geo.computeVertexNormals();
      return new THREE.Mesh(geo, material);
    };

    const criarBordaLateral = (inicio, fim, ladoX) => {
      const geo = new THREE.PlaneGeometry(1, 1, 96, 1);
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i) + 0.5;
        const v = pos.getY(i) + 0.5;
        const a = inicio + u * (fim - inicio);
        const raio = raioPulso - v * espessura;

        pos.setXYZ(
          i,
          ladoX * largura / 2,
          Math.cos(a) * raio,
          Math.sin(a) * raio
        );
      }

      pos.needsUpdate = true;
      geo.computeVertexNormals();
      return new THREE.Mesh(geo, bordaMat);
    };

    const criarCostura = (inicio, fim, ladoX) => {
      const pontos = [];
      for (let i = 0; i <= 80; i++) {
        const u = i / 80;
        const a = inicio + u * (fim - inicio);
        pontos.push(new THREE.Vector3(
          ladoX * (largura / 2 - 0.055),
          Math.cos(a) * (raioPulso + 0.01),
          Math.sin(a) * (raioPulso + 0.01)
        ));
      }

      const curva = new THREE.CatmullRomCurve3(pontos);
      const geo = new THREE.TubeGeometry(curva, 90, 0.012, 6, false);
      return new THREE.Mesh(geo, costuraMat);
    };

    arcos.forEach(([inicio, fim]) => {
      this.bracelet.add(criarSuperficie(inicio, fim, raioPulso, couroMat));
      this.bracelet.add(criarSuperficie(inicio, fim, raioPulso - espessura, couroInternoMat));
      this.bracelet.add(criarBordaLateral(inicio, fim,  1));
      this.bracelet.add(criarBordaLateral(inicio, fim, -1));
      this.bracelet.add(criarCostura(inicio, fim,  1));
      this.bracelet.add(criarCostura(inicio, fim, -1));
    });

    // Acabamento arredondado nos cortes onde o módulo entra.
    [aberturaTop, -aberturaTop].forEach(angulo => {
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.052, 0.052, largura, 16),
        bordaMat
      );
      cap.rotation.z = Math.PI / 2;
      cap.position.set(
        0,
        Math.cos(angulo) * (raioPulso - espessura / 2),
        Math.sin(angulo) * (raioPulso - espessura / 2)
      );
      this.bracelet.add(cap);
    });

    // Base de couro sob o berço metálico, para mostrar que o módulo não está solto.
    const baseCouro = new THREE.Mesh(
      new THREE.BoxGeometry(1.12, 0.08, 0.48),
      bordaMat
    );
    baseCouro.position.set(0, 1.64, 0);
    this.bracelet.add(baseCouro);

    this.scene.add(this.bracelet);
  },

  // Gera uma textura procedural que parece couro trançado
  criarTexturaCouro() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 128;
    const ctx = c.getContext('2d');

    // Gradiente de fundo (claro no centro, escuro nas bordas)
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0,   '#5a4530');
    grad.addColorStop(0.5, '#a08060');
    grad.addColorStop(1,   '#5a4530');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 128);

    // Padrão de trançado: linhas diagonais alternadas
    const passo = 24;
    ctx.strokeStyle = 'rgba(20, 10, 5, 0.55)';
    ctx.lineWidth   = 4;

    for (let x = -passo; x < 512 + passo; x += passo / 2) {
      const subindo = Math.floor((x + passo) / (passo / 2)) % 2 === 0;
      ctx.beginPath();
      ctx.moveTo(x, subindo ? 128 : 0);
      ctx.lineTo(x + passo, subindo ? 0 : 128);
      ctx.stroke();
    }

    // Brilhos sutis (reflexos do couro)
    ctx.strokeStyle = 'rgba(220, 180, 130, 0.25)';
    ctx.lineWidth   = 1.5;
    for (let x = -passo; x < 512 + passo; x += passo / 2) {
      const subindo = Math.floor((x + passo) / (passo / 2)) % 2 === 0;
      ctx.beginPath();
      ctx.moveTo(x + 3, subindo ? 125 : 3);
      ctx.lineTo(x + passo + 3, subindo ? 3 : 125);
      ctx.stroke();
    }

    // Ruído sutil (textura orgânica)
    for (let i = 0; i < 2000; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * 512, Math.random() * 128, 1, 1);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(20, 1);  // repete em volta da pulseira
    return tex;
  },

  // -- 2. MÓDULO HORIZONTAL EMBUTIDO NA PULSEIRA --
  // Formato pastilha: berço metálico + corpo eletrônico + vidro.
  construirModulo() {
    const bercoMat = new THREE.MeshStandardMaterial({
      color:     0x2b2e36,
      roughness: 0.42,
      metalness: 0.88
    });

    const corpoMat = new THREE.MeshStandardMaterial({
      color:     0x0a0a0f,   // preto profundo
      roughness: 0.32,
      metalness: 0.65
    });

    this.modulo = new THREE.Group();

    // Berço metálico: é a peça que prende o módulo ao couro.
    const berco = new THREE.Mesh(
      new THREE.BoxGeometry(1.48, 0.12, 0.64),
      bercoMat
    );
    berco.position.y = -0.055;
    this.modulo.add(berco);

    // Corpo principal: chato, horizontal e parcialmente encaixado no berço.
    const corpo = new THREE.Mesh(
      new THREE.BoxGeometry(1.24, 0.22, 0.46),
      corpoMat
    );
    corpo.position.y = 0.035;

    // Tampas laterais arredondadas: deixam o módulo com cara de cápsula.
    const tampaGeo = new THREE.SphereGeometry(0.22, 24, 16);
    const tampaEsq = new THREE.Mesh(tampaGeo, corpoMat);
    tampaEsq.scale.set(0.46, 0.44, 0.92);
    tampaEsq.position.set(-0.60, 0.035, 0);
    const tampaDir = new THREE.Mesh(tampaGeo, corpoMat);
    tampaDir.scale.set(0.46, 0.44, 0.92);
    tampaDir.position.set(0.60, 0.035, 0);

    this.modulo.add(corpo);
    this.modulo.add(tampaEsq);
    this.modulo.add(tampaDir);

    // Trilhos laterais protegem o vidro e ajudam a vender a ideia de encaixe.
    const trilhoMat = new THREE.MeshStandardMaterial({
      color:     0x111823,
      roughness: 0.24,
      metalness: 0.9
    });
    [-0.31, 0.31].forEach(z => {
      const trilho = new THREE.Mesh(
        new THREE.BoxGeometry(1.24, 0.045, 0.035),
        trilhoMat
      );
      trilho.position.set(0, 0.14, z);
      this.modulo.add(trilho);
    });

    // Microparafusos no berço: detalhe simples para explicar a fixação.
    const parafusoMat = new THREE.MeshStandardMaterial({
      color: 0xb8bec8,
      roughness: 0.18,
      metalness: 0.95
    });
    [-0.58, 0.58].forEach(x => {
      [-0.24, 0.24].forEach(z => {
        const parafuso = new THREE.Mesh(
          new THREE.CylinderGeometry(0.026, 0.026, 0.014, 18),
          parafusoMat
        );
        parafuso.position.set(x, 0.145, z);
        this.modulo.add(parafuso);
      });
    });

    // Posiciona o conjunto embutido no topo da pulseira.
    this.modulo.position.set(0, 1.74, 0);
    this.scene.add(this.modulo);
  },

  // -- 3. FECHO MAGNÉTICO (parte de baixo, oposto ao módulo) --
  construirFecho() {
    // Base do fecho — formato achatado tipo botão de pressão
    const baseGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.18, 24);
    const baseMat = new THREE.MeshStandardMaterial({
      color:     0xb8b8c0,
      roughness: 0.18,
      metalness: 0.95
    });
    this.fecho = new THREE.Mesh(baseGeo, baseMat);
    this.fecho.position.set(0, -1.86, 0);
    this.scene.add(this.fecho);

    // Anel decorativo no fecho
    const anelGeo = new THREE.TorusGeometry(0.28, 0.025, 8, 32);
    const anelMat = new THREE.MeshStandardMaterial({
      color: 0x707080, roughness: 0.2, metalness: 0.95
    });
    const anel = new THREE.Mesh(anelGeo, anelMat);
    anel.position.copy(this.fecho.position);
    anel.position.y += 0.09;
    anel.rotation.x = Math.PI / 2;
    this.scene.add(anel);
  },

  // -- 2.1 TAMBÉM CONSIDERAR como "botão" (versão Mi Band) --
  construirBotaoLateral() {
    // Mi Band não tem botão lateral — usa toque na tela.
    // Aqui ficou vazio propositalmente. Função existe só para
    // compatibilidade com o init() que chama construirBotaoLateral().
  },

  // -- 6. LED DE STATUS (verde, abaixo do módulo, lado do pulso) --
  construirLedStatus() {
    const geo = new THREE.SphereGeometry(0.04, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    this.ledStatus = new THREE.Mesh(geo, mat);
    // Embaixo do módulo (face traseira, perto do pulso)
    this.ledStatus.position.set(0.42, 1.62, 0);
    this.scene.add(this.ledStatus);

    // Pequeno glow do LED
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88, transparent: true, opacity: 0.35
    });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), glowMat);
    glow.position.copy(this.ledStatus.position);
    this.scene.add(glow);
  },

  // -- 7. INDICADOR NFC (texto na lateral direita do módulo horizontal) --
  construirNfcLabel() {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(0,245,255,0.9)';
    ctx.font = 'bold 28px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 8;
    ctx.fillText('◈ NFC', 64, 32);

    this.nfcLabel = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(c),
      transparent: true,
      opacity: 0.9
    }));
    this.nfcLabel.scale.set(0.28, 0.14, 1);
    // Pendurado abaixo do módulo, lado direito (para indicar zona de aproximação)
    this.nfcLabel.position.set(0.84, 1.62, 0);
    this.scene.add(this.nfcLabel);
  },

  // -- 4. DISPLAY AMOLED LANDSCAPE (horizontal, embutido na pulseira) --
  construirDisplay() {
    // Canvas em formato paisagem (horizontal)
    this.displayCanvas = document.createElement('canvas');
    this.displayCanvas.width  = 480;   // largura
    this.displayCanvas.height = 200;   // altura (proporção 2.4:1)
    this.displayCtx = this.displayCanvas.getContext('2d');

    this.displayTexture = new THREE.CanvasTexture(this.displayCanvas);

    // Plano horizontal, NO TOPO do módulo (face voltada para cima)
    // Quando o usuário levanta o pulso, o display fica visível
    const geo = new THREE.PlaneGeometry(1.08, 0.36);
    const mat = new THREE.MeshBasicMaterial({
      map:         this.displayTexture,
      transparent: true
    });
    this.display = new THREE.Mesh(geo, mat);
    this.display.position.set(0, 1.89, 0);  // acima do corpo metálico, como AMOLED real
    this.display.rotation.x = -Math.PI / 2;  // face voltada para cima (+Y)
    this.scene.add(this.display);

    this.atualizarDisplay();
  },

  // -- 5. VIDRO GLOSSY sobre o display --
  construirVidro() {
    const geo = new THREE.PlaneGeometry(1.16, 0.40);
    const mat = new THREE.MeshPhysicalMaterial({
      color:        0xffffff,
      roughness:    0.05,
      metalness:    0,
      transmission: 0.92,
      transparent:  true,
      opacity:      0.16,
      clearcoat:    1.0,
      clearcoatRoughness: 0.02
    });
    this.vidro = new THREE.Mesh(geo, mat);
    this.vidro.position.set(0, 1.902, 0);  // 1mm acima do display
    this.vidro.rotation.x = -Math.PI / 2;
    this.scene.add(this.vidro);
  },

  // Redesenha o display com UI horizontal (chamado a cada ~500ms)
  atualizarDisplay() {
    const ctx = this.displayCtx;
    const W = 480, H = 200;

    // Fundo preto profundo (AMOLED)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);

    // ---- TOP BAR (NFC | Relógio | Bateria) ----
    // NFC à esquerda
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0, 245, 255, 0.85)';
    ctx.font = 'bold 18px Courier New';
    ctx.fillText('◈ NFC', 14, 22);

    // Relógio no centro
    const hora = new Date();
    const hh   = String(hora.getHours()).padStart(2, '0');
    const mm   = String(hora.getMinutes()).padStart(2, '0');
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font      = 'bold 20px Courier New';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur  = 6;
    ctx.fillText(`${hh}:${mm}`, W / 2, 22);
    ctx.shadowBlur = 0;

    // Bateria à direita
    ctx.textAlign = 'right';
    ctx.fillStyle = '#00ff88';
    ctx.font      = 'bold 18px Courier New';
    ctx.fillText('⚡67%', W - 14, 22);

    // Linha divisória top
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.18)';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(20, 40); ctx.lineTo(W - 20, 40); ctx.stroke();

    // ---- SALDO (linha principal, dominante) ----
    const saldo = (typeof saldoAtual !== 'undefined' && saldoAtual > 0)
      ? `R$ ${saldoAtual.toFixed(2).replace('.', ',')}`
      : 'R$ 45,50';

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0, 245, 255, 0.6)';
    ctx.font      = '13px Courier New';
    ctx.fillText('SALDO HOLOPASS', W / 2, 60);

    ctx.fillStyle   = '#00ff88';
    ctx.font        = 'bold 56px Courier New';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur  = 22;
    ctx.fillText(saldo, W / 2, 105);
    ctx.shadowBlur  = 0;

    // Linha divisória inferior
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.18)';
    ctx.beginPath(); ctx.moveTo(60, 140); ctx.lineTo(W - 60, 140); ctx.stroke();

    // ---- PRÓXIMA VIAGEM (rodapé compacto, 1 linha) ----
    let origem = 'Sé', destino = 'Tatuapé', tempo = '12';
    if (typeof rotaCalculada !== 'undefined' && rotaCalculada) {
      origem  = rotaCalculada.origem.slice(0, 12);
      destino = rotaCalculada.destino.slice(0, 12);
      tempo   = String(rotaCalculada.tempo);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font      = 'bold 16px Courier New';
    ctx.fillText(`${origem} → ${destino}`, W / 2, 165);

    ctx.fillStyle   = '#ffaa00';
    ctx.font        = 'bold 17px Courier New';
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur  = 6;
    ctx.fillText(`~${tempo} min`, W / 2, 188);
    ctx.shadowBlur = 0;

    this.displayTexture.needsUpdate = true;
  },

  // -- 8. PROJEÇÃO HOLOGRÁFICA OPCIONAL (extra premium, começa desligada) --
  construirHolograma() {
    this.hologramGroup = new THREE.Group();
    // Posiciona o grupo ACIMA do display do módulo
    this.hologramGroup.position.set(0, 2.22, 0);

    // Cone de luz subindo do topo do device (mais discreto agora)
    const coneGeo = new THREE.ConeGeometry(0.45, 1.0, 6, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color:       0x00f5ff,
      transparent: true,
      opacity:     0.14,
      side:        THREE.DoubleSide,
      depthWrite:  false
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.y = 0.5;
    cone.rotation.x = Math.PI;  // base larga em cima
    this.hologramGroup.add(cone);

    // Logo ◈ flutuante no topo
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 256; logoCanvas.height = 256;
    const lctx = logoCanvas.getContext('2d');
    lctx.fillStyle    = '#00f5ff';
    lctx.font         = 'bold 200px Arial';
    lctx.textAlign    = 'center';
    lctx.textBaseline = 'middle';
    lctx.shadowColor  = '#00f5ff';
    lctx.shadowBlur   = 40;
    lctx.fillText('◈', 128, 128);

    const logoSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map:         new THREE.CanvasTexture(logoCanvas),
      transparent: true,
      opacity:     0.9
    }));
    logoSprite.scale.set(0.7, 0.7, 0.7);
    logoSprite.position.y = 1.4;
    this.hologramGroup.add(logoSprite);

    // Texto "HOLOPASS" abaixo do logo
    const txtCanvas = document.createElement('canvas');
    txtCanvas.width = 512; txtCanvas.height = 128;
    const tctx = txtCanvas.getContext('2d');
    tctx.fillStyle   = '#00f5ff';
    tctx.font        = 'bold 64px Courier New';
    tctx.textAlign   = 'center';
    tctx.shadowColor = '#00f5ff';
    tctx.shadowBlur  = 20;
    tctx.fillText('HOLOPASS', 256, 80);

    const txtSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map:         new THREE.CanvasTexture(txtCanvas),
      transparent: true,
      opacity:     0.75
    }));
    txtSprite.scale.set(1.4, 0.35, 1);
    txtSprite.position.y = 0.85;
    this.hologramGroup.add(txtSprite);

    // Partículas ao redor (mais discretas)
    const N    = 25;
    const geom = new THREE.BufferGeometry();
    const pos  = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2;
      const r   = 0.3 + Math.random() * 0.3;
      pos[i*3]   = Math.cos(ang) * r;
      pos[i*3+1] = Math.random() * 1.2;
      pos[i*3+2] = Math.sin(ang) * r;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    this.particulas = new THREE.Points(geom, new THREE.PointsMaterial({
      color:       0x00f5ff,
      size:        0.035,
      transparent: true,
      opacity:     0.6,
      sizeAttenuation: true
    }));
    this.hologramGroup.add(this.particulas);

    // Começa OCULTO — holograma é opcional (extra premium)
    this.hologramGroup.visible = false;

    this.scene.add(this.hologramGroup);
  },

  // -- API PÚBLICA --
  setCorCouro(hex) {
    if (this.couroMateriais) {
      this.couroMateriais.forEach((mat, index) => {
        const fator = index === 1 ? 0.55 : index === 2 ? 0.75 : 1;
        const cor = new THREE.Color(hex);
        cor.multiplyScalar(fator);
        mat.color.copy(cor);
      });
    }
  },

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    return this.autoRotate;
  },

  toggleHologram() {
    this.showHologram = !this.showHologram;
    this.hologramGroup.visible = this.showHologram;
    return this.showHologram;
  },

  togglePulso() {
    this.showPulso = !this.showPulso;
    if (this.pulso) this.pulso.visible = this.showPulso;
    return this.showPulso;
  },

  resetView() {
    this.camera.position.set(2.35, 4.9, 7.8);
    this.camera.lookAt(0, 0.25, 0);
    if (this.controls) {
      this.controls.target.set(0, 0.25, 0);
      this.controls.update();
      this.controls.saveState();
    }
  },

  onResize() {
    const canvas = document.getElementById('proto3dCanvas');
    if (!canvas) return;
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  },

  // -- LOOP DE ANIMAÇÃO --
  animate() {
    requestAnimationFrame(() => this.animate());

    // Auto-rotação: gira TODA a cena em volta do eixo X (pulso)
    // assim mantém o conjunto pulso+pulseira+módulo coerente
    if (this.autoRotate && this.scene) {
      const rot = 0.005;
      this.scene.rotation.x += rot;
    }

    // Holograma: pulsação + rotação interna das partículas
    if (this.hologramGroup && this.showHologram) {
      this.particulas.rotation.y -= 0.012;
      const pulse = Math.sin(Date.now() * 0.0022) * 0.05;
      this.hologramGroup.children[0].material.opacity = 0.14 + pulse;
    }

    if (this.controls) this.controls.update();

    // Atualiza display canvas a cada ~500ms (não precisa ser todo frame)
    if (Date.now() - this.ultimaAtualizacaoDisplay > 500) {
      this.atualizarDisplay();
      this.ultimaAtualizacaoDisplay = Date.now();
    }

    this.renderer.render(this.scene, this.camera);
  }
};

// Inicialização — espera Three.js e o DOM estarem prontos
function inicializarPrototipo3D() {
  const canvas = document.getElementById('proto3dCanvas');
  if (!canvas) return;

  if (typeof THREE === 'undefined') {
    console.warn('[HoloPass] Three.js ainda carregando...');
    setTimeout(inicializarPrototipo3D, 300);
    return;
  }

  const ok = proto3D.init();
  if (!ok) return;

  // Conecta os controles ao protótipo
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      proto3D.setCorCouro(parseInt(swatch.dataset.color));
    });
  });

  const btnRot = document.getElementById('btnAutoRotate');
  if (btnRot) btnRot.onclick = () => {
    const on = proto3D.toggleAutoRotate();
    btnRot.textContent = `⟳ AUTO-ROTAÇÃO: ${on ? 'ON' : 'OFF'}`;
  };

  const btnHolo = document.getElementById('btnHologram');
  if (btnHolo) btnHolo.onclick = () => {
    const on = proto3D.toggleHologram();
    btnHolo.textContent = `◈ HOLOGRAMA: ${on ? 'ON' : 'OFF'}`;
  };

  const btnPulso = document.getElementById('btnPulso');
  if (btnPulso) btnPulso.onclick = () => {
    const on = proto3D.togglePulso();
    btnPulso.textContent = `🤚 MOSTRAR PULSO: ${on ? 'ON' : 'OFF'}`;
  };

  const btnReset = document.getElementById('btnResetView');
  if (btnReset) btnReset.onclick = () => proto3D.resetView();
}

// ============================================================
// FASE 4 — PWA / DEVICE APIs
// ============================================================
//
// Esta seção transforma o HoloPass em um Progressive Web App.
// O usuário pode INSTALAR no celular e usar OFFLINE, com NFC
// real, vibração, notificações push e geolocalização.
//
// APIs usadas (todas REAIS, suportadas por navegadores modernos):
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

    exibirAviso(`🛰️ Mais próxima: ${r.estacao} (fora do MVP)`);
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
// INICIALIZAÇÃO FASE 4 — chamada do DOMContentLoaded
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
  executarIA(false);
  holoFase6.update();
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

  if (!estaFuncionando()) {
    exibirAviso('Sistema fora do horário de operação (04:40–00:00)');
    return;
  }

  const [linhaO, estO] = valO.split('|');
  const [linhaD, estD] = valD.split('|');

  const rota = linhaO === linhaD
    ? calcularRotaDireta(linhaO, estO, estD)
    : (tentarUmaBaldeacao(linhaO, estO, linhaD, estD)
    || tentarDuasBaldeacoes(linhaO, estO, linhaD, estD)
    || calcularEstimativa(linhaO, estO, linhaD, estD));

  if (!rota) { exibirAviso('Não foi possível calcular rota.'); return; }

  rotaCalculada = rota;
  linhaAtiva    = rota.linhas[0];
  exibirRota(rota);
  executarIA(false);
  holoFase6.update();
  preencherOverlayRA();
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

  // Aviso de encerramento próximo
  const aviso  = document.getElementById('opWarning');
  const minRest = Math.round((FUNCIONAMENTO.fim - horaDecimal()) * 60);
  if (aviso) {
    aviso.style.display = (minRest <= 60 && minRest > 0) ? 'block' : 'none';
    if (minRest <= 60 && minRest > 0)
      aviso.textContent = `⚠ Sistema encerra em ~${minRest} minutos`;
  }

  renderizarRotaVisual(rota);
  painel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderizarRotaVisual(rota) {
  const c = document.getElementById('routeDisplay');
  c.innerHTML = '';
  c.className = 'route-display route-timeline';

  let lista = rota.estacoes.map((est, index) => ({ est, index }));
  if (lista.length > 9) {
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
    vibrar(VIBRACOES.erro);  // Fase 4: vibração de erro
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

  // FASE 4: feedback háptico + notificação
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
