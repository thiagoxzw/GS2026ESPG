<h1 align="center">◈ HoloPass</h1>
<p align="center">
  <strong>Pulseira inteligente de transporte público por satélite (GNSS)</strong><br>
  Global Solution 2026 · 1º Semestre · <em>Indústria Espacial: O Código que Move o Universo</em><br>
  Engenharia de Software · 1º Ano · Presencial · FIAP
</p>

---

## 🛰️ O que é

O **HoloPass** é uma **pulseira inteligente** que substitui o bilhete e o cartão
de transporte. O usuário aproxima o pulso da catraca e paga por **NFC** — sem
celular, sem cartão. Durante a viagem, a pulseira usa **posicionamento por
satélite (GNSS)** para detectar automaticamente em qual estação o usuário está,
calcular a rota, antecipar atrasos e avisar a chegada.

> **Problema da Terra resolvido com tecnologia espacial.** O GNSS (constelações
> GPS, Galileo, GLONASS e BeiDou) é infraestrutura espacial em órbita média
> (~20.000 km) e é a base técnica da solução. No planejamento urbano, o projeto
> dialoga com imagens públicas dos satélites brasileiros **CBERS-4A** e
> **Amazonia-1** (INPE) para apontar regiões mal atendidas pelo transporte.

### Dores que resolvemos
- **Insegurança** — manusear o celular em estações lotadas expõe ao furto.
- **Falta de informação** clara e em tempo real sobre posição e próximo trem.
- **Exclusão** de quem não tem smartphone ou tem dificuldade com apps.

### ODS atendidos
**9** (Indústria, Inovação e Infraestrutura · principal), **11** (Cidades
Sustentáveis), **10** (Redução de Desigualdades) e **8** (Trabalho Decente).

---

## 📂 Estrutura do repositório

Este repositório integra as entregas de código das disciplinas da Global Solution.

| Caminho | Disciplina | Conteúdo |
|---|---|---|
| **`WEB/`** | Web Development | App web (PWA): `index.html`, `manifest.json`, `sw.js`, `AI.md` e `src/` com CSS, JS e assets — inclui **quiz**, **slideshow** e **troca de temas** |
| **`front-end-landing/`** | Front-End Design | **Landing page** com 6 seções (HTML/CSS puro) |
| **`edge-computing/`** | Edge Computing & Computer Systems | Firmware Arduino (`sketch.ino`) + circuito Wokwi (`diagram.json`) |
| **`computational-thinking/`** | Computational Thinking with Python | **Programa de menu** no terminal (`holopass_menu.py`) |
| **`differentiated-problem-solving/`** | Differentiated Problem Solving | Modelo matemático do GNSS em Python (`modelo_gnss.py`) |
| **`docs/`** | Storytelling / Pitch | Roteiro do pitch em vídeo |
| `equipe.txt` · `integrantes.txt` | — | Identificação da equipe |

---

## ▶️ Como executar o app web

O app é um **Progressive Web App** em HTML, CSS e **JavaScript puro** (sem
frameworks) e funciona **offline** via Service Worker.

```bash
# a partir da raiz do repositório, suba um servidor estático:
python -m http.server 8000
# depois abra http://localhost:8000/WEB/index.html no navegador
```

> É necessário servir por HTTP (não abrir o `WEB/index.html` direto via `file://`),
> pois o Service Worker, o NFC e o GNSS exigem um contexto seguro/servido.

**Demonstração:** entre como **DEMO**, calcule uma rota, toque em **🛰️ GNSS**
para detectar a estação mais próxima (precisão real em metros) e em **◈ NFC**
para pagar a passagem.

### Outras camadas
- **Landing page (Front-End):** abra `front-end-landing/index.html` no navegador.
- **Programa Python (terminal):** `python computational-thinking/holopass_menu.py`.
- **Arduino / Edge:** veja [`edge-computing/README.md`](edge-computing/README.md)
  (rode no [Wokwi](https://wokwi.com) com `sketch.ino` + `diagram.json`).
- **Matemática / GNSS:** veja
  [`differentiated-problem-solving/README.md`](differentiated-problem-solving/README.md).

---

## 🧰 Tecnologias

- **Espacial — GNSS:** GPS, Galileo, GLONASS, BeiDou via Geolocation API;
  fórmula de **Haversine** para distâncias reais sobre a esfera terrestre.
- **Embarcado (Edge):** Arduino UNO simulado no **Wokwi**; LED + buzzer.
- **Web / Mobile:** PWA (HTML, CSS, JS puro), Service Worker (offline),
  **HoloRoute** (otimizador determinístico), Web NFC, Vibration, Notification API e PWA offline.
- **Matemática:** Python (`matplotlib`, `numpy`) — funções trigonométrica,
  polinomial, logarítmica e exponencial.

---

## 👥 Equipe

| Nome completo | RM |
|---|---|
| Thiago Souza de Lima | 568732 |

Equipe individual conforme informado pelo autor do projeto.

---

## 🤝 Honestidade técnica

Documentamos com clareza o que é **fato verificado**, o que é **proposta** a
implementar e o que é **visão de futuro**. O posicionamento GNSS entrega a
precisão real do dispositivo (em metros); a camada de observação da Terra
(CBERS-4A / Amazonia-1) é conceitual nesta versão demonstrativa, com link para os
catálogos públicos do INPE. Veja [`CHANGELOG_GNSS.md`](CHANGELOG_GNSS.md).

---

<p align="center"><em>O código que move o universo, agora movendo as cidades.</em></p>
