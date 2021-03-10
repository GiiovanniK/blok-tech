# Table of Contents
- [Table of Contents](#table-of-contents)
- [Collabr: What is it?](#collabr-what-is-it)
- [Prerequisites required for the app installation through terminal](#prerequisites-required-for-the-app-installation-through-terminal)
- [App installation](#app-installation)
- [Dependencies: packages used](#dependencies-packages-used)
- [License](#license)
- [Contributors](#contributors)

# Collabr: What is it?
Collabr is a matching application for musicians and artists so they're able to find other producers/vocalists/pianists/gitarists and connect! Collaborate on songs and other projects such as starting a band. 

[Deployed version](https://collabr-matching-application.herokuapp.com/login)

# Prerequisites required for the app installation through terminal
Download [NodeJS](https://nodejs.org/en/download/)

Download [Git](https://git-scm.com/downloads)

Create an account on [MongoDB Atlas](https://cloud.mongodb.com/) or use the local MongoDB client.

# App installation
Clone repository to your computer by using the following command in your terminal

> `git clone https://github.com/GiiovanniK/project-tech.git`

Install all of the dependencies (packages) which are used for this project to function properly, by typing the following command in your terminal

> `npm install`

Check if npm has been installed succesfully by running the following command in your terminal.

> `npm -v`

You should get something back in your terminal like `6.14.10`.

Set up your .env variables, so a database connection and session can be established.

Create a .env file inside of the app folder, called project-tech and define the following variable inside of the file.

> `ATLAS_URI=` Paste your MongoDB Atlas URI inside of this variable.
> 
also define a secret for the session with the variable 
> `SESSION_SECRET=` This can be a random string of letters and numbers.

Start the server by typing the following command in your terminal

>`npm start`

This will return `http://localhost:8000/login`. You can click this link, or copy it into the browser to access the application and all of its features.


![Bash - App installation](https://github.com/GiiovanniK/project-tech/blob/main/docs/bash-installation.png?raw=true)

Test login credentials:

>Username: `test@test.nl`

>Password: `test`

# Dependencies: packages used
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [express-flash](https://www.npmjs.com/package/express-flash)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [express-session](https://www.npmjs.com/package/express-session)
* [handlebars](https://www.npmjs.com/package/handlebars)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [passport](https://www.npmjs.com/package/passport)
* [passport-local](http://www.passportjs.org/packages/passport-local/)

# License
The main code is licensed under the [GNU General Public License v3.0](https://github.com/GiiovanniK/project-tech/blob/main/LICENSE)

# Contributors
Giovanni Kornet