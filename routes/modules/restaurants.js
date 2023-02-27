const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// new
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  for (const key in req.body) {
    if (req.body[key].trim() === '') {
      return res.send(`<script>alert("Please check '${key}' field."); history.go(-1); </script>`)
    }
  }
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// restaurant detail page
router.get('/:id', (req, res) => {
  const selectID = req.params.id
  return Restaurant.findById(selectID)
    .lean()
    .then(rst => res.render('show', { rst }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const selectID = req.params.id
  return Restaurant.findById(selectID)
    .lean()
    .then(rst => res.render('edit', { rst }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const selectID = req.params.id
  return Restaurant.findById(selectID)
    .then(rst => {
      for (const key in req.body) {
        rst[key] = req.body[key]
      }
      return rst.save()
    })
    .then(() => res.redirect(`/restaurants/${selectID}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const selectID = req.params.id
  return Restaurant.findById(selectID)
    .then(rst => rst.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
