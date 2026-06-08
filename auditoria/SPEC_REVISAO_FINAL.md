# SPEC - Revisao Final HoloPass GS 2026

**Equipe:** Thiago Souza de Lima - RM 568732  
**Objetivo:** manter o HoloPass coeso, funcional e alinhado com a rubrica da
Global Solution 2026.

## 1. Direcao de Produto

O HoloPass deve ser apresentado como uma solucao realista de mobilidade:
pulseira inteligente com NFC, GNSS, display, vibracao, PWA offline, rota
operacional e apoio pratico ao planejamento urbano por OpenStreetMap/Overpass
e GTFS SPTrans.

Nao apresentar recursos sem evidencia tecnica ou dependencia externa nao
validada. Quando algo for demonstrativo, rotular claramente como conceitual ou
estimado.

## 2. Substituicoes Obrigatorias Mantidas

| Antes | Depois correto | Motivo |
|---|---|---|
| Vitrine visual sem operacao central | Painel GNSS + NFC + metricas de viagem | Mais funcional, testavel e aderente ao produto |
| Promessas tecnicas sem evidencia | HoloRoute deterministico | Explicavel, testavel e coerente com JS puro |
| Rota origem/destino simplificada | Grafo de linhas, estacoes e transferencias | Corrige baldeacoes reais |
| Distancia reta como viagem | Distancia operacional estimada por trechos | Evita erro de leitura do avaliador |
| Contador de trem como se fosse API real | API publica ViaMobilidade quando coberta, fallback documentado | Honestidade tecnica |
| Mapa conceitual sem dado externo | GNSS + OpenStreetMap/Overpass + GTFS SPTrans + Haversine | Prioriza areas carentes com dado consultavel |
| Arduino simples | GNSS + NFC + saldo + botoes + LEDs + buzzer + demanda + telemetria | Entrega Edge mais forte |

## 3. Caso Critico de Rota

Validar sempre:

- Origem: `Linha 9 - Esmeralda | Osasco`
- Destino: `Linha 2 - Verde | Trianon-MASP`
- Resultado esperado:
  - Linha 9 ate Pinheiros;
  - transferencia Pinheiros para Linha 4;
  - Linha 4 ate Paulista;
  - transferencia Paulista/Consolacao para Linha 2;
  - Linha 2 ate Trianon-MASP;
  - distancia aproximada: `20,8 km`;
  - metodo: operacional estimado por trechos da rede.

## 4. Requisitos de Honestidade Tecnica

- GNSS usa precisao real quando navegador permite geolocalizacao.
- CBERS-4A/Amazonia-1 aparecem como contexto espacial, sem afirmar imagem orbital processada.
- Prioridade urbana usa OpenStreetMap/Overpass quando ha internet, GTFS SPTrans local e fallback de estacoes cadastradas.
- Proximo trem usa API publica ViaMobilidade em estacoes cobertas; lotacao segue estimativa local.
- Pagamento NFC e Arduino usam simulacao educacional.
- Python CT nao usa dependencia externa alem de bibliotecas nativas.
- DPS pode usar `numpy/matplotlib` quando disponiveis e possui fallback SVG.

## 5. Checklist de Teste Antes da Entrega

```powershell
node --check script.js
node --check webdev.js
node --check sw.js
python -m py_compile computational-thinking\holopass_menu.py differentiated-problem-solving\modelo_gnss.py auditoria\gerar_word_txd.py
python computational-thinking\holopass_menu.py
python differentiated-problem-solving\modelo_gnss.py
arduino-cli compile --fqbn arduino:avr:uno <pasta-temporaria-com-sketch>
python -m http.server 8000 --bind 127.0.0.1
```

No navegador, conferir:

- console sem erro;
- login demo, recarga, rota, pagamento e historico;
- rota Osasco -> Trianon-MASP com baldeacoes corretas;
- GNSS negado e concedido quando dispositivo permitir;
- tema persistente;
- slideshow, quiz e feedback;
- PWA offline;
- mobile, tablet e desktop.

## 6. Pendencias Externas

- Publicar link publico do Wokwi.
- Gravar pitch de 5 min (+/-15s), com voz/rosto/slides.
- Subir video no YouTube com nome e RM.
- Confirmar exigencia de Organizacao GitHub da turma.
- Testar GNSS concedido em celular real.
- Adicionar prints reais aos PDFs se o professor exigir imagens de execucao.

## 7. Arquivos de Entrega Prioritarios

- `index.html`, `style.css`, `script.js`, `webdev.js`, `manifest.json`, `sw.js`
- `front-end-landing/`
- `edge-computing/sketch.ino`, `diagram.json`, `README.md`
- `computational-thinking/holopass_menu.py`
- `differentiated-problem-solving/modelo_gnss.py`
- `software-total-experience/Software_TXD_HoloPass.docx`
- `software-total-experience/HoloPass_Software_TX.pdf`
- `auditoria/RELATORIO_AUDITORIA.md`
- `auditoria/SPEC_REVISAO_FINAL.md`
