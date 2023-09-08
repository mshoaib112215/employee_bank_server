const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const corsOptions = {
//   credentials: true,
//   origin: ["http://localhost:3000", 'http://127.0.0.1:5173', 'http://localhost:5173'],
// };

const app = express();

// app.use(cookieParser());

// app.use(cors(corsOptions));
// http://169.254.254.232


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       return callback(null, true);
//     },
//     optionsSuccessStatus: 200,
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "50mb" }));

app.use(router);

dbConnect();

app.use("/storage", express.static("storage"));

app.use(errorHandler);

app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));
