from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId
import os

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/animestore"
mongo = PyMongo(app)

# Product Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    products = mongo.db.products.find()
    return jsonify([{
        'id': str(product['_id']),
        'name': product['name'],
        'price': product['price'],
        'image': product['image'],
        'anime': product['anime']
    } for product in products])

@app.route('/api/products/<id>', methods=['GET'])
def get_product(id):
    product = mongo.db.products.find_one({'_id': ObjectId(id)})
    if product:
        product['_id'] = str(product['_id'])
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

# Cart Routes
@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    cart_item = {
        'product_id': data['product_id'],
        'quantity': data['quantity']
    }
    result = mongo.db.cart.insert_one(cart_item)
    return jsonify({'message': 'Item added to cart'})

@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart_items = mongo.db.cart.find()
    return jsonify([{
        'id': str(item['_id']),
        'product_id': item['product_id'],
        'quantity': item['quantity']
    } for item in cart_items])

# Order Routes
@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.json
    order = {
        'products': data['products'],
        'total': data['total'],
        'payment_method': data['payment_method'],
        'status': 'pending'
    }
    result = mongo.db.orders.insert_one(order)
    return jsonify({'message': 'Order placed successfully'})

if __name__ == '__main__':
    app.run(debug=True)