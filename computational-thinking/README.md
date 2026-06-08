# HoloPass — Sistema em Python (Computational Thinking with Python)

Global Solution 2026 · 1º Semestre · **Indústria Espacial** · FIAP

Programa de **menu em terminal**, em arquivo único (`holopass_menu.py`), que
simula as funções centrais do HoloPass e demonstra os conceitos da disciplina.

## Como executar

```bash
python holopass_menu.py      # ou: python3 holopass_menu.py
```

Requer **Python 3.10+** (usa `match-case`). Não há dependências externas.

## Menu (≥ 5 opções, 6 protótipos funcionais)

| Opção | O que faz |
|---|---|
| 1 | **Descrição** textual da solução (até 5 linhas) |
| 2 | **Detectar estação mais próxima** por GNSS (Haversine) a partir de uma coordenada |
| 3 | **Calcular rota**, distância, tempo e tarifa entre duas estações |
| 4 | **Recarregar** o saldo da pulseira e ver quantas passagens dá |
| 5 | **Registrar viagem** (pagamento NFC simulado, debita o saldo) |
| 6 | **Histórico e estatísticas** (relatório das viagens) |
| 0 | Sair |

## Conceitos aplicados

- **Decisão:** `if/elif/else` e **`match-case`** (despacho do menu)
- **Repetição:** `while` (laço do menu e revalidação) e `for` (relatórios)
- **Sequências:** `list` (estações, histórico) e `str` (formatação)
- **Funções:** com **parâmetros e retorno** (`haversine_km`, `calcular_viagem`…)
- **Usabilidade:** formato de entrada/saída claro, moeda em R$ e **validação**
  de todas as entradas (números, faixas e opções do menu).

> O programa volta ao menu principal após cada opção, conforme exigido.

---

*HoloPass · Computational Thinking with Python · Prof. Edson de Oliveira · GS 2026*
