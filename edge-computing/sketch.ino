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
   - calcula prioridade urbana conceitual para areas mal atendidas.

   Hardware no Wokwi:
   - Arduino UNO
   - LED no pino 13 com resistor 220 ohm
   - Buzzer no pino 8

   Honestidade tecnica:
   O Arduino UNO nao possui GNSS/NFC embutido. Aqui os fixes e a catraca NFC
   sao simulados para demonstrar a arquitetura. A formula de Haversine e a
   decisao de borda sao reais e equivalentes ao app web e ao modelo Python.
   ============================================================ */

#include <math.h>

const uint8_t PINO_LED = 13;
const uint8_t PINO_BUZZER = 8;

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

const char* prioridadeUrbana(float distKm, uint8_t idxEstacao) {
  uint8_t cobertura = ESTACOES[idxEstacao].cobertura;
  if (distKm > 1.2 || cobertura < 60) return "ALTA";
  if (distKm > 0.7 || cobertura < 78) return "MEDIA";
  return "BAIXA";
}

void piscarFixGNSS() {
  digitalWrite(PINO_LED, HIGH);
  delay(90);
  digitalWrite(PINO_LED, LOW);
}

void beepAprovado() {
  tone(PINO_BUZZER, 1319, 90);
  delay(120);
  tone(PINO_BUZZER, 1760, 110);
  delay(140);
  noTone(PINO_BUZZER);
}

void beepNegado() {
  for (uint8_t i = 0; i < 2; i++) {
    tone(PINO_BUZZER, 220, 160);
    digitalWrite(PINO_LED, HIGH);
    delay(190);
    noTone(PINO_BUZZER);
    digitalWrite(PINO_LED, LOW);
    delay(120);
  }
}

void alertaChegada() {
  for (uint8_t i = 0; i < 3; i++) {
    tone(PINO_BUZZER, 1976, 130);
    digitalWrite(PINO_LED, HIGH);
    delay(170);
    noTone(PINO_BUZZER);
    digitalWrite(PINO_LED, LOW);
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
    Serial.println(F(" | recarga PIX simulada +R$ 20,00"));
    beepNegado();
    saldoCentavos += 2000;
  }

  pagamentoProcessado = true;
}

void imprimirTelemetria(float lat, float lng, uint8_t idxProx, float distProx, float distDestino) {
  Serial.print(F("#"));
  Serial.print(ciclo);
  Serial.print(F(" viagem="));
  Serial.print(numeroViagem);
  Serial.print(F(" fix="));
  Serial.print(precisaoGnssMetros());
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
  Serial.print(prioridadeUrbana(distProx, idxProx));
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
  Serial.println(F("============================================"));
}

void loop() {
  ciclo++;

  const Estacao origem = ESTACOES[IDX_ORIGEM];
  const Estacao destino = ESTACOES[IDX_DESTINO];
  float lat = origem.lat + (destino.lat - origem.lat) * progresso;
  float lng = origem.lng + (destino.lng - origem.lng) * progresso;

  piscarFixGNSS();
  processarNFC();

  float distProx;
  uint8_t idxProx = estacaoMaisProxima(lat, lng, distProx);
  float distDestino = haversineKm(lat, lng, destino.lat, destino.lng);

  imprimirTelemetria(lat, lng, idxProx, distProx, distDestino);

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
