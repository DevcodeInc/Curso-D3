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
      console.log(cities);
      console.log(dates);
    });
  });

})();