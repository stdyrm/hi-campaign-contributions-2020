const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

mongoose.connection
	.on("open", () => console.log("Mongoose is connected."))
	.on("error", err => console.warn(`WARNING: ${err}`));

// routes
const dataRouter = require("./routes/routes");

app.use(cors());

app.use(express.json());
app.use(dataRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
