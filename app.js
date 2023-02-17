// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

const rstData = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index', { rstList: rstData.results})
})
//restaurant detail page
app.get('/restaurants/:id', (req, res) => {
    let selectID = req.params.id;
    let rstSelect = rstData.results.find(item => item.id.toString() === selectID)
    res.render('show', { rst: rstSelect })
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`App is listening on localhost:${port}`)
})