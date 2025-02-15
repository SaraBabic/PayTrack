import mongoose from "mongoose";
import Currency from "./models/currency.js";
import Customer from "./models/customer.js";
import Income from "./models/income.js";

// Konekcija na MongoDB
const MONGO_URI = "mongodb://localhost:27017/tama";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Brisanje postojećih podataka (opciono)
    await Currency.deleteMany({});
    await Customer.deleteMany({});
    await Income.deleteMany({});

    console.log("Obrisani postojeći podaci...");

    // Ubacivanje testnih podataka
    const currencies = await Currency.insertMany([
      { name: "Euro", symbol: "€", exchange_rate: 1.0 },
      { name: "US Dollar", symbol: "$", exchange_rate: 1.1 },
      { name: "Serbian Dinar", symbol: "RSD", exchange_rate: 117.5 },
    ]);

    const customers = await Customer.insertMany([
      { name: "John Doe" },
      { name: "Jane Smith" },
      { name: "Mark Johnson" },
    ]);

    const incomes = await Income.insertMany([
      {
        status: "paid",
        payment_date: new Date(),
        customer_id: customers[0]._id,
        amount: 1000,
        currency_id: currencies[0]._id,
        description: "Payment for services",
      },
      {
        status: "pending",
        payment_date: null,
        customer_id: customers[1]._id,
        amount: 500,
        currency_id: currencies[1]._id,
        description: "Pending invoice",
      },
    ]);

    console.log("Test podaci su uspešno ubačeni!");
    process.exit();
  } catch (err) {
    console.error("Greška prilikom ubacivanja podataka:", err);
    process.exit(1);
  }
};

seedDatabase();
