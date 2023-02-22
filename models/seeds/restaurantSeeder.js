const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const rstData = require('../../restaurant.json')
const rstAll = rstData.results

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
	console.log('mongodb connected.')
  for(let i in rstAll) {
    const rstRow = rstAll[i]
		Restaurant.create({ name: rstRow.name,
                        name_en: rstRow.name_en,
                        category: rstRow.category,
                        image: rstRow.image,
                        location: rstRow.location,
                        phone: rstRow.phone,
                        google_map: rstRow.google_map,
                        rating: rstRow.rating,
                        description: rstRow.description
                      })
  }
	console.log('done.')
})