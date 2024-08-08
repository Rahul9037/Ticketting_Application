import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
//import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //----- remove the below code as we added validaterequest middleware above
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   //return res.status(400).send(errors.array());
    //   throw new RequestValidationError(errors.array());
    // }

    const { email, password } = req.body;

    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      throw new BadRequestError('Invalid Credentials!!!!');
    }

    const passwordsMatch = await Password.compare(
      isExistingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials!!!!');
    }

    const userJwt = jwt.sign(
      {
        id: isExistingUser.id,
        email: isExistingUser.email,
      },
      //'rsk9946' -- sign value hardcode
      //accessing from the kubernetes sceret
      // ! --  to let typescritp know the check has been doen at soem other places
      process.env.JWT_KEY!
    );

    //Store it on the session object

    //req.session.jwt = userJwt; --- issue with typescript
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(isExistingUser);
  }
);

export { router as signInRouter };
