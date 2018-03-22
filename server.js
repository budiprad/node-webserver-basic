const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} : ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next)=> {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('toCapitals', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express.</h1>');
    // res.send({
    //   name: "bud",
    //   likes:[
    //     'filming',
    //     'coding'
    //   ]
    // });
    res.render('home.hbs', {
      pagetitle: 'Home Page',
      welcome: 'Hi, Welcome dude.'
    });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pagetitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMsg : 'Unable'
  });
});

app.listen(3000, () => {
  console.log('Connecting to server 3000');
});
