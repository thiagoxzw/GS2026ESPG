# Roteiro e Prompts do Pitch - HoloPass

**Storytelling / Pitch - Global Solution 2026 - Industria Espacial**
**Integrante:** Thiago Souza de Lima - RM 568732
**Duracao exigida:** 5 minutos, com tolerancia de 15 segundos para mais ou para menos
**Obrigatorio:** imagem e voz do apresentador, slides, nome completo e RM.

## Estrutura obrigatoria do video

O video deve seguir as 7 partes pedidas na rubrica:

1. Abertura.
2. Problema.
3. Solucao.
4. Proposta de valor.
5. Tecnologias.
6. Equipe.
7. Encerramento.

Use exatamente 7 slides para manter a narrativa limpa e facilitar a avaliacao.

## Slide 1 - Abertura

**Tempo:** 0:00 a 0:35
**Objetivo:** prender a atencao e apresentar o HoloPass como produto real.
**Na tela:** nome HoloPass, frase curta, imagem do app/painel operacional ou pulseira conceitual, nome e RM no rodape.

**Texto do slide:**
- HoloPass
- Mobilidade inteligente por GNSS e NFC
- Thiago Souza de Lima - RM 568732

**Fala sugerida:**
"Todo dia, pessoas passam pela catraca do transporte publico procurando cartao, celular ou saldo. Em estacoes cheias, isso gera atraso, inseguranca e exclusao. O HoloPass propoe uma forma mais simples: pagar por aproximacao, localizar a estacao por GNSS e orientar a viagem em um unico sistema."

**Prompt para montar o slide:**
"Crie um slide de abertura para o projeto HoloPass, com visual tecnologico e espacial, fundo escuro, detalhes em ciano e roxo, titulo grande 'HoloPass', subtitulo 'Mobilidade inteligente por GNSS e NFC', rodape com 'Thiago Souza de Lima - RM 568732' e espaco para uma captura do app com painel operacional."

**Checklist do slide:**
- Nome do projeto visivel.
- Nome e RM visiveis.
- Tema espacial claro.
- Apresentador com voz e imagem no video.

## Slide 2 - Problema

**Tempo:** 0:35 a 1:20
**Objetivo:** explicar quem sofre, quanto custa e por que importa.
**Na tela:** tres dores com icones: inseguranca, falta de previsibilidade e desigualdade de acesso.

**Texto do slide:**
- Celular exposto em estacoes lotadas
- Falta de rota e horario confiavel
- Exclusao de quem tem pouco acesso digital

**Fala sugerida:**
"O problema central e a friccao na mobilidade urbana. O passageiro perde tempo na catraca, expoe o celular, nem sempre sabe qual baldeacao fazer e muitas vezes depende de aplicativos que exigem internet e familiaridade digital. Isso afeta principalmente quem precisa do transporte todos os dias para estudar, trabalhar e acessar servicos."

**Prompt para montar o slide:**
"Crie um slide de problema para mobilidade urbana com tres blocos visuais: seguranca, informacao e inclusao. Use icones simples, fundo escuro, alto contraste, no maximo uma frase curta por bloco e destaque que o problema afeta passageiros reais do transporte publico."

**Checklist do slide:**
- Mostra problema real.
- Mostra publico afetado.
- Nao fica generico.
- Conecta mobilidade com impacto social.

## Slide 3 - Solucao

**Tempo:** 1:20 a 2:10
**Objetivo:** mostrar o que foi construido e como funciona.
**Na tela:** app principal com painel GNSS/NFC, rota calculada e saldo.

**Texto do slide:**
- Pagamento NFC
- Diagnostico GNSS
- Rota operacional com baldeacoes
- PWA offline

**Fala sugerida:**
"A solucao e o HoloPass: uma pulseira inteligente integrada a um app PWA. O passageiro consulta saldo, detecta a estacao por GNSS, calcula a rota e valida a entrada por NFC. No prototipo web, o painel mostra a precisao real do navegador, a catraca simulada, a tarifa de R$ 5,40 e o historico de validacoes."

**Prompt para montar o slide:**
"Crie um slide de solucao para o HoloPass mostrando quatro capacidades: NFC, GNSS, rota operacional e PWA offline. O layout deve parecer uma demonstracao de produto, com captura do app em destaque e pequenos selos tecnicos explicando cada funcao."

**Checklist do slide:**
- Mostra produto funcionando.
- Cita NFC e GNSS.
- Cita tarifa correta R$ 5,40.
- Evita prometer hardware real nao construido.

## Slide 4 - Proposta de valor e impacto

**Tempo:** 2:10 a 2:55
**Objetivo:** defender por que a solucao vale a pena.
**Na tela:** beneficios e ODS.

**Texto do slide:**
- Mais seguranca
- Menos dependencia do celular
- Melhor previsibilidade
- ODS 9, ODS 10 e ODS 11

**Fala sugerida:**
"O valor do HoloPass esta em juntar pagamento, localizacao e orientacao de viagem. Ele reduz a exposicao do celular, simplifica o embarque, melhora a previsibilidade e ajuda a identificar areas mal atendidas por transporte. Por isso, o projeto se conecta aos ODS 9, 10 e 11: infraestrutura, reducao de desigualdades e cidades sustentaveis."

**Prompt para montar o slide:**
"Crie um slide de proposta de valor com quatro cards objetivos: seguranca, acessibilidade, previsibilidade e planejamento urbano. Inclua os selos ODS 9, ODS 10 e ODS 11 em destaque, mantendo estilo tecnologico, limpo e profissional."

**Checklist do slide:**
- Beneficios mensuraveis ou verificaveis.
- ODS aparecem claramente.
- Impacto social e urbano.
- Linguagem de produto, nao apenas ideia.

## Slide 5 - Tecnologias

**Tempo:** 2:55 a 4:05
**Objetivo:** provar arquitetura, disciplinas integradas e conexao espacial.
**Na tela:** diagrama simples com Web/PWA, Python, Arduino, GNSS, NFC, GTFS/OpenStreetMap.

**Texto do slide:**
- GNSS + Haversine
- NFC e Arduino
- Python CT e DPS
- PWA em HTML/CSS/JS puro
- Dados urbanos: OpenStreetMap, GTFS SPTrans e ViaMobilidade quando coberta

**Fala sugerida:**
"A conexao espacial vem do GNSS. O sistema usa latitude, longitude, precisao real e Haversine para encontrar estacoes proximas. Em Python, o DPS modela Haversine, trilateracao, perda de sinal e erro posicional. No CT, o menu calcula rotas na rede completa. No Edge, o Arduino simula NFC, saldo, sensores, LED, buzzer e telemetria. No Web, tudo roda em HTML, CSS e JavaScript puro, com PWA offline."

**Prompt para montar o slide:**
"Crie um slide tecnico com diagrama de arquitetura do HoloPass. Mostre cinco camadas conectadas: App PWA, Python CT, Modelo Matematico DPS, Arduino Edge e Dados Urbanos. Use setas simples, icones de satelite, NFC, mapa e microcontrolador. Inclua a frase 'Tecnologia espacial aplicada a mobilidade urbana'."

**Checklist do slide:**
- Explica arquitetura.
- Cita Industria Espacial por GNSS.
- Mostra integracao entre disciplinas.
- Cita que APIs externas sao usadas apenas quando cobertas.

## Slide 6 - Equipe

**Tempo:** 4:05 a 4:30
**Objetivo:** cumprir requisito de nome, RM, voz e imagem.
**Na tela:** foto ou camera do apresentador, nome, RM e responsabilidades.

**Texto do slide:**
- Thiago Souza de Lima
- RM 568732
- Engenharia de Software - FIAP
- Desenvolvimento, modelagem, Edge, Web e documentacao

**Fala sugerida:**
"Eu sou Thiago Souza de Lima, RM 568732. Desenvolvi o HoloPass integrando produto, front-end, web development, Python, modelagem matematica, edge computing e documentacao. A proposta foi manter todas as disciplinas conectadas a um mesmo sistema, nao como entregas separadas."

**Prompt para montar o slide:**
"Crie um slide de equipe individual com foto ou espaco para foto do apresentador, nome 'Thiago Souza de Lima', RM 568732, curso Engenharia de Software e uma lista curta de responsabilidades: Web, Front-End, Python, DPS, Edge e documentacao."

**Checklist do slide:**
- Nome completo visivel.
- RM visivel.
- Rosto e voz aparecem no video.
- Responsabilidades aparecem.

## Slide 7 - Encerramento

**Tempo:** 4:30 a 5:00
**Objetivo:** fechar com frase forte e proximo passo.
**Na tela:** logo HoloPass, resumo de 3 pilares e chamada final.

**Texto do slide:**
- Pagar
- Localizar
- Orientar
- HoloPass: tecnologia espacial movendo cidades

**Fala sugerida:**
"O HoloPass mostra que tecnologia espacial nao precisa estar distante. Ela pode ajudar o passageiro a pagar, se localizar e escolher melhor sua rota. O proximo passo e evoluir a priorizacao urbana com dados oficiais para apoiar novas estacoes e melhorar o acesso ao transporte. Obrigado. Este e o HoloPass: tecnologia espacial movendo cidades."

**Prompt para montar o slide:**
"Crie um slide final de encerramento para o HoloPass com fundo espacial urbano, logo ou titulo central, tres palavras grandes 'Pagar, Localizar, Orientar' e a frase final 'Tecnologia espacial movendo cidades'. Inclua no rodape Thiago Souza de Lima - RM 568732."

**Checklist do slide:**
- Fecha em ate 5 minutos.
- Retoma problema e solucao.
- Mostra proximo passo realista.
- Agradecimento curto.

## Checklist final de gravacao

- Video entre 4:45 e 5:15.
- Imagem e voz do apresentador aparecem.
- Todos os 7 slides aparecem no video.
- Nome e RM aparecem no slide 1, slide 6 e descricao/envio.
- Demonstrar o app funcionando, mesmo que rapidamente.
- Mostrar o Arduino/Wokwi se o mesmo video for usado em Edge.
- Nao afirmar dado de satelite especifico que nao foi medido.
- Dizer "GNSS do dispositivo/navegador" quando falar da localizacao real.
- Publicar conforme a orientacao da turma e enviar no Portal/Teams conforme pedido.
