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

const CONTRIBUTIONS_URL = "/api/contributions";

const App = () => {
  const [selectedOffice, setSelectedOffice] = useState("Honolulu Mayor");
	const [data, setData] = useState(null);
	const [filtered, setFiltered] = useState(null);
	const [chartParams, setChartParams] = useState(CHART);

  const getAPI = async () => {
    console.log("Retrieving 2020 contributions ...");
    await axios
			.get(CONTRIBUTIONS_URL, {
				headers: {
					accepts: "application/json"
				}
			})
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
        <h1>Hawaii 2020 Election Campaign Contributions</h1>
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
    </div>
  );
};

export default App;
