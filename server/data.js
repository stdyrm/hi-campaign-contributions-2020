const fs = require("fs");
const csv = require("csv-parser");
const raw = "/ccscha.csv";

const Contribution = require("./models/contribution");

let data = [];

// Read CSV, convert to JSON, store locally
const csvToJSON = async (rawData, newData) => {
	console.log("reading data!");

	fs.createReadStream(__dirname + rawData)
		.on("error", (err) => console.log(err))
		.pipe(csv())
		.on("data", d => {
			data.push(
				{
					candidate: d["Candidate Name"].trim(),
					aggregate: +d["Aggregate"],
					amount: +d["Amount"],
					contributor: d["Contributor Name"].trim(),
					contributorType: d["Contributor Type"].trim(),
					date: new Date(d["Date"]),
					electionPeriod: d["Election Period"].trim(),
					office: d["Office"] === "Mayor" ? `${d["County"]} ${d["Office"]}` : d["Office"].trim(),
					county: d["County"].trim(),
					range: d["Range"].trim(),
					zipCode: d["Zip Code"].trim()
				}
			)
		})
		.on("end", () => {
			console.log(`Finished reading CSV! Array length is ${data.length}`);
			fs.writeFile("campaign-contributions.json", JSON.stringify(data), err => {
				if (err) {
					console.log(err);
				} else {
					console.log(`File written successfully. File length is ${data.length}`);
				}
			});
		});
};

// Read CSV, convert to JSON, import to MongoDB
const importToMongoDB = async (rawData, newData) => {
	console.log("reading data!");

	fs.createReadStream(__dirname + rawData)
		.on("error", (err) => console.log(err))
		.pipe(csv())
		.on("data", d => {
			data.push(
				{
					candidate: d["Candidate Name"].trim(),
					aggregate: +d["Aggregate"],
					amount: +d["Amount"],
					contributor: d["Contributor Name"].trim(),
					contributorType: d["Contributor Type"].trim(),
					date: new Date(d["Date"]),
					electionPeriod: d["Election Period"].trim(),
					office: d["Office"] === "Mayor" ? `${d["County"]} ${d["Office"]}` : d["Office"].trim(),
					county: d["County"].trim(),
					range: d["Range"].trim(),
					zipCode: d["Zip Code"].trim()
				}
			)
		})
		.on("end", () => {
			console.log(`Finished reading CSV! Array length is ${data.length}`);
			Contribution.collection.insertMany(data, err => console.log(`Caught an error! ${err}`))
		});
};
