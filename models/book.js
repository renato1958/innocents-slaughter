const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const BookModel = new model('Book', bookSchema);

module.exports = BookModel;