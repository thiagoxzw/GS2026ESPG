# -*- coding: utf-8 -*-
"""
HoloPass - Sistema em Python (menu de terminal)
Disciplina: Computational Thinking with Python - Global Solution 2026
Industria Espacial - Engenharia de Software - 1o Ano - FIAP

Programa interativo, em arquivo unico, com menu que volta ao inicio apos
cada opcao. Demonstra os conceitos do 1o semestre:
  - Estruturas de decisao: if / elif / else e match-case
  - Estruturas de repeticao: while e for
  - Sequencias: listas (list) e strings (str)
  - Subalgoritmos: funcoes com passagem de parametros e retorno
  - Usabilidade: formatacao de dados e validacao das entradas.
"""

import math
import sys


try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass


# ============================================================
# DADOS DO SISTEMA
# ============================================================

REDE = {
    "Linha 1 - Azul": [
        "Tucuruvi", "Parada Inglesa", "Jardim São Paulo",
        "Portuguesa-Tietê", "Carandiru", "Santana",
        "Luz", "República", "São Bento", "Sé",
        "Liberdade", "São Judas", "Saúde",
        "Praça da Árvore", "Santa Cruz", "Vila Mariana",
        "Ana Rosa", "Paraíso", "Vergueiro", "Jabaquara",
    ],
    "Linha 2 - Verde": [
        "Vila Madalena", "Sumaré", "Clínicas",
        "Consolação", "Trianon-MASP", "Brigadeiro",
        "Paraíso", "Ana Rosa", "Chácara Klabin",
        "Santos-Imigrantes", "Alto do Ipiranga",
        "Sacomã", "Tamanduateí", "Vila Prudente",
    ],
    "Linha 3 - Vermelha": [
        "Barra Funda", "Marechal Deodoro", "Santa Cecília",
        "República", "Anhangabaú", "Sé",
        "Pedro II", "Brás", "Bresser-Mooca",
        "Belém", "Tatuapé", "Carrão",
        "Penha", "Vila Matilde", "Guilhermina-Esperança",
        "Patriarca", "Artur Alvim", "Corinthians-Itaquera",
    ],
    "Linha 4 - Amarela": [
        "Luz", "Higienópolis-Mackenzie", "República",
        "Paulista", "Oscar Freire", "Fradique Coutinho",
        "Pinheiros", "Butantã", "São Paulo-Morumbi", "Vila Sônia",
    ],
    "Linha 5 - Lilás": [
        "Capão Redondo", "Campo Limpo", "Vila das Belezas",
        "Giovanni Gronchi", "Santo Amaro", "Largo Treze",
        "Adolfo Pinheiro", "Alto da Boa Vista", "Borba Gato",
        "Brooklin", "Hospital São Paulo", "Santa Cruz",
        "Chácara Klabin",
    ],
    "Linha 7 - Rubi": [
        "Luz", "Barra Funda", "Lapa", "Pirituba",
        "Jaraguá", "Perus", "Caieiras",
        "Franco da Rocha", "Baltazar Fidélis",
        "Francisco Morato", "Campo Limpo Paulista",
        "Várzea Paulista", "Jundiaí",
    ],
    "Linha 8 - Diamante": [
        "Júlio Prestes", "Barra Funda", "Lapa",
        "Presidente Altino", "Osasco", "Quitaúna",
        "General Miguel Costa", "Carapicuíba",
        "Barueri", "Jardim Silveira", "Jandira",
        "Engenheiro Cardoso", "Itapevi", "Amador Bueno",
    ],
    "Linha 9 - Esmeralda": [
        "Osasco", "Presidente Altino", "Ceasa",
        "Villa-Lobos-Jaguaré", "Cidade Universitária",
        "Pinheiros", "Hebraica-Rebouças", "Cidade Jardim",
        "Vila Olímpia", "Berrini", "Morumbi",
        "Granja Julieta", "Santo Amaro", "Jurubatuba",
        "Autódromo", "Primavera-Interlagos", "Grajaú",
    ],
    "Linha 10 - Turquesa": [
        "Brás", "Tamanduateí", "Alto da Mooca",
        "Utinga", "Prefeito Celso Daniel-Santo André",
        "Capuava", "Mauá", "Ribeirão Pires",
        "Rio Grande da Serra",
    ],
    "Linha 11 - Coral": [
        "Luz", "Brás", "Tatuapé",
        "Penha", "Guilhermina-Esperança", "Patriarca",
        "Artur Alvim", "Corinthians-Itaquera", "Guaianases",
        "Ferraz de Vasconcelos", "Poá", "Suzano",
        "Mogi das Cruzes",
    ],
    "Linha 12 - Safira": [
        "Brás", "São Caetano do Sul", "Prefeito Saladino",
        "Santo André", "Pirelli", "Mauá",
        "Guapituba", "Ribeirão Pires",
        "Ferraz de Vasconcelos", "Calmon Viana",
    ],
    "Linha 13 - Jade": [
        "Engenheiro Goulart", "Guarulhos-Cecap", "Aeroporto Guarulhos",
    ],
}

BALDEACOES = {
    "Sé": ["Linha 1 - Azul", "Linha 3 - Vermelha"],
    "Paraíso": ["Linha 1 - Azul", "Linha 2 - Verde"],
    "Ana Rosa": ["Linha 1 - Azul", "Linha 2 - Verde"],
    "Santa Cruz": ["Linha 1 - Azul", "Linha 5 - Lilás"],
    "Chácara Klabin": ["Linha 2 - Verde", "Linha 5 - Lilás"],
    "República": ["Linha 1 - Azul", "Linha 3 - Vermelha", "Linha 4 - Amarela"],
    "Luz": ["Linha 1 - Azul", "Linha 4 - Amarela", "Linha 7 - Rubi", "Linha 11 - Coral"],
    "Barra Funda": ["Linha 3 - Vermelha", "Linha 7 - Rubi", "Linha 8 - Diamante"],
    "Tamanduateí": ["Linha 2 - Verde", "Linha 10 - Turquesa"],
    "Brás": ["Linha 3 - Vermelha", "Linha 10 - Turquesa", "Linha 11 - Coral", "Linha 12 - Safira"],
    "Tatuapé": ["Linha 3 - Vermelha", "Linha 11 - Coral"],
    "Santo Amaro": ["Linha 5 - Lilás", "Linha 9 - Esmeralda"],
    "Osasco": ["Linha 8 - Diamante", "Linha 9 - Esmeralda"],
    "Lapa": ["Linha 7 - Rubi", "Linha 8 - Diamante"],
}

TRANSFERENCIAS_CORREDOR = [
    {
        "nome": "Pinheiros",
        "a": ("Linha 4 - Amarela", "Pinheiros"),
        "b": ("Linha 9 - Esmeralda", "Pinheiros"),
        "tempo": 4,
        "distancia": 0.35,
    },
    {
        "nome": "Paulista/Consolação",
        "a": ("Linha 4 - Amarela", "Paulista"),
        "b": ("Linha 2 - Verde", "Consolação"),
        "tempo": 6,
        "distancia": 0.55,
    },
]

KM_OPERACIONAL_LINHA = {
    "Linha 1 - Azul": 1.12,
    "Linha 2 - Verde": 1.05,
    "Linha 3 - Vermelha": 1.18,
    "Linha 4 - Amarela": 1.40,
    "Linha 5 - Lilás": 1.30,
    "Linha 7 - Rubi": 2.45,
    "Linha 8 - Diamante": 2.25,
    "Linha 9 - Esmeralda": 3.00,
    "Linha 10 - Turquesa": 2.35,
    "Linha 11 - Coral": 2.55,
    "Linha 12 - Safira": 2.25,
    "Linha 13 - Jade": 3.20,
}

# Coordenadas usadas no prototipo GNSS. A selecao de rota usa a rede completa.
COORDENADAS_GNSS = {
    "Tucuruvi": (-23.4810, -46.6024),
    "Santana": (-23.5048, -46.6275),
    "Luz": (-23.5345, -46.6356),
    "Sé": (-23.5505, -46.6333),
    "Liberdade": (-23.5588, -46.6336),
    "Paraíso": (-23.5736, -46.6403),
    "Ana Rosa": (-23.5797, -46.6377),
    "Jabaquara": (-23.6463, -46.6411),
    "Vila Madalena": (-23.5469, -46.6912),
    "Consolação": (-23.5563, -46.6597),
    "Trianon-MASP": (-23.5614, -46.6557),
    "Brigadeiro": (-23.5683, -46.6464),
    "Vila Prudente": (-23.5832, -46.5818),
    "Barra Funda": (-23.5269, -46.6657),
    "República": (-23.5436, -46.6428),
    "Brás": (-23.5446, -46.6175),
    "Tatuapé": (-23.5410, -46.5775),
    "Corinthians-Itaquera": (-23.5402, -46.4731),
    "Paulista": (-23.5546, -46.6620),
    "Butantã": (-23.5715, -46.7079),
    "Capão Redondo": (-23.6720, -46.7766),
    "Santo Amaro": (-23.6541, -46.7081),
    "Chácara Klabin": (-23.6047, -46.6309),
    "Pinheiros": (-23.5670, -46.7016),
    "Cidade Universitária": (-23.5576, -46.7134),
    "Villa-Lobos-Jaguaré": (-23.5463, -46.7313),
    "Ceasa": (-23.5375, -46.7429),
    "Presidente Altino": (-23.5316, -46.7749),
    "Berrini": (-23.5969, -46.6900),
    "Osasco": (-23.5329, -46.7918),
    "Aeroporto Guarulhos": (-23.4356, -46.4731),
}

TARIFA = 5.40
VELOCIDADE = 35.0
PAUSA_ESTACAO = 0.5
RAIO_TERRA_KM = 6371.0

saldo = 45.50
historico = []


# ============================================================
# FUNCOES UTILITARIAS
# ============================================================

def linha(caractere="=", tamanho=64):
    print(caractere * tamanho)


def brl(valor):
    return f"R$ {valor:.2f}".replace(".", ",")


def ler_inteiro(mensagem, minimo=None, maximo=None):
    while True:
        entrada = input(mensagem).strip()
        if not entrada.lstrip("-").isdigit():
            print("  ! Digite um numero inteiro valido (ex.: 3).")
            continue
        valor = int(entrada)
        if minimo is not None and valor < minimo:
            print(f"  ! O valor minimo e {minimo}.")
            continue
        if maximo is not None and valor > maximo:
            print(f"  ! O valor maximo e {maximo}.")
            continue
        return valor


def ler_float(mensagem, minimo=None):
    while True:
        entrada = input(mensagem).strip().replace(",", ".")
        try:
            valor = float(entrada)
        except ValueError:
            print("  ! Digite um numero valido (ex.: 20 ou 20,50).")
            continue
        if minimo is not None and valor < minimo:
            print(f"  ! O valor minimo e {minimo}.")
            continue
        return valor


def todas_estacoes_para_menu():
    opcoes = []
    for nome_linha, estacoes in REDE.items():
        for estacao in estacoes:
            opcoes.append({"linha": nome_linha, "nome": estacao})
    return opcoes


def escolher_estacao(titulo):
    opcoes = todas_estacoes_para_menu()
    print(f"\n{titulo}")
    linha("-")
    linha_atual = ""
    for i, est in enumerate(opcoes, start=1):
        if est["linha"] != linha_atual:
            linha_atual = est["linha"]
            print(f"\n  {linha_atual}")
        print(f"  {i:3d}) {est['nome']}")
    indice = ler_inteiro("\n  Escolha o numero da estacao: ", 1, len(opcoes))
    return opcoes[indice - 1]


# ============================================================
# FUNCOES DO MODELO
# ============================================================

def chave(linha_nome, estacao):
    return f"{linha_nome}|{estacao}"


def haversine_km(lat1, lon1, lat2, lon2):
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (math.sin(d_lat / 2) ** 2
         + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2))
         * math.sin(d_lon / 2) ** 2)
    return 2 * RAIO_TERRA_KM * math.asin(math.sqrt(a))


def estacao_mais_proxima(lat, lon):
    melhor_nome, menor = None, float("inf")
    for nome, coords in COORDENADAS_GNSS.items():
        d = haversine_km(lat, lon, coords[0], coords[1])
        if d < menor:
            menor = d
            melhor_nome = nome
    return melhor_nome, menor


def adicionar_aresta(grafo, origem, destino, dados):
    if origem not in grafo:
        grafo[origem] = []
    grafo[origem].append({"para": destino, **dados})


def construir_grafo():
    grafo = {}

    for nome_linha, estacoes in REDE.items():
        km = KM_OPERACIONAL_LINHA.get(nome_linha, 1.2)
        tempo = max(2, round((km / VELOCIDADE) * 60 + PAUSA_ESTACAO))
        for i in range(len(estacoes) - 1):
            a = chave(nome_linha, estacoes[i])
            b = chave(nome_linha, estacoes[i + 1])
            dados_ab = {"tipo": "trecho", "linha": nome_linha, "km": km, "tempo": tempo, "transferencia": ""}
            dados_ba = {"tipo": "trecho", "linha": nome_linha, "km": km, "tempo": tempo, "transferencia": ""}
            adicionar_aresta(grafo, a, b, dados_ab)
            adicionar_aresta(grafo, b, a, dados_ba)

    for estacao, linhas in BALDEACOES.items():
        for linha_a in linhas:
            for linha_b in linhas:
                if linha_a == linha_b:
                    continue
                if estacao in REDE[linha_a] and estacao in REDE[linha_b]:
                    adicionar_aresta(grafo, chave(linha_a, estacao), chave(linha_b, estacao), {
                        "tipo": "transferencia",
                        "linha": linha_b,
                        "km": 0.15,
                        "tempo": 4,
                        "transferencia": estacao,
                    })

    for corredor in TRANSFERENCIAS_CORREDOR:
        linha_a, est_a = corredor["a"]
        linha_b, est_b = corredor["b"]
        adicionar_aresta(grafo, chave(linha_a, est_a), chave(linha_b, est_b), {
            "tipo": "transferencia",
            "linha": linha_b,
            "km": corredor["distancia"],
            "tempo": corredor["tempo"],
            "transferencia": corredor["nome"],
        })
        adicionar_aresta(grafo, chave(linha_b, est_b), chave(linha_a, est_a), {
            "tipo": "transferencia",
            "linha": linha_a,
            "km": corredor["distancia"],
            "tempo": corredor["tempo"],
            "transferencia": corredor["nome"],
        })

    return grafo


def calcular_rota(origem, destino):
    origem_no = chave(origem["linha"], origem["nome"])
    destino_no = chave(destino["linha"], destino["nome"])
    grafo = construir_grafo()
    dist = {origem_no: 0}
    anterior = {}
    fila = [{"no": origem_no, "custo": 0}]

    while fila:
        fila.sort(key=lambda item: item["custo"])
        atual = fila.pop(0)
        if atual["custo"] != dist.get(atual["no"]):
            continue
        if atual["no"] == destino_no:
            break

        for aresta in grafo.get(atual["no"], []):
            penalidade = 8 if aresta["tipo"] == "transferencia" else 0
            novo_custo = atual["custo"] + aresta["tempo"] + penalidade
            if novo_custo < dist.get(aresta["para"], float("inf")):
                dist[aresta["para"]] = novo_custo
                anterior[aresta["para"]] = {"de": atual["no"], "aresta": aresta}
                fila.append({"no": aresta["para"], "custo": novo_custo})

    if destino_no not in dist:
        return None

    passos = []
    cursor = destino_no
    while cursor != origem_no:
        item = anterior.get(cursor)
        if item is None:
            return None
        passos.insert(0, {"de": item["de"], "para": cursor, "aresta": item["aresta"]})
        cursor = item["de"]

    estacoes = [origem["nome"]]
    linhas = [origem["linha"]]
    transferencias = []
    distancia = 0.0
    tempo = 0
    paradas = 0

    for passo in passos:
        _, estacao_destino = passo["para"].split("|", 1)
        aresta = passo["aresta"]
        distancia += aresta["km"]
        tempo += aresta["tempo"]
        if aresta["tipo"] == "transferencia":
            if aresta["transferencia"] and aresta["transferencia"] not in transferencias:
                transferencias.append(aresta["transferencia"])
            if aresta["linha"] not in linhas:
                linhas.append(aresta["linha"])
        else:
            paradas += 1
        if estacoes[-1] != estacao_destino:
            estacoes.append(estacao_destino)

    return {
        "linhas": linhas,
        "estacoes": estacoes,
        "transferencias": transferencias,
        "paradas": paradas,
        "distancia": distancia,
        "tempo": tempo,
        "tarifa": TARIFA,
    }


# ============================================================
# OPCOES DO MENU
# ============================================================

def opcao_descricao():
    linha()
    print("SOBRE O HOLOPASS")
    linha()
    print("Pulseira inteligente que paga transporte por NFC, usa GNSS")
    print("para localizar estacoes e calcula rotas com baldeacoes reais.")
    print("A solucao integra app web, Python, Arduino e modelo matematico.")
    print("Tema: Industria Espacial; ODS 9, 10 e 11.")


def opcao_detectar_estacao():
    linha()
    print("DETECCAO DE ESTACAO POR GNSS (Haversine)")
    linha()
    print("Informe sua posicao. Exemplo: -23.5505 / -46.6333")
    lat = ler_float("  Latitude:  ")
    lon = ler_float("  Longitude: ")
    nome, dist = estacao_mais_proxima(lat, lon)
    print(f"\n  Estacao mais proxima: {nome}")
    print(f"  Distancia por Haversine: {dist:.2f} km")
    print("  Observacao: a selecao de rota contem a rede completa;")
    print("  o GNSS usa as coordenadas cadastradas no prototipo.")


def imprimir_rota(rota, origem, destino):
    print(f"\n  Rota: {origem['nome']} ({origem['linha']}) -> {destino['nome']} ({destino['linha']})")
    print(f"  Linhas: {' -> '.join(rota['linhas'])}")
    if rota["transferencias"]:
        print(f"  Baldeacoes: {', '.join(rota['transferencias'])}")
    else:
        print("  Baldeacoes: nenhuma")
    print(f"  Paradas: {rota['paradas']}")
    print(f"  Distancia operacional: {rota['distancia']:.1f} km")
    print(f"  Tempo estimado: ~{rota['tempo']} min")
    print(f"  Tarifa atual: {brl(rota['tarifa'])}")
    print(f"  Trecho: {' -> '.join(rota['estacoes'])}")


def opcao_calcular_rota():
    linha()
    print("CALCULO DE ROTA, TEMPO E TARIFA")
    linha()
    origem = escolher_estacao("ESTACAO DE ORIGEM:")
    destino = escolher_estacao("ESTACAO DE DESTINO:")
    if origem["linha"] == destino["linha"] and origem["nome"] == destino["nome"]:
        print("\n  ! Origem e destino sao iguais. Operacao cancelada.")
        return
    rota = calcular_rota(origem, destino)
    if rota is None:
        print("\n  ! Nao foi possivel calcular essa rota.")
        return
    imprimir_rota(rota, origem, destino)


def opcao_recarregar():
    global saldo
    linha()
    print("RECARGA DA PULSEIRA")
    linha()
    print(f"  Saldo atual: {brl(saldo)}")
    valor = ler_float("  Valor da recarga (R$): ", minimo=0.01)
    saldo += valor
    passagens = int(saldo // TARIFA)
    print(f"\n  Recarga de {brl(valor)} confirmada.")
    print(f"  Novo saldo: {brl(saldo)}")
    print(f"  Da para ~{passagens} passagens de {brl(TARIFA)}")


def opcao_registrar_viagem():
    global saldo
    linha()
    print("REGISTRAR VIAGEM (pagamento NFC simulado)")
    linha()
    if saldo < TARIFA:
        print(f"  ! Saldo insuficiente ({brl(saldo)}). Recarregue primeiro.")
        return
    origem = escolher_estacao("ESTACAO DE ORIGEM:")
    destino = escolher_estacao("ESTACAO DE DESTINO:")
    if origem["linha"] == destino["linha"] and origem["nome"] == destino["nome"]:
        print("\n  ! Origem e destino sao iguais. Operacao cancelada.")
        return
    rota = calcular_rota(origem, destino)
    if rota is None:
        print("\n  ! Nao foi possivel registrar essa rota.")
        return
    saldo -= TARIFA
    historico.append({
        "origem": origem["nome"],
        "destino": destino["nome"],
        "tarifa": TARIFA,
        "tempo": rota["tempo"],
        "distancia": rota["distancia"],
    })
    print(f"\n  Pagamento aprovado. Debito de {brl(TARIFA)}")
    print(f"  Saldo restante: {brl(saldo)}")
    print(f"  Viagem registrada ({len(historico)} no total).")


def opcao_relatorio():
    linha()
    print("HISTORICO E ESTATISTICAS")
    linha()
    if not historico:
        print("  Nenhuma viagem registrada ainda. Use a opcao 5.")
        return
    total_gasto = 0.0
    tempo_total = 0
    distancia_total = 0.0
    print(f"  {'#':>2}  {'ORIGEM':14s} {'DESTINO':14s} {'TARIFA':>8s} {'TEMPO':>6s}")
    print("  " + "-" * 54)
    for i, viagem in enumerate(historico, start=1):
        total_gasto += viagem["tarifa"]
        tempo_total += viagem["tempo"]
        distancia_total += viagem["distancia"]
        print(f"  {i:>2}  {viagem['origem'][:14]:14s} {viagem['destino'][:14]:14s}"
              f" {brl(viagem['tarifa']):>8s} {viagem['tempo']:>4d}m")
    print("  " + "-" * 54)
    print(f"  Viagens: {len(historico)} | Gasto total: {brl(total_gasto)}")
    print(f"  Tempo total: {tempo_total} min | Distancia: {distancia_total:.1f} km")
    print(f"  Tarifa media por viagem: {brl(total_gasto / len(historico))}")


# ============================================================
# MENU PRINCIPAL
# ============================================================

def mostrar_menu():
    print()
    linha("*")
    print("        HOLOPASS - SISTEMA DE TRANSPORTE (Python)")
    linha("*")
    print("  1 - Sobre a solucao (descricao)")
    print("  2 - Detectar estacao mais proxima (GNSS)")
    print("  3 - Calcular rota, tempo e tarifa")
    print("  4 - Recarregar saldo da pulseira")
    print("  5 - Registrar viagem (pagamento NFC)")
    print("  6 - Historico e estatisticas")
    print("  0 - Sair")
    print(f"  [ saldo atual: {brl(saldo)} ]")
    linha("-")


def main():
    print("\nBem-vindo ao HoloPass! (Ctrl+C para sair a qualquer momento)")
    while True:
        mostrar_menu()
        opcao = ler_inteiro("  Escolha uma opcao: ", 0, 6)

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
                print("\nObrigado por usar o HoloPass. Boa viagem!")
                break

        input("\n  (pressione ENTER para voltar ao menu) ")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nEncerrado pelo usuario. Ate logo!")
