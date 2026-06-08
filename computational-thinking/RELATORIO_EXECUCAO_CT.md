# Relatorio Tecnico - Computational Thinking with Python

**Projeto:** HoloPass - Global Solution 2026 - Industria Espacial
**Arquivo principal:** `holopass_menu.py`
**Integrante:** Thiago Souza de Lima - RM 568732

## 1. Objetivo do programa

O programa apresenta um menu em Python para simular operacoes essenciais do HoloPass. Ele foi desenvolvido como arquivo unico, sem bibliotecas externas, para facilitar a correcao no Portal.

A solucao conecta transporte publico e tecnologia espacial ao usar GNSS, Haversine, saldo, recarga, NFC e calculo de rota operacional em um fluxo simples de primeiro semestre.

## 2. Funcionalidades implementadas

O menu possui seis opcoes funcionais e retorna ao inicio apos cada execucao:

- Descricao do projeto em ate cinco linhas.
- Deteccao da estacao mais proxima por coordenadas GNSS.
- Calculo de rota usando todas as estacoes cadastradas no app web.
- Calculo de linhas, baldeacoes, distancia operacional, tempo e tarifa.
- Recarga de saldo.
- Pagamento NFC simulado com validacao de saldo.
- Historico e estatisticas de viagens.

## 3. Requisitos obrigatorios atendidos

- **if/elif/else:** usado para validacao, saldo e origem/destino iguais.
- **match-case:** usado no controle principal das opcoes.
- **while:** mantem o menu ativo e repete entradas invalidas.
- **for:** percorre linhas, estacoes, arestas do grafo e historico.
- **listas:** armazenam estacoes, transferencias, fila de busca e historico.
- **strings:** tratam nomes de linhas, estacoes, mensagens e moeda.
- **funcoes:** recebem parametros e retornam valores calculados.
- **validacao:** impede letras em campos numericos e opcoes fora de faixa.

O codigo usa apenas `math` e `sys`, ambas bibliotecas nativas do Python.

## 4. Funcoes principais

- `haversine_km(lat1, lon1, lat2, lon2)`: retorna distancia real em quilometros para GNSS.
- `construir_grafo()`: cria trechos de linha, baldeacoes e corredores.
- `calcular_rota(origem, destino)`: retorna linhas, estacoes, baldeacoes, distancia, tempo e tarifa.
- `escolher_estacao(titulo)`: lista todas as estacoes e valida a escolha.
- `brl(valor)`: formata valores no padrao brasileiro.

## 5. Evidencias esperadas de execucao

Ao rodar o programa, o avaliador deve observar:

- O menu reaparece apos cada opcao.
- Entradas invalidas sao recusadas e pedidas novamente.
- A opcao de rota lista a rede completa de metro/CPTM cadastrada no projeto.
- A rota Se -> Paulista passa por baldeacao e nao fica em apenas seis minutos.
- A tarifa exibida e debitada e R$ 5,40.
- Recarga altera o saldo.
- Pagamento NFC aprova com saldo suficiente e nega com saldo insuficiente.

Comando:

```bash
python computational-thinking/holopass_menu.py
```

## 6. Observacoes para correcao

O programa evita dependencias externas e bibliotecas instaladas por `pip`. O algoritmo de rota e implementado com listas, dicionarios, lacos e funcoes, mantendo o codigo compreensivel para primeiro semestre.

O foco esta nos pilares da avaliacao: decisao, repeticao, listas, strings, funcoes, validacao e usabilidade.

## 7. Conclusao

O prototipo atende ao pedido de Computational Thinking porque transforma a ideia do HoloPass em uma simulacao funcional. Ele mostra como GNSS, saldo, rota, baldeacao e NFC podem ser representados com logica estruturada em Python.
