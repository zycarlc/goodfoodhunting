const { Client } = require("pg");

const bcrypt = require("bcrypt");

const db = new Client ({
    database: "goodfoodhunting"
})

db.connect()

const email = "dt@ga.co";

const plainTextPassword = "pudding";

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        // console.log(digestedPassword)
        const sql = `
            INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPassword}');
        `
        db.query(sql, (err, dbRes) => {
            console.log(err)
            db.end()
        })
    })
})