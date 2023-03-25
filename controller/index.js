const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const route = express.Router();
const {User, Product, Cart } = require('../model');
const user = new User();
const product = new Product();
const cart = new Cart();



route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})


route.post('/login', bodyParser.json(), (req, res) =>{
    user.login(req, res);
})


route.get('/users', (req, res) => {
    user.fetchUsers(req, res);
});


route.get('/user/:id', (req, res) => {
    user.fetchUser(req, res);
});


route.post('/register', bodyParser.json(), (req, res) => {
    user.createUser(req, res);
});


route.put('/user/:id', bodyParser.json(), (req, res) => {
    user.updateUser(req, res);
});


route.put('/reset-password:/id', bodyParser.json(), (req, res) => {
    user.forgotPassword(req, res);
})


route.delete('/user/:id', (req, res) => {
    user.deleteUser(req, res);
});


route.get('/products', (req, res) => {
    product.fetchProducts(req, res);
})


route.get('/product/:id', (req, res) => {
    product.fetchProduct(req, res);
});


route.post('/product', bodyParser.json(), (req, res) => {
    product.addProduct(req, res);
})


route.put('/product/:id', bodyParser.json(), (req, res) => {
    product.updateProduct(req, res);
})


route.delete('/product/:id', bodyParser.json(), (req, res) => {
    product.deleteProduct(req, res);
})


route.get("/users/:id/cart", bodyParser.json(), (req, res) => {
    cart.fetchCart(req, res)
})

route.post("/users/:id/cart", bodyParser.json(), (req, res) => {
    cart.addToCart(req, res)
})

route.delete("/users/:id/cart/:cartID", bodyParser.json(), (req, res) => {
    cart.deleteFromCart(req, res)
})
module.exports = route;
