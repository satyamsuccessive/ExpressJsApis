const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    posttitle: {
        required: true,
        type: String
    },
    postcontent: {
        required: true,
        type: String
    }
 
})

module.exports = mongoose.model('posts', dataSchema)