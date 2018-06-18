(() => {

  // your code

  document.addEventListener("DOMContentLoaded", (event) => {
    const dataset = [
      {
        name: 'Valor 1',
        value: 100
      },
      {
        name: 'Valor 2',
        value: 200
      },
      {
        name: 'Valor 3',
        value: 300
      },
      {
        name: 'Valor 4',
        value: 400
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

    const barChart = svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('y', (item) => svgHeight - item.value)
    .attr('x', (item, index) => barWidth * index)
    .attr('height', (item) => item.value)
    .attr('width', barWidth - barPadding);
  }

})();