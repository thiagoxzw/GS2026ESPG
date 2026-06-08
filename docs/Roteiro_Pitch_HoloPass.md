# Roteiro do Pitch — HoloPass
### Storytelling e Inspiração Empreendedora · Global Solution 2026 · Indústria Espacial

**Duração-alvo:** 5 minutos (±15 s) · **Estrutura:** 7 partes · **Obrigatório:** imagem e voz do(s) apresentador(es) + slides

> Como usar: a coluna "FALA" é o que você diz; a coluna "TELA" é o que deve estar
> aparecendo (slide ou demonstração). Os tempos são uma sugestão para fechar em 5 min.
> Ensaie cronometrando — o tempo é critério de avaliação.

---

## Parte 1 — Abertura de impacto · (0:00–0:35)

**TELA:** Slide de abertura, logo HoloPass, fundo escuro com a pulseira.

**FALA:**
"Todo dia, milhões de pessoas passam pela catraca do transporte público. Tiram o celular do bolso, procuram o cartão, conferem o horário num aplicativo — muitas vezes expondo o aparelho ao roubo. E se a sua passagem, a sua localização e o seu próximo trem fossem resolvidos por algo que já está a vinte mil quilômetros acima da sua cabeça: um satélite? É isso que o HoloPass faz."

*(Dica: comece com energia. A primeira frase decide se a banca presta atenção.)*

---

## Parte 2 — O problema · (0:35–1:20)

**TELA:** Slide com as 3 dores (ícones: cadeado, mapa/?, pessoas).

**FALA:**
"Identificamos três dores no transporte público urbano. Primeira: a insegurança — manusear o celular em estações lotadas é um convite ao furto. Segunda: a falta de informação clara, em tempo real, sobre onde você está e quando o trem chega. E terceira: a exclusão — parte da população não tem smartphone ou tem dificuldade de usar aplicativos no dia a dia. O sistema atual de bilhetes e cartões físicos ainda gera filas, perdas e fraudes."

---

## Parte 3 — A solução · (1:20–2:15)

**TELA:** Demonstração do app HoloPass (tela real): apertar o botão GNSS e a estação ser detectada; mostrar a precisão em metros.

**FALA:**
"O HoloPass é uma pulseira inteligente que substitui o cartão e o bilhete. Você aproxima o pulso da catraca e paga por NFC — sem celular, sem cartão. E aqui está o coração da solução: a pulseira usa posicionamento por satélite, o GNSS, para saber automaticamente em qual estação você está. Veja na tela: ao tocar aqui, o sistema detecta a estação mais próxima e mostra a precisão real, em metros, do sinal do satélite. A partir daí, ele calcula a rota e o tempo até o seu destino."

*(Mostre a tela funcionando de verdade — vale mais que qualquer slide.)*

---

## Parte 4 — Proposta de valor e impacto · (2:15–3:00)

**TELA:** Slide com benefícios (segurança, acessibilidade, tempo real) + ODS 9.

**FALA:**
"O valor do HoloPass está em juntar três coisas num só dispositivo vestível: pagamento, localização por satélite e avisos de viagem. Mais segurança, porque você não expõe o celular. Mais acessibilidade, porque funciona para quem não tem smartphone. E mais inteligência, porque a pulseira antecipa atrasos e sugere a rota menos lotada. Isso se conecta diretamente ao Objetivo de Desenvolvimento Sustentável número 9 — indústria, inovação e infraestrutura — e torna a mobilidade urbana mais igualitária."

---

## Parte 5 — Tecnologias · (3:00–4:00)

**TELA:** Demonstração do ARDUINO no Wokwi (aqui entra o Edge Computing!) — o LED piscando a cada leitura de posição e o buzzer apitando ao chegar na estação.

**FALA:**
"Por trás do HoloPass há um conjunto de tecnologias integradas. O posicionamento vem do GNSS — as constelações de satélites GPS, Galileo e GLONASS. Para calcular a distância exata entre você e a estação na superfície curva da Terra, usamos a fórmula matemática de Haversine. E o coração físico da pulseira é este módulo embarcado que vocês veem aqui no simulador: o microcontrolador recebe a posição do satélite, calcula a estação mais próxima e, quando você está chegando, dispara o alerta — este LED representa o sinal recebido e este aviso sonoro avisa o desembarque. O pagamento usa NFC, e tudo roda mesmo sem o celular."

*(Esta parte é a ponte com Edge Computing — é o MESMO vídeo das duas disciplinas. Mostre o circuito rodando.)*

---

## Parte 6 — A equipe · (4:00–4:30)

**TELA:** Slide com foto e nome + RM de cada integrante.

**FALA:**
"Somos a equipe por trás do HoloPass. [Cada integrante se apresenta rapidamente: nome e uma frase do que fez no projeto — ex.: front-end, modelagem matemática, circuito embarcado, design.]"

*(Aqui aparecem rosto e voz dos apresentadores — requisito obrigatório.)*

---

## Parte 7 — Encerramento · (4:30–5:00)

**TELA:** Slide final com a frase de impacto + logo + ODS.

**FALA:**
"O HoloPass mostra que tecnologia espacial não é coisa distante: ela já pode pagar a sua passagem, te localizar e te guiar com segurança. É um problema da Terra resolvido com a ajuda dos satélites. Nosso próximo passo é levar isso ainda mais longe, usando dados de observação da Terra para identificar regiões mal atendidas pelo transporte. Obrigado — este é o HoloPass: o código que move o universo, agora movendo as cidades."

---

## Checklist de gravação

- [ ] Vídeo entre 4:45 e 5:15 (cronometrar no ensaio)
- [ ] Rosto e voz de quem apresenta aparecem
- [ ] App demonstrado funcionando (detecção GNSS na tela real)
- [ ] Arduino/Wokwi demonstrado (mesmo vídeo serve para Edge Computing)
- [ ] Slides nas 7 partes
- [ ] Nome + RM de todos no slide da equipe e na descrição do vídeo
- [ ] Subir no YouTube (público ou não listado) e postar o link no Teams

> Observação honesta: na fala, diga "posicionamento GNSS do dispositivo", e não
> "conectado ao satélite X". O navegador entrega a precisão real, mas não o número
> de satélites — então não afirme dados que não consegue comprovar se perguntarem.
