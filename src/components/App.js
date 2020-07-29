import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import { Chart } from "./chart";

// pickers
import { SelectOffice } from "./pickers";

// params
import { PARAMS } from "../params/params";
const { APP, PAGE, CHART } = PARAMS;

// styles
import "./app.scss";

const CONTRIBUTIONS_URL = "https://hawaiiviz.com/api/contributions";

const App = () => {
  const [selectedOffice, setSelectedOffice] = useState("Honolulu Mayor");
	const [data, setData] = useState(null);
	const [filtered, setFiltered] = useState(null);
	const [chartParams, setChartParams] = useState(CHART);

  const getAPI = async () => {
    console.log("Retrieving 2020 contributions ...");
    await axios
			.get(CONTRIBUTIONS_URL)
			.then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
	};

  useEffect(() => {
    getAPI();
	}, []);
	
	useEffect(() => {
		if (!data) return;
		setFiltered(data.filter(d => d.office === selectedOffice));
	}, [data, selectedOffice]); 

  return (
    <div className="app">
			<span className="app-toolbar">
				<div>
					<h1>Hawaii 2020 Election Campaign Contributions</h1>
					<h4>State of Hawaii Campaign Spending Commission data as of 6/30/20</h4>
				</div>
        <SelectOffice
          data={data}
          setData={setData}
          getAPI={getAPI}
          setSelectedOffice={setSelectedOffice}
        />
      </span>
      {filtered && (
        <Chart
					data={filtered}
          chartParams={chartParams}
          selectedOffice={selectedOffice}
        />
			)}
			<h4>Questions or corrections? Please email <a href="mailto:contact@hawaiiviz.com">contact@hawaiiviz.com</a></h4>
    </div>
  );
};

export default App;
