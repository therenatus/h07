import {body} from "express-validator";
import { userCollection} from "../../index";

const urlPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const CheckEmailValidator = [
  body('email').trim().isString().matches(urlPattern).withMessage('Invalid Email')
];