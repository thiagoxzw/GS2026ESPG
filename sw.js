// ============================================================
// HOLOPASS — SERVICE WORKER
// Permite que o app funcione 100% offline e receba notificações
// ============================================================

const CACHE_NAME = 'holopass-v7.5';

// Arquivos que serão guardados em cache para uso offline
const ARQUIVOS_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './webdev.js',
  './manifest.json',
  './icon.svg',
  './assets/slide1-gnss.svg',
  './assets/slide2-nfc.svg',
  './assets/slide3-edge.svg',
  './design/holopass-band-redesign-preview.png',
  './design/README.md'
];

// ============================================================
// INSTALAÇÃO — guarda todos os arquivos no cache
// ============================================================
self.addEventListener('install', evento => {
  console.log('[SW] Instalando HoloPass v7.5...');
  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando arquivos do app');
        return cache.addAll(ARQUIVOS_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// ============================================================
// ATIVAÇÃO — remove caches antigos
// ============================================================
self.addEventListener('activate', evento => {
  console.log('[SW] Ativando service worker...');
  evento.waitUntil(
    caches.keys().then(chaves =>
      Promise.all(
        chaves
          .filter(chave => chave !== CACHE_NAME)
          .map(chave => {
            console.log('[SW] Removendo cache antigo:', chave);
            return caches.delete(chave);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ============================================================
// FETCH — estratégia "cache primeiro, rede depois"
// ============================================================
self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request).then(resposta => {
      // Se está no cache, retorna o cache
      if (resposta) return resposta;

      // Senão, busca na rede e cacheia para a próxima
      return fetch(evento.request)
        .then(novaResposta => {
          // Só cacheia respostas bem-sucedidas do mesmo domínio
          if (!novaResposta || novaResposta.status !== 200 || novaResposta.type !== 'basic') {
            return novaResposta;
          }
          const clone = novaResposta.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(evento.request, clone));
          return novaResposta;
        })
        .catch(() => {
          // Offline e não tem cache — retorna a página principal
          return caches.match('./index.html');
        });
    })
  );
});

// ============================================================
// NOTIFICAÇÕES PUSH
// ============================================================
self.addEventListener('push', evento => {
  let dados = { titulo: 'HoloPass', corpo: 'Nova notificação' };
  try {
    if (evento.data) dados = evento.data.json();
  } catch (e) {}

  evento.waitUntil(
    self.registration.showNotification(dados.titulo, {
      body: dados.corpo,
      icon: './icon.svg',
      badge: './icon.svg',
      vibrate: [200, 100, 200],
      tag: 'holopass-notif',
      requireInteraction: false,
      data: dados.url || './'
    })
  );
});

// Quando o usuário clica na notificação, abre o app
self.addEventListener('notificationclick', evento => {
  evento.notification.close();
  evento.waitUntil(
    clients.openWindow(evento.notification.data || './')
  );
});

// ============================================================
// SYNC — envia dados pendentes quando voltar online (futuro)
// ============================================================
self.addEventListener('sync', evento => {
  if (evento.tag === 'sync-viagens') {
    console.log('[SW] Sincronizando viagens pendentes...');
    // Aqui no futuro: enviar viagens offline para o servidor
  }
});
