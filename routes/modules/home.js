const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const querySort = req.query.sort || '_id|asc'
  Restaurant.find()
    .lean()
    .collation({ locale: 'en' }) // Case insensitive sorting
    .sort([SplitSort(querySort)])
    .then(rstList => res.render('index', { rstList, querySort }))
    .catch(error => console.log(error))
})

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const querySort = req.query.sort || '_id|asc'
  return Restaurant.find()
    .lean()
    .collation({ locale: 'en' }) // Case insensitive sorting
    .sort([SplitSort(querySort)])
    .then(rstData => {
      const rstList = rstData.filter(
        item => (item.name + ' ' + item.name_en + ' ' + item.category).toLowerCase().includes(keyword.toLowerCase()))
      const noResult = rstList.length === 0
      res.render('index', { rstList, keyword, noResult })
    })
    .catch(error => console.log(error))
})

module.exports = router

function SplitSort (querySort) {
  const sortAry = querySort.split('|')
  const sortKey = sortAry[0]
  const sort = sortAry[1] || 'asc'
  return [sortKey, sort]
}
