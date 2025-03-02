const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");


const router = express.Router();

// Admin Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.json({ message: "Admin Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Already registering admin" });
  }
});

// Admin Login
router.post('/login',async (req, res) => {  
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email}); // Ensure user is admin

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'your_secret_key', { expiresIn: '24h' });

    res.json({ token, role: 'admin' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
