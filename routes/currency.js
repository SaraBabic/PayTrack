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

// Get single currency by ID
router.get("/:id", async (req, res) => {
  try {
    const currency = await Currency.findById(req.params.id);
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }
    res.json(currency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a currency
router.patch("/:id", async (req, res) => {
  try {
    const updatedCurrency = await Currency.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCurrency) {
      return res.status(404).json({ message: "Currency not found" });
    }

    res.json(updatedCurrency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a currency
router.delete("/:id", async (req, res) => {
  try {
    const deletedCurrency = await Currency.findByIdAndDelete(req.params.id);

    if (!deletedCurrency) {
      return res.status(404).json({ message: "Currency not found" });
    }

    res.json({ message: "Currency deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
