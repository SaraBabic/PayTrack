import express from "express";
import mongoose from "mongoose";
import customerRoutes from "./routes/customer.js";
import incomeRoutes from "./routes/income.js";
import currencyRoutes from "./routes/currency.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/users", userRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Wellcome!", userId: req.user.id });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
