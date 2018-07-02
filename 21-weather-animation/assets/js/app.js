(() => {

  const URL = 'assets/files/data.csv';
  
  document.addEventListener("DOMContentLoaded", (event) => {
    d3.csv(URL, (item) => item)
    .then((data) => {
      const cities = data.columns.slice(1).map((key) => {
        return {
          name: key,
          values: data.map(item => {
            return {
              name: new Date(item.date.split('-')),
              value: item[key]
            }
          })
        }
      });
      const dates = data.map(item => new Date(item.date.split('-')));
      drawChart(cities, dates);
    });
  });

  function drawChart(cities, dates){
    console.log(cities);
    const svgWidth = 800;
    const svgHeight = 500;
    const margin = { top: 10, left: 50, right: 100, bottom: 10 };
    const width = svgWidth - ( margin.left + margin.right );
    const height = svgHeight - ( margin.top + margin.bottom );

    const svg = d3.select('#chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(dates))
      .rangeRound([0, width]);

    const yDomain = [
      d3.min(cities, (city) => d3.min(city.values, (item) => item.value )),
      d3.max(cities, (city) => d3.max(city.values, (item) => item.value ))
    ];

    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .rangeRound([height - 10, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const line = d3.line()
      .x(item => xScale(item.name))
      .y(item => yScale(item.value));

    g.append('g')
      .attr('transform', `translate(0, ${height - margin.top})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale));

    const groups = g.selectAll('g.city')
      .data(cities)
      .enter()
      .append('g');

    const paths = groups.append('path')
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'miter')
      .attr('stroke-linecap', 'miter')
      .attr('stroke-width', 1.5)
      .attr('stroke', (item) => colorScale(item.name))
      .attr('d', (item) => line(item.values));

    const nodes = paths.nodes();

    paths
      .attr('stroke-dasharray', (item, index) => {
        const totalLength = nodes[index].getTotalLength();
        return `${totalLength} ${totalLength}`;
      })
      .attr('stroke-dashoffset', (item, index) => {
        const totalLength = nodes[index].getTotalLength();
        return `${totalLength}`;
      })
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);

    groups.append('text')
      .datum((item) => {
        return {
          name: item.name,
          value: item.values[item.values.length - 1]
        };
      })
      .attr("transform", (data) => {
        return `translate(${xScale(data.value.name)},${yScale(data.value.value)})`;
      })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .text(data => {
        return data.name;
      });
  }

})();