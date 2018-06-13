(() => {

  // your code
  const URL = 'http://api.population.io:80/1.0/population/2017/Colombia/';

  document.addEventListener("DOMContentLoaded", (event) => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const dataset = data
      .filter(item => item.age >= 15 && item.age <= 20)
      .map((item)=> {
        return {
          name: `${item.age} (${item.total})`,
          value: item.total
        }
      });
      drawChart(dataset);
    })
    .catch((err) => console.log(err));
  });

  function drawChart(dataset){
    console.log(dataset);
    const svgWidth  = 400;
    const svgHeight = 400;
    const radius    = Math.min(svgWidth, svgHeight) / 2;

    const svg = d3.select('#chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

    const g = svg.append('g')
    .attr('transform', `translate(${radius}, ${radius})`);

    const pie = d3.pie().value((item) => item.value);

    const path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    const groups = g.selectAll('g')
    .data(pie(dataset))
    .enter()
    .append('g');

    groups.append('path')
    .attr('d', path)
    .attr('fill', (data) => colors(data.value));

    groups.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', (item) => `translate(${path.centroid(item)})`)
    .text((item) => item.data.name);

  }

})();