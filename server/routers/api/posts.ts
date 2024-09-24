import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import auth from "../../middleware/auth";
import Post from "../../models/Post";
import User from "../../models/User";
import checkObjectId from "../../middleware/checkObjectId";
import { isUserId } from "../../utils";

const router = express.Router();

// @route    POST api/posts
// @desc     Create a post
// @access   Private

router.post(
  "/",
  auth,
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (isUserId(req)) {
        const user = await User.findById(req.user.id).select("-password");
        if (user) {
          const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
          });
          const post = await newPost.save();
          res.json(post);
        } else {
          throw new Error("Error finding the user");
        }
      } else {
        throw new Error("Error finding the user");
      }
    } catch (err: unknown) {
      if (typeof err === "string") console.error(err);
      else if (err instanceof Error) console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete(
  "/:id",
  [auth, checkObjectId("id")],
  async (req: Request, res: Response) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // Check user
      if (post.user && isUserId(req)) {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: "User not authorized" });
        }
      } else {
        throw new Error("Error in req.user");
      }
      await post.deleteOne();

      res.json({ msg: "Post removed" });
    } catch (err: unknown) {
      if (typeof err === "string") console.error(err);
      else if (err instanceof Error) console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post && isUserId(req)) {
      if (post.likes.some((like) => like.user?.toString() === req.user.id)) {
        return res.status(400).json({ msg: "Post already liked" });
      }

      const user: any = req.user.id;
      // can't make string into ObjectID
      post.likes.unshift({ user });

      await post.save();

      return res.json(post.likes);
    }
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (post && isUserId(req)) {
      if (!post.likes.some((like) => like.user?.toString() === req.user.id)) {
        return res.status(400).json({ msg: "Post has not yet been liked" });
      }

      // remove the like
      post.likes = post.likes.filter(({ user }) => {
        if (user) return user.toString() !== req.user.id;
        return false;
      });

      await post.save();

      return res.json(post.likes);
    }
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  auth,
  checkObjectId("id"),
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (isUserId(req) && req.params) {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);
        if (user) {
          const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
          };
          if (post) {
            post.comments.unshift(newComment as any);
            await post.save();
            res.json(post.comments);
          } else throw new Error("Error in finding post");
        } else throw new Error("Error in finding user");
      } else throw new Error("Error in parsing the req");
    } catch (err: unknown) {
      if (typeof err === "string") console.error(err);
      else if (err instanceof Error) console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    if (post) {
      const comment = post.comments.find(
        (comment: any) => comment.id === req.params.comment_id,
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }
      // Check user
      if (
        "user" in comment &&
        comment.user &&
        isUserId(req) &&
        comment.user.toString() !== req.user.id
      ) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      post.comments = post.comments.filter(
        ({ id }: any) => id !== req.params.comment_id,
      );

      await post.save();

      return res.json(post.comments);
    }
  } catch (err: unknown) {
    if (typeof err === "string") console.error(err);
    else if (err instanceof Error) console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
