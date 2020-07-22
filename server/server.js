const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// routes
const dataRouter = require("./routes/routes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.use(express.json());
app.use(dataRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
