import React, { useState } from 'react';
import * as d3 from 'd3';
import AnimatedBar from '../components/BarHooks';
import BarSVG from '../components/BarSVG';


function BarChartPage() {
    const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      index: index,
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
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
        <div className="chart-content-container">
          <span className="label">Bar Hooks</span>
            <AnimatedBar
                data={data}
                width={400}
                height={300}
                top={20}
                bottom={30}
                left={30}
                right={0}
            />
        </div>
        <div className="chart-content-container">
          <span className="label">SVG Elements</span>
            <BarSVG
                data={data}
                width={400}
                height={300}
                top={20}
                bottom={30}
                left={30}
                right={0}
            />
        </div>
      </div>
    </div>
  );
}

export default BarChartPage;
