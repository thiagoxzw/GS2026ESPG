# HoloPass - Sistema em Python

Global Solution 2026 - 1o Semestre - Industria Espacial - FIAP

Programa de menu em terminal, em arquivo unico (`holopass_menu.py`), que simula
as funcoes centrais do HoloPass e demonstra os conceitos obrigatorios de
Computational Thinking with Python.

## Como executar

```bash
python holopass_menu.py
```

Requer Python 3.10+ por usar `match-case`. Nao ha dependencias externas.

## O que mudou na revisao

- A lista de rotas agora usa todas as estacoes cadastradas no app web.
- O calculo de rota usa grafo de linhas, baldeacoes e corredores.
- Distancia e tempo passaram a ser operacionais, nao reta entre coordenadas.
- A tarifa foi atualizada para R$ 5,40.

## Menu

| Opcao | O que faz |
|---|---|
| 1 | Descricao textual da solucao em ate cinco linhas |
| 2 | Detecta estacao mais proxima por GNSS/Haversine |
| 3 | Calcula rota, linhas, baldeacoes, distancia, tempo e tarifa |
| 4 | Recarrega saldo da pulseira |
| 5 | Registra viagem com pagamento NFC simulado |
| 6 | Mostra historico e estatisticas |
| 0 | Sai do programa |

## Conceitos aplicados

- Decisao: `if/elif/else` e `match-case`.
- Repeticao: `while` no menu e validacoes; `for` nas listas e relatorios.
- Listas e strings: rede de estacoes, historico e textos formatados.
- Funcoes com parametros e retorno: `haversine_km`, `calcular_rota`, `brl`.
- Validacao: numeros, faixas de menu, saldo e origem/destino iguais.

O programa volta ao menu principal depois de cada opcao.
