import express, { Request, Response } from 'express';
import {AuthService} from "../service/auth.service";
import {LoginValidator} from "./validator/login.validator";
import {InputValidationMiddleware} from "../middleware/inputValidationMiddleware";
import {JwtService} from "../helpers/jwtService";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {CheckCodeValidator} from "./validator/check-code.validator";
import {FindCheckEmailValidator} from "./validator/find-check-email.validator";
import {CreateUserValidator} from "./validator/create-user.validator";

const router = express.Router();
const service = new AuthService();
const jwtService = new JwtService();

router.post('/login', LoginValidator, InputValidationMiddleware, async(req:Request, res: Response) => {
  const secret =  process.env.JWT_SECRET;
  if(!secret){
    console.log(`Error to get secret`);
    process.exit(1);
  }
  const data = await service.login(req.body);
  if(!data || typeof data === "boolean"){
    return res.status(401).send('Password or login incorrect')
  }
  const token = await jwtService.generateJwt(data.accountData.id)
  res.status(200).send({ accessToken: token})
})

router.get('/me', AuthMiddleware, async(req: Request, res: Response) => {
  const userId = req.userId;
  if(!userId){
    return res.status(401).send('Forbidden');
  }
  const user = await service.getMe(userId);
  if(!user || typeof user === "boolean") {
    return res.status(401).send('Forbidden');
  }
  const userResponse = {userId: user.id, email: user.email, login: user.login}
  res.status(200).send(userResponse);
})


router.post('/registration', CreateUserValidator, InputValidationMiddleware, async(req: Request, res: Response) => {
  const mail = await service.registration(req.body);
  return res.status(204).send()
})

router.post('/registration-confirmation', CheckCodeValidator, InputValidationMiddleware, async(req: Request, res: Response) => {
  const isConfirm = service.confirmUser(req.body.code);
  if(!isConfirm){
    return res.status(400).send();
  }
  return res.status(204).send();
})


router.post('/registration-email-resending', FindCheckEmailValidator, InputValidationMiddleware, async(req: Request, res: Response) => {
  const isConfirm = service.resendEmail(req.body.email);
  if(!isConfirm){
    return res.status(400).send()
  }
  res.status(204).send();
})
export default router;