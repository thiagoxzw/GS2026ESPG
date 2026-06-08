# -*- coding: utf-8 -*-
"""
HoloPass — Modelagem Matemática do Posicionamento por Satélite (GNSS)
Disciplina: Differentiated Problem Solving — Global Solution 2026 (Indústria Espacial)

Este script constrói, analisa e interpreta TRÊS funções ligadas ao funcionamento
de um sistema de navegação por satélite (GNSS), que é a base do HoloPass:

  1) TRIGONOMÉTRICA  -> Haversine: distância real entre dois pontos da Terra (esfera)
  2) POLINOMIAL      -> Trilateração: posição obtida a partir de distâncias a satélites
  3) LOGARÍTMICA     -> Free-Space Path Loss: enfraquecimento do sinal do satélite

Cada bloco imprime: a função, domínio, imagem, crescimento/decrescimento e
interpretação física, além de gerar um gráfico .png.

IMPORTANTE (honestidade técnica):
- As funções 1 e 3 são leis físicas/geométricas reais.
- A função extra "erro x nº de satélites" (bloco 4) é um MODELO DIDÁTICO
  ilustrativo proposto por nós, NÃO uma lei medida — está rotulada como tal.
"""

import math
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

try:
    import matplotlib
    matplotlib.use("Agg")  # permite salvar gráfico sem tela; troque por padrão se for rodar local
    import matplotlib.pyplot as plt
    import numpy as np
    TEM_MATPLOTLIB = True
except ModuleNotFoundError:
    plt = None
    np = None
    TEM_MATPLOTLIB = False

R_TERRA_KM = 6371.0          # raio médio da Terra
C_LUZ = 299_792_458.0        # velocidade da luz (m/s)

# Coordenadas reais reutilizadas do app HoloPass (algumas estações de SP)
ESTACOES = {
    "Sé":        (-23.5505, -46.6333),
    "Luz":       (-23.5345, -46.6356),
    "Paulista":  (-23.5546, -46.6620),
    "Tatuapé":   (-23.5410, -46.5775),
}


def linspace(inicio, fim, qtd):
    """Versão mínima de np.linspace para ambientes sem NumPy."""
    if np is not None:
        return np.linspace(inicio, fim, qtd)
    if qtd <= 1:
        return [inicio]
    passo = (fim - inicio) / (qtd - 1)
    return [inicio + passo * i for i in range(qtd)]


def salvar_svg_linha(nome, titulo, xs, ys, cor="#00b3c4", vline=None):
    """Gera um gráfico de linha SVG simples quando matplotlib não está instalado."""
    largura, altura = 760, 430
    margem = 52
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    if min_y == max_y:
        max_y = min_y + 1

    def sx(x):
        return margem + (x - min_x) / (max_x - min_x) * (largura - 2 * margem)

    def sy(y):
        return altura - margem - (y - min_y) / (max_y - min_y) * (altura - 2 * margem)

    pontos = " ".join(f"{sx(x):.1f},{sy(y):.1f}" for x, y in zip(xs, ys))
    extra = ""
    if vline is not None and min_x <= vline <= max_x:
        x = sx(vline)
        extra = f'<line x1="{x:.1f}" y1="{margem}" x2="{x:.1f}" y2="{altura-margem}" stroke="#777" stroke-dasharray="6 5"/>'

    Path(nome).write_text(f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largura} {altura}">
  <rect width="{largura}" height="{altura}" fill="#ffffff"/>
  <text x="{largura/2}" y="28" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700">{titulo}</text>
  <line x1="{margem}" y1="{altura-margem}" x2="{largura-margem}" y2="{altura-margem}" stroke="#333"/>
  <line x1="{margem}" y1="{margem}" x2="{margem}" y2="{altura-margem}" stroke="#333"/>
  {extra}
  <polyline points="{pontos}" fill="none" stroke="{cor}" stroke-width="3"/>
  <text x="{margem}" y="{altura-16}" font-family="Arial" font-size="12">x: {min_x:.2f} a {max_x:.2f}</text>
  <text x="{largura-margem}" y="{altura-16}" text-anchor="end" font-family="Arial" font-size="12">y: {min_y:.2f} a {max_y:.2f}</text>
</svg>
""", encoding="utf-8")


def salvar_svg_trilateracao(nome, sats, raios, ponto):
    largura, altura = 620, 620
    margem = 56
    xs = [p[0] for p in sats] + [ponto[0]]
    ys = [p[1] for p in sats] + [ponto[1]]
    max_raio = max(raios)
    min_x, max_x = min(xs) - max_raio, max(xs) + max_raio
    min_y, max_y = min(ys) - max_raio, max(ys) + max_raio
    escala = min((largura - 2 * margem) / (max_x - min_x), (altura - 2 * margem) / (max_y - min_y))

    def sx(x):
        return margem + (x - min_x) * escala

    def sy(y):
        return altura - margem - (y - min_y) * escala

    cores = ["#00b3c4", "#ff8a3d", "#8a5cf6"]
    circulos = []
    for (sat, raio, cor) in zip(sats, raios, cores):
        circulos.append(f'<circle cx="{sx(sat[0]):.1f}" cy="{sy(sat[1]):.1f}" r="{raio*escala:.1f}" fill="none" stroke="{cor}" stroke-width="2"/>')
        circulos.append(f'<circle cx="{sx(sat[0]):.1f}" cy="{sy(sat[1]):.1f}" r="5" fill="{cor}"/>')

    Path(nome).write_text(f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {largura} {altura}">
  <rect width="{largura}" height="{altura}" fill="#ffffff"/>
  <text x="{largura/2}" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700">Trilateração: interseção de 3 círculos</text>
  {''.join(circulos)}
  <text x="{sx(ponto[0]):.1f}" y="{sy(ponto[1])-12:.1f}" text-anchor="middle" font-family="Arial" font-size="22" fill="#000">★</text>
</svg>
""", encoding="utf-8")


# ----------------------------------------------------------------------
# 1) FUNÇÃO TRIGONOMÉTRICA — Haversine
# ----------------------------------------------------------------------
def haversine_km(lat1, lon1, lat2, lon2):
    """Distância em km entre dois pontos (lat,lon) sobre a esfera terrestre.
    Usa seno e cosseno -> função trigonométrica.
        a = sin^2(dphi/2) + cos(phi1)*cos(phi2)*sin^2(dlambda/2)
        d = 2*R*asin(sqrt(a))
    """
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlmb = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlmb / 2) ** 2
    return 2 * R_TERRA_KM * math.asin(math.sqrt(a))


def analisar_haversine():
    print("=" * 64)
    print("1) FUNÇÃO TRIGONOMÉTRICA — Haversine (distância na esfera)")
    print("=" * 64)
    print("f(dphi,dlambda) = 2R*asin( sqrt( sin^2(dphi/2)")
    print("                  + cos(phi1)cos(phi2) sin^2(dlambda/2) ) )")
    print("Domínio: ângulos de latitude/longitude (em radianos).")
    print("Imagem: distância >= 0 km (até pi*R no caso extremo).")
    print("Comportamento: cresce conforme a separação angular aumenta;")
    print("os senos/cossenos capturam a curvatura da Terra (não é reta).")
    print()
    # Compara com a aproximação EUCLIDIANA usada hoje no app (grau*111)
    print("Comparação Haversine x aproximação atual do app (grau*111 km):")
    base = ESTACOES["Sé"]
    for nome, (la, lo) in ESTACOES.items():
        d_hav = haversine_km(base[0], base[1], la, lo)
        d_euc = math.sqrt((base[0]-la)**2 + (base[1]-lo)**2) * 111
        print(f"  Sé -> {nome:9s}: Haversine={d_hav:6.2f} km | Euclidiana={d_euc:6.2f} km")
    print("  -> A Haversine é a correção que deixa a distância do app precisa.")
    print()

    # Gráfico: distância da Sé conforme andamos para o norte (variando latitude)
    lats = linspace(-23.65, -23.45, 200)
    dists = [haversine_km(-23.5505, -46.6333, la, -46.6333) for la in lats]
    if TEM_MATPLOTLIB:
        plt.figure(figsize=(7, 4))
        plt.plot(lats, dists, color="#00b3c4")
        plt.title("Haversine: distância à estação Sé variando a latitude")
        plt.xlabel("Latitude (graus)")
        plt.ylabel("Distância (km)")
        plt.grid(alpha=0.3)
        plt.tight_layout()
        plt.savefig("grafico_1_haversine.png", dpi=110)
        plt.close()
    else:
        salvar_svg_linha(
            "grafico_1_haversine.svg",
            "Haversine: distância à estação Sé variando a latitude",
            lats,
            dists,
            "#00b3c4"
        )


# ----------------------------------------------------------------------
# 2) FUNÇÃO POLINOMIAL — Trilateração (2D)
# ----------------------------------------------------------------------
def trilateracao_2d(p1, r1, p2, r2, p3, r3):
    """Resolve a posição (x,y) a partir de 3 'satélites' e suas distâncias.
    Cada satélite define um círculo:  (x - xi)^2 + (y - yi)^2 = ri^2  (polinomial).
    Subtraindo pares de equações, os termos x^2 e y^2 se cancelam e sobra
    um sistema LINEAR 2x2, que resolvemos.
    """
    (x1, y1), (x2, y2), (x3, y3) = p1, p2, p3
    A = 2 * (x2 - x1); B = 2 * (y2 - y1)
    C = r1**2 - r2**2 - x1**2 + x2**2 - y1**2 + y2**2
    D = 2 * (x3 - x2); E = 2 * (y3 - y2)
    F = r2**2 - r3**2 - x2**2 + x3**2 - y2**2 + y3**2
    den = (A * E - B * D)
    x = (C * E - F * B) / den
    y = (A * F - D * C) / den
    return x, y


def analisar_trilateracao():
    print("=" * 64)
    print("2) FUNÇÃO POLINOMIAL — Trilateração (como o GNSS acha a posição)")
    print("=" * 64)
    print("Cada satélite i:  (x - xi)^2 + (y - yi)^2 = ri^2   (grau 2 = polinomial)")
    print("Domínio: distâncias ri >= 0 medidas pelo tempo do sinal (d = c*t).")
    print("Imagem: ponto (x,y) de interseção dos círculos.")
    print("Interpretação: a posição é o encontro das esferas/círculos; por isso")
    print("o receptor precisa de >= 3 satélites (em 3D, >= 4) para fixar o local.")
    print()
    # Ponto verdadeiro e três 'satélites' fictícios (plano local em km)
    verdadeiro = (3.0, 4.0)
    sats = [(0.0, 0.0), (10.0, 0.0), (0.0, 10.0)]
    raios = [math.dist(verdadeiro, s) for s in sats]
    est = trilateracao_2d(sats[0], raios[0], sats[1], raios[1], sats[2], raios[2])
    print(f"  Posição verdadeira : ({verdadeiro[0]:.2f}, {verdadeiro[1]:.2f})")
    print(f"  Posição calculada  : ({est[0]:.2f}, {est[1]:.2f})")
    print(f"  Erro               : {math.dist(verdadeiro, est):.4f} (≈0 confirma o modelo)")
    print()

    # Gráfico dos três círculos e o ponto encontrado
    if TEM_MATPLOTLIB:
        fig, ax = plt.subplots(figsize=(6, 6))
        cores = ["#00b3c4", "#ff8a3d", "#8a5cf6"]
        th = np.linspace(0, 2 * np.pi, 300)
        for (sx, sy), r, cor in zip(sats, raios, cores):
            ax.plot(sx + r * np.cos(th), sy + r * np.sin(th), color=cor, alpha=0.7)
            ax.plot(sx, sy, "o", color=cor)
        ax.plot(*verdadeiro, "k*", markersize=14, label="Posição encontrada")
        ax.set_title("Trilateração: interseção de 3 círculos (satélites)")
        ax.set_aspect("equal"); ax.grid(alpha=0.3); ax.legend()
        plt.tight_layout()
        plt.savefig("grafico_2_trilateracao.png", dpi=110)
        plt.close()
    else:
        salvar_svg_trilateracao("grafico_2_trilateracao.svg", sats, raios, verdadeiro)


# ----------------------------------------------------------------------
# 3) FUNÇÃO LOGARÍTMICA — Free-Space Path Loss (FSPL)
# ----------------------------------------------------------------------
def fspl_db(dist_km, freq_mhz=1575.42):
    """Perda de sinal no espaço livre (dB). 1575.42 MHz = frequência GPS L1.
        FSPL(dB) = 20*log10(d_km) + 20*log10(f_MHz) + 32.44
    Função logarítmica na distância -> mostra por que o sinal chega fraco.
    """
    return 20 * math.log10(dist_km) + 20 * math.log10(freq_mhz) + 32.44


def analisar_fspl():
    print("=" * 64)
    print("3) FUNÇÃO LOGARÍTMICA — Perda do sinal do satélite (FSPL)")
    print("=" * 64)
    print("FSPL(d) = 20*log10(d) + 20*log10(f) + 32.44   (logarítmica em d)")
    print("Domínio: distância d > 0 km (satélite a ~20.000 km de altitude).")
    print("Imagem: perda em dB (cresce devagar, em escala log).")
    print("Interpretação: o sinal GNSS percorre milhares de km e chega")
    print("MUITO fraco à Terra — por isso o receptor precisa de boa antena.")
    print()
    for d in [550, 2000, 20200]:  # órbita baixa, média, e altitude típica GPS
        print(f"  d = {d:6d} km  ->  perda ≈ {fspl_db(d):6.2f} dB")
    print()

    ds = linspace(500, 25000, 300)
    perdas = [fspl_db(d) for d in ds]
    if TEM_MATPLOTLIB:
        plt.figure(figsize=(7, 4))
        plt.plot(ds, perdas, color="#8a5cf6")
        plt.axvline(20200, ls="--", color="gray", alpha=0.7, label="Altitude ~GPS")
        plt.title("FSPL: perda do sinal x distância (escala logarítmica)")
        plt.xlabel("Distância (km)"); plt.ylabel("Perda (dB)")
        plt.grid(alpha=0.3); plt.legend(); plt.tight_layout()
        plt.savefig("grafico_3_fspl.png", dpi=110)
        plt.close()
    else:
        salvar_svg_linha(
            "grafico_3_fspl.svg",
            "FSPL: perda do sinal x distância",
            ds,
            perdas,
            "#8a5cf6",
            vline=20200
        )


# ----------------------------------------------------------------------
# 4) (EXTRA) FUNÇÃO EXPONENCIAL — modelo DIDÁTICO de erro x nº de satélites
# ----------------------------------------------------------------------
def erro_por_satelites(n, e0=50.0, k=0.45):
    """MODELO DIDÁTICO (não é lei medida): erro de posição cai conforme
    aparecem mais satélites visíveis.  E(n) = e0 * exp(-k*(n-4)), n>=4."""
    if n < 4:
        return None  # abaixo de 4 satélites o GNSS 3D não fixa posição
    return e0 * math.exp(-k * (n - 4))


def analisar_exponencial():
    print("=" * 64)
    print("4) (EXTRA) FUNÇÃO EXPONENCIAL — erro x nº de satélites [DIDÁTICO]")
    print("=" * 64)
    print("E(n) = E0 * e^(-k*(n-4))   — proposto por nós para ilustrar a ideia.")
    print("Domínio: n >= 4 satélites (mínimo para posição 3D).")
    print("Imagem: erro em metros, decrescente e sempre positivo.")
    print("AVISO: relação ilustrativa, NÃO um valor medido em campo.")
    print()
    ns = list(range(4, 13))
    erros = [erro_por_satelites(n) for n in ns]
    for n, e in zip(ns, erros):
        print(f"  {n:2d} satélites -> erro estimado ≈ {e:5.2f} m")
    print()
    if TEM_MATPLOTLIB:
        plt.figure(figsize=(7, 4))
        plt.plot(ns, erros, "o-", color="#ff8a3d")
        plt.title("Modelo didático: erro de posição x nº de satélites")
        plt.xlabel("Satélites visíveis"); plt.ylabel("Erro estimado (m)")
        plt.grid(alpha=0.3); plt.tight_layout()
        plt.savefig("grafico_4_exponencial.png", dpi=110)
        plt.close()
    else:
        salvar_svg_linha(
            "grafico_4_exponencial.svg",
            "Modelo didático: erro de posição x nº de satélites",
            ns,
            erros,
            "#ff8a3d"
        )


if __name__ == "__main__":
    print("\nHOLOPASS — MODELAGEM MATEMÁTICA DO GNSS\n")
    if not TEM_MATPLOTLIB:
        print("Aviso: matplotlib/numpy não encontrados; gerando gráficos SVG com fallback interno.\n")
    analisar_haversine()
    analisar_trilateracao()
    analisar_fspl()
    analisar_exponencial()
    extensao = "png" if TEM_MATPLOTLIB else "svg"
    print(f"Gráficos salvos: grafico_1_haversine.{extensao} ... grafico_4_exponencial.{extensao}")
