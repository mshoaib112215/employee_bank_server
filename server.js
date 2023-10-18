const express = require("express");
const http = require("http"); // Import the 'https' module
const fs = require("fs");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const corsOptions = {
//   credentials: true,
//   origin: ["http://localhost:3000", "http://127.0.0.1:5173", "http://localhost:5173", "https://employee-bank.netlify.app"],
// };

const app = express();

app.use(cookieParser());

// app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));

app.use(router);

dbConnect();

app.use("/storage", express.static("storage"));

app.use(errorHandler);

// Read SSL/TLS certificate and private key files
// const privateKey = fs.readFileSync("./cert/key.pem", "utf8");
// const certificate = fs.readFileSync("./cert/cert.pem", "utf8");
// const ca = fs.readFileSync("./cert/csr.pem", "utf8"); // Optional: Certificate Authority (CA) bundle

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// Create HTTPS server
const httpsServer = http.createServer( app);

httpsServer.listen(PORT, console.log(`Backend is running on port: ${PORT} using HTTPS`));
