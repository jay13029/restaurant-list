const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(rstList => res.render('index', { rstList }))
    .catch(error => console.log(error))
})

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find()
    .lean()
    .then(rstData => {
      const rstList = rstData.filter(
        item => (item.name + ' ' + item.name_en + ' ' + item.category).toLowerCase().includes(keyword.toLowerCase()))
      const noResult = rstList.length === 0
      res.render('index', { rstList, keyword, noResult })
    })
    .catch(error => console.log(error))
})

module.exports = router