from pathlib import Path

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


def converter(md_path: Path, pdf_path: Path) -> None:
    estilos = getSampleStyleSheet()
    estilos.add(ParagraphStyle(name="H1Custom", parent=estilos["Heading1"], fontSize=20, leading=24, spaceAfter=14))
    estilos.add(ParagraphStyle(name="H2Custom", parent=estilos["Heading2"], fontSize=14, leading=18, spaceBefore=12, spaceAfter=8))
    estilos.add(ParagraphStyle(name="BodyCustom", parent=estilos["BodyText"], fontSize=10.5, leading=14, spaceAfter=7))
    estilos.add(ParagraphStyle(name="BulletCustom", parent=estilos["BodyText"], fontSize=10.5, leading=14, leftIndent=14, bulletIndent=4, spaceAfter=5))

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
            story.append(Paragraph(normalizar(line[2:]), estilos["H1Custom"]))
        elif line.startswith("## "):
            story.append(Paragraph(normalizar(line[3:]), estilos["H2Custom"]))
        elif line.startswith("### "):
            story.append(Paragraph(f"<b>{normalizar(line[4:])}</b>", estilos["BodyCustom"]))
        elif line.startswith("- "):
            story.append(Paragraph(normalizar(line[2:]), estilos["BulletCustom"], bulletText="•"))
        elif line[:3].strip(".").isdigit() and ". " in line[:5]:
            story.append(Paragraph(normalizar(line), estilos["BodyCustom"]))
        else:
            story.append(Paragraph(normalizar(line), estilos["BodyCustom"]))

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
    ).build(story)


def main() -> None:
    for md_path, pdf_path in DOCUMENTOS:
        converter(md_path, pdf_path)
        print(f"PDF gerado: {pdf_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
