# RelatÃ³rio TÃ©cnico - Modelagem MatemÃ¡tica GNSS do HoloPass

**Disciplina:** Differentiated Problem Solving
**Projeto:** HoloPass - Global Solution 2026 - IndÃºstria Espacial
**Integrante:** Thiago Souza de Lima - RM 568732

## 1. Problema e contexto

O HoloPass Ã© uma pulseira inteligente para transporte pÃºblico. Ela paga a passagem por NFC e usa GNSS para identificar a estaÃ§Ã£o mais prÃ³xima, calcular rotas e apoiar decisÃµes sobre Ã¡reas urbanas mal atendidas por estaÃ§Ãµes.

O problema matemÃ¡tico estudado Ã©: como transformar coordenadas, sinais e distÃ¢ncias de satÃ©lite em informaÃ§Ãµes Ãºteis para mobilidade urbana? A resposta exige funÃ§Ãµes capazes de representar distÃ¢ncia na Terra, posiÃ§Ã£o estimada, perda de sinal e reduÃ§Ã£o de erro conforme aumenta a quantidade de satÃ©lites visÃ­veis.

## 2. VariÃ¡veis do modelo

- `lat`, `lon`: latitude e longitude do usuÃ¡rio ou estaÃ§Ã£o.
- `d`: distÃ¢ncia entre dois pontos na superfÃ­cie terrestre, em quilÃ´metros.
- `x`, `y`: coordenadas planas usadas na trilateraÃ§Ã£o didÃ¡tica.
- `r1`, `r2`, `r3`: distÃ¢ncias atÃ© satÃ©lites ou antenas de referÃªncia.
- `f`: frequÃªncia do sinal GNSS, em MHz.
- `n`: nÃºmero de satÃ©lites visÃ­veis no fix.
- `E(n)`: erro posicional estimado em metros.

## 3. FunÃ§Ãµes construÃ­das

### 3.1 FunÃ§Ã£o trigonomÃ©trica - Haversine

A funÃ§Ã£o de Haversine calcula a distÃ¢ncia real entre dois pontos da Terra considerando sua curvatura. Ela foi escolhida porque o app trabalha com latitude e longitude reais, e uma distÃ¢ncia plana simples gera erro em trajetos urbanos.

**DomÃ­nio:** latitudes entre -90 e 90 graus; longitudes entre -180 e 180 graus.
**Imagem:** distÃ¢ncias reais maiores ou iguais a zero.
**Comportamento:** a distÃ¢ncia cresce conforme aumenta a separaÃ§Ã£o angular entre os pontos.
**InterpretaÃ§Ã£o:** permite detectar a estaÃ§Ã£o mais prÃ³xima por GNSS com rigor geomÃ©trico.

### 3.2 FunÃ§Ã£o polinomial - trilateraÃ§Ã£o

A trilateraÃ§Ã£o usa equaÃ§Ãµes quadrÃ¡ticas de circunferÃªncias para estimar posiÃ§Ã£o a partir de distÃ¢ncias atÃ© referÃªncias. No contexto espacial, ela representa a base matemÃ¡tica simplificada do posicionamento por satÃ©lite.

**DomÃ­nio:** coordenadas e raios reais positivos.
**Imagem:** pontos possÃ­veis de interseÃ§Ã£o entre circunferÃªncias.
**Comportamento:** diferenÃ§as entre quadrados de distÃ¢ncias linearizam parte do sistema.
**InterpretaÃ§Ã£o:** mostra por que mÃºltiplos satÃ©lites sÃ£o necessÃ¡rios para localizar o usuÃ¡rio.

### 3.3 FunÃ§Ã£o logarÃ­tmica - perda de sinal no espaÃ§o livre

A funÃ§Ã£o FSPL representa a perda de potÃªncia do sinal conforme distÃ¢ncia e frequÃªncia aumentam. Ela foi escolhida porque sinais GNSS chegam fracos Ã  superfÃ­cie e precisam de antena/receptor adequados.

**DomÃ­nio:** distÃ¢ncia maior que zero e frequÃªncia maior que zero.
**Imagem:** perda em decibÃ©is.
**Comportamento:** crescente e logarÃ­tmico; dobrar a distÃ¢ncia aumenta a perda, mas nÃ£o de forma linear.
**InterpretaÃ§Ã£o:** reforÃ§a a importÃ¢ncia da precisÃ£o informada pelo navegador no app.

### 3.4 FunÃ§Ã£o exponencial - erro posicional didÃ¡tico

A funÃ§Ã£o exponencial modela, de forma didÃ¡tica, a reduÃ§Ã£o do erro conforme mais satÃ©lites ficam disponÃ­veis. Ela nÃ£o afirma mediÃ§Ãµes reais; serve para visualizar o comportamento esperado.

**DomÃ­nio:** nÃºmero inteiro positivo de satÃ©lites visÃ­veis.
**Imagem:** erro positivo em metros.
**Comportamento:** decrescente; o ganho Ã© maior no inÃ­cio e estabiliza depois.
**InterpretaÃ§Ã£o:** ajuda a explicar por que um fix com mais satÃ©lites tende a ser mais confiÃ¡vel.

## 4. ImplementaÃ§Ã£o em Python

O arquivo `modelo_gnss.py` implementa cÃ¡lculos e grÃ¡ficos para as quatro funÃ§Ãµes. O programa usa funÃ§Ãµes com parÃ¢metros e retorno, imprime anÃ¡lise textual e salva grÃ¡ficos com tÃ­tulo, eixos e identificaÃ§Ã£o.

Quando `matplotlib` e `numpy` estÃ£o instalados, os grÃ¡ficos sÃ£o gerados em PNG. Se essas bibliotecas nÃ£o estiverem disponÃ­veis, o cÃ³digo usa fallback em SVG para manter a entrega executÃ¡vel.

## 5. GrÃ¡ficos e resultados esperados

Ao executar `python modelo_gnss.py`, o programa gera:

- `grafico_1_haversine`: distÃ¢ncia Ã  estaÃ§Ã£o SÃ© variando latitude.
- `grafico_2_trilateracao`: interseÃ§Ã£o didÃ¡tica de circunferÃªncias.
- `grafico_3_fspl`: perda de sinal em funÃ§Ã£o da distÃ¢ncia.
- `grafico_4_exponencial`: erro posicional conforme satÃ©lites visÃ­veis.

A saÃ­da textual apresenta domÃ­nio, imagem, crescimento/decrescimento e interpretaÃ§Ã£o fÃ­sica de cada modelo.

## 6. ConclusÃ£o tÃ©cnica

O modelo atende ao briefing porque conecta matemÃ¡tica, Python e IndÃºstria Espacial de forma coesa. Haversine resolve a distÃ¢ncia GNSS do app, a trilateraÃ§Ã£o explica a lÃ³gica de posicionamento, FSPL justifica limitaÃ§Ãµes de sinal e a funÃ§Ã£o exponencial comunica o impacto da quantidade de satÃ©lites.

Essas funÃ§Ãµes sustentam a proposta do HoloPass: uma soluÃ§Ã£o de mobilidade que usa tecnologia espacial para pagamento, localizaÃ§Ã£o, planejamento urbano e inclusÃ£o no transporte pÃºblico.

## 7. Como executar

```bash
python differentiated-problem-solving/modelo_gnss.py
```

DependÃªncias opcionais para grÃ¡ficos PNG:

```bash
pip install matplotlib numpy
```

Sem essas dependÃªncias, o script ainda gera grÃ¡ficos SVG automaticamente.
