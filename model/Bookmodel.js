const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true }, // Required field
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    publishedYear: { type: Number, required: true },
    rating: { type: Number, default: 0 }
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
