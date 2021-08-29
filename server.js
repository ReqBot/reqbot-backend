// 1. Import dependencies
const express = require("express");
const app = express();
require("dotenv").config();

// 1.1 Allow parsing on request bodies
app.use(express.json());

// 2. Import routes for api

const planRoutes = require('./src/components/plan/api/plan.api');

const watsonRoutes = require("./src/components/watson/api/watson");

const translateRoutes = require('./src/components/translate/api/translate.api')

app.use('/api/plan', planRoutes)

app.use("/api/watson", watsonRoutes);

app.use("/api/translate", translateRoutes);

// 3. Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
