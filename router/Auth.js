const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ username, email, password, address, phone });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) return res.status(200).json({ message: 'Login Successfull' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,);


//         res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

router.post("/login", async (req, res) => {
  try {
      console.log("Received request with body:", req.body); // Debug input data

      const { email, password } = req.body;
      if (!email || !password) {
          console.log("Error: Missing email or password");
          return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
          console.log("Error: User not found");
          return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("Error: Invalid credentials");
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "24h" });

      console.log("Login successful, sending token...");
      res.status(200).json({ token, role: "user" });
  } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  
module.exports = router;
