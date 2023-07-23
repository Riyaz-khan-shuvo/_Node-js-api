/**
 * NODEJS API
 * DATABASE MONGODB
 */
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv").config();

// Cross Unblocked File..
const cors = require("cors");
const errorHandler = require("./middileware/error-handler");

/**
 *  Router File Import
 */
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");
const productBrandRoutes = require('./routes/product-brand');

const productAttributeRoutes = require('./routes/product-attribute');
const productCategoryRoutes = require('./routes/product-category');
const productSubCategoryRoutes = require('./routes/product-sub-category');
const productRoutes = require('./routes/product');
const productTagRoutes = require('./routes/product-tag');

/**
 * MAIN APP CONFIG
 * REPLACE BODY PARSER WITH EXPRESS PARSER
 */

const app = express();
app.use(express.json());
app.use(cors());

/**
 * IMAGE UPLOAD STATIC DIR
 */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * MAIN BASE ROUTER WITH IMPORTED ROUTES
 */
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/product-attribute', productAttributeRoutes);
// app.use('/api/product-parent-category', productParentCategoryRoutes);
app.use('/api/product-category', productCategoryRoutes);
app.use('/api/product-sub-category', productSubCategoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/brand', productBrandRoutes);
app.use('/api/tag', productTagRoutes);


/**
 * MAIN BASE GET PATH
 */
app.get("/", (req, res) => {
  res.send(
    '<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by SOFTLAB IT TEAM</p></div>'
  );
});

/**
 * Error Handler
 * 401 UnAuthorized, Access Denied
 * 406 Already Exists, Not Acceptable
 * 404 Not Found
 * 422 Input Validation Error, Unprocessable Entity
 * 500 Database Operation Error, Internal Server Error
 */
app.use(errorHandler.route);
app.use(errorHandler.next);

/**
 * NODEJS SERVER
 * PORT CONTROL
 * MongoDB Connection
 * IF PASSWORD contains @ then encode with https://meyerweb.com/eric/tools/dencoder/
 * Database Name roc-ecommerce
 * User Access authSource roc-ecommerce
 */
// mongoose.connect(
// `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
// {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }
// )

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`Server is running at http://localhost:${port} `)
    );
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Oops! Could not connect to mongoDB Cluster0", err);
  });
