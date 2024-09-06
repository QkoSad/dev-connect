import mongoose from "mongoose";
// middleware to check for a valid object id
import type { Request, Response, NextFunction } from "express";
const checkObjectId = (idToCheck: string) => (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid ID' });
  next();
};

export default checkObjectId
