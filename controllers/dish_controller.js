
const express = require('express')
const router = express.Router();
const { Pool } = require('pg');
const db = new Pool({
    database: 'goodfoodhunting',
})

const ensureLoggedIn = require('../controllers/ensure_logged_in')

router.get('/', (req, res) => {

    const sql = "SELECT * FROM dishes ORDER BY id DESC;"
    db.query(sql, (err, dbRes) => {
        let dishes = dbRes.rows;
        res.render('home', { dishes, email: req.session.email})
    })
})

router.get('/dishes/new', ensureLoggedIn, (req, res) => {
    res.render("new_dish")
})

router.get('/dishes/:id', (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id = $1;`
    console.log(sql)
    db.query(sql, [req.params.id], (err, dbRes) => {
        let dish_details = dbRes.rows;
        // console.log (dish_details)
        res.render("dish_details", { dish_details })
    })
})


// routes is http method + path

router.post('/dishes', (req,res) => {
    if (!req.session.userID) {
        res.redirect('/login')
        return
    }

    console.log(req.body)
    let title = req.body.title;
    let image_url = req.body.image_url;
    const sql = `INSERT INTO dishes (title, image_url, user_id) VALUES ($1, $2, $3)`;
    db.query(sql, [title, image_url, req.session.userID], (err, dbRes) => {
        res.redirect('/') //always get
    })
})

router.get('/dishes/:id/edit', (req, res) => {
    let dishID = req.params.id
    const sql = `SELECT * FROM dishes WHERE id= ${dishID}`
    db.query(sql, (err, dbRes) => {
        let dish_details = dbRes.rows[0]
        console.log(dish_details)
        res.render("edit_dish", {dish_details})
    })
})

router.put('/dishes/:id', ensureLoggedIn, (req, res) => {
    console.log(req.body);
    const sql = `UPDATE dishes SET title = '${req.body.title}', image_url = '${req.body.image_url}' WHERE id = ${req.body.id};`
    db.query(sql, (err, dbRes) => {
        res.redirect(`/dishes/${req.body.id}`)
    })
})


router.delete("/dishes/:id", ensureLoggedIn, (req,res) => {
    const sql = `DELETE FROM dishes WHERE id = ${req.params.id};`
    console.log(req.query.dish_id)
    console.log(sql)
    db.query(sql, (err, dbRes) => {
        res.redirect('/')
    })
})

module.exports = router

/**
 *                              restful naming routes
 *                              http methods            path
 * create a dish                post                    /dishes
 * get a list of dishes         get                     /dishes
 * get a single dish            get                     /dishes/6
 * get a empty new dish form    get                     /dishes/new
 * delete a dish                delete                  /dishes/6
 * get an existing dish form    get                     /dishes/6/edit
 * update a dish                put/patch               /dishes/6
 * 
 * 
 * 
*/