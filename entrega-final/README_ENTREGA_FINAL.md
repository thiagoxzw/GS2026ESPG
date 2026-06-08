# Entrega Final - HoloPass GS 2026

**Equipe:** Thiago Souza de Lima - RM 568732

## Arquivos principais para abrir primeiro

1. `auditoria/RELATORIO_AUDITORIA.md`
2. `auditoria/SPEC_REVISAO_FINAL.md`
3. `software-total-experience/Software_TXD_HoloPass.docx`
4. `software-total-experience/HoloPass_Software_TX.pdf`
5. `README.md`

## Demonstracao do app

Abrir o projeto na raiz com:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Depois acessar:

```text
http://127.0.0.1:8000/index.html
```

## Rota critica para demonstrar

- Origem: Linha 9 - Esmeralda / Osasco
- Destino: Linha 2 - Verde / Trianon-MASP
- Resultado esperado: Linha 9 -> Linha 4 -> Linha 2, com 21,1 km estimados.

## Pendencias externas

- Publicar Wokwi e inserir link no README do Edge.
- Gravar pitch de 5 minutos (+/-15s) com voz/rosto/slides.
- Publicar no YouTube com nome e RM.
- Validar GNSS concedido em celular real.
