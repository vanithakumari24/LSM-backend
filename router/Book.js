const express = require("express");
const router = express.Router();
const Book = require("../model/Bookmodel"); // Ensure correct path

// ✅ Add a new book
router.post("/", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging
    const { serialNumber, title, author, category, stock, publishedYear, rating } = req.body;

    if (!serialNumber || !title || !author) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newBook = new Book({ serialNumber, title, author, category, stock, publishedYear, rating });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// ✅ Get a book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error);
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

// ✅ Update a book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error("❌ Error updating book:", error);
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
});

// ✅ Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

module.exports = router;
