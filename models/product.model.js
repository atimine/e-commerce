const path = require('path')
const fs = require('fs')

class ProductModel {
	constructor() {
		this.filePath = path.join(__dirname, '..', 'data', 'products.json')
	}

	getAll() {
		if (!fs.existsSync(this.filePath)) return []
		const data = fs.readFileSync(this.filePath)
		return JSON.parse(data)
	}

	save(products) {
		fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2))
	}

	add(product) {
		const products = this.getAll()
		const id = global.crypto.randomUUID()
		products.push({ id, ...product })
		this.save(products)
	}

	findById(id) {
		const products = this.getAll()
		return products.find(product => product.id === id)
	}

	update(id, updatedProduct) {
		const products = this.getAll()
		const index = products.findIndex(product => product.id === id)
		if (index !== -1) {
			products[index] = { id, ...updatedProduct }
			this.save(products)
		}
	}

	remove(id) {
		if (!id) return
		const products = this.getAll()
		const filteredProducts = products.filter(product => product.id !== id)
		this.save(filteredProducts)
	}
}

module.exports = new ProductModel()
