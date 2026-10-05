const productModel = require('../models/product.model')

class ShopController {
	renderHome(req, res) {
		const products = productModel.getAll()
		res.render('shop/index', { title: 'All products', products })
	}
}

module.exports = new ShopController()
