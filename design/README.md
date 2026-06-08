# HoloPass - Design do Protótipo

Esta pasta guarda o re-design visual da pulseira HoloPass.

## Arquivos

- `holopass-band-redesign.html`: estudo 3D separado, com a pulseira em tela cheia.
- `holopass-band-redesign-preview.png`: imagem usada como prévia dentro do MVP principal.

## Decisão principal

O HoloPass deve funcionar sem depender do celular durante o transporte. Por isso, o módulo central precisa ter display próprio, vidro de proteção, antena NFC, bateria e vibração dentro da própria pulseira.

## O que melhorou no conceito

- O módulo não parece mais colado na pulseira: ele fica em um berço metálico baixo, embutido no couro.
- O display fica protegido por vidro curvado 2.5D, como em uma smartband.
- A área NFC fica na parte traseira/inferior, facilitando aproximar o pulso da catraca.
- O holograma continua como simulação visual futurista, mas a experiência real fica garantida pelo display e pela vibração.

## Pontos que ainda precisam ser decididos

- Material final da pulseira: couro slim, silicone, tecido técnico ou material híbrido.
- Tipo de fecho: magnético, encaixe por trilho ou presilha simples.
- Tamanho real do módulo para caber bateria, NFC, microcontrolador e display.
- Resistência contra suor, chuva, queda, atrito e uso diário.
- Modo de acessibilidade: vibração, áudio opcional, alto contraste e botão de emergência.
- Segurança de dados e pagamento: autenticação, criptografia e bloqueio em caso de perda.

## Próximo passo de prototipagem

Criar uma versão física simples com ESP32, RFID/NFC, display OLED e motor de vibração. Essa versão não precisa ter pagamento real; ela deve apenas simular identificação, saldo, estação detectada e aviso de rota.

## Fase 6 - Interface 3D e RA

- O MVP agora tem um canvas Three.js para criar o holograma 3D no navegador.
- O botão de RA tenta usar WebXR e abre uma sobreposição simulada quando o aparelho não é compatível.
- O botão de gesto tenta ler sensores do aparelho e também tem simulação de levantar o pulso.
- Manter a pulseira funcional sem celular; RA deve ser recurso extra, não requisito para pagar passagem.

## Fase 7 - Inteligência artificial

- O MVP calcula risco de atraso usando horário, clima simulado, linha, paradas e baldeações.
- O sistema sugere rota menos lotada/mais eficiente entre candidatas possíveis.
- O histórico local detecta padrões de deslocamento do usuário para antecipar destino provável.
- Proteger dados pessoais com criptografia e opção de apagar histórico.
