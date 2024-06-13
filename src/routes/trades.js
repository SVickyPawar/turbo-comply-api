const express = require('express');
const fs = require('fs');
const router = express.Router();

const TRADES_FILE = './trades.json';



const readTrades = () => {
  try {
    const data = fs.readFileSync(TRADES_FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};



const writeTrades = (trades) => {
  fs.writeFileSync(TRADES_FILE, JSON.stringify(trades, null, 2));
};

// POST /trades - Create a new trade

router.post('/', (req, res) => {
  const trades = readTrades();
  const newTrade = req.body;
  newTrade.id = trades.length ? trades[trades.length - 1].id + 1 : 1;
  trades.push(newTrade);
  writeTrades(trades);
  res.status(201).json(newTrade);
});

// GET /trades - Get all trades

router.get('/', (req, res) => {
  const trades = readTrades();
  res.status(200).json({ trades });
});

// GET - Get a trade by ID

router.get('/:id', (req, res) => {
  const trades = readTrades();
  const trade = trades.find(t => t.id === parseInt(req.params.id));
  if (trade) {
    res.status(200).json(trade);
  } else {
    res.status(404).send('ID not found');
  }
});

// DELETE - Delete a trade by ID

router.delete('/:id', (req, res) => {
  let trades = readTrades();
  const tradeIndex = trades.findIndex(t => t.id === parseInt(req.params.id));
  if (tradeIndex !== -1) {
    trades.splice(tradeIndex, 1);
    writeTrades(trades);
    res.status(200).send();
  } else {
    res.status(404).send('ID not found');
  }
});

// PATCH  Update the price of a trade by ID

router.patch('/:id', (req, res) => {
  let trades = readTrades();
  const trade = trades.find(t => t.id === parseInt(req.params.id));
  if (trade) {
    trade.price = req.body.price !== undefined ? req.body.price : trade.price;
    writeTrades(trades);
    res.status(200).json(trade);
  } else {
    res.status(404).send('ID not found');
  }
});

module.exports = router;
