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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost:3000'); // update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
  );
  res.setHeader(
    'Report-To',
    '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"http://localhost:4005/__cspreport__"}],"include_subdomains":true}'
  );
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https:; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src 'self'; style-src-elem 'self' 'unsafe-inline' https:;"
  );
  next();
});




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
