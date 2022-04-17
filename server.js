const express = require("express");
const cookieParser = require(`cookie-parser`)
const app = express();
const cors = require("cors");
const pool = require("./db");
require('dotenv').config()
const PORT = process.env.SERVER_PORT;
//const bodyParser = require(`body-parser`)

//middleware
app.use(cors({ origin: [`http://localhost:3000`], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// api routes
app.use(require(`./routes/apirouter`));

app.listen(PORT, () => {
    console.log(`server has started at port ${PORT}`);
});

// Close DB conncetion here ...