const express = require('express')
const { Author } = require("../Models/Author.Model")
const router = express.Router()


//////////get all authors///////////
router.get(('/all'),async (req , res) => {
    const authors = await Author.find().sort({firstName: 1})
    res.json({authorsCount: authors.length , Data: authors})
})

/////////get author by id/////////
router.get(('/:id'),async (req,res) => {
    const author = await Author.findById(req.params.id);
    if(author){
        res.json(author)
    }
    else{
        res.json({message:"The Author Not Found :("})
    }
})

/////////add new author/////////
router.post('/add', async (req,res) => {
    const author = new Author ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        age: req.body.age
    })
    const result = await author.save()
    res.json(result)
})

/////////Update book/////////
router.put('/:id', async (req,res) =>{
    const author = await Author.findByIdAndUpdate(req.params.id)
    if(author){
        author.firstName = req.body.firstName,
        author.lastName = req.body.lastName,
        author.country = req.body.country,
        author.age = req.body.age
        author.save();
        res.json(author)
    }
    else{
        res.json({message: "The Book Is Not Found :("})
    }
})

/////////Delete book/////////
router.delete('/:id', async (req,res) => {
    const author = await Author.findByIdAndDelete(req.params.id)
    if(author){
        res.json(author)
    }
    else{
        res.json("This Author Is Deleted!")
    } 
})

module.exports = router