const shopController = require('../controllers/shop.controller')

const router = require('express').Router()

router.get('/', shopController.renderHome)

module.exports = router
