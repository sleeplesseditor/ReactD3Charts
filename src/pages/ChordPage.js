import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import ChordHooks from "../components/ChordHooks";

function ChordPage() {
  const generateData = (value, length = 4, set = 4) =>
    d3.range(set).map((series, index) => ({
      series: index,
      data: d3
        .range(length)
        .map((d, i) =>
          value === null || value === undefined ? Math.random() * 100 : value
        )
    }));

  const [data, setData] = useState(generateData());
  const changeData = () => {
    setData(generateData());
  };

  useEffect(
    () => {
      setData(generateData());
    },
    []
  );

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
        <span className="label">Chord Hooks</span>
          <ChordHooks
            data={data}
            width={400}
            height={300}
            innerRadius={140}
            outerRadius={150}
          />
        </div>
      </div>
    </div>
  );
}

export default ChordPage;