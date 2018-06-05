(() => {

  /* your js code */
  const title = d3.select('h1');
  title.style('color', 'red')
       .attr('class', 'myClass')
       .text(`${title.text()} 12456`);

  const container = d3.select('.container');
  container.append('p').text('p 1');
  container.append('p').text('p 2');
  container.append('p').text('p 3');

  const items = d3.selectAll('li');
  items.style('color', 'blue');
})();