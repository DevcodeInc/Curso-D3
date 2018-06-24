(() => {

  // your code

  const URL = 'http://api.population.io:80/1.0/population/United%20States/0/';

  document.addEventListener("DOMContentLoaded", (event) => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const dataset = data
      .filter(item => item.year <= 1990)
      .map((item)=> {
        return {
          name: `${item.year}`,
          value: item.total
        }
      });
      drawChart(dataset);
    })
    .catch((err) => console.log(err));
  });

  function drawChart(dataset){
    console.log(dataset);
    const svgWidth  = 1100;
    const svgHeight = 400;
    const barPadding = 10;
    const barWidth = ( svgWidth / dataset.length );

    console.log(barWidth, 'barWidth');

    const svg = d3.select('#chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

    const values = dataset.map(item => item.value);
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(values)])
    .range([0, svgHeight - 20]);

    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    const barChart = svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('y', (item) => svgHeight - yScale(item.value))
    .attr('x', (item, index) => barWidth * index)
    .attr('height', (item) => yScale(item.value))
    .attr('width', barWidth - barPadding)
    .attr('fill', (item) => colors(item.value));    

    const labels = svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text((item) => `${item.name}`)
    .attr('y', (item) => (svgHeight - yScale(item.value)) - 5)
    .attr('x', (item, index) => barWidth * index)
    .attr('fill', (item) => colors(item.value));

  }

})();