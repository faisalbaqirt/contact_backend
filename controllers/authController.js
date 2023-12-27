const AuthModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await AuthModel.getByUsername(username)

    if (existingUser.username === username) {
      return res.json({
        message: "This username is already registered",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await AuthModel.registerUser(username, hashedPassword);

    if (user && user[0]) {
      res.status(201).json({
        id: user[0].id,
        username: user[0].username,
        message: "User registration successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await AuthModel.getByUsername(username);

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        message: "Wrong password",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      "secret"
    );

    return res.status(200).json({
      id: user.id,
      username: user.username,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};


module.exports = {
    register,
    login
}