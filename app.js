// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    // res.send('This is my restaurant list')
    res.render('index')

})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`App is listening on localhost:${port}`)
})