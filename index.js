const express = require("express");
const route = require("./controller");
const cors = require("cors");
const port = parseInt(process.env.PORT) || 6060;
const app = express();
const { ErrHandling } = require("./middleware/ErrorHandling");
const cookieParser = require("cookie-parser");
app.use((req, res, next) => {
  res.header( "Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(route);
app.use(
  cors(),
  cookieParser(),
  express.json,
  express.urlencoded({ extended: false })
);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
