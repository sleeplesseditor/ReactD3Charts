import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import * as d3 from "d3";
import * as _ from "lodash";

const colors = d3.interpolatePlasma;
const animationDuration = 150;
const animationConfig = {
  to: async (next, cancel) => {
    await next({ t: 1 });
  },
  from: { t: 0 },
  config: { duration: animationDuration },
  reset: true
};

const Arc = ({ index, arc, from, to, animatedProps }) => {
  const interpolator = d3.interpolate(from, to);

  return (
    <g>
      <animated.path
        d={animatedProps.t.interpolate(t => arc(interpolator(t)))}
        fill={colors(to.index / 6)}
      />
    </g>
  );
};

const Ribbon = ({ index, from, to, animatedProps }) => {
  const interpolator = d3.interpolate(from, to);
  const ribbon = d3.ribbon().radius(140);
  return (
    <g>
      <animated.path
        d={animatedProps.t.interpolate(t => ribbon(interpolator(t)))}
        fill={colors(to.source.index / 6)}
        fillOpacity={0.75}
        stroke={colors(to.source.index / 6)}
        strokeOpacity={0.5}
      />
    </g>
  );
};

const Group = ({ arc, from, to }) => {
  const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
  setAnimatedProps(animationConfig);

  return (
    <>
      {to.groups.map((d, i) => {
        return (
          <Arc
            index={d.index}
            arc={arc}
            from={from.groups[i]}
            to={d}
            animatedProps={animatedProps}
          />
        );
      })}
      {[...to].map((d, i) => {
        return (
          <Ribbon
            index={i}
            from={from[i]}
            to={d}
            animatedProps={animatedProps}
          />
        );
      })}
    </>
  );
};

const ChordHooks = props => {
  const aggregation = props.data.reduce((acc, arr) => {
    const customizer = (objValue, srcValue) => ({
      ...objValue,
      ...srcValue,
      [arr.series]: srcValue.value,
      value: objValue ? objValue.value + srcValue.value : srcValue.value
    });

    return _.mergeWith(acc, arr.data, customizer);
  }, []);

  const keys = props.data.map(d => d.series);
  const matrix = props.data.map(d => d.data);

  const chord = d3.chord().padAngle(0.024);
  const arc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const cache = useRef(chord(matrix));

  useEffect(() => {
    cache.current = chord(matrix);
  });

  return (
    <>
      <svg width={props.width} height={props.height}>
        <g transform={`translate(${props.width / 2}, ${props.height / 2})`}>
          <Group arc={arc} from={cache.current} to={chord(matrix)} />
        </g>
      </svg>
    </>
  );
};

export default ChordHooks;
