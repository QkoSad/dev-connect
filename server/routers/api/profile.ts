import express from "express";
import axios from "axios";
import config from "config";

import auth from "../../middleware/auth";
import { check, validationResult } from "express-validator";

// bring in normalize to give us a proper url, regardless of what user entered
import normalize from "normalize-url";
import checkObjectId from "../../middleware/checkObjectId";

import Profile from "../../models/Profile";
import User from "../../models/User";
import Post from "../../models/Post";
import { isUserId } from "../../utils";
const router = express.Router();
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    if (isUserId(req)) {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user" });
      }

      res.json(profile);
    }
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
  check("website", "Not a valid website").isURL(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    if (isUserId(req)) {
      const profileFields = {
        user: req.user.id,
        website:
          website && website !== ""
            ? normalize(website, { forceHttps: true })
            : "",
        skills: Array.isArray(skills)
          ? skills
          : skills.split(",").map((skill: string) => " " + skill.trim()),
        ...rest,
      };

      // Build socialFields object
      const socialFields: { [key: string]: any } = {
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
      };

      // normalize social fields to ensure valid url
      for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
          socialFields[key] = normalize(value, { forceHttps: true });
      }
      // add to profileFields
      profileFields.social = socialFields;

      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        );
        return res.json(profile);
      } catch (err: unknown) {
        if (typeof err === "string") console.error(err);
        else if (err instanceof Error) console.error(err.message);
        return res.status(500).send("Server Error");
      }
    }
  },
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err: unknown) {
      if (typeof err === "string") console.error(err);
      else if (err instanceof Error) console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  },
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    if (isUserId(req))
      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id }),
      ]);

    res.json({ msg: "User deleted" });
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  auth,
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (isUserId(req)) {
        const profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
          profile.experience.unshift(req.body);

          await profile.save();
        }
        res.json(profile);
      }
    } catch (err: unknown) {
      if (typeof err === "string") console.error(err);
      else if (err instanceof Error) console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    if (isUserId(req)) {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      if (foundProfile) {
        foundProfile.experience = foundProfile.experience.filter(
          (exp: any) => exp._id.toString() !== req.params.exp_id,
        );

        await foundProfile.save();
      }
      return res.status(200).json(foundProfile);
    }
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  auth,
  check("school", "School is required").notEmpty(),
  check("degree", "Degree is required").notEmpty(),
  check("fieldofstudy", "Field of study is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (isUserId(req)) {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
          profile.education.unshift(req.body);

          await profile.save();
        }
        res.json(profile);
      }
    } catch (err: unknown) {
      if (typeof err === "string") console.error(err);
      else if (err instanceof Error) console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    if (isUserId(req)) {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      if (foundProfile) {
        foundProfile.education = foundProfile.education.filter(
          (edu: any) => edu._id.toString() !== req.params.edu_id,
        );
        await foundProfile.save();
      }
      return res.status(200).json(foundProfile);
    }
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${config.get("githubToken")}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});

module.exports = router;
