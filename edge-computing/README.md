# HoloPass — Módulo Embarcado (Edge Computing & Computer Systems)

Global Solution 2026 · 1º Semestre · **Indústria Espacial**
Engenharia de Software · 1º Ano · Presencial · FIAP

---

## 1. Descrição do projeto

O **HoloPass** é uma pulseira inteligente de transporte público que substitui o
bilhete e o cartão por pagamento via **NFC** e usa **posicionamento por satélite
(GNSS — GPS, Galileo, GLONASS, BeiDou)** para identificar automaticamente a
estação em que o usuário está, calcular a rota e avisar a chegada.

Esta pasta contém a **camada de Edge Computing** do projeto: a simulação do
microcontrolador embarcado na pulseira, que processa a posição do satélite
*na borda* (no próprio dispositivo, sem depender da nuvem) e reage em tempo real.

## 2. Objetivo da solução

Demonstrar, em hardware simulado, o "coração físico" da pulseira:

1. **Receber** a posição do usuário (fix GNSS).
2. **Processar localmente** (edge) qual é a estação mais próxima, usando a
   fórmula de **Haversine** — a mesma do app web e do modelo matemático em Python.
3. **Avisar o usuário**: o **LED** pisca a cada leitura de posição e o **buzzer**
   apita quando a pulseira chega na estação de destino.

## 3. Componentes utilizados

| Componente | Função | Ligação |
|---|---|---|
| Arduino UNO | Microcontrolador (processamento na borda) | — |
| LED (cyan) "Fix GNSS" | Indica cada leitura de posição do satélite | Pino **13** → resistor 220 Ω → LED → GND |
| Resistor 220 Ω | Limita a corrente do LED | Entre o pino 13 e o anodo do LED |
| Buzzer "Alerta chegada" | Aviso sonoro de desembarque | Pino **8** → buzzer → GND |

> Os pinos do código (`sketch.ino`) correspondem exatamente às ligações do
> arquivo `diagram.json` usado no simulador Wokwi.

## 4. Explicação do funcionamento

A cada ciclo (~1,2 s, simulando a cadência de um fix GNSS):

1. O firmware "recebe" uma nova coordenada (latitude/longitude). Como o
   Arduino UNO não tem receptor GNSS, a posição é **simulada** por um trajeto
   que se aproxima da estação **Sé** (partindo das proximidades do Brás) — é
   exatamente assim que ligaríamos um módulo real **NEO-6M + TinyGPS++**.
2. O **LED do pino 13 pisca** — representa o sinal/leitura recebido do satélite.
3. O microcontrolador calcula, com **Haversine**, a estação mais próxima e a
   distância até o destino, e imprime essa telemetria no **Serial Monitor**
   (como se fosse o display da pulseira).
4. Quando a distância até o destino fica abaixo de **250 m**, o **buzzer do
   pino 8 apita** três vezes: é o alerta de chegada/desembarque.
5. Ao chegar, a simulação reinicia para uma nova viagem.

Isso ilustra o conceito de **Edge Computing**: todo o cálculo de posição e a
decisão de alertar acontecem **no próprio dispositivo**, com latência mínima e
sem depender de conexão — requisito típico de sistemas embarcados.

## 5. Estrutura do circuito

```
Arduino UNO
   Pino 13 ──[ Resistor 220 Ω ]──►|── LED "Fix GNSS" ──┐
                                                        ├── GND
   Pino 8  ────────────────────────  Buzzer ───────────┘
```

- **Pino 13 → Resistor 220 Ω → LED → GND** (pisca a cada leitura GNSS)
- **Pino 8 → Buzzer → GND** (apita ao chegar na estação)

O esquema completo e editável está em [`diagram.json`](diagram.json).

## 6. Instruções de execução

### Opção A — Wokwi (recomendado, online, sem instalar nada)

1. Acesse <https://wokwi.com> e crie um novo projeto **Arduino UNO**.
2. Substitua o conteúdo de `sketch.ino` pelo arquivo desta pasta.
3. Abra a aba **diagram.json** e cole o conteúdo de `diagram.json` desta pasta.
4. Clique em **▶ Play**. Abra o **Serial Monitor** (9600 baud) para acompanhar
   a telemetria. Observe o LED piscando a cada leitura e o buzzer apitando na
   chegada.

> Link do projeto no Wokwi: _adicione aqui o link público do seu projeto após
> publicá-lo em wokwi.com (Share → Save a copy / Publish)._

### Opção B — Arduino IDE (hardware real, opcional)

1. Abra `sketch.ino` na Arduino IDE.
2. Monte o circuito conforme a seção 5 (LED com resistor de 220 Ω no pino 13,
   buzzer no pino 8).
3. Selecione a placa **Arduino UNO**, a porta correta e clique em **Upload**.
4. Abra o **Monitor Serial** a **9600 baud**.

Não são necessárias bibliotecas externas — o código usa apenas `math.h` e as
funções nativas do core do Arduino (`tone`, `radians`, etc.). Veja
[`libraries.txt`](libraries.txt).

## 7. Integrantes do grupo

| Nome completo | RM |
|---|---|
| Thiago Souza de Lima | 568732 |

> _Acrescente aqui os demais integrantes da equipe (até 5), se houver._

---

*HoloPass · Edge Computing & Computer Systems · GS 2026 · FIAP*
