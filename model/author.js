const mongoose = require('mongoose');
const Joi = require('joi')


const Author = mongoose.model('authors', new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateUser(author) {
    const schema = Joi.object({
        firstname: Joi.string().min(6).required(),
        lastname: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(author)
}

exports.Author = Author;
exports.validate = validateUser;
