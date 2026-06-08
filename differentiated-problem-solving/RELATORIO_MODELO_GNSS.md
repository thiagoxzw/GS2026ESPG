# Relatorio de Modelagem Matematica - GNSS

**Projeto:** HoloPass  
**Autor:** Thiago Souza de Lima - RM 568732

## Objetivo

Modelar matematicamente aspectos do posicionamento por satelite usados pelo HoloPass, conectando funcoes do conteudo de Differentiated Problem Solving ao tema da industria espacial.

## Funcoes Implementadas

1. **Trigonometrica:** Haversine para distancia real na superficie curva da Terra.
2. **Polinomial:** Trilateracao por intersecao de circunferencias.
3. **Logaritmica:** Free-Space Path Loss para perda do sinal em funcao da distancia.
4. **Exponencial:** Modelo didatico de reducao de erro com aumento de satelites visiveis.

## Analise e Interpretacao

### Haversine

Dominio: latitudes e longitudes em radianos.  
Imagem: distancia em quilometros, maior ou igual a zero.  
Comportamento: cresce com a separacao angular entre pontos.  
Interpretacao: melhora a aproximacao do app porque considera a curvatura da Terra.

### Trilateracao

Dominio: distancias positivas medidas pelo tempo de propagacao do sinal.  
Imagem: ponto de intersecao dos circulos, representando a posicao estimada.  
Comportamento: sistema polinomial de grau 2 reduzido a um sistema linear por subtracao.  
Interpretacao: explica por que receptores GNSS precisam de multiplos satelites.

### Free-Space Path Loss

Dominio: distancia positiva entre receptor e satelite.  
Imagem: perda em decibeis.  
Comportamento: crescimento logaritmico.  
Interpretacao: o sinal GNSS chega fraco a Terra, justificando antena/receptor adequados.

### Modelo Exponencial Didatico

Dominio: numero de satelites visiveis maior ou igual a 4.  
Imagem: erro estimado positivo em metros.  
Comportamento: decrescente e assintotico.  
Interpretacao: modelo conceitual, nao medido em campo, usado para explicar a ideia de ganho de precisao.

## Evidencia de Execucao

Comando executado:

```powershell
python differentiated-problem-solving\modelo_gnss.py
```

Resultado observado:

- O script executou sem `matplotlib` e `numpy`, usando fallback interno.
- Foram gerados quatro graficos SVG: `grafico_1_haversine.svg`, `grafico_2_trilateracao.svg`, `grafico_3_fspl.svg` e `grafico_4_exponencial.svg`.
- A saida textual exibiu dominio, imagem, comportamento e interpretacao para as quatro funcoes.

## Honestidade Tecnica

As funcoes Haversine e FSPL representam leis fisicas/geometricas reais. O modelo exponencial de erro e explicitamente didatico e nao afirma valores medidos de satelites reais.

