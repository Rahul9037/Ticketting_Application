import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
//import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
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

    // console.log('Creating a user......');
    // throw new DatabaseConnectionError();
    //res.send({});

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log('Email in use');
      // return res.send({});

      throw new BadRequestError('This email is already in use!');
    }

    const user = User.build({ email, password });
    await user.save();

    //generate JWT
    //below code normally used but we need to catch this issue on startup itself so movinf to index.js
    // if (!process.env.JWT_KEY) {
    //   throw new Error('abcd.....');
    // }
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
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

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
