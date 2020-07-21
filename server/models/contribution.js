const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
	candidate: {type: String},
	aggregate: {type: Number},
	amount: {type: Number},
	contributor: {type: String},
	contributorType: {type: String},
	date: {type: Date},
	electionPeriod: {type: String},
	office: {type: String},
	county: {type: String},
	range: {type: String},
	zipCode: {type: String}
}); 

const Contribution = mongoose.model("Contribution", contributionSchema, "contributions");

module.exports = Contribution;
