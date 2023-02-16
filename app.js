const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    // res.send('This is my restaurant list')
    res.render('index')

})

app.listen(port, () => {
    console.log(`App is listening on localhost:${port}`)
})