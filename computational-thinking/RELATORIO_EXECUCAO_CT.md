# Relatorio de Execucao - Computational Thinking with Python

**Projeto:** HoloPass  
**Autor:** Thiago Souza de Lima - RM 568732

## Descricao do Programa

O arquivo `holopass_menu.py` implementa um sistema de terminal em arquivo unico. O menu retorna ao inicio apos cada opcao e possui seis funcionalidades: descricao da solucao, deteccao de estacao por GNSS, calculo de rota, recarga, pagamento NFC simulado e historico/estatisticas.

## Requisitos Atendidos

- Menu com retorno ao inicio apos cada opcao.
- Mais de cinco itens de menu.
- Pelo menos quatro prototipos funcionais.
- Descricao da solucao com ate cinco linhas uteis.
- Uso de `if/elif/else`, `match-case`, `while`, `for`, listas, strings e funcoes.
- Funcoes com parametros e retorno, como `haversine_km` e `calcular_viagem`.
- Validacao de entradas numericas, texto invalido e faixas fora do permitido.
- Saida em portugues, moeda em reais e mensagens de erro claras.

## Evidencia de Execucao

Comando executado:

```powershell
$inputLines = @('1','','2','abc','-23.5505','-46.6333','','3','1','2','','4','letra','20','','5','1','2','','6','','9','','0')
$inputLines | python computational-thinking\holopass_menu.py
```

Resultado observado:

- Opcao 1 exibiu a descricao do HoloPass.
- Opcao 2 rejeitou `abc` e depois encontrou a estacao Se por Haversine.
- Opcao 3 calculou rota Luz -> Se com distancia, tempo e tarifa.
- Opcao 4 rejeitou `letra`, aceitou recarga de R$ 20,00 e atualizou saldo.
- Opcao 5 registrou viagem com pagamento aprovado.
- Opcao 6 exibiu historico, gasto total, tempo total e tarifa media.
- Opcao invalida `9` exibiu limite maximo e retornou ao menu.
- Opcao `0` encerrou o programa corretamente.

## Conclusao

O prototipo de Computational Thinking esta funcional e cobre os conceitos obrigatorios de programacao estruturada do primeiro semestre.

