const router = require('express').Router()
const adminController = require('../controllers/admin.controller')

router.get('/add-product', adminController.renderAddProduct)
router.get('/products', adminController.renderProducts)
router.get('/edit-product/:id', adminController.renderEditProduct)

router.post('/add-product', adminController.addProduct)
router.post('/edit-product/:id', adminController.editProduct)

router.post('/delete-product/:id', adminController.deleteProduct)

module.exports = router
