/* ============================================================
   HoloPass - Modulo Embarcado (Edge Computing)
   Global Solution 2026 - Industria Espacial - FIAP

   Simula a logica fisica da pulseira:
   - recebe fixes GNSS simulados;
   - calcula estacao mais proxima por Haversine;
   - registra pagamento NFC com saldo aprovado/negado;
   - emite telemetria no Serial Monitor;
   - pisca LED a cada leitura;
   - toca buzzer no pagamento e na chegada ao destino;
   - le botao de pagamento NFC e botao de recarga;
   - le potenciometro como demanda/cobertura urbana;
   - calcula prioridade urbana para areas mal atendidas.

   Hardware no Wokwi:
   - Arduino UNO
   - LED cyan no pino 13 com resistor 220 ohm (fix GNSS)
   - LED verde no pino 6 (pagamento aprovado)
   - LED vermelho no pino 7 (pagamento negado)
   - LED amarelo no pino 12 (prioridade urbana alta)
   - Buzzer no pino 8
   - Botao NFC no pino 2
   - Botao recarga no pino 3
   - Potenciometro no A0 para demanda/cobertura

   Honestidade tecnica:
   O Arduino UNO nao possui GNSS/NFC embutido. Aqui os fixes e a catraca NFC
   sao simulados para demonstrar a arquitetura. A formula de Haversine e a
   decisao de borda sao reais e equivalentes ao app web e ao modelo Python.
   ============================================================ */

#include <math.h>

const uint8_t PINO_LED = 13;
const uint8_t PINO_BUZZER = 8;
const uint8_t PINO_LED_OK = 6;
const uint8_t PINO_LED_ERRO = 7;
const uint8_t PINO_LED_PRIORIDADE = 12;
const uint8_t PINO_BOTAO_NFC = 2;
const uint8_t PINO_BOTAO_RECARGA = 3;
const uint8_t PINO_DEMANDA = A0;

const float RAIO_TERRA_KM = 6371.0;
const float RAIO_CHEGADA_KM = 0.25;
const unsigned long INTERVALO_LEITURA_MS = 1100;

const int TARIFA_CENTAVOS = 440;
int saldoCentavos = 920;

struct Estacao {
  const char* nome;
  float lat;
  float lng;
  uint8_t cobertura; // 0 = baixa cobertura, 100 = bem atendida
};

const Estacao ESTACOES[] = {
  { "Luz",       -23.5345, -46.6356, 92 },
  { "Se",        -23.5505, -46.6333, 95 },
  { "Liberdade", -23.5588, -46.6336, 82 },
  { "Bras",      -23.5446, -46.6175, 90 },
  { "Republica", -23.5436, -46.6428, 94 },
  { "Paraiso",   -23.5736, -46.6403, 88 },
  { "Pinheiros", -23.5666, -46.7019, 86 },
  { "Osasco",    -23.5329, -46.7918, 54 }
};

const uint8_t N_ESTACOES = sizeof(ESTACOES) / sizeof(ESTACOES[0]);
const uint8_t IDX_ORIGEM = 3;  // Bras
const uint8_t IDX_DESTINO = 1; // Se

float progresso = 0.0;
uint16_t ciclo = 0;
uint8_t numeroViagem = 1;
bool jaAvisouChegada = false;
bool pagamentoProcessado = false;
unsigned long ultimoBotaoNFC = 0;
unsigned long ultimoBotaoRecarga = 0;

float haversineKm(float lat1, float lon1, float lat2, float lon2) {
  float dLat = radians(lat2 - lat1);
  float dLon = radians(lon2 - lon1);
  float a = sin(dLat / 2) * sin(dLat / 2) +
            cos(radians(lat1)) * cos(radians(lat2)) *
            sin(dLon / 2) * sin(dLon / 2);
  return 2 * RAIO_TERRA_KM * asin(sqrt(a));
}

uint8_t estacaoMaisProxima(float lat, float lng, float &distKm) {
  uint8_t melhor = 0;
  float menor = 9999.0;
  for (uint8_t i = 0; i < N_ESTACOES; i++) {
    float d = haversineKm(lat, lng, ESTACOES[i].lat, ESTACOES[i].lng);
    if (d < menor) {
      menor = d;
      melhor = i;
    }
  }
  distKm = menor;
  return melhor;
}

uint8_t precisaoGnssMetros() {
  // Variacao deterministica para simular qualidade real do fix GNSS urbano.
  return 6 + ((ciclo * 7) % 18);
}

uint8_t demandaUrbana() {
  // Potenciometro representa demanda/cobertura externa: 0 = baixa, 100 = alta.
  return map(analogRead(PINO_DEMANDA), 0, 1023, 0, 100);
}

uint8_t scorePrioridadeUrbana(float distKm, uint8_t idxEstacao, uint8_t demanda, uint8_t precisao) {
  uint8_t cobertura = ESTACOES[idxEstacao].cobertura;
  int score = (int)(distKm * 32.0) + (100 - cobertura) / 2 + demanda / 3;
  if (precisao > 18) score += 8;
  return constrain(score, 0, 100);
}

const char* prioridadeUrbana(float distKm, uint8_t idxEstacao, uint8_t demanda, uint8_t precisao) {
  uint8_t cobertura = ESTACOES[idxEstacao].cobertura;
  uint8_t score = scorePrioridadeUrbana(distKm, idxEstacao, demanda, precisao);
  if (distKm > 1.2 || cobertura < 60 || score >= 70) return "ALTA";
  if (distKm > 0.7 || cobertura < 78 || score >= 45) return "MEDIA";
  return "BAIXA";
}

void piscarFixGNSS() {
  digitalWrite(PINO_LED, HIGH);
  delay(90);
  digitalWrite(PINO_LED, LOW);
}

void pulsoLed(uint8_t pino, uint16_t ms) {
  digitalWrite(pino, HIGH);
  delay(ms);
  digitalWrite(pino, LOW);
}

void beepAprovado() {
  digitalWrite(PINO_LED_OK, HIGH);
  tone(PINO_BUZZER, 1319, 90);
  delay(120);
  tone(PINO_BUZZER, 1760, 110);
  delay(140);
  noTone(PINO_BUZZER);
  digitalWrite(PINO_LED_OK, LOW);
}

void beepNegado() {
  for (uint8_t i = 0; i < 2; i++) {
    tone(PINO_BUZZER, 220, 160);
    digitalWrite(PINO_LED_ERRO, HIGH);
    delay(190);
    noTone(PINO_BUZZER);
    digitalWrite(PINO_LED_ERRO, LOW);
    delay(120);
  }
}

void alertaChegada() {
  for (uint8_t i = 0; i < 3; i++) {
    tone(PINO_BUZZER, 1976, 130);
    digitalWrite(PINO_LED, HIGH);
    digitalWrite(PINO_LED_OK, HIGH);
    delay(170);
    noTone(PINO_BUZZER);
    digitalWrite(PINO_LED, LOW);
    digitalWrite(PINO_LED_OK, LOW);
    delay(100);
  }
}

void imprimirValor(int centavos) {
  Serial.print(F("R$ "));
  Serial.print(centavos / 100);
  Serial.print(F(","));
  int resto = centavos % 100;
  if (resto < 10) Serial.print(F("0"));
  Serial.print(resto);
}

bool botaoPressionado(uint8_t pino, unsigned long &ultimoEvento) {
  if (digitalRead(pino) != LOW) return false;
  unsigned long agora = millis();
  if (agora - ultimoEvento < 380) return false;
  ultimoEvento = agora;
  return true;
}

void recarregarSaldo(int centavos) {
  saldoCentavos += centavos;
  if (saldoCentavos >= TARIFA_CENTAVOS) pagamentoProcessado = false;
  Serial.print(F("RECARGA manual: +"));
  imprimirValor(centavos);
  Serial.print(F(" | saldo="));
  imprimirValor(saldoCentavos);
  Serial.println();
  pulsoLed(PINO_LED_OK, 180);
}

void processarNFC() {
  if (pagamentoProcessado) return;

  Serial.print(F("NFC catraca: "));
  if (saldoCentavos >= TARIFA_CENTAVOS) {
    saldoCentavos -= TARIFA_CENTAVOS;
    Serial.print(F("APROVADO | tarifa="));
    imprimirValor(TARIFA_CENTAVOS);
    Serial.print(F(" | saldo="));
    imprimirValor(saldoCentavos);
    Serial.println();
    beepAprovado();
  } else {
    Serial.print(F("NEGADO | saldo="));
    imprimirValor(saldoCentavos);
    Serial.println(F(" | acione o botao de recarga para continuar"));
    beepNegado();
  }

  pagamentoProcessado = true;
}

void imprimirTelemetria(float lat, float lng, uint8_t idxProx, float distProx, float distDestino, uint8_t demanda, uint8_t precisao) {
  uint8_t score = scorePrioridadeUrbana(distProx, idxProx, demanda, precisao);
  Serial.print(F("#"));
  Serial.print(ciclo);
  Serial.print(F(" viagem="));
  Serial.print(numeroViagem);
  Serial.print(F(" fix="));
  Serial.print(precisao);
  Serial.print(F("m lat="));
  Serial.print(lat, 5);
  Serial.print(F(" lng="));
  Serial.print(lng, 5);
  Serial.print(F(" prox="));
  Serial.print(ESTACOES[idxProx].nome);
  Serial.print(F(" distProx="));
  Serial.print(distProx, 2);
  Serial.print(F("km destino="));
  Serial.print(distDestino, 2);
  Serial.print(F("km prioridadeEO="));
  Serial.print(prioridadeUrbana(distProx, idxProx, demanda, precisao));
  Serial.print(F(" score="));
  Serial.print(score);
  Serial.print(F("/100 demanda="));
  Serial.print(demanda);
  Serial.print(F("% cobertura="));
  Serial.print(ESTACOES[idxProx].cobertura);
  Serial.print(F("%"));
  Serial.print(F(" saldo="));
  imprimirValor(saldoCentavos);
  Serial.println();
}

void reiniciarViagem() {
  progresso = 0.0;
  jaAvisouChegada = false;
  pagamentoProcessado = false;
  numeroViagem++;
  Serial.println(F("--- Nova viagem simulada ---"));
  delay(1200);
}

void setup() {
  pinMode(PINO_LED, OUTPUT);
  pinMode(PINO_BUZZER, OUTPUT);
  pinMode(PINO_LED_OK, OUTPUT);
  pinMode(PINO_LED_ERRO, OUTPUT);
  pinMode(PINO_LED_PRIORIDADE, OUTPUT);
  pinMode(PINO_BOTAO_NFC, INPUT_PULLUP);
  pinMode(PINO_BOTAO_RECARGA, INPUT_PULLUP);
  Serial.begin(9600);

  Serial.println(F("============================================"));
  Serial.println(F("  HoloPass Edge - GNSS + NFC + alerta"));
  Serial.print(F("  Origem: "));
  Serial.print(ESTACOES[IDX_ORIGEM].nome);
  Serial.print(F(" | Destino: "));
  Serial.println(ESTACOES[IDX_DESTINO].nome);
  Serial.print(F("  Saldo inicial: "));
  imprimirValor(saldoCentavos);
  Serial.println();
  Serial.println(F("  Botao D2 = NFC manual | Botao D3 = recarga +R$ 20,00"));
  Serial.println(F("  Potenciometro A0 = demanda/cobertura urbana da regiao"));
  Serial.println(F("============================================"));
}

void loop() {
  ciclo++;

  const Estacao origem = ESTACOES[IDX_ORIGEM];
  const Estacao destino = ESTACOES[IDX_DESTINO];
  float lat = origem.lat + (destino.lat - origem.lat) * progresso;
  float lng = origem.lng + (destino.lng - origem.lng) * progresso;

  piscarFixGNSS();
  if (botaoPressionado(PINO_BOTAO_RECARGA, ultimoBotaoRecarga)) {
    recarregarSaldo(2000);
  }

  if (botaoPressionado(PINO_BOTAO_NFC, ultimoBotaoNFC) || (progresso < 0.02 && !pagamentoProcessado)) {
    processarNFC();
  }

  float distProx;
  uint8_t idxProx = estacaoMaisProxima(lat, lng, distProx);
  float distDestino = haversineKm(lat, lng, destino.lat, destino.lng);
  uint8_t precisao = precisaoGnssMetros();
  uint8_t demanda = demandaUrbana();
  bool prioridadeAlta = strcmp(prioridadeUrbana(distProx, idxProx, demanda, precisao), "ALTA") == 0;
  digitalWrite(PINO_LED_PRIORIDADE, prioridadeAlta ? HIGH : LOW);

  imprimirTelemetria(lat, lng, idxProx, distProx, distDestino, demanda, precisao);

  if (distDestino <= RAIO_CHEGADA_KM && !jaAvisouChegada) {
    Serial.print(F(">>> CHEGADA CONFIRMADA EM "));
    Serial.print(destino.nome);
    Serial.println(F(" | buzzer de desembarque acionado <<<"));
    alertaChegada();
    jaAvisouChegada = true;
  }

  progresso += 0.115;
  if (progresso > 1.0001) reiniciarViagem();

  delay(INTERVALO_LEITURA_MS);
}
