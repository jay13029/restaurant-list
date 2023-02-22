// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const rstData = require('./restaurant.json')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// 資料庫連線設定
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error.')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { rstList: rstData.results })
})
// restaurant detail page
app.get('/restaurants/:id', (req, res) => {
  const selectID = req.params.id
  const rstSelect = rstData.results.find(item => item.id.toString() === selectID)
  res.render('show', { rst: rstSelect })
})
// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const rstList = rstData.results.filter(item => (item.name + ' ' + item.name_en + ' ' + item.category).toLowerCase().includes(keyword.toLowerCase()))
  const noResult = rstList.length === 0
  res.render('index', { rstList, keyword, noResult })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})
