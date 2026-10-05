const router = require('express').Router()

router.get('/', (req, res) => {
	res.send('Shop Route')
})

module.exports = router
