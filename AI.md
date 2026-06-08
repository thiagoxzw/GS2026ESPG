# AI.md — Uso de Inteligência Artificial no HoloPass

Este arquivo declara o uso de ferramentas de IA no desenvolvimento do projeto,
conforme exigido pela disciplina de Web Development (Global Solution 2026).

## Ferramentas utilizadas

- **Claude (Anthropic)** — apoio em revisão de código, sugestões de
  arquitetura, escrita de documentação e cálculos matemáticos (modelagem GNSS).

## Onde a IA foi usada

- Revisão e refatoração da função de detecção de estação
  (substituição do cálculo Euclidiano pela fórmula de Haversine).
- Reescrita de textos da interface para alinhamento com o tema da Global
  Solution (Indústria Espacial).
- Sugestão de exibição da precisão real do GNSS (`pos.coords.accuracy`).
- Apoio na elaboração de documentos e do roteiro do pitch.

## Onde a IA NÃO foi usada

- A concepção original do produto (HoloPass como pulseira de transporte) é
  autoria dos integrantes.
- A integração com Firebase, NFC, Three.js e a lógica de IA preditiva interna
  do app (estimativa de atraso) foi desenvolvida pela equipe antes do apoio.
- Decisões de design visual e identidade da marca.

## Verificação humana

Todas as sugestões da IA foram revisadas e testadas pelos integrantes antes
de serem incorporadas ao projeto.
