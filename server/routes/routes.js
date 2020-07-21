const router = require("express").Router();
const jsonData = require("../campaign-contributions.json");

router.get("/contributions", async (req, res) => {
	console.log("Retrieving data ...");

	try {
		const dataTable = await jsonData.filter(d => d.electionPeriod.endsWith("2020"))
		res.send(dataTable);
	} catch (err) {
		res.status(400).send();
	}
});

// ONLY if using MongoDB for data
// router.get("/data", async (req, res) => {
// 	console.log("getting mongodb!")
// 	try {
// 		const data = await Contribution.find({ electionPeriod: /2020/ });
// 		res.send(data);
// 	} catch (err) {
// 		res.status(400).send();
// 	}
// });

// router.get("/data/:office", async (req, res) => {
// 	const params = req.params.office;
// 	try {
// 		const data = await Contribution.find({ office: params, electionPeriod: /2020/ });
// 		res.send(data);
// 	} catch (err) {
// 		res.status(400).send();
// 	}
// });

module.exports = router;
