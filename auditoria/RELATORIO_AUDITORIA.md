# RELATORIO DE AUDITORIA - HOLOPASS GS 2026

**Data:** 08/06/2026  
**Equipe:** Thiago Souza de Lima - RM 568732  
**Repositorio auditado:** `C:\Users\thiag\Downloads\HoloPassGS2026final (1)`  
**Status:** revisao final aplicada, com foco em produto real, GNSS, NFC,
HoloRoute, Edge e documentacao de engenharia.

## 1. Review Executivo

| Categoria geral | Status | Evidencia | Observacao |
|---|---:|---|---|
| Problema real identificado | PASS | `software-total-experience/Software_TXD_HoloPass.docx` | Mobilidade, seguranca, dependencia de celular e acesso desigual |
| Solucao tecnologica coerente | PASS | `index.html`, `script.js`, `edge-computing/sketch.ino` | Pulseira NFC/GNSS + PWA + Edge + Python |
| Conexao com Industria Espacial | PASS | `CHANGELOG_GNSS.md`, `modelo_gnss.py` | GNSS, Haversine e observacao da Terra conceitual |
| Integracao entre disciplinas | PASS | `software-total-experience/HoloPass_Software_TX.md` | Cada disciplina entrega uma camada do mesmo sistema |
| Viabilidade tecnica | PASS | `edge-computing/README.md` | Simulacoes sao rotuladas; hardware educacional e possivel |
| Impacto/ODS | PASS | Word/TXD e README | ODS 9, 10, 11 e 13 |

## 2. Matriz de Conformidade por Disciplina

| Disciplina | Item exigido | Status | Evidencia | Pontos em risco |
|---|---|---:|---|---:|
| Software & Total Experience | Sumario Executivo | PASS | `software-total-experience/Software_TXD_HoloPass.docx` | 0 |
| Software & Total Experience | Visao do Produto | PASS | `.docx`, secao 8 | 0 |
| Software & Total Experience | Backlog >=5 historias | PASS | `.docx`, secao 9 com 9 historias | 0 |
| Software & Total Experience | User Flow | PASS | `.docx`, secao 10 | 0 |
| Software & Total Experience | Word/PDF | PARCIAL | DOCX gerado; PDF Markdown gerado | Visual render Word bloqueado por ambiente |
| Edge Computing | README completo | PASS | `edge-computing/README.md` | 0 |
| Edge Computing | Codigo Arduino/C++ | PASS | `edge-computing/sketch.ino`; Arduino CLI OK | 0 |
| Edge Computing | Simulacao Wokwi/Tinkercad | PARCIAL externo | `diagram.json` existe; link publico ainda pendente | ate 30 |
| Edge Computing | Video | FALHA externa | Nao ha link/arquivo de video no repo | ate 50 |
| Storytelling/Pitch | Roteiro em 7 partes | PASS | `docs/Roteiro_Pitch_HoloPass.md` | 0 |
| Storytelling/Pitch | Video 5 min +/-15s | FALHA externa | Precisa gravar e publicar | ate 100 |
| Front-End Design | Landing com 6 secoes | PASS | parser local: 6 secoes e assets locais | 0 |
| Front-End Design | Menu, rodape, imagens, alt, CSS separado | PASS | `front-end-landing/`; `missing_alt=[]` | 0 |
| Front-End Design | Links quebrados | PASS | parser local: `broken_local_links=[]` | 0 |
| Computational Thinking | Arquivo unico, menu, retorno | PASS | execucao com opcoes 1-6 e invalidos | 0 |
| Computational Thinking | Estruturas obrigatorias | PASS | `holopass_menu.py`: match, if/elif, while, for, listas, strings, funcoes | 0 |
| Computational Thinking | Dependencias | PASS | usa apenas `math` e `sys` nativos | 0 |
| Web Development | JS puro, sem frameworks | PASS | `script.js`, `webdev.js` | 0 |
| Web Development | Slideshow, quiz, temas, forms | PASS | arquivos validados e sintaxe JS OK | 0 |
| Web Development | Rotas e NFC | PASS | rota critica e pagamento mantidos | 0 |
| Web Development | PWA | PASS | HTTP 200 para `manifest.json` e `sw.js`; cache v7.5 | 0 |
| Web Development | GitHub/commits/Org | PARCIAL externo | repo remoto existe; Org depende da regra da turma | variavel |
| DPS | 4 funcoes matematicas | PASS | `modelo_gnss.py` | 0 |
| DPS | Graficos e relatorio | PASS | execucao gerou 4 SVGs e PDF | 0 |

## 3. Testes Executados

| Componente | Cenario | Resultado | Evidencia |
|---|---|---:|---|
| JS app | Sintaxe | OK | `node --check script.js`, `webdev.js`, `sw.js` sem erro |
| App web | HTTP local | OK | `index.html`, `style.css`, `script.js`, `manifest.json` retornaram 200 |
| App web | Imagens e links locais | OK | `index.html imgs=4 missing_alt=[] broken_local_links=[]` |
| Landing | Imagens e links locais | OK | `imgs=5 missing_alt=[] broken_local_links=[]` |
| Rota critica | Osasco -> Trianon-MASP | OK | Linha 9 -> Linha 4 -> Linha 2; distancia `21.1 km`; 2 transferencias |
| HoloRoute | Recomendacao explicavel | OK | `Rota atual recomendada · 51 min` |
| Proximo trem | API real nao prometida | OK | rotulo `TREM ESTIMADO`; comentario no codigo informa estimativa local |
| Edge | Compilacao Arduino UNO | OK | `Sketch uses 8180 bytes (25%)`; RAM `391 bytes (19%)` |
| CT Python | Opcoes 1-6, invalido e retorno ao menu | OK | execucao automatizada confirmou descricao, GNSS, rota, recarga, viagem e historico |
| DPS Python | Execucao e graficos | OK | fallback interno gerou `grafico_1` a `grafico_4` |
| Word/TXD | Estrutura DOCX | OK | 42 paragrafos, 6 tabelas, 1 imagem local, equipe/RM presentes |
| Word/TXD | Render visual DOCX | BLOQUEADO | `soffice` ausente; Word COM travou ao exportar PDF |

## 4. Substituicoes Aplicadas

| Antes | Depois | Motivo |
|---|---|---|
| Titulo e badges ligados a fases antigas | `HoloPass - Mobilidade Inteligente por GNSS e NFC` | Produto final, nao roteiro de fase |
| Recursos visuais antigos sem valor central | Design fisico viavel da pulseira | Mais coerente com produto real |
| Decisao pouco explicavel | HoloRoute deterministico | Testavel, transparente e aderente a JS puro |
| Rota por origem/destino simplificada | Grafo de linhas, estacoes e corredores | Corrige baldeacoes |
| Osasco -> Trianon-MASP incorreta | Linha 9 -> Linha 4 -> Linha 2 | Alinha com trajeto esperado |
| Distancia operacional baixa | Escala Linha 9 + grafo com penalidade de transferencia | Resultado `21.1 km` |
| Contador parecia dado externo | Rótulo de estimativa local | Honestidade tecnica |
| Arduino simples | GNSS + NFC + saldo + telemetria + prioridade urbana | Edge mais forte |
| Word antigo simples | DOCX novo de engenharia | Cobre problema, arquitetura, ODS, backlog e user flow |
| ZIP com `.git/` | pacote limpo sera regenerado | Evita entregar historico interno desnecessario |

## 5. Evidencias de Comandos

```powershell
node --check script.js
node --check webdev.js
node --check sw.js
python -m py_compile computational-thinking\holopass_menu.py differentiated-problem-solving\modelo_gnss.py auditoria\gerar_word_txd.py
python computational-thinking\holopass_menu.py
python differentiated-problem-solving\modelo_gnss.py
arduino-cli compile --fqbn arduino:avr:uno <copia-temporaria>
python -m http.server 8000 --bind 127.0.0.1
```

## 6. O Que Nao Ficou 100% Interno ao Repo

- Video/pitch ainda precisa ser gravado e publicado.
- Link publico Wokwi ainda precisa ser publicado.
- Validacao de GNSS concedido precisa de celular/navegador com localizacao.
- Render visual do DOCX foi bloqueado por falta de LibreOffice e travamento do Word COM.
- Organizacao GitHub depende da regra operacional da turma.

## 7. Entregaveis Principais

- `software-total-experience/Software_TXD_HoloPass.docx`
- `software-total-experience/HoloPass_Software_TX.pdf`
- `auditoria/SPEC_REVISAO_FINAL.md`
- `auditoria/RELATORIO_AUDITORIA.md`
- `edge-computing/sketch.ino`
- `edge-computing/README.md`
- `index.html`, `style.css`, `script.js`, `sw.js`, `manifest.json`
