(() => {

  document.addEventListener("DOMContentLoaded", (event) => {
    const dataset = [180, 222, 133, 214, 125, 122, 43, 231];
    drawChart(dataset);
  });

  function drawChart(dataset){
    const svgWidth  = 450;
    const svgHeight = 450;

    const svg = d3.select('#chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([svgHeight, 0]);

    const x_axis = d3.axisBottom()
      .scale(xScale);
    
    const y_axis = d3.axisLeft()
      .scale(yScale);

    svg.append('g')
      .attr('transform', `translate(50, ${svgHeight - 20})`)
      .call(x_axis);

    svg.append('g')
      .attr('transform', 'translate(50, -20)')
      .call(y_axis);

  }

})();