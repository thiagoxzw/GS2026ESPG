# HoloPass — Modelagem Matemática do GNSS (Differentiated Problem Solving)

Global Solution 2026 · 1º Semestre · **Indústria Espacial** · FIAP

Modelagem matemática do posicionamento por satélite (GNSS) que sustenta o
HoloPass, com quatro funções implementadas e analisadas em Python:

| # | Tipo de função | Aplicação no GNSS |
|---|---|---|
| 1 | **Trigonométrica** | Haversine — distância real entre dois pontos da esfera terrestre |
| 2 | **Polinomial** | Trilateração — posição a partir das distâncias a 3 satélites |
| 3 | **Logarítmica** | Free-Space Path Loss — enfraquecimento do sinal do satélite |
| 4 | **Exponencial** | Modelo *didático* de erro × nº de satélites visíveis |

## Como executar

Requisitos: Python 3. Se `matplotlib` e `numpy` estiverem instalados, o script
gera gráficos `.png`; sem essas bibliotecas, usa um fallback interno e gera
os mesmos quatro gráficos em `.svg`.

```bash
pip install matplotlib numpy   # opcional, para saída PNG
python modelo_gnss.py
```

O script imprime, para cada função: a fórmula, domínio, imagem, comportamento
(crescimento/decrescimento) e interpretação física — e gera quatro gráficos
`.png` ou `.svg` (`grafico_1_haversine.*` … `grafico_4_exponencial.*`).

## Relatório técnico

O relatório completo (PDF, 10 páginas) é a entrega oficial da disciplina e
acompanha este código no Teams — `Relatorio_DPS_HoloPass.pdf`.

> Honestidade técnica: as funções 1–3 são leis físicas/geométricas reais; a
> função 4 é um modelo **ilustrativo** proposto pela equipe, rotulado como tal.

---

*HoloPass · Differentiated Problem Solving · Prof. Rodolfo Paiva · GS 2026*
