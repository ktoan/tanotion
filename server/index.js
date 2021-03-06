const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const cors = require("cors");

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ruedw.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(process.env.PORT || 5000, () => console.log("Server is running..."));
