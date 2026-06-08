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
formula de Haversine, valida um pagamento NFC simulado, atualiza saldo, emite
telemetria no Serial Monitor e aciona LED/buzzer para feedback fisico.

## 2. Objetivo

Demonstrar que a solucao existe como arquitetura fisica possivel:

1. detectar posicao por satelite no dispositivo;
2. calcular distancia ate estacoes por Haversine;
3. aprovar ou negar pagamento NFC conforme saldo;
4. avisar chegada ao destino por buzzer;
5. gerar telemetria para diagnostico;
6. indicar prioridade urbana conceitual para regioes com menor cobertura.

## 3. Componentes

| Componente | Funcao | Ligacao |
|---|---|---|
| Arduino UNO | Processamento local da pulseira | placa principal |
| LED | Indica cada leitura GNSS e estados de erro | pino 13 -> resistor 220 ohm -> LED -> GND |
| Resistor 220 ohm | Protege o LED | em serie com o LED |
| Buzzer | Pagamento aprovado/negado e chegada | pino 8 -> buzzer -> GND |

Nao ha bibliotecas externas obrigatorias. O codigo usa apenas `math.h` e funcoes
nativas do core Arduino.

## 4. Funcionamento

A cada ciclo, o firmware:

1. interpola uma coordenada do trajeto Bras -> Se;
2. pisca o LED para representar um novo fix GNSS;
3. processa a catraca NFC simulada no inicio da viagem;
4. aprova o pagamento se houver saldo ou nega e simula recarga PIX;
5. calcula a estacao mais proxima e a distancia ate o destino;
6. imprime telemetria com precisao GNSS, saldo, estacao, distancia e prioridade;
7. toca o buzzer de chegada quando a distancia fica abaixo de 250 m.

A prioridade urbana e conceitual: ela combina distancia ate a estacao mais
proxima e um indice interno de cobertura para representar como o HoloPass poderia
apoiar estudos de novas estacoes em areas menos atendidas. Dados reais exigiriam
base publica/operacional validada.

## 5. Estrutura do circuito

```text
Arduino UNO
  Pino 13 -> resistor 220 ohm -> LED -> GND
  Pino 8  -> buzzer -> GND
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
- Serial mostra `fix=`, latitude, longitude, estacao mais proxima, saldo e prioridade.
- Buzzer toca em pagamento aprovado, negado e chegada.
- Em uma viagem com saldo insuficiente, o Serial mostra `NFC catraca: NEGADO`.

Link publico do Wokwi: adicionar apos publicar o projeto.

### Arduino IDE

1. Abra `sketch.ino`.
2. Selecione Arduino UNO.
3. Monte LED no pino 13 e buzzer no pino 8.
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
