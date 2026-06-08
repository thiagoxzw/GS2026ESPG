# HoloPass - Modulo Embarcado

Global Solution 2026 - Industria Espacial  
Engenharia de Software - 1o Ano - FIAP  
Equipe: Thiago Souza de Lima - RM 568732

## 1. Descricao

Esta pasta contem a camada de Edge Computing do HoloPass: uma simulacao em
Arduino UNO da pulseira inteligente usada no transporte publico. O firmware
representa o processamento local da pulseira, sem depender da nuvem para tomar
decisoes basicas de embarque e localizacao.

O Arduino recebe fixes GNSS simulados, calcula a estacao mais proxima pela
formula de Haversine, valida pagamento NFC por botao, atualiza saldo, le um
potenciometro como demanda urbana, emite telemetria no Serial Monitor e aciona
LEDs/buzzer para feedback fisico.

## 2. Objetivo

Demonstrar que a solucao existe como arquitetura fisica possivel:

1. detectar posicao por satelite no dispositivo;
2. calcular distancia ate estacoes por Haversine;
3. aprovar ou negar pagamento NFC conforme saldo;
4. permitir recarga fisica no prototipo;
5. avisar chegada ao destino por buzzer;
6. gerar telemetria para diagnostico;
7. indicar prioridade urbana para regioes com menor cobertura.

## 3. Componentes

| Componente | Funcao | Ligacao |
|---|---|---|
| Arduino UNO | Processamento local da pulseira | placa principal |
| LED cyan | Indica cada leitura GNSS | pino 13 -> resistor 220 ohm -> LED -> GND |
| LED verde | Indica NFC aprovado e recarga | pino 6 -> resistor 220 ohm -> LED -> GND |
| LED vermelho | Indica NFC negado | pino 7 -> resistor 220 ohm -> LED -> GND |
| LED amarelo | Indica prioridade urbana alta | pino 12 -> resistor 220 ohm -> LED -> GND |
| Resistor 220 ohm | Protege o LED | em serie com o LED |
| Buzzer | Pagamento aprovado/negado e chegada | pino 8 -> buzzer -> GND |
| Botao NFC | Aciona pagamento manual | pino 2 -> botao -> GND |
| Botao recarga | Simula recarga de R$ 20,00 | pino 3 -> botao -> GND |
| Potenciometro | Simula demanda/cobertura urbana | A0, 5V e GND |

Nao ha bibliotecas externas obrigatorias. O codigo usa apenas `math.h` e funcoes
nativas do core Arduino.

## 4. Funcionamento

A cada ciclo, o firmware:

1. interpola uma coordenada do trajeto Bras -> Se;
2. pisca o LED para representar um novo fix GNSS;
3. processa NFC no inicio ou quando o botao D2 e pressionado;
4. aprova o pagamento se houver saldo ou nega com LED vermelho;
5. adiciona R$ 20,00 quando o botao D3 e pressionado;
6. calcula estacao mais proxima, distancia, demanda e score de prioridade;
7. imprime telemetria com precisao GNSS, saldo, estacao, distancia e prioridade;
8. toca o buzzer de chegada quando a distancia fica abaixo de 250 m.

A prioridade urbana combina distancia ate a estacao mais proxima, indice de
cobertura, demanda ajustada no potenciometro e precisao do fix GNSS. No app web,
a mesma ideia e aplicada com OpenStreetMap/Overpass e Haversine.

## 5. Estrutura do circuito

```text
Arduino UNO
  Pino 13 -> resistor 220 ohm -> LED -> GND
  Pino 6  -> resistor 220 ohm -> LED verde -> GND
  Pino 7  -> resistor 220 ohm -> LED vermelho -> GND
  Pino 12 -> resistor 220 ohm -> LED amarelo -> GND
  Pino 8  -> buzzer -> GND
  Pino 2  -> botao NFC -> GND
  Pino 3  -> botao recarga -> GND
  A0      -> potenciometro de demanda -> 5V/GND
```

O arquivo `diagram.json` contem o circuito equivalente para Wokwi.

## 6. Como executar

### Wokwi

1. Abra <https://wokwi.com>.
2. Crie um projeto Arduino UNO.
3. Cole `sketch.ino` no editor.
4. Cole `diagram.json` na aba de diagrama.
5. Clique em Play.
6. Abra o Serial Monitor em 9600 baud.

Evidencias esperadas:

- LED pisca a cada leitura GNSS.
- Botao NFC no D2 dispara pagamento manual.
- Botao recarga no D3 adiciona R$ 20,00.
- Potenciometro A0 altera demanda e score de prioridade.
- Serial mostra `fix=`, latitude, longitude, demanda, cobertura, score, saldo e prioridade.
- Buzzer toca em pagamento aprovado, negado e chegada.
- Em uma viagem com saldo insuficiente, o Serial mostra `NFC catraca: NEGADO`.

Link publico do Wokwi: adicionar apos publicar o projeto.

### Arduino IDE

1. Abra `sketch.ino`.
2. Selecione Arduino UNO.
3. Monte LEDs, buzzer, botoes e potenciometro conforme `diagram.json`.
4. Envie o codigo para a placa.
5. Abra o Serial Monitor em 9600 baud.

## 7. Integracao com o projeto

- Web Development: a pulseira web usa NFC, saldo, historico, GNSS e HoloRoute.
- Computational Thinking: o menu Python simula operacoes de usuario e rota.
- DPS: o modelo matematico reforca Haversine e funcoes ligadas ao espaco.
- Software/TXD: o documento explica arquitetura, fluxo, viabilidade e impacto.

## 8. Integrante

| Nome | RM |
|---|---|
| Thiago Souza de Lima | 568732 |
