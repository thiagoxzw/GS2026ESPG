# RELATORIO DE AUDITORIA - HOLOPASS GS 2026

**Data:** 08/06/2026  
**Equipe:** Thiago Souza de Lima - RM 568732  
**Repositorio auditado:** `C:\Users\thiag\Downloads\HoloPassGS2026final (1)`  
**Status:** revisao final aplicada, com foco em produto real, GNSS, NFC, HoloRoute, Edge, dados externos e documentacao.

## 1. Review Executivo

| Categoria geral | Status | Evidencia | Observacao |
|---|---:|---|---|
| Problema real identificado | PASS | `software-total-experience/Software_TXD_HoloPass.docx` | Mobilidade, seguranca, dependencia de celular e acesso desigual |
| Solucao tecnologica coerente | PASS | `index.html`, `script.js`, `edge-computing/sketch.ino` | Pulseira NFC/GNSS + PWA + Edge + Python |
| Conexao com Industria Espacial | PASS | `modelo_gnss.py`, camada GNSS do app | GNSS, Haversine, FSPL e contexto de Observacao da Terra |
| Integracao entre disciplinas | PASS | `software-total-experience/HoloPass_Software_TX.pdf` | Todas as entregas defendem o mesmo produto |
| Viabilidade tecnica | PASS | `edge-computing/README.md`, `diagram.json` | Simulacoes rotuladas; circuito educacional mais completo |
| Impacto/ODS | PASS | Word/TXD, landing, README | ODS 9, 10, 11 e 13 |

## 2. Matriz de Conformidade

| Disciplina | Item exigido | Status | Evidencia | Pontos em risco |
|---|---|---:|---|---:|
| Software & Total Experience | Sumario Executivo | PASS | `.docx`, secao 1 | 0 |
| Software & Total Experience | Visao do Produto | PASS | `.docx`, secao 8 | 0 |
| Software & Total Experience | Backlog >=5 historias | PASS | `.docx`, secao 9 com 9 historias | 0 |
| Software & Total Experience | User Flow | PASS | `.docx`, secao 10 | 0 |
| Software & Total Experience | Word/PDF | PARCIAL | DOCX/PDF gerados | Render visual DOCX bloqueado por falta de `soffice` |
| Edge Computing | README completo | PASS | `edge-computing/README.md` | 0 |
| Edge Computing | Codigo Arduino/C++ | PASS | Arduino CLI compilou UNO | 0 |
| Edge Computing | Circuito Wokwi/Tinkercad | PARCIAL externo | `diagram.json` completo; link publico pendente | ate 30 |
| Edge Computing | Video | FALHA externa | Nao ha video no repo | ate 50 |
| Storytelling/Pitch | Roteiro em 7 partes | PASS | `docs/Roteiro_Pitch_HoloPass.md` | 0 |
| Storytelling/Pitch | Video 5 min +/-15s | FALHA externa | Precisa gravar/publicar | ate 100 |
| Front-End Design | Landing com 6 secoes | PASS | `front-end-landing/index.html` | 0 |
| Front-End Design | Menu, rodape, imagens, alt, CSS separado | PASS | parser local OK | 0 |
| Front-End Design | Links quebrados | PASS | parser local OK | 0 |
| Computational Thinking | Arquivo unico, menu, retorno | PASS | execucao automatizada opcoes 1-6 | 0 |
| Computational Thinking | Estruturas obrigatorias | PASS | `holopass_menu.py` | 0 |
| Computational Thinking | Dependencias | PASS | somente bibliotecas nativas | 0 |
| Web Development | JS puro, sem frameworks | PASS | `script.js`, `webdev.js` | 0 |
| Web Development | Slideshow, quiz, temas, forms | PASS | `webdev.js`, sintaxe OK | 0 |
| Web Development | Rotas, NFC, GNSS e PWA | PASS | rota critica, API real e SW v7.6 | 0 |
| Web Development | GitHub/commits/Org | PARCIAL externo | remoto existe; Org depende da turma | variavel |
| DPS | Funcoes, graficos e relatorio | PASS | `modelo_gnss.py`, PDF e 4 graficos SVG | 0 |

## 3. Testes Executados

| Componente | Cenario | Resultado | Evidencia |
|---|---|---:|---|
| JS app | Sintaxe | OK | `node --check script.js`, `webdev.js`, `sw.js` sem erro |
| App web | HTTP local | OK | `/`, CSS, JS, landing, design e PNG retornaram HTTP 200 |
| App web | Assets locais | OK | imagens com `alt`, ancoras e recursos locais existentes |
| Rota critica | Osasco -> Trianon-MASP | OK | Linha 9 -> Linha 4 -> Linha 2; `21.1 km`; 2 transferencias |
| Proximo trem | ViaMobilidade real | OK | `L9/OSA` retornou HTTP 200 e `proximo_em` real |
| Status linha | ARTESP/CCM | OK | API publica retornou HTTP 200 e timestamp `2026-06-08` |
| Cobertura urbana | Overpass | PARCIAL | instancia principal limitou/504 em teste; app tenta alternativa e fallback |
| Cobertura urbana | GTFS SPTrans | OK | asset gerado com 22.086 paradas; Trianon encontrou 31 paradas em 800 m |
| Edge | Compilacao Arduino UNO | OK | `Sketch uses 9242 bytes (28%)`; RAM `399 bytes (19%)` |
| CT Python | Invalidos, recarga, viagem e historico | OK | execucao automatizada concluiu com exit 0 |
| DPS Python | Execucao e graficos | OK | fallback interno gerou `grafico_1` a `grafico_4` SVG |
| Word/TXD | Geracao DOCX/PDF | OK | `gerar_word_txd.py` e `gerar_pdfs.py` executaram |
| Word/TXD | Render visual DOCX | BLOQUEADO | renderizador falhou por conversor externo ausente |

## 4. Substituicoes Aplicadas

| Antes | Depois | Motivo |
|---|---|---|
| Design descartavel/ausente | Design da pulseira restaurado do `design.zip` | Produto fisico mais forte |
| Mapa conceitual sem dado externo | GNSS + Overpass/OSM + GTFS SPTrans + Haversine | Priorizar areas com dados consultaveis |
| Proximo trem estimado | API publica ViaMobilidade quando coberta | Informacao mais segura |
| Parser de status simples | Parser do formato real ARTESP `empresas[].linhas[]` | Compatibilidade com API oficial |
| Rota Osasco -> Trianon errada | Grafo retorna Linha 9 -> 4 -> 2 | Corrige baldeacoes reais |
| Edge LED+buzzer | LEDs, botoes, buzzer, potenciometro, NFC, recarga e score urbano | Entrega Edge mais impactante |
| Landing basica | Landing redesenhada com hero, indicadores e 6 secoes | Melhor apresentacao Front-End |
| Relatorios simples | DOCX/PDF/Markdown reestruturados | Entrega mais profissional |

## 5. Comandos de Evidencia

```powershell
node --check script.js
node --check webdev.js
node --check sw.js
python -m py_compile computational-thinking\holopass_menu.py differentiated-problem-solving\modelo_gnss.py
python auditoria\gerar_sptrans_gtfs_asset.py
python auditoria\gerar_word_txd.py
python auditoria\gerar_pdfs.py
python differentiated-problem-solving\modelo_gnss.py
arduino-cli compile --fqbn arduino:avr:uno <copia-temporaria>
Invoke-WebRequest https://apim-proximotrem-prd-brazilsouth-001.azure-api.net/api/v1/lines/L9/stations/OSA/next-train
Invoke-WebRequest https://ccm.artesp.sp.gov.br/metroferroviario/api/status/
```

## 6. Pendencias Externas

- Gravar pitch de 5 min (+/-15s), com voz, imagem e slides.
- Publicar link publico do Wokwi.
- Testar GNSS concedido em celular real.
- Confirmar se a turma exige repositorio dentro de Organizacao GitHub.
- Validar visualmente o DOCX no Word/LibreOffice local antes de enviar.

## 7. Entregaveis Principais

- `software-total-experience/Software_TXD_HoloPass.docx`
- `software-total-experience/HoloPass_Software_TX.pdf`
- `computational-thinking/RELATORIO_EXECUCAO_CT.pdf`
- `differentiated-problem-solving/RELATORIO_MODELO_GNSS.pdf`
- `assets/sptrans-stops.min.json`
- `edge-computing/sketch.ino`, `diagram.json`, `README.md`
- `index.html`, `style.css`, `script.js`, `webdev.js`, `sw.js`, `manifest.json`
- `front-end-landing/`
