const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const handlebars = require('handlebars')
const fs = require('fs');
const passport = require('passport');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');

//Config files - passportConfig.js, auth.js
require('./config/passportConfig')(passport);
const checkAuth = require('./config/auth');
const checkNoAuth = require('./config/auth');

// DB mongoose models
const User = require('./models/User.js');
const userUpload = require('./models/userUpload.js');

// DB Connection
const DBConnection = require('./connect.js');
DBConnection(mongoose);

const app = express();
const port = process.env.PORT || 8000;

// Set view directory
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));

app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        path.join(__dirname, '/views/partials/'),
    ]
}));

// Static file serving
app.use(express.static('./static/public'));
app.use('/static', express.static(path.join(__dirname, './static/public')));

// Register form POST, store in DB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Register
app.post('/register', async (req, res) => {
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

// Authenticate users with DB
// Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// Update password and encrypt again
app.post('/changePassword', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.findOne({
            username: req.user.username
        });
        await User.updateOne(user, {
            password: hashedPassword
        });
        await user.save()
        res.redirect('login')
    } catch {
        res.status(500).send();
    }
});

app.post('/userUpload', async (req, res) => {
    try {
        const userupload = new userUpload({
            username: req.user.username,
            gender: req.body.gender,
            skill: req.body.skill,
            genre: req.body.genre
        });
        await userupload.save()
            .then(() => {
                res.redirect('login');
            });
    } catch (err) {
        res.status(500).send();
        console.log(err)
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.logOut();
    // req.flash('succes_msg', 'You are logged out');
    res.redirect('login');
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/login', checkNoAuth.checkNotAuthenticated, (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

app.get('/register', checkNoAuth.checkNotAuthenticated, (req, res) => {
    res.render('register', {
        title: 'Register'
    })
});

app.get('/dashboard', checkAuth.checkAuthenticated, async (req, res) => {
    const userupload = await userUpload.find().select('username gender skill genre');
    res.render('dashboard', {
        username: req.user.username,
        title: 'Dashboard',
        data: userupload
    });
});

app.get('/changePassword', checkNoAuth.checkAuthenticated, (req, res) => {
    res.render('changePassword', {
        title: 'Change Password'
    })
});

app.get('/userUpload', checkNoAuth.checkAuthenticated, (req, res) => {
    res.render('userUpload', {
        title: 'Create Listing'
    })
});

// 404 error handling 
app.get('*', (req, res) => {
    res.status(404).send('This page does not exist!');
});

// Listen
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/login`);
});