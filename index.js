require('dotenv').config();

console.log(process.env.MONGODB_URI); 
console.log(process.env.JWT_SECRET);
console.log(process.env.PORT);
const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
const authorPath = require('./Routes/author')
const booksPath = require('./Routes/books')
const productsPath = require('./Routes/productRoute')
const userPath = require('./Routes/userRotes')
const cartPath = require('./Routes/CartRoutes')
//////When We use the word "Use" to use something it calld "middelware"////////

app.use(cors());
app.use(cors({
origin: 'http://localhost:4200', 
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json())
app.use('/author', authorPath)
app.use('/books', booksPath)
app.use('/products', productsPath)
app.use('/api/users', userPath)
app.use('/cart' , cartPath)
//////////////////Database Connection///////////////////////
mongoose.connect("mongodb+srv://AhmedFadl:7YZYefksHUSEBJN3@cluster0.9g2ypq4.mongodb.net/Ecommerce_Database").then(() => console.log("The Server Is Connected :)"))
.catch((error) => console.log("Connection Is Failed :("))

app.get('/', (req,res)=> {
    res.send("Welcome In Express 2025!")
})

app.get('/show', (req,res)=> {
    res.send("Show All Products")
})

// app.listen(3000, ()=> {
//     console.log("Server Is Running")
// })

module.exports = app;