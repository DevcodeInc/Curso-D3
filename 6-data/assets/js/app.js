(() => {

  /* your js code */
  const dataset = [1, 2, 3, 4, 5];

  const elements = d3.select('.container')
    .selectAll('h2')
    .data(dataset)
    .enter()
    .append('h2')
    .text((item) => item)
    .style('color', (item) => {
      if (item >= 3) {
        return 'red';
      }
      return 'blue';
    });

  console.log(elements);

})();