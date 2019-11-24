const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const helmet = require("helmet");
require("dotenv").config();
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const audioRoutes = require("./routes/audio");

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use(helmet());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/audio", audioRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
