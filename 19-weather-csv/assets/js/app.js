(() => {

  const URL = 'assets/files/data.csv';
  
  document.addEventListener("DOMContentLoaded", (event) => {
    d3.csv(URL, (item) => item)
    .then((data) => {
      const cities = data.columns.slice(1).map(key => {
        return {
          name: key,
          values: data.map(row => {
            return {
              date: row.date,
              value: row[key]
            }
          })
        };
      });
    });
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
      .attr('r', 4)
      .on('mouseover', function (item) {
        d3.select(this)
          .attr('fill', 'red')
          .attr('r', 10)
        const label = body.append('div');

        label.attr('class', 'label')
          .html(`<strong>${item.value}</strong>`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY - 40}px`);

        label.transition()
          .duration(500)
          .style("opacity", 1)
          .style('top', `${d3.event.pageY - 50}px`);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .attr('fill', 'steelblue')
          .attr('r', 4);
        d3.select('div.label').remove();
      });

  }

})();