const express = require("express");
const app = express();

// routes
const dataRouter = require("./routes/routes");

app.use(express.json());
app.use(dataRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
