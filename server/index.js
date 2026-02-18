const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const bookingSchema = new mongoose.Schema({
  name: String,
  room: String,
  date: String
});

const Booking = mongoose.model("Booking", bookingSchema);

app.post("/book", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Booking saved" });
});

app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.listen(5000, () => console.log("Server running on port 5000"));
