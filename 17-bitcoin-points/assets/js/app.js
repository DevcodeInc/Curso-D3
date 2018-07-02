(() => {

  const URL = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-06-01';
  
  document.addEventListener("DOMContentLoaded", (event) => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const values = Object.keys(data.bpi)
      .map(key => ({
        name: new Date(key),
        value: data.bpi[key]
      }));
      drawChart(values);
    })
    .catch((err) => console.log(err));
  });

  function drawChart(dataset){
    const svgWidth = 500;
    const svgHeight = 500;
    const margin = { top: 10,  left: 50, right: 10, bottom: 10 };
    const width = svgWidth - ( margin.left + margin.right );
    const height = svgHeight - ( margin.top + margin.bottom );

    const svg = d3.select('#chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(dataset, (item) => item.name))
      .rangeRound([0, width]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, (item) => item.value))
      .rangeRound([height - 10, 0]);

    const line = d3.line()
      .x(item => xScale(item.name))
      .y(item => yScale(item.value));

    const body = d3.select('body');

    g.append('g')
      .attr('transform', `translate(0, ${height - margin.top})`)
      .call(d3.axisBottom(xScale));
    
    g.append('g')
      .call(d3.axisLeft(yScale));

    g.append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'miter')
      .attr('stroke-linecap', 'miter')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    g.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('fill', 'steelblue')
      .attr('cy', (item) => yScale(item.value) )
      .attr('cx', (item) => xScale(item.name) )
      .attr('r', 4);

  }

})();