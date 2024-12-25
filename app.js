const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const db = require("./config/mongoose-connection");
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,//EXPRESS_SESSION_SECRET
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index', { error: "" });
});

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
