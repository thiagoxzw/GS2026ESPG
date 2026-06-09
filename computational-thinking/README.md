# HoloPass - Sistema em Python

Global Solution 2026 - 1º Semestre - Indústria Espacial - FIAP

Programa de menu em terminal, em arquivo único (`holopass_menu.py`), que simula
as funções centrais do HoloPass e demonstra os conceitos obrigatórios de
Computational Thinking with Python.

## Como executar

```bash
python holopass_menu.py
```

Requer Python 3.10+ por usar `match-case`. Não há dependências externas e não é
necessário instalar nada com `pip`.

## O que mudou na revisão

- A lista de rotas agora usa todas as estações cadastradas no app web.
- O cálculo de rota usa grafo de linhas, baldeações e corredores.
- Distância e tempo passaram a ser operacionais, não reta entre coordenadas.
- A tarifa foi atualizada para R$ 5,40.

## Menu

| Opção | O que faz |
|---|---|
| 1 | Descrição textual da solução em até cinco linhas |
| 2 | Detecta estação mais próxima por GNSS/Haversine |
| 3 | Calcula rota, linhas, baldeações, distância, tempo e tarifa |
| 4 | Recarrega saldo da pulseira |
| 5 | Registra viagem com pagamento NFC simulado |
| 6 | Mostra histórico e estatísticas |
| 0 | Sai do programa |

## Conceitos aplicados

- Decisão: `if/elif/else` e `match-case`.
- Repetição: `while` no menu e validações; `for` nas listas e relatórios.
- Listas e strings: rede de estações, histórico e textos formatados.
- Funções com parâmetros e retorno: `haversine_km`, `calcular_rota`, `brl`.
- Validação: números, faixas de menu, saldo e origem/destino iguais.

O programa volta ao menu principal depois de cada opção.
