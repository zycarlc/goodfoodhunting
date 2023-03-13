const express= require('express');
const app =  express();
const port = process.env.PORT || 8080
const methodOverride = require('./middleware/method_override')
const logger = require ("./middleware/logger")
const expressLayouts = require('express-ejs-layouts')

const dishController = require('./controllers/dish_controller')
const sessionController = require('./controllers/session_controller');
const userController = require('./controllers/session_controller')
const setCurrentUser = require('./controllers/setCurrentUser')
const viewHelpers = require('./middleware/view_helpers')


const session = require('express-session');

// http methods - get post put patch delete
// tim - 
/**
 *          database    http
 * create   insert      post
 * read     select      get
 * update   update      put/patch
 * delete   delete      delete
 * 
 * divs
 * 
 * 
 */

const { Pool } = require('pg');
const db = new Pool({
    database: 'goodfoodhunting',
})


app.set("view engine", "ejs")

app.use(logger)
app.use(express.static('public'))

//parses the raw request body and turn it into an object accessible at req.body
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride)

app.use(expressLayouts)

app.use(
    session({
    secret: process.env.SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));



app.use(setCurrentUser)

app.use(viewHelpers)

app.use("/", sessionController)
app.use("/", dishController)
app.use("/", userController)


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


