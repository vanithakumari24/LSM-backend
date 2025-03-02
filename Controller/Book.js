// import Book from '../model/Bookmodel'; // Import your Book model

// export const addBook = async (req, res) => {
//   try {
//     const { title, author, category,stock } = req.body;

//     if (!title || !author || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newBook = new Book({ title, author, category,stock });
//     await newBook.save();

//     res.status(201).json(newBook);
//   } catch (error) {
//     console.error("Error adding book:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };
