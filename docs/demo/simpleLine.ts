import {
  axisBottom,
  axisLeft,
  axisRight,
  curveBundle,
  curveCatmullRom,
  line,
  max,
  min,
  scaleLinear,
  select,
} from "d3";

function simpleLine(gui: dat.GUI, demoId: string) {
  // gui.add({animationType:''},s)

  const width = 600;
  const height = 400;
  const svg = select(demoId)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const data: [number, number][] = [
    [0, 100],
    [1, 400],
    [2, 300],
    [3, 900],
    [4, 850],
    [5, 1000],
  ];
  const x = scaleLinear()
    .domain([0, data.length])
    .range([0, width - 100]);
  const y = scaleLinear().domain([0, 1000]).range([height, 80]);

  const chartG = svg.append("g").attr("transform", `translate(50, -50)`);

  chartG
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(axisBottom(x).ticks(data.length));
  chartG.append("g").call(axisLeft(y));
  const l = line()
    .curve(curveCatmullRom)
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));
  const path = chartG
    .append("g")
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("d", l(data));
  console.log(l(data));

  const pathLength = path.node().getTotalLength();

  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition()
    .duration(800)
    .attr("stroke-dashoffset", 0);

  svg
    .append("text")
    .attr("transform", "translate(10,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("XYZ Foods Stock Price");
}

export default simpleLine;
