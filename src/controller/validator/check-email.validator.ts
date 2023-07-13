import {body} from "express-validator";
import { userCollection} from "../../index";

const urlPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const CheckEmailValidator = [
  body('email').trim().isString().matches(urlPattern).custom(async(email) => {
    const user = await userCollection.findOne({'accountData.email': email});
    if(!user || user.emailConfirmation.isConfirmed) {
      throw new Error('Email not found');
    }
    return true;
  })
];