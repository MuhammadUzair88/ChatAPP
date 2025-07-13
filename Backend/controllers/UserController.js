import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';



// .find()
// Returns: An array of documents

// Use when: You expect multiple results

// .findOne()
// Returns: A single document (or null)

// Use when: You expect only one match, or just want the first match.
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create and save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // 5. Create JWT token
    const token = createToken(newUser._id);

    // 6. Prepare safe user object
    const safeUser = {
      id:newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    };

    // 7. Return success response
    return res.status(201).json({ message: "User registered successfully", user: safeUser });
  } catch (error) {
    console.error("Error in signUp:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // 2. Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Create token
    const token = createToken(existingUser._id);

    // 5. Prepare safe user data
    const safeUser = {
      id:existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      token,
    };

    // 6. Send response
    return res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const fetchAllUsers = async (req, res) => {
  try {
    const userId = req.userId;

    const users = await User.find({ _id: { $ne: userId } });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {signUp,Login,fetchAllUsers};













