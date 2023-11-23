const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mysql = require('mysql');
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : `root`,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE 
});

exports.register = (req, res) => {
    console.log(req.body);
    const {name, email, password, passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error)
        }

        if (result.length > 0) {
            return res.render('register', {
                message: 'This email is already taken.'
            })
        } 
        else if (password !== passwordConfirm){ 
            return res.render('register', {
                message: 'Passwords do not match.'
            });
        }


        let hashedPass = await bcrypt.hash(password, 8);
        console.log("Hashed Password:" + hashedPass);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPass }, function (error, results) {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: "Successfully registered."
                });
            }
        });

    });
    
};