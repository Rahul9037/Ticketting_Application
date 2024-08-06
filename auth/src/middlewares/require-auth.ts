import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.currentUser){
    //return res.status(401).send(); -- normal way , since we haev separate not suthorizer error we wil use it

    throw new NotAuthorizedError();
  }
  next();
};
