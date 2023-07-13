import {body} from "express-validator";
import { userCollection} from "../../index";

export const CheckCodeValidator = [
  body('code').trim().isString().custom(async(code) => {
    const user = await userCollection.findOne({'emailConfirmation.confirmationCode': code});
    if(!user || user.emailConfirmation.confirmationCode != code) {
      throw new Error('Code not found');
    }
    return true;
  })
];