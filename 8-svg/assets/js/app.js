(() => {

  /* your js code */
  const URL = 'http://api.population.io:80/1.0/population/2017/aged/18/';

  document.addEventListener("DOMContentLoaded", (event) => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      drawChart(data);
    })
    .catch((err) => console.log(err));
  });

  function drawChart(dataset) {
    console.log('info =>', dataset);
    const elements = d3.select('#chart')
    .selectAll('h2')
    .data(dataset)
    .enter()
    .append('h2')
    .text((item) => `${item.country} = ${item.total}`)
    .style('color', (item) => {
      if (item.total >= 500000) {
        return 'red';
      }
      return 'blue';
    });
  }

})();