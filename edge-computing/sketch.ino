/* ============================================================
   HoloPass — Módulo Embarcado (Edge Computing)
   Global Solution 2026 · 1º Semestre · Indústria Espacial
   Disciplina: Edge Computing & Computer Systems
   ------------------------------------------------------------
   Simula o "coração físico" da pulseira HoloPass: um
   microcontrolador que recebe a posição por satélite (GNSS),
   calcula a estação de metrô mais próxima usando a fórmula de
   Haversine e avisa o usuário quando ele chega ao destino.

   Hardware (ver diagram.json — simulação no Wokwi):
     - Arduino UNO
     - LED  "Fix GNSS"      -> pino 13 (via resistor de 220 Ohm)
     - Buzzer "Alerta chegada" -> pino 8

   Comportamento:
     - O LED pisca a CADA leitura de posição (fix do GNSS).
     - O buzzer APITA quando a pulseira chega na estação destino.

   Observação de honestidade técnica:
     O Arduino UNO não possui receptor GNSS embutido. Aqui a
     posição é SIMULADA (um trajeto que se aproxima da estação Sé),
     exatamente como faríamos com um módulo real NEO-6M + TinyGPS++.
     A matemática (Haversine) é idêntica à usada no app web e no
     modelo em Python do projeto.
   ============================================================ */

#include <math.h>

// ---------- Pinos (devem casar com o diagram.json) ----------
const uint8_t PINO_LED    = 13;   // LED "Fix GNSS" (com resistor de 220 Ohm)
const uint8_t PINO_BUZZER = 8;    // Buzzer "Alerta chegada"

// ---------- Constantes do modelo ----------
const float RAIO_TERRA_KM   = 6371.0;   // raio médio da Terra
const float RAIO_CHEGADA_KM = 0.25;     // < 250 m  -> considera "chegou"
const unsigned long INTERVALO_LEITURA_MS = 1200; // cadência do fix GNSS

// ---------- Base de estações (mesmas coordenadas do app/Python) ----------
struct Estacao {
  const char* nome;
  float lat;
  float lng;
};

const Estacao ESTACOES[] = {
  { "Luz",      -23.5345, -46.6356 },
  { "Se",       -23.5505, -46.6333 },   // destino desta simulacao
  { "Liberdade",-23.5588, -46.6336 },
  { "Bras",     -23.5446, -46.6175 },
  { "Republica",-23.5436, -46.6428 },
  { "Paraiso",  -23.5736, -46.6403 }
};
const uint8_t N_ESTACOES = sizeof(ESTACOES) / sizeof(ESTACOES[0]);

// Estação destino da viagem (índice em ESTACOES[]): "Se"
const uint8_t IDX_DESTINO = 1;

// ---------- Trajeto SIMULADO (Bras -> Se) ----------
// Ponto de partida e destino; a posição é interpolada entre eles.
const float LAT_INICIO = -23.5446, LNG_INICIO = -46.6175; // proximo a Bras
const float LAT_DESTINO = -23.5505, LNG_DESTINO = -46.6333; // Se
const float PASSO_PROGRESSO = 0.12; // ~9 leituras ate chegar

float progresso = 0.0;   // 0.0 = inicio do trajeto, 1.0 = destino
bool  jaAvisou  = false; // evita repetir o alarme de chegada

// ------------------------------------------------------------
// Haversine: distancia real (km) entre dois pontos da esfera.
// Mesma formula do app web (script.js) e do modelo Python.
// ------------------------------------------------------------
float haversineKm(float lat1, float lon1, float lat2, float lon2) {
  float dLat = radians(lat2 - lat1);
  float dLon = radians(lon2 - lon1);
  float a = sin(dLat / 2) * sin(dLat / 2) +
            cos(radians(lat1)) * cos(radians(lat2)) *
            sin(dLon / 2) * sin(dLon / 2);
  return 2 * RAIO_TERRA_KM * asin(sqrt(a));
}

// ------------------------------------------------------------
// Retorna o indice da estacao mais proxima de (lat, lng).
// Mesma logica de "detectar estacao mais proxima" do app.
// ------------------------------------------------------------
uint8_t estacaoMaisProxima(float lat, float lng, float &distKm) {
  uint8_t melhor = 0;
  float menor = 1e9;
  for (uint8_t i = 0; i < N_ESTACOES; i++) {
    float d = haversineKm(lat, lng, ESTACOES[i].lat, ESTACOES[i].lng);
    if (d < menor) { menor = d; melhor = i; }
  }
  distKm = menor;
  return melhor;
}

// ------------------------------------------------------------
// Pisca o LED uma vez = "fix GNSS recebido / leitura de posicao".
// ------------------------------------------------------------
void piscarFixGNSS() {
  digitalWrite(PINO_LED, HIGH);
  delay(120);
  digitalWrite(PINO_LED, LOW);
}

// ------------------------------------------------------------
// Toca o aviso sonoro de chegada na estacao (buzzer).
// ------------------------------------------------------------
void alertaChegada() {
  for (uint8_t i = 0; i < 3; i++) {
    tone(PINO_BUZZER, 1760, 150);  // La6
    digitalWrite(PINO_LED, HIGH);  // LED aceso junto com o bip
    delay(200);
    noTone(PINO_BUZZER);
    digitalWrite(PINO_LED, LOW);
    delay(120);
  }
}

void setup() {
  pinMode(PINO_LED, OUTPUT);
  pinMode(PINO_BUZZER, OUTPUT);
  Serial.begin(9600);

  Serial.println(F("============================================"));
  Serial.println(F("  HoloPass - Modulo Embarcado (Edge/GNSS)"));
  Serial.println(F("  LED pino 13 = fix GNSS | Buzzer pino 8 = chegada"));
  Serial.print  (F("  Destino da viagem: "));
  Serial.println(ESTACOES[IDX_DESTINO].nome);
  Serial.println(F("============================================"));
}

void loop() {
  // 1) "Recebe" uma nova posicao do satelite (simulada por interpolacao)
  float lat = LAT_INICIO + (LAT_DESTINO - LAT_INICIO) * progresso;
  float lng = LNG_INICIO + (LNG_DESTINO - LNG_INICIO) * progresso;

  // 2) Sinaliza a leitura de posicao piscando o LED
  piscarFixGNSS();

  // 3) Calcula a estacao mais proxima e a distancia ate o destino
  float distProx;
  uint8_t idxProx = estacaoMaisProxima(lat, lng, distProx);
  float distDestino = haversineKm(lat, lng,
                                  ESTACOES[IDX_DESTINO].lat,
                                  ESTACOES[IDX_DESTINO].lng);

  // 4) Mostra a telemetria no Serial Monitor (como um display da pulseira)
  Serial.print(F("GNSS lat="));   Serial.print(lat, 5);
  Serial.print(F(" lng="));       Serial.print(lng, 5);
  Serial.print(F(" | + proxima: "));
  Serial.print(ESTACOES[idxProx].nome);
  Serial.print(F(" (~")); Serial.print(distProx, 2); Serial.print(F(" km)"));
  Serial.print(F(" | destino "));
  Serial.print(ESTACOES[IDX_DESTINO].nome);
  Serial.print(F(": ")); Serial.print(distDestino, 2); Serial.println(F(" km"));

  // 5) Chegou na estacao destino? Dispara o alerta sonoro uma unica vez.
  if (distDestino <= RAIO_CHEGADA_KM && !jaAvisou) {
    Serial.println(F(">>> CHEGANDO NA ESTACAO! Prepare o desembarque. <<<"));
    alertaChegada();
    jaAvisou = true;
  }

  // 6) Avanca no trajeto; ao chegar, reinicia a simulacao
  progresso += PASSO_PROGRESSO;
  if (progresso > 1.0001) {
    progresso = 0.0;
    jaAvisou  = false;
    Serial.println(F("--- Nova viagem simulada ---"));
    delay(1500);
  }

  delay(INTERVALO_LEITURA_MS);
}
