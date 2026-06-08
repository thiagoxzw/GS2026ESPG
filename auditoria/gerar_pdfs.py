from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Preformatted, Spacer


ROOT = Path(__file__).resolve().parents[1]

DOCUMENTOS = [
    (
        ROOT / "software-total-experience" / "HoloPass_Software_TX.md",
        ROOT / "software-total-experience" / "HoloPass_Software_TX.pdf",
    ),
    (
        ROOT / "computational-thinking" / "RELATORIO_EXECUCAO_CT.md",
        ROOT / "computational-thinking" / "RELATORIO_EXECUCAO_CT.pdf",
    ),
    (
        ROOT / "differentiated-problem-solving" / "RELATORIO_MODELO_GNSS.md",
        ROOT / "differentiated-problem-solving" / "RELATORIO_MODELO_GNSS.pdf",
    ),
]


def normalizar(texto: str) -> str:
    return (
        texto.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def inline_md(texto: str) -> str:
    texto = normalizar(texto)
    return re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", texto)


def decorar_pagina(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(colors.HexColor("#0B1F33"))
    canvas.rect(0, height - 1.05 * cm, width, 1.05 * cm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(1.7 * cm, height - 0.68 * cm, "HoloPass · Global Solution 2026")
    canvas.setFillColor(colors.HexColor("#637083"))
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - 1.7 * cm, 0.9 * cm, f"Thiago Souza de Lima · RM 568732 · pagina {doc.page}")
    canvas.setStrokeColor(colors.HexColor("#D9E2EC"))
    canvas.setLineWidth(0.4)
    canvas.line(1.7 * cm, 1.18 * cm, width - 1.7 * cm, 1.18 * cm)
    canvas.restoreState()


def converter(md_path: Path, pdf_path: Path) -> None:
    estilos = getSampleStyleSheet()
    estilos.add(ParagraphStyle(name="H1Custom", parent=estilos["Heading1"], fontSize=20, leading=24, spaceBefore=12, spaceAfter=16, textColor=colors.HexColor("#0B1F33")))
    estilos.add(ParagraphStyle(name="H2Custom", parent=estilos["Heading2"], fontSize=14, leading=18, spaceBefore=14, spaceAfter=8, textColor=colors.HexColor("#1F5E86")))
    estilos.add(ParagraphStyle(name="BodyCustom", parent=estilos["BodyText"], fontSize=10.4, leading=14.4, spaceAfter=7, textColor=colors.HexColor("#1F2933")))
    estilos.add(ParagraphStyle(name="BulletCustom", parent=estilos["BodyText"], fontSize=10.4, leading=14.4, leftIndent=16, bulletIndent=5, spaceAfter=5, textColor=colors.HexColor("#1F2933")))
    estilos["Code"].fontSize = 8.6
    estilos["Code"].leading = 10.6

    story = []
    in_code = False
    code_lines = []

    def flush_code():
        nonlocal code_lines
        if code_lines:
            story.append(Preformatted("\n".join(code_lines), estilos["Code"]))
            story.append(Spacer(1, 0.18 * cm))
            code_lines = []

    for raw in md_path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        if line.startswith("```"):
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_lines.append(line)
            continue
        if not line:
            story.append(Spacer(1, 0.12 * cm))
        elif line.startswith("# "):
            story.append(Paragraph(inline_md(line[2:]), estilos["H1Custom"]))
        elif line.startswith("## "):
            story.append(Paragraph(inline_md(line[3:]), estilos["H2Custom"]))
        elif line.startswith("### "):
            story.append(Paragraph(f"<b>{inline_md(line[4:])}</b>", estilos["BodyCustom"]))
        elif line.startswith("- "):
            story.append(Paragraph(inline_md(line[2:]), estilos["BulletCustom"], bulletText="•"))
        elif line[:3].strip(".").isdigit() and ". " in line[:5]:
            story.append(Paragraph(inline_md(line), estilos["BodyCustom"]))
        else:
            story.append(Paragraph(inline_md(line), estilos["BodyCustom"]))

    flush_code()
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=1.7 * cm,
        rightMargin=1.7 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.6 * cm,
        title=md_path.stem,
    ).build(story, onFirstPage=decorar_pagina, onLaterPages=decorar_pagina)


def main() -> None:
    for md_path, pdf_path in DOCUMENTOS:
        converter(md_path, pdf_path)
        print(f"PDF gerado: {pdf_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
