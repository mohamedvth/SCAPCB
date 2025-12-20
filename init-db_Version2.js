// Reads schema.sql and executes it against the SQLite DB
const fs = require('fs');
const path = require('path');
const { db } = require('./db');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error('Failed to initialize DB schema:', err);
    process.exit(1);
  }
  console.log('Database initialized with schema.sql');
  process.exit(0);
});