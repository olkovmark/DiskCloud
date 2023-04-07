import { Router } from "express";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import c from "config";

const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check("password", "password incorrect").isLength({ min: 2, max: 10 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorect request", errors });
      }

      const { email, password } = req.body;

      const candiate = await User.findOne({ email });

      if (candiate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashPassword = await bcrypt.hash(password, 15);
      const user = new User({ email, password: hashPassword });
      await user.save();
      return res.json({ message: "User was created" });
    } catch (error) {
      console.log(error);
      res.send({ message: error });
    }
  }
);

export default router;
