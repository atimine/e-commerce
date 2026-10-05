const productModel = require('../models/product.model')

class AdminController {
	renderProducts(req, res) {
		const products = productModel.getAll()
		res.render('admin/products', { title: 'Admin Products', products })
	}

	renderAddProduct(req, res) {
		res.render('admin/add-product', { title: 'Add Product' })
	}

	addProduct(req, res) {
		productModel.add(req.body)
		res.redirect('/admin/products')
	}

	renderEditProduct(req, res) {
		const product = productModel.findById(req.params.id)
		res.render('admin/edit-product', { title: 'Edit Product', product })
	}

	editProduct(req, res) {
		productModel.update(req.params.id, req.body)
		res.redirect('/admin/products')
	}

	deleteProduct(req, res) {
		productModel.remove(req.params.id)
		res.redirect('/admin/products')
	}
}

module.exports = new AdminController()
