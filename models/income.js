import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    required: true,
  },
  payment_date: { type: Date },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  amount: { type: Number, required: true },
  currency_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true,
  },
  description: { type: String },
});

export default mongoose.model("Income", incomeSchema);
