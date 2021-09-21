require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const rowdy = require("rowdy-logger");
const app = express();
const db = process.env.mongouri;
const cors = require("cors");

const rowdyResults = rowdy.begin(app);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// middleware;
app.use(cors(), express.json({ extended: false }));

// Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  rowdyResults.print();
});
