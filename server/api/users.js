
const express = require('express')

const router = express.Router()

const User = require('../models/User')

const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'sample',
  api_key: process.env.CLOUDINARY_KEY || '',
  api_secret: process.env.CLOUDINARY_SECRET || ''
})

router.get('/get/:slug', async (req, res) => {
  const slug = req.params.slug
  try {
    if (process.env.offline !== 'false') {
      res.json(
        {
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'Gabo',
          avatarUrl: 'http://localhost:8000/img/user_placeholder.jpg',
          points: 1200
        },
        {
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'Mucci',
          avatarUrl: 'http://localhost:8000/img/user_placeholder.jpg',
          points: 1200
        },
        {
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'Moiolish',
          avatarUrl: 'http://localhost:8000/img/user_placeholder.jpg',
          points: 1200
        },
        {
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'The Boss',
          avatarUrl: 'http://localhost:8000/img/user_placeholder.jpg',
          points: 1200
        },
        {
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'giamma',
          avatarUrl: 'http://localhost:8000/img/user_placeholder.jpg',
          points: 1200
        }
      )
    }
    const users = await User.findOne({ slug })
    res.json(users);
  } catch (err) {
    console.log(err)
    res.json({ error: err.message || err.toString() });
  }
})

router.get('/get', async (req, res) => {
  try {
    const users = await User.find({ active:true }).sort({ points: -1 })
    res.json(users);
  } catch (err) {
    console.log(err)
    res.json({ error: err.message || err.toString() });
  }
})

router.post('/add', (req, res) => {
  const { name, avatarUrl } = req.body
  const slug = User.generateSlug()
  cloudinary.uploader.upload(avatarUrl, result => {
    const userData = {
      name,
      slug,
      points: 1200,
      avatarUrl: result.secure_url,
      active: true
    }
    const newUser = new User(userData)
    newUser.save(function (err) {
      if (err) return res.json({ error: err.message || err.toString() })
      res.json(newUser)
    })
  })
})

router.post('/update', (req, res) => {
  const { slug, name, avatarUrl } = req.body
  const query = { slug: slug }
  cloudinary.uploader.upload(avatarUrl, result => {
    User.findOneAndUpdate(query, { name, avatarUrl: result.secure_url }, {}, function (err, rs) {
      if (err) return res.json({ error: err.message || err.toString() })
      res.json(rs)
    })
  })
})

router.delete('/delete/:userId', (req, res) => {
  const id = req.params.userId
  const query = { _id: id }
  User.findOneAndUpdate(query, { active: false }, {}, function (err, rs) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(rs)
  })
})

module.exports = router
