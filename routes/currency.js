import express from "express";
import Currency from "../models/currency.js";

const router = express.Router();

// Get all currencies
router.get("/", async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a currency
router.post("/", async (req, res) => {
  const currency = new Currency(req.body);
  try {
    const newCurrency = await currency.save();
    res.status(201).json(newCurrency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
