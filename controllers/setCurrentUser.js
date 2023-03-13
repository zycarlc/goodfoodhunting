const db = require ('./../db') // require a folder without a file, by default look for a file named index.js

function setCurrentUser (req, res, next) {
    const { userID } = req.session //I should have something in there if I have logged in
    res.locals.currentUser = {}

    if (userID) {
        const sql = `SELECT id, email FROM users WHERE id = ${ userID };`

        db.query(sql, (err, dbRes) => {
            if (err) {
                console.log(err)
            } else {
                res.locals.currentUser = dbRes.rows[0]
                next()
            }
        })
        //user is logged in - setup currentUser object
    } else {
        next()
    }
}

module.exports = setCurrentUser;