# -*- coding: utf-8 -*-
"""
HoloPass — Sistema em Python (menu de terminal)
Disciplina: Computational Thinking with Python — Global Solution 2026
Indústria Espacial · Engenharia de Software · 1º Ano · FIAP

Programa interativo, em arquivo único, com menu que volta ao início após
cada opção. Demonstra os conceitos do 1º semestre:
  - Estruturas de decisão: if / elif / else e match-case
  - Estruturas de repetição: while e for
  - Sequências: listas (list) e strings (str)
  - Subalgoritmos: funções com passagem de parâmetros e retorno
  - Usabilidade: formatação de dados, formato de entrada/saída claro e
    validação das entradas do usuário.
"""

import math

# ============================================================
# DADOS DO SISTEMA
# ============================================================

# Coordenadas reais (lat, lon) de estações de SP — as mesmas do app HoloPass.
ESTACOES = [
    {"nome": "Luz",       "linha": "Linha 1 - Azul",      "lat": -23.5345, "lon": -46.6356},
    {"nome": "Sé",        "linha": "Linha 1 - Azul",      "lat": -23.5505, "lon": -46.6333},
    {"nome": "Liberdade", "linha": "Linha 1 - Azul",      "lat": -23.5588, "lon": -46.6336},
    {"nome": "Paraíso",   "linha": "Linha 2 - Verde",     "lat": -23.5736, "lon": -46.6403},
    {"nome": "República", "linha": "Linha 3 - Vermelha",  "lat": -23.5436, "lon": -46.6428},
    {"nome": "Brás",      "linha": "Linha 3 - Vermelha",  "lat": -23.5446, "lon": -46.6175},
    {"nome": "Tatuapé",   "linha": "Linha 3 - Vermelha",  "lat": -23.5410, "lon": -46.5775},
    {"nome": "Paulista",  "linha": "Linha 4 - Amarela",   "lat": -23.5546, "lon": -46.6620},
]

TARIFA = 4.40            # valor da passagem (R$)
KM_POR_ESTACAO = 1.2     # distância média entre estações
VELOCIDADE = 35.0        # km/h média do trem
RAIO_TERRA_KM = 6371.0   # raio médio da Terra

# Estado em memória: saldo da pulseira e histórico de viagens (lista de dicts).
saldo = 45.50
historico = []  # cada item: {"origem": str, "destino": str, "tarifa": float, "tempo": int}


# ============================================================
# FUNÇÕES UTILITÁRIAS (validação e usabilidade)
# ============================================================

def linha(caractere="=", tamanho=56):
    """Imprime uma linha separadora."""
    print(caractere * tamanho)


def brl(valor):
    """Formata um número como moeda brasileira (ex.: 4.4 -> 'R$ 4,40')."""
    return f"R$ {valor:.2f}".replace(".", ",")


def ler_inteiro(mensagem, minimo=None, maximo=None):
    """Lê um inteiro do usuário, validando faixa. Repete até ser válido."""
    while True:
        entrada = input(mensagem).strip()
        if not entrada.lstrip("-").isdigit():
            print("  ⚠ Digite um número inteiro válido (ex.: 3).")
            continue
        valor = int(entrada)
        if minimo is not None and valor < minimo:
            print(f"  ⚠ O valor mínimo é {minimo}.")
            continue
        if maximo is not None and valor > maximo:
            print(f"  ⚠ O valor máximo é {maximo}.")
            continue
        return valor


def ler_float(mensagem, minimo=None):
    """Lê um número real (aceita vírgula ou ponto), validando o mínimo."""
    while True:
        entrada = input(mensagem).strip().replace(",", ".")
        try:
            valor = float(entrada)
        except ValueError:
            print("  ⚠ Digite um número válido (ex.: 20 ou 20,50).")
            continue
        if minimo is not None and valor < minimo:
            print(f"  ⚠ O valor mínimo é {minimo}.")
            continue
        return valor


def escolher_estacao(titulo):
    """Mostra a lista de estações e retorna o dicionário escolhido."""
    print(f"\n{titulo}")
    for i, est in enumerate(ESTACOES, start=1):
        print(f"  {i:2d}) {est['nome']:10s} · {est['linha']}")
    indice = ler_inteiro("  Escolha o número da estação: ", 1, len(ESTACOES))
    return ESTACOES[indice - 1]


# ============================================================
# FUNÇÕES DO MODELO (lógica do HoloPass)
# ============================================================

def haversine_km(lat1, lon1, lat2, lon2):
    """Distância real (km) entre dois pontos da esfera terrestre (GNSS)."""
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (math.sin(d_lat / 2) ** 2
         + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2))
         * math.sin(d_lon / 2) ** 2)
    return 2 * RAIO_TERRA_KM * math.asin(math.sqrt(a))


def estacao_mais_proxima(lat, lon):
    """Retorna (estação, distância_km) mais próxima de uma coordenada."""
    melhor, menor = None, float("inf")
    for est in ESTACOES:
        d = haversine_km(lat, lon, est["lat"], est["lon"])
        if d < menor:
            menor, melhor = d, est
    return melhor, menor


def calcular_viagem(origem, destino):
    """Calcula paradas, distância (km) e tempo (min) entre duas estações."""
    distancia = haversine_km(origem["lat"], origem["lon"],
                             destino["lat"], destino["lon"])
    paradas = max(1, round(distancia / KM_POR_ESTACAO))
    tempo = round((distancia / VELOCIDADE) * 60 + paradas * 0.5)
    return paradas, distancia, tempo


# ============================================================
# OPÇÕES DO MENU
# ============================================================

def opcao_descricao():
    """Opção 1 — descrição textual da solução (até 5 linhas)."""
    linha()
    print("SOBRE O HOLOPASS")
    linha()
    print("Pulseira inteligente de transporte público que substitui o")
    print("bilhete/cartão por pagamento NFC e usa posicionamento por")
    print("satélite (GNSS) para detectar a estação do usuário, calcular a")
    print("rota e avisar a chegada — tudo sem depender do celular.")
    print("Tema: Indústria Espacial · ODS 9, 10 e 11.")


def opcao_detectar_estacao():
    """Opção 2 — detecta a estação mais próxima a partir de uma coordenada."""
    linha()
    print("DETECÇÃO DE ESTAÇÃO POR GNSS (Haversine)")
    linha()
    print("Informe sua posição (graus decimais). Ex.: -23.5505 / -46.6333")
    lat = ler_float("  Latitude:  ")
    lon = ler_float("  Longitude: ")
    est, dist = estacao_mais_proxima(lat, lon)
    print(f"\n  🛰️  Estação mais próxima: {est['nome']} ({est['linha']})")
    print(f"      Distância estimada: {dist:.2f} km")


def opcao_calcular_rota():
    """Opção 3 — calcula rota, tempo e tarifa entre duas estações."""
    linha()
    print("CÁLCULO DE ROTA, TEMPO E TARIFA")
    linha()
    origem = escolher_estacao("ESTAÇÃO DE ORIGEM:")
    destino = escolher_estacao("ESTAÇÃO DE DESTINO:")
    if origem["nome"] == destino["nome"]:
        print("\n  ⚠ Origem e destino são iguais. Operação cancelada.")
        return
    paradas, distancia, tempo = calcular_viagem(origem, destino)
    print(f"\n  Rota: {origem['nome']} → {destino['nome']}")
    print(f"  Paradas estimadas: {paradas}")
    print(f"  Distância:         {distancia:.2f} km")
    print(f"  Tempo estimado:    ~{tempo} min")
    print(f"  Tarifa:            {brl(TARIFA)}")


def opcao_recarregar():
    """Opção 4 — recarrega o saldo e mostra quantas passagens dá."""
    global saldo
    linha()
    print("RECARGA DA PULSEIRA")
    linha()
    print(f"  Saldo atual: {brl(saldo)}")
    valor = ler_float("  Valor da recarga (R$): ", minimo=0.01)
    saldo += valor
    passagens = int(saldo // TARIFA)
    print(f"\n  ✓ Recarga de {brl(valor)} confirmada.")
    print(f"  Novo saldo: {brl(saldo)}")
    print(f"  Dá para ~{passagens} passagens de {brl(TARIFA)}")


def opcao_registrar_viagem():
    """Opção 5 — paga uma viagem (debita saldo) e registra no histórico."""
    global saldo
    linha()
    print("REGISTRAR VIAGEM (pagamento NFC simulado)")
    linha()
    if saldo < TARIFA:
        print(f"  ⚠ Saldo insuficiente ({brl(saldo)}). Recarregue primeiro.")
        return
    origem = escolher_estacao("ESTAÇÃO DE ORIGEM:")
    destino = escolher_estacao("ESTAÇÃO DE DESTINO:")
    if origem["nome"] == destino["nome"]:
        print("\n  ⚠ Origem e destino são iguais. Operação cancelada.")
        return
    _, _, tempo = calcular_viagem(origem, destino)
    saldo -= TARIFA
    historico.append({
        "origem": origem["nome"],
        "destino": destino["nome"],
        "tarifa": TARIFA,
        "tempo": tempo,
    })
    print(f"\n  ✓ Pagamento aprovado. Débito de {brl(TARIFA)}")
    print(f"  Saldo restante: {brl(saldo)}")
    print(f"  Viagem registrada ({len(historico)} no total).")


def opcao_relatorio():
    """Opção 6 — relatório do histórico e estatísticas das viagens."""
    linha()
    print("HISTÓRICO E ESTATÍSTICAS")
    linha()
    if not historico:
        print("  Nenhuma viagem registrada ainda. Use a opção 5.")
        return
    total_gasto = 0.0
    tempo_total = 0
    print(f"  {'#':>2}  {'ORIGEM':12s} {'DESTINO':12s} {'TARIFA':>8s} {'TEMPO':>6s}")
    print("  " + "-" * 46)
    for i, v in enumerate(historico, start=1):
        total_gasto += v["tarifa"]
        tempo_total += v["tempo"]
        tarifa_fmt = brl(v["tarifa"])
        print(f"  {i:>2}  {v['origem']:12s} {v['destino']:12s} {tarifa_fmt:>8s} {v['tempo']:>4d}m")
    print("  " + "-" * 46)
    media = total_gasto / len(historico)
    print(f"  Viagens: {len(historico)} | Gasto total: {brl(total_gasto)}"
          f" | Tempo total: {tempo_total} min")
    print(f"  Tarifa média por viagem: {brl(media)}")


# ============================================================
# MENU PRINCIPAL
# ============================================================

def mostrar_menu():
    """Imprime o menu principal."""
    print()
    linha("◈")
    print("        HOLOPASS — SISTEMA DE TRANSPORTE (Python)")
    linha("◈")
    print("  1 - Sobre a solução (descrição)")
    print("  2 - Detectar estação mais próxima (GNSS)")
    print("  3 - Calcular rota, tempo e tarifa")
    print("  4 - Recarregar saldo da pulseira")
    print("  5 - Registrar viagem (pagamento NFC)")
    print("  6 - Histórico e estatísticas")
    print("  0 - Sair")
    print(f"  [ saldo atual: {brl(saldo)} ]")
    linha("-")


def main():
    """Laço principal: mostra o menu e executa a opção até o usuário sair."""
    print("\nBem-vindo ao HoloPass! (Ctrl+C para sair a qualquer momento)")
    while True:
        mostrar_menu()
        opcao = ler_inteiro("  Escolha uma opção: ", 0, 6)

        # match-case despacha a opção escolhida
        match opcao:
            case 1:
                opcao_descricao()
            case 2:
                opcao_detectar_estacao()
            case 3:
                opcao_calcular_rota()
            case 4:
                opcao_recarregar()
            case 5:
                opcao_registrar_viagem()
            case 6:
                opcao_relatorio()
            case 0:
                print("\nObrigado por usar o HoloPass. Boa viagem! 🛰️")
                break

        input("\n  (pressione ENTER para voltar ao menu) ")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nEncerrado pelo usuário. Até logo! 🛰️")
