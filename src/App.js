import React, { useState } from 'react';
import './styles.css';
import * as d3 from 'd3';
import Navbar from './components/Navbar';
import PieClass from "./components/PieClass";
import PieHooks from "./components/PieHooks";
import PieSVG from "./components/PieSVG";

function App() {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData());
  const changeData = () => {
    setData(generateData());
  };

  return (
    <div>
      <Navbar />
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
          <span className="label">React Class</span>
          <PieClass
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div className="chart-content-container">
          <span className="label">Pie Hooks</span>
          <PieHooks
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div className="chart-content-container">
          <span className="label">SVG Elements</span>
          <PieSVG
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
