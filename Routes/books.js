const express = require('express');
const {Book , validateCreateBook , validateUpdateBook} = require('../Models/book.Model')
const {Author} = require('../Models/Author.Model')
const router = express.Router()
const Joi = require('joi')

///////////////get all books/////////////////////
router.get(('/all'),async (req , res) => {
    const book = await Book.find().populate("authorId", ["firstName", "lastName", "age"]);
        res.json(book)
})

//////////////get book by id////////////
router.get(('/:id') , async (req , res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        res.json(book);
    }
    if(!book){
        res.json("Book Not Found!")
    }
})

/////////////add new book//////////////////
router.post(('/add') , async (req , res) => {
    const {error} = validateCreateBook(req.body);
    if(error){
        res.json({message: error.details[0].message})
    }
    const book = new Book({
        title: req.body.title,
        authorId: req.body.authorId,
        type: req.body.type,
        cover: req.body.cover,
        price: req.body.price
    })
    const result = await book.save();
    res.json(result)
})

//////////////update book////////////////////
router.put(('/:id') , async (req , res) => {
    const book = await Book.findByIdAndUpdate(req.params.id)
    const {error} = validateUpdateBook(req.body)
    if(error){
        res.json({message: error.details[0].message})
    }
    if(book){
        book.title = req.body.title,
        book.authorId = req.body.authorId,
        book.price = req.body.price,
        book.cover = req.body.cover,
        book.type = req.body.type
        book.save();
        res.json(book);
    }
    else{
        res.json('book is not found')
    }
})

////////////delete book////////////////////////
router.delete(('/:id') , async (req , res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    const rbooks = await Book.find();
    res.json({'The Deleted Book is': book , 'The Remains Books After Delete': rbooks})
})

module.exports = router;