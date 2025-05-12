const mongoose = require('mongoose')
const Joi = require('joi')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 3
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 3,
        ref: "author"
    },
    type: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
    },
    cover:{
        type: String,
        enum: ["soft Cover" , "hard Cover"]
    }
},{timestamps: true})

function validateCreateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50).required(),
        authorId: Joi.string().trim().min(3).max(50).required(),
        type: Joi.string().trim().min(3).max(50).required(),
        cover: Joi.string().trim().min(3).max(50).required(),
        price: Joi.number().required()
    })
    return schema.validate(obj)
}

function validateUpdateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50),
        authorId: Joi.string().trim().min(3).max(50),
        type: Joi.string().trim().min(3).max(50),
        cover: Joi.string().trim().min(3).max(50),
        price: Joi.number()
    })
    return schema.validate(obj)
}

const Book = mongoose.model("book", bookSchema)
module.exports = {Book , validateCreateBook , validateUpdateBook}