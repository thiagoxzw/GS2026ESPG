# RelatÃ³rio TÃ©cnico - Computational Thinking with Python

**Projeto:** HoloPass - Global Solution 2026 - IndÃºstria Espacial
**Arquivo principal:** `holopass_menu.py`
**Integrante:** Thiago Souza de Lima - RM 568732

## 1. Objetivo do programa

O programa apresenta um menu em Python para simular operaÃ§Ãµes essenciais do HoloPass. Ele foi desenvolvido como arquivo Ãºnico, sem bibliotecas externas, para facilitar a correÃ§Ã£o no Portal.

A soluÃ§Ã£o conecta transporte pÃºblico e tecnologia espacial ao usar GNSS, Haversine, saldo, recarga e cÃ¡lculo de rota em um fluxo simples de primeiro semestre.

## 2. Funcionalidades implementadas

O menu possui cinco opÃ§Ãµes principais e retorna ao inÃ­cio apÃ³s cada execuÃ§Ã£o:

- DescriÃ§Ã£o do projeto em atÃ© cinco linhas.
- DetecÃ§Ã£o da estaÃ§Ã£o mais prÃ³xima por coordenadas GNSS.
- SimulaÃ§Ã£o de rota, distÃ¢ncia, tempo e tarifa.
- Recarga de saldo.
- Pagamento NFC simulado com validaÃ§Ã£o de saldo.

TambÃ©m hÃ¡ opÃ§Ã£o de encerrar o programa com mensagem final.

## 3. Requisitos obrigatÃ³rios atendidos

- **if/elif/else:** usado para decisÃµes de menu, validaÃ§Ã£o e pagamento.
- **match-case:** usado no controle principal das opÃ§Ãµes.
- **while:** mantÃ©m o menu ativo atÃ© o usuÃ¡rio sair.
- **for:** percorre listas de estaÃ§Ãµes e histÃ³rico.
- **listas:** armazenam estaÃ§Ãµes, histÃ³rico e valores de recarga.
- **strings:** tratam nomes, mensagens e formataÃ§Ã£o monetÃ¡ria.
- **funÃ§Ãµes:** recebem parÃ¢metros e retornam valores calculados.
- **validaÃ§Ã£o:** impede entradas vazias, letras em campos numÃ©ricos e opÃ§Ãµes fora de faixa.

O cÃ³digo usa apenas recursos nativos do Python. NÃ£o hÃ¡ dependÃªncia instalada por `pip`.

## 4. FunÃ§Ãµes principais

- `haversine_km(lat1, lon1, lat2, lon2)`: retorna distÃ¢ncia real em quilÃ´metros.
- `estacao_mais_proxima(lat, lon)`: retorna estaÃ§Ã£o e distÃ¢ncia.
- `calcular_viagem(origem, destino)`: retorna distÃ¢ncia, tempo, tarifa e paradas.
- `validar_float(mensagem)`: repete a leitura atÃ© receber nÃºmero vÃ¡lido.
- `formatar_moeda(valor)`: retorna texto monetÃ¡rio em padrÃ£o brasileiro.

Essas funÃ§Ãµes mantÃªm a lÃ³gica clara e adequada ao escopo da disciplina.

## 5. EvidÃªncias esperadas de execuÃ§Ã£o

Ao rodar o programa, o avaliador deve observar:

- O menu reaparece apÃ³s cada opÃ§Ã£o.
- Entradas invÃ¡lidas sÃ£o recusadas e pedidas novamente.
- Coordenadas de teste retornam a estaÃ§Ã£o mais prÃ³xima por Haversine.
- Recarga altera o saldo.
- Pagamento NFC aprova com saldo suficiente e nega com saldo insuficiente.

Comando:

```bash
python computational-thinking/holopass_menu.py
```

## 6. ObservaÃ§Ãµes para correÃ§Ã£o

O programa evita recursos excessivamente avanÃ§ados para permanecer compreensÃ­vel. NÃ£o usa bibliotecas externas, banco de dados, classes obrigatÃ³rias ou instalaÃ§Ã£o adicional.

O foco estÃ¡ nos pilares da avaliaÃ§Ã£o: decisÃ£o, repetiÃ§Ã£o, listas, strings, funÃ§Ãµes, validaÃ§Ã£o e usabilidade.

## 7. ConclusÃ£o

O protÃ³tipo atende ao pedido de Computational Thinking porque transforma a ideia do HoloPass em uma simulaÃ§Ã£o funcional. Ele mostra como GNSS, saldo, rota e NFC podem ser representados com lÃ³gica estruturada em Python.
