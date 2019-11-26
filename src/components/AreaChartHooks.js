import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import * as d3 from "d3";
import * as _ from "lodash";

const colors = d3.interpolateCool;
const format = d3.timeFormat("%d");
const animationDuration = 700;
const animationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: animationDuration },
  reset: true
};

const XAxis = ({ top, bottom, left, right, height, scale }) => {
  const axis = useRef(null);

  useEffect(() => {
    d3.select(axis.current)
      .transition()
      .duration(animationDuration)
      .call(d3.axisBottom(scale).tickFormat(format));
  });

  return (
    <g
      className="axis x"
      ref={axis}
      transform={`translate(${left}, ${height - bottom})`}
    />
  );
};

const YAxis = ({ top, bottom, left, right, scale }) => {
  const axis = useRef(null);

  useEffect(() => {
    d3.select(axis.current)
      .transition()
      .duration(animationDuration)
      .call(d3.axisLeft(scale));
  });

  return (
    <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />
  );
};

const Path = ({ index, area, data, prev, x, y, height, top, bottom }) => {
  const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
  setAnimatedProps(animationConfig);

  const interpolator = d3.interpolate(prev, data);
  return (
    <animated.g className="area">
      <animated.path
        d={animatedProps.t.interpolate(t => area(interpolator(t)))}
        fill={colors(index / 10)}
        stroke={colors(index / 10)}
      />
    </animated.g>
  );
};

const AreaChartHooks = props => {
  const aggregation = props.data.reduce((acc, arr) => {
    const customizer = (objValue, srcValue) => ({
      ...objValue,
      ...srcValue,
      [arr.series]: srcValue.value,
      value: objValue ? objValue.value + srcValue.value : srcValue.value
    });

    return _.mergeWith(acc, arr.data, customizer);
  }, []);

  const x = d3
    .scaleTime()
    .range([0, props.width - props.left - props.right])
    .domain(d3.extent(aggregation, d => d.date));

  const y = d3
    .scaleLinear()
    .range([props.height - props.top - props.bottom, 0])
    .domain([0, d3.max(aggregation, d => d.value)]);

  const keys = props.data.map(d => d.series);

  const stack = d3
    .stack()
    .keys(keys)
    .value((d, key) => d[key]);

  const dataset = stack(aggregation);
  const cache = useRef(dataset);

  const area = (d, series) =>
    d3
      .area()
      .curve(d3.curveMonotoneX)
      .x((d, i) => x(dataset[series][i].data.date))
      .y0((d, i) => y(d[0]))
      .y1((d, i) => y(d[1]));

  useEffect(() => {
    cache.current = dataset;
  });

  return (
    <>
      <svg width={props.width} height={props.height}>
        <XAxis
          scale={x}
          top={props.top}
          bottom={props.bottom}
          left={props.left}
          right={props.right}
          height={props.height}
        />
        <YAxis
          scale={y}
          top={props.top}
          bottom={props.bottom}
          left={props.left}
          right={props.right}
        />
        <g transform={`translate(${props.left}, ${props.top})`}>
          {dataset.map((d, i) => (
            <Path
              key={i}
              index={i}
              area={area(d, i)}
              data={d}
              prev={cache.current[i]}
              x={x}
              y={y}
              top={props.top}
              bottom={props.bottom}
              height={props.height}
            />
          ))}
        </g>
      </svg>
    </>
  );
};

export default AreaChartHooks;
