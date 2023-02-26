const db = require('../../config/mongoose')

const Restaurant = require('../restaurant')
const rstData = require('../../restaurant.json').results

db.once('open', () => {
  Restaurant.create(rstData)
    .then(() => {
      console.log('seeder done!')
    })
    .catch(err => console.log(err))
})
