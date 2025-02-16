import express from "express";
import mongoose from "mongoose";
import customerRoutes from "./routes/customer.js";
import incomeRoutes from "./routes/income.js";
import currencyRoutes from "./routes/currency.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const PORT = process.env.PORT || 5002;

app.use(express.json()); // Dodaj da Express može parsirati JSON
app.use(
  cors({
    origin: "*", // Omogućava pristup sa bilo kog domena
  })
);
app.use("/api/customers", customerRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/currencies", currencyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
