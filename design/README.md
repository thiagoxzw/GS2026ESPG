# HoloPass - Design fisico da pulseira

Esta pasta guarda a referencia visual local do design fisico da pulseira
HoloPass usada no app principal.

## Arquivos

- `holopass-band-redesign-preview.png`: imagem local exibida no app web.

## Decisao de produto

O HoloPass foi simplificado para focar no que melhora a nota e a viabilidade:
uma pulseira realista com display proprio, antena NFC, vibracao, bateria e
processamento embarcado. A antiga experiencia visual futurista foi removida da entrega
principal porque nao era requisito obrigatorio e aumentava risco de desempenho,
links externos e manutencao.

## Diretrizes do design

- Modulo baixo com vidro 2.5D para leitura rapida de saldo, rota e chegada.
- Area NFC traseira para aproximar o pulso da catraca de forma natural.
- Vibracao como alerta acessivel para chegada, erro ou pagamento aprovado.
- Estrutura modular para troca de pulseira, bateria ou modulo eletronico.
- Uso viavel com componentes educacionais: OLED/AMOLED pequeno, RFID/NFC,
  motor de vibracao e microcontrolador.

## Proximo passo fisico

Construir uma versao simples com ESP32 ou Arduino, display OLED, RFID/NFC,
motor de vibracao e bateria. O pagamento real nao precisa ser implementado no
protótipo educacional; basta demonstrar identificacao, saldo, estacao detectada
e alerta de rota.
