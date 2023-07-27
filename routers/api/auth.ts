import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import auth from '../../middleware/auth'
import config from 'config'
import { check, validationResult } from "express-validator";

import User from '../../models/User'
import type { Request, Response } from 'express';
import { isUserId } from '../../utils';

const router = express.Router();
// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req: Request, res) => {
  try {
    let user: unknown = null
    if (isUserId(req)) {
      user = await User.findById(req.user.id).select("-password");
      res.json(user);
    }
    else {
      throw new Error('missing id in request')
    }
  } catch (err: unknown) {
    if (typeof err === 'string')
      console.error(err)
    else if (err instanceof Error)
      console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const jwtSecret = config.get('jwtSecret')
      if (typeof jwtSecret === 'string') jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      else throw new Error('Error signing the jwt token')
    } catch (err: unknown) {
      if (typeof err === 'string')
        console.error(err)
      else if (err instanceof Error)
        console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router
