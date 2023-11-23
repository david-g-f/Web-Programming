const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : `root`,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE 
});

dotenv.config({path: './.env'});

db.connect((error) => {
    if(error){
        console.log("Error encountered " + error);
    }
    else {
        console.log("MySQL Connected.")
    }
});

app.set('view engine', 'hbs');
const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
