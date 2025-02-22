import express from "express";
import Income from "../models/income.js";

const router = express.Router();

// Get all incomes
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find()
      .populate("customer_id currency_id")
      .sort({ payment_date: -1 });

    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an income
router.post("/", async (req, res) => {
  const income = new Income(req.body);
  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json({ message: "Income deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single income by ID
router.get("/:id", async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate(
      "customer_id currency_id"
    );
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an income by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Vraća ažurirani income
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(updatedIncome);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
