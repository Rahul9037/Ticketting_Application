import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.currentUser){
    return res.status(401).send();
  }

  next();
};
