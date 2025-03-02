// middleware/bookMiddleware.js
const Book = require('../model/bookModel'); // Adjust path based on your project structure

const getBookById = async (req, res, next) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  req.book = book;
  next();
};

module.exports = { getBookById };
