const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const port = 8000;

// Set view directory
  app.use(express.static('./static/public'));
  app.set('view engine', 'hbs');
  app.set("views", path.join(__dirname, "views"));

  app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

// Static file serving
app.use('/static', express.static(path.join(__dirname, './static/public')));

// Define all routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// 404 error handling 
app.get('*', (req, res) => {
    res.send('This page does not exist!', 404);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});