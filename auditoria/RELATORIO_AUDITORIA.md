# RELATORIO DE AUDITORIA - HOLOPASS GS 2026

**Data:** 08/06/2026  
**Equipe:** Thiago Souza de Lima - RM 568732  
**Repositorio auditado:** `C:\Users\thiag\Downloads\HoloPassGS2026final (1)`  
**PDFs de requisitos lidos:** `GS_ESW_1Ano_Presencial_.pdf` e `GS1_.pdf`

## 1. Escopo Lido

Foram inspecionados os arquivos versionados do projeto: app web da raiz, landing page, Arduino, Python CT, Python DPS, design, docs, manifest/PWA, service worker, assets locais e arquivos de equipe. Tambem foram lidos os PDFs oficiais anexados para montar a matriz por disciplina.

## 2. Matriz de Conformidade

| Disciplina | Item exigido | Status | Evidencia | Pontos em risco |
|---|---|---:|---|---:|
| Software & Total Experience Design | Sumario Executivo | PASS | `software-total-experience/HoloPass_Software_TX.md` e `.pdf` | 0 |
| Software & Total Experience Design | Visao do Produto | PASS | `software-total-experience/HoloPass_Software_TX.md` | 0 |
| Software & Total Experience Design | Backlog com >=5 historias | PASS | `software-total-experience/HoloPass_Software_TX.md` | 0 |
| Software & Total Experience Design | Diagrama/User Flow | PASS | `software-total-experience/HoloPass_Software_TX.md` | 0 |
| Software & Total Experience Design | Word -> PDF oficial | PARCIAL | PDF gerado; fonte em Markdown. DOCX ainda nao foi exportado/validado | ate 10 |
| Edge Computing | README completo | PARCIAL | `edge-computing/README.md:77`, `edge-computing/README.md:105` | ate 5 |
| Edge Computing | Codigo Arduino/C++ | PASS | `edge-computing/sketch.ino`; compile Arduino CLI OK | 0 |
| Edge Computing | Repo GitHub publico | PARCIAL | `README.md` aponta GitHub; publicacao/Org depende de push externo | ate 20 |
| Edge Computing | Simulacao Wokwi/Tinkercad com link | PARCIAL | `edge-computing/diagram.json`; link Wokwi ainda placeholder em `edge-computing/README.md:86` | ate 30 |
| Edge Computing | Video mesmo do pitch | FALHA externa | Nao ha arquivo/link de video no repo | 50 |
| Storytelling/Pitch | Roteiro em 7 partes | PASS | `docs/Roteiro_Pitch_HoloPass.md` | 0 |
| Storytelling/Pitch | Video 5 min +/-15s com rosto/voz/slides/YouTube | FALHA externa | Roteiro existe; video/upload nao esta no repo | ate 100 |
| Front-End Design | Landing com 6 secoes obrigatorias | PASS | `front-end-landing/index.html`; teste Browser: 6 ids | 0 |
| Front-End Design | Menu funcional/ancoras | PASS | Browser: clique `#tecnologia`, hash `#tecnologia`, alvo visivel | 0 |
| Front-End Design | Rodape nome + RM | PASS | Browser: `Thiago - RM 568732`; `front-end-landing/integrantes.txt:1` | 0 |
| Front-End Design | Imagens/icones + alt | PASS | Validador: 5 imagens, `missing_alt=[]` | 0 |
| Front-End Design | Google Fonts, variaveis CSS, reset, Flexbox, HTML/CSS separados | PASS | `front-end-landing/css/reset.css`, `front-end-landing/css/style.css`, `front-end-landing/index.html` | 0 |
| Front-End Design | Sem links quebrados | PASS | Validador: `broken_links=[]` | 0 |
| Front-End Design | `integrantes.txt` e `link_github.txt` | PASS | `front-end-landing/integrantes.txt:1`, `front-end-landing/link_github.txt` | 0 |
| Computational Thinking | Arquivo unico com menu e retorno | PASS | `computational-thinking/holopass_menu.py`; execucao completa OK | 0 |
| Computational Thinking | >=5 itens e >=4 prototipos | PASS | menu com 6 opcoes funcionais | 0 |
| Computational Thinking | if/elif/else, match-case, while, for, listas, strings, funcoes, validacao | PASS | `computational-thinking/holopass_menu.py` | 0 |
| Computational Thinking | PDF com descricao + prints | PARCIAL | `computational-thinking/RELATORIO_EXECUCAO_CT.pdf`; contem evidencia textual, nao screenshots coladas | ate 10 |
| Web Development | JS puro, sem framework/bundler | PASS | `script.js`, `webdev.js`, HTML/CSS puros | 0 |
| Web Development | Slideshow 3 imagens | PASS | Browser: 3 slides, imagens carregadas, prev/next OK | 0 |
| Web Development | Formularios com validacao | PASS | login/cadastro/feedback testados | 0 |
| Web Development | Quiz 10 perguntas + resultado | PASS | Browser: incompleto, 10/10, reiniciar e melhor nota OK | 0 |
| Web Development | 3 temas persistentes | PASS | Browser: tema `aurora` persistiu apos reload | 0 |
| Web Development | equipe.txt e AI.md | PASS | `equipe.txt:6`, `AI.md` | 0 |
| Web Development | branches/merge, Org GitHub, >=15 commits | PARCIAL externa | 10 commits locais antes deste relatorio; sem push/Org comprovados | ate 30 |
| Differentiated Problem Solving | 4 funcoes matematicas ligadas ao espaco | PASS | `differentiated-problem-solving/modelo_gnss.py` | 0 |
| Differentiated Problem Solving | Dominio, imagem, comportamento, interpretacao, graficos | PASS | execucao gerou 4 SVGs e texto analitico | 0 |
| Differentiated Problem Solving | Relatorio PDF + .py | PASS | `differentiated-problem-solving/RELATORIO_MODELO_GNSS.pdf` e `modelo_gnss.py` | 0 |

## 3. Resultados de Teste

| Componente | Cenario | Resultado | Evidencia |
|---|---|---:|---|
| App web | Console final | OK | Browser `tab.dev.logs`: `0 erros` |
| App web | Login campos vazios | OK | `Preencha e-mail e senha!` |
| App web | Login e-mail invalido/senha curta | OK | `E-mail ou senha incorretos!` |
| App web | Cadastro vazio/e-mail invalido/senha curta/valido | OK | mensagens corretas e `user=Thiago Souza de Lima` |
| App web | Sessao persistente, logout, login demo | OK | `persist=true`, `logoutOverlay=true`, `demo=Usuario Demo` |
| App web | Recarga R$20/R$50/R$100 e metodos | OK | saldo `215.50 -> 235.50 -> 285.50 -> 385.50` |
| App web | Rota mesma estacao | OK | `Origem e destino sao a mesma estacao!` |
| App web | Rota com baldeacao | OK | `Azul > BAL. Paraiso > Verde`, `27.6 km`, `~62 min`, `23 est.`, timeline com 7 steps compactados |
| App web | Fora do horario de operacao | OK | app agora exibe rota em modo planejamento e alerta via `opWarning` quando fora do horario |
| App web | NFC saldo suficiente e historico | OK | viagens `8->95`, historico com `Tucuruvi -> Vila Madalena`, gasto `R$ 418,00` |
| App web | NFC saldo insuficiente | OK | status `SALDO INSUFICIENTE`, saldo `R$ 2,70`, necessario `R$ 4,40` |
| App web | GNSS permissao negada | OK | mobile: `statGps=Permissao negada`, aviso `Nao foi possivel detectar localizacao por satelite` |
| App web | GNSS permissao concedida | PARCIAL | nao houve liberacao real de localizacao no Browser; codigo de sucesso existe, mas cenario depende de permissao/dispositivo |
| App web | Temas 3 cores e persistencia | OK | `theme=aurora`, botao ativo e background mantidos apos reload |
| App web | Slideshow | OK | 3 imagens com alt, `complete=true`, prev/next alteram slide |
| App web | Quiz | OK | incompleto: faltam 10; completo: `10/10`; melhor nota `10/10`; reiniciar limpa resultado |
| App web | Feedback | OK | vazio, e-mail invalido e sucesso `Obrigado, Thiago!` |
| App web | PWA offline | OK | servidor parado; reload manteve pagina, `offline=Ativo · cache pronto` |
| App web | Instalar PWA | PARCIAL | status `Suportado · aguardando install`; prompt real depende do navegador |
| App web | 3D/RA/Gesto/IA | OK | `statusThree=Ativo`, RA `display=flex`, gesto `Ativo/Simulado`, IA calculou atraso/lotacao/rota |
| App web | Responsivo | OK | mobile 390, tablet 768, desktop 1366 sem overflow horizontal; barra mobile aparece/desaparece corretamente |
| Landing | Menu, secoes, alt, links, responsivo | OK | Browser + parser: 6 secoes, 5 imagens OK, `missing_alt=[]`, `broken_links=[]` |
| Arduino | Compilacao sketch | OK | Arduino CLI: `Sketch uses 6726 bytes (20%)`; RAM `322 bytes (15%)` |
| Arduino | Simulacao LED/buzzer | PARCIAL | codigo/diagram OK; execucao visual Wokwi depende de link publico externo |
| Python CT | Todas as opcoes + invalidos | OK | opcoes 1-6, invalido `abc`, `letra`, `9`, retorno ao menu e saida `0` |
| Python DPS | Execucao e graficos | OK | gerou `grafico_1_haversine.svg` a `grafico_4_exponencial.svg` |

## 4. Substituicoes e Melhorias Aplicadas

| Antes | Depois | Motivo |
|---|---|---|
| `ring-glow` bloqueava clique de recarga | `pointer-events:none` | Corrigir UX real de clique |
| Rota reversa podia terminar no ponto errado | `calcularRotaDireta` preserva sentido origem -> destino | Evitar regressao em baldeacao |
| Lista simples de rota | Timeline animada `.route-timeline` | Melhor leitura visual e fluidez |
| Prototipo 3D legado morto (~800 linhas) | removido; preview local do design mantido | Performance e manutencao |
| Observacao da Terra era texto | mapa de calor conceitual com hotspots | Entrega demo visual sem inventar dado satelital real |
| Quiz estatico | embaralhamento, progresso, timer, feedback, melhor nota | Mais complexo e fluido |
| Tema seco | transicoes, `prefers-color-scheme`, foco visivel | Acessibilidade e polimento |
| Slideshow basico | transicao suave e swipe mobile | Melhor UX em celular |
| RA simulada nao aparecia | overlay `display:flex`, `aria-hidden` correto | Corrigir recurso demonstravel |
| Python quebrava em console CP1252 | `stdout` UTF-8 | Robustez no Windows |
| DPS exigia matplotlib/numpy | fallback SVG interno | Executa em ambiente limpo |
| Fora do horario bloqueava rota | rota em modo planejamento com aviso | Facilita demonstracao e melhora produto |
| Service Worker cache antigo | `CACHE_NAME='holopass-v7.4'` | Evitar servir JS/CSS obsoleto |
| Equipe com placeholder | equipe individual Thiago/RM 568732 | Consistencia documental |

## 5. Commits Locais Criados

```text
4f161c8 chore: registrar baseline recebido
164427a fix: corrigir rota visual e clique de recarga
cba1906 perf: remover prototipo 3d legado
1c3f432 feat: adicionar mapa de calor conceitual eo
cab3abb feat: evoluir quiz com progresso e melhor nota
e24a7a1 feat: melhorar fluidez e acessibilidade web
d40b0bf fix: exibir overlay de ra simulada
576069c fix: robustecer scripts python e equipe solo
5298c3a fix: manter rota planejavel fora de operacao
ab97c93 docs: adicionar relatorios complementares
```

## 6. Comandos Principais Executados

```powershell
python -m http.server 8000 --bind 127.0.0.1
node --check script.js
node --check webdev.js
node --check sw.js
python -m py_compile computational-thinking\holopass_menu.py differentiated-problem-solving\modelo_gnss.py
python computational-thinking\holopass_menu.py
python differentiated-problem-solving\modelo_gnss.py
arduino-cli compile --fqbn arduino:avr:uno <copia-temporaria-do-sketch>
python auditoria\gerar_pdfs.py
```

## 7. Pendencias Externas

- Publicar/confirmar repositorio dentro da Organizacao FIAP/GitHub exigida.
- Fazer push dos commits locais e, se necessario, criar branches/merge para comprovar fluxo Web Dev.
- Atingir/comprovar pelo menos 15 commits no GitHub remoto; localmente ha 10 antes deste relatorio.
- Publicar link publico do Wokwi no `edge-computing/README.md`.
- Gravar video de pitch com 5 min +/-15s, rosto/voz, slides e demonstracao do app/Arduino.
- Subir o video no YouTube e colocar nome/RM na descricao.
- Se o professor exigir formato Word, exportar o `software-total-experience/HoloPass_Software_TX.md` para `.docx` e gerar o PDF oficial a partir dele.
- Adicionar prints reais aos PDFs de CT caso o avaliador exija imagem de console em vez de evidencia textual.
- Testar GNSS com permissao concedida em dispositivo/navegador real com localizacao liberada.
- Testar simulacao Wokwi visualmente apos publicacao para confirmar LED piscando e buzzer na chegada.

