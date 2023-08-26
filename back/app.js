var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var agreementRouter = require("./routes/agreement");
var submissionRouter = require("./routes/submission");
const balanceRouter = require("./routes/balance");
const tokenRouter = require("./routes/token");
const adminRouter = require("./routes/admin");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/agreements", agreementRouter);
app.use("/submissions", submissionRouter);
app.use("/balances", balanceRouter);
app.use("/token", tokenRouter);
app.use("/admin", adminRouter);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3001;
// module.exports = app;
app.listen(port, () => {
  console.log("Server is Working", port);
});
