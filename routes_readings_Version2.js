const express = require('express');
const { run, all, get } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

// auth middleware
function auth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'missing auth' });
  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'malformed auth' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// List readings (optional filters)
router.get('/', async (req, res) => {
  try {
    let sql = 'SELECT * FROM readings';
    const params = [];
    if (req.query.date) {
      sql += ' WHERE reading_date = ?';
      params.push(req.query.date);
    } else if (req.query.month) {
      sql += " WHERE substr(reading_date,6,2) = ?";
      params.push(req.query.month);
    }
    sql += ' ORDER BY reading_date';
    const rows = await all(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Get single
router.get('/:id', async (req, res) => {
  try {
    const row = await get('SELECT * FROM readings WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

// Create (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const {
      reading_date, reading_time,
      forage1_index, forage1_consumption,
      forage2_index, forage2_consumption,
      forage3_index, forage3_consumption,
      total_consumption, notes
    } = req.body;

    const result = await run(
      `INSERT INTO readings
        (reading_date, reading_time, forage1_index, forage1_consumption,
         forage2_index, forage2_consumption, forage3_index, forage3_consumption,
         total_consumption, notes, source)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        reading_date, reading_time,
        forage1_index, forage1_consumption || null,
        forage2_index, forage2_consumption || null,
        forage3_index, forage3_consumption || null,
        total_consumption || null, notes || null, 'api'
      ]
    );
    const row = await get('SELECT * FROM readings WHERE id = ?', [result.id]);
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Update (auth)
router.put('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const fields = req.body;
    const allowed = ['reading_date','reading_time','forage1_index','forage1_consumption','forage2_index','forage2_consumption','forage3_index','forage3_consumption','total_consumption','notes'];
    const sets = [];
    const params = [];
    Object.keys(fields).forEach(k => {
      if (allowed.includes(k)) {
        sets.push(`${k} = ?`);
        params.push(fields[k]);
      }
    });
    if (sets.length === 0) return res.status(400).json({ error: 'no valid fields' });
    params.push(id);
    await run(`UPDATE readings SET ${sets.join(', ')} WHERE id = ?`, params);
    const row = await get('SELECT * FROM readings WHERE id = ?', [id]);
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Delete (auth)
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    await run('DELETE FROM readings WHERE id = ?', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;