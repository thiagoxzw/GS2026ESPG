# Changelog — HoloPass v2.1 (GNSS + Observação da Terra)

Alterações feitas a partir do projeto original para conectá-lo à indústria
espacial brasileira (tema da Global Solution 2026 — Space Connect).

## v2.1 — Camada de Observação da Terra (NOVA)

### index.html

- Adicionado item **"OBSERVAÇÃO DA TERRA"** no painel de Recursos do Dispositivo,
  com status "CBERS-4A · INPE · dados públicos".
- Adicionada faixa informativa **"🌎 CAMADA ESPACIAL BRASILEIRA"** explicando o
  cruzamento entre posição GNSS e imagens dos satélites brasileiros CBERS-4A
  (parceria Brasil–China, INPE+AEB+CNSA) e Amazonia-1 (100% brasileiro, INPE).
- Indicação clara de que a camada é **conceitual nesta versão demonstrativa**.

### Justificativa

O site oficial do Space Connect (fiap.com.br/graduacao/global-solution/) lista
o INPE e a AEB como referências oficiais do desafio. Citar e usar dados dos
satélites brasileiros está alinhado com as próprias fontes que a banca indica.

## v2.0 — Camada GNSS (alterações anteriores)

### script.js

- Função `haversineKm(lat1, lon1, lat2, lon2)`: distância real sobre a esfera.
- Leitura da `accuracy` real do GNSS (`pos.coords.accuracy`).
- Mensagens renomeadas: "GPS" → "GNSS".

### index.html

- Botão da barra mobile: "GPS" → "GNSS", emoji 📍 → 🛰️.
- Painel: "GEOLOCALIZAÇÃO" → "GNSS (GPS / Galileo)".

## O que NÃO foi alterado

- Lógica de NFC, HoloRoute determinístico, PWA e persistência local intactas.
- Não simulamos processamento real de imagens de satélite no app — a camada
  de observação da Terra é apresentada como conceito documentado, com link
  para os catálogos oficiais do INPE.
