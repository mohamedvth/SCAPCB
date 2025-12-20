// Usage: node import-csv-to-sqlite.js readings_2025.csv
// Imports CSV produced by the browser export into the readings table.

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const { run } = require('./db');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node import-csv-to-sqlite.js <csv-file>');
  process.exit(1);
}

const parser = fs.createReadStream(file).pipe(parse({ columns: true, skip_empty_lines: true }));

(async () => {
  let count = 0;
  for await (const row of parser) {
    function toInt(v) {
      if (!v) return null;
      const n = String(v).replace(/[^0-9\-]/g, '');
      return n === '' ? null : parseInt(n, 10);
    }
    await run(
      `INSERT INTO readings
        (reading_date, reading_time, forage1_index, forage1_consumption,
         forage2_index, forage2_consumption, forage3_index, forage3_consumption,
         total_consumption, source)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        row.date || null,
        row.time || null,
        row.forage1_index || null,
        toInt(row.forage1_consumption),
        row.forage2_index || null,
        toInt(row.forage2_consumption),
        row.forage3_index || null,
        toInt(row.forage3_consumption),
        toInt(row.total_consumption),
        'imported_csv'
      ]
    );
    count++;
  }
  console.log('Imported rows:', count);
  process.exit(0);
})();