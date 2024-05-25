const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../Model/UserSchema");

const object = {
  Signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await UserSchema.findOne({ email: email });

      if (!existingUser) {
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserSchema({
          username: username,
          email: email,
          password: hashPassword,
        });
        await newUser.save();

        // generating Token
        const expires = 3 * 24 * 60 * 60; // 3 days
        const token = jwt.sign(
          { email: newUser.email, id: newUser._id },
          process.env.SECRET_KEY,
          {
            expiresIn: expires,
          }
        );
        res.status(201).json({ message: "User created successfully.", token });
      } else {
        res
          .status(400)
          .json({ message: "User already exists with this email." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Signup error" });
    }
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await UserSchema.findOne({ email });

      if (!check) {
        return res.status(400).json({ message: "Invalid Login" });
      }

      const passwordMatch = await bcrypt.compare(password, check.password);

      if (passwordMatch) {
        const expires = 3 * 24 * 60 * 60; // 3 days
        const token = jwt.sign(
          { email: check.email, id: check._id },
          process.env.SECRET_KEY,
          {
            expiresIn: expires,
          }
        );
        res.status(200).json({ message: "Login success", token });
      } else {
        res.status(400).json({ message: "Invalid Login" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login error" });
    }
  },
};

module.exports = object;
