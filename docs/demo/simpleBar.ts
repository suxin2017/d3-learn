import d3, {
  axisBottom,
  axisLeft,
  axisRight,
  line,
  max,
  min,
  scaleLinear,
  select,
} from "d3";

function simpleBar(gui: dat.GUI, demoId: string) {
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
  // Bars
  chartG
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d[0]);
    })
    .attr("width", 20)
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function (d) {
      return height - y(0);
    }) // always equal to 0
    .attr("y", function (d) {
      return y(0);
    });

  // Animation
  chartG
    .selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("height", function (d) {
      return height - y(d[1]);
    })
    .delay(function (d, i) {
      console.log(i);
      return i * 100;
    });
}

export default simpleBar;
