const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *@route *POST*api/user/login
 *@desc *Login
 *@access *Public
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please, complete required fields." });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Wrong login or password." });
    }
  } catch {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
/**
 *@desc Registration
 *@route POST /api/user/register
 *@access Public
 */
const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please, complete required fields." });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res.status(400).json({ message: "User with this email is yet." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Couldn't create an user." });
    }
  } catch {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
/**
 * @desc Current User
 * @route GET /api/user/current
 * @access Private
 */
const current = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  login,
  register,
  current,
};
