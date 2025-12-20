const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { run, get } = require('../db');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    const existing = await get('SELECT id FROM users WHERE username = ?', [username]);
    if (existing) return res.status(409).json({ error: 'username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const result = await run('INSERT INTO users (username, password_hash) VALUES (?,?)', [username, hash]);
    res.json({ id: result.id, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;