from __future__ import annotations

import csv
import json
import zipfile
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ZIP_PADRAO = Path(r"C:\Users\thiag\Downloads\sptrans_gtfs.zip")
SAIDA = ROOT / "assets" / "sptrans-stops.min.json"


def gerar(zip_path: Path = ZIP_PADRAO) -> None:
    if not zip_path.exists():
        raise FileNotFoundError(f"GTFS nao encontrado: {zip_path}")

    stops = []
    with zipfile.ZipFile(zip_path) as zf:
        with zf.open("stops.txt") as raw:
            reader = csv.DictReader(line.decode("utf-8-sig") for line in raw)
            for row in reader:
                try:
                    lat = round(float(row["stop_lat"]), 6)
                    lon = round(float(row["stop_lon"]), 6)
                except (KeyError, TypeError, ValueError):
                    continue
                nome = (row.get("stop_name") or "").strip() or row.get("stop_id") or "Parada SPTrans"
                stops.append([nome, lat, lon])

    payload = {
        "source": "SPTrans GTFS local - stops.txt (municipio de Sao Paulo)",
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
        "total": len(stops),
        "stops": stops,
    }
    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    SAIDA.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Gerado {SAIDA.relative_to(ROOT)} com {len(stops)} paradas SPTrans.")


if __name__ == "__main__":
    gerar()
