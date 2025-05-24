import express from "express";
import Customer from "../models/customer.js";

const router = express.Router();

// Middleware fot get customer with ID
const getCustomer = async (req, res, next) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
};

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one customer
router.get("/:id", getCustomer, (req, res) => {
  res.json(res.customer);
});

// POST new customer
router.post("/", async (req, res) => {
  const customer = new Customer({ name: req.body.name });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - edit customer
router.put("/:id", getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - customer
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    res.json({ message: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
