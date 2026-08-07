// Downloads airlines.dat from OpenFlights and converts to public/airlines.json
// Run with: node scripts/build-airlines-json.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat';
const OUT = path.join(__dirname, '..', 'public', 'airlines.json');

function parseCsvLine(line) {
  const result = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      result.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

https.get(URL, (res) => {
  let raw = '';
  res.on('data', chunk => { raw += chunk; });
  res.on('end', () => {
    const lines = raw.split('\n').filter(l => l.trim());
    const airlines = [];
    for (const line of lines) {
      const fields = parseCsvLine(line);
      if (fields.length < 8) continue;
      const name = fields[1].trim();
      const iata = fields[3].trim();
      const country = fields[6].trim();
      const active = fields[7].trim();
      if (active !== 'Y') continue;
      if (!/^[A-Z0-9]{2}$/i.test(iata)) continue;
      if (!name || name === '\\N') continue;
      airlines.push({ iata: iata.toUpperCase(), name, country });
    }
    // Sort by IATA code
    airlines.sort((a, b) => a.iata.localeCompare(b.iata));
    fs.writeFileSync(OUT, JSON.stringify(airlines, null, 2));
    console.log(`Written ${airlines.length} airlines to ${OUT}`);
  });
}).on('error', (err) => {
  console.error('Download failed:', err.message);
  process.exit(1);
});
