// import libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const models = require("./models");

// define variables
const app = express();
const port = 8800;

// test if the database is running
models.sequelize.sync();

// some neccessary codes to make the web server running with no errors.
app.use(express.json());
app.use(cors()); 

// handle HTTP requests 
const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const paymentRoutes = require("./routes/payment.routes");
const transactionRoutes = require("./routes/transaction.routes");
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/transactions", transactionRoutes);

// boot up the web server
app.listen(port);