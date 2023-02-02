const nunjucks = require('nunjucks');
const axios = require('axios');
// setting Nunjucks template engine
nunjucks.configure('views', { autoescape: true });

// getting data from api
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    const users = response.data;

    // erndering data into nunjucks
    const output = nunjucks.render('template.njk', { users });
    console.log(output);
  })
  .catch(error => {
    console.error(error);
  });
