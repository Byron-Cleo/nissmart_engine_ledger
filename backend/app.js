const express = require("express");
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const walletRouter = require('./routes/walletRoutes.js');
const depositRouter = require('./routes/depositRoutes');
const withdrawRouter = require('./routes/withdrawRoutes');
const transferRouter = require('./routes/transferRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const analyticsRouter = require('./routes/analyticsRoutes.js');

//initiated the express application
const app = express();

app.use(express.json({ limit: '10kb' }));

// const allowedOrigins = ['https://nissmart-engine-ledger.vercel.app', 'http://localhost:4005'];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

const corsOptions = {
  origin: 'https://nissmart-engine-ledger.vercel.app', // Replace with your actual Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: false // Allow cookies/authorization headers to be sent
};

app.use(cors(corsOptions));




//Application API endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/deposit", depositRouter);
app.use("/api/v1/withdraw", withdrawRouter);
app.use("/api/v1/transfer", transferRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/appAnalytics", analyticsRouter);

//Root directory name
const rootDirname = path.resolve();

//linking backend with frontend on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDirname, "client/nissmart/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(rootDirname, "client/nissmart/dist/index.html"))
  );
} else {
  //linking backend with frontend on development
  app.use(express.static(path.join(rootDirname, "client/nissmart/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(rootDirname, "client/nissmart/dist/index.html"))
  );
}

module.exports = app;
