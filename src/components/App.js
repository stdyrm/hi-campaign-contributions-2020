import React, { useState, useEffect } from 'react';
import axios from "axios";

// components
import { Chart } from "./chart";

// hooks -- tent. replace with API call
// import { useData } from "./utils";
// data
// import CSV from "../../raw-data/ccscha.csv";

// pickers
import { SelectOffice } from "./pickers";

// params
import { PARAMS } from "../params/params";
const { APP, PAGE, CHART } = PARAMS;

// styles
import "./app.scss";

const App = () => {
	const [selectedOffice, setSelectedOffice] = useState("Honolulu Mayor");
	// const [data] = useData(CSV);
	const [data, setData] = useState(null);
	const [chartParams, setChartParams] = useState(CHART);

	const getAPI = async (office) => {
		console.log("Contacting server ...")
		await axios
			.get(`http://localhost:5000/data/${office}`)
			.then(res => {
				setData(res.data);
			})
			.catch(err => console.log(err));
	};
	
	useEffect(() => {
		getAPI("Honolulu Mayor");
	}, []);

	return (
		<div className="app">
			<span className="app-toolbar">
				<h1>Hawaii 2020 Election Campaign Contributions</h1>
				<SelectOffice data={data} setData={setData} getAPI={getAPI} setSelectedOffice={setSelectedOffice} />
			</span>
			{
				data
				// && <Chart data={data.filter(d => d.office === selectedOffice)}
				&& <Chart data={data}
						chartParams={chartParams}
						selectedOffice={selectedOffice}
					/>
			}
		</div>
	)
};

export default App;
