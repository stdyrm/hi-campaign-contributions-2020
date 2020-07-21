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

const App = () => {
  const [selectedOffice, setSelectedOffice] = useState("Honolulu Mayor");
  const [data, setData] = useState(null);
  const [chartParams, setChartParams] = useState(CHART);

  const getAPI = async () => {
    console.log("Retrieving 2020 contributions ...");
    await axios
      .get(`http://localhost:5000/contributions`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAPI();
  }, []);

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
      {data && (
        <Chart
          data={data.filter((d) => d.office === selectedOffice)}
          chartParams={chartParams}
          selectedOffice={selectedOffice}
        />
      )}
    </div>
  );
};

export default App;
