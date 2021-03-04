const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const User = require('./models/User.js');
const mongoose = require('mongoose');
const DBConnection = require('./connect.js');
DBConnection(mongoose);
const bcrypt = require('bcrypt');
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

app.get('/register', (req, res) => {
    res.render('register');
});

// Form POST, store in DB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/register-succesful', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        await user.save()
            .then(() => {
                res.redirect('login');
            });
    } catch {
        res.status(500).send();
    }
});

// app.post('/'), async (req, res) => {
//     const user = users.find(user => user.username = req.body.username);
//     if (user == null) {
//         return res.status(400).send('Cannot find user');
//     } try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             res.send('Succes');
//         } else {
//             res.send('No access');
//         }
//     } catch {
//         res.status(500).send()
//     }
// }

// 404 error handling 
app.get('*', (req, res) => {
    res.send('This page does not exist!', 404);
});

// Listen
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});