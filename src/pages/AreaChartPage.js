import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import AreaChartHooks from "../components/AreaChartHooks";

function ChordPage() {
    const generateData = (value, length = 5, set = 2) =>
    d3.range(set).map((series, index) => ({
      series: index,
      data: d3.range(length).map((d, i) => ({
        date: new Date(2019, 2, i + 1),
        value:
          value === null || value === undefined ? Math.random() * 100 : value
      }))
    }));

  const [data, setData] = useState(generateData());
  const changeData = () => {
    // setData(generateData(null, Math.floor(Math.random() * 10 + 1)));
    setData(generateData());
  };

  return (
    <div>
      <div className="button-container">
        <button 
          className="transform-button"
          onClick={changeData}
        >
          Generate Data
        </button>
      </div>
      <div className="chart-container">
        <div
          className="chart-content-container"
        >
        <span className="label">Area Chart Hooks</span>
          <AreaChartHooks
            data={data}
            width={500}
            height={300}
            top={20}
            bottom={30}
            left={30}
            right={20}
          />
        </div>
      </div>
    </div>
  );
}

export default ChordPage;