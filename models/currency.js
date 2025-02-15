import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  exchange_rate: { type: Number, required: true },
});

export default mongoose.model("Currency", currencySchema);
