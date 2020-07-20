// not used

import { useState, useEffect } from 'react';
import { csv } from "d3";

const useData = (rawData) => {
	const [data, setData] = useState(null);

	const readData = (rawData) => {
		return csv(rawData, d => {
			return {
				candidate: d["Candidate Name"].trim(),
				aggregate: +d["Aggregate"],
				amount: +d["Amount"],
				contributor: d["Contributor Name"].trim(),
				contributorType: d["Contributor Type"].trim(),
				date: new Date(d["Date"]),
				electionPeriod: d["Election Period"].trim(),
				office: d["Office"] === "Mayor" ? `${d["County"].trim()} ${d["Office"].trim()}` : d["Office"].trim(),
				county: d["County"].trim(),
				range: d["Range"].trim(),
				zipCode: d["Zip Code"].trim()
			};
		});
	};

	useEffect(() => {
		readData(rawData)
			.then(res => res.filter(d => d.electionPeriod.endsWith("2020")))
			.then(res => setData(res));
	}, []);

	return [data];
};

export default useData;
