(() => {

  // your code

  document.addEventListener("DOMContentLoaded", (event) => {
    const dataset = [
      {
        name: 'Valor 1',
        value: 1777
      },
      {
        name: 'Valor 2',
        value: 1444
      },
      {
        name: 'Valor 3',
        value: 2333
      },
      {
        name: 'Valor 4',
        value: 3134
      },
    ];
    drawChart(dataset);
  });

  function drawChart(dataset){
    console.log(dataset);
    const svgWidth  = 400;
    const svgHeight = 400;
    const barPadding = 5;
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
    .text((item) => `${item.name} (${item.value})`)
    .attr('y', (item) => (svgHeight - yScale(item.value)) - 5)
    .attr('x', (item, index) => barWidth * index)
    .attr('fill', (item) => colors(item.value));

  }

})();