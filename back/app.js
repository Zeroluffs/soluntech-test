var express = require("express");
var path = require("path");
var http = require("http");
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

const host = process.env.HOST || "0.0.0.0";
let port = process.env.PORT || 3001;

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  port++;
  server.listen(port);
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
