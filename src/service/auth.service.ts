import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";
import {IRegistration, IUser, UserDBType} from "../types/user.types";
import {ObjectId} from "mongodb";
import { v4 as uuidv4} from 'uuid';
import add from 'date-fns/add';
import {generateHash} from "../helpers/hashPassword";
import {EmailManagers} from "../managers/email-managers";
import {StatusEnum} from "../types/status.enum";


const Repository = new UserRepository();
const emailManager = new EmailManagers();
export class AuthService {
  async login (body: any): Promise<UserDBType | boolean> {
    const user = await Repository.getOne(body.loginOrEmail);
    if(!user){
      return false;
    }
    const validPassword = await compare(body.password, user.accountData.hashPassword);
    if(!validPassword){
      return false;
    }
    return user;
  }

  async getMe(userID: string | ObjectId): Promise<IUser | boolean> {
    const me = await Repository.findOneById(userID);
    if(!me){
      return false
    }
    return me.accountData;
  }

  async registration(body: IRegistration) {
    const {email, login, password} = body;
    const hashPassword = await generateHash(password);
    const user: UserDBType = {
      _id: new ObjectId(),
      accountData: {
        id: (+new Date()).toString(),
        login,
        email,
        hashPassword,
        createdAt: new Date()
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), {
          hours: 1
        }),
        isConfirmed: false
      }
    }

    const createResult = Repository.create(user);
    await emailManager.sendConfirmMessages(user);
    return createResult;
  }

  async resendEmail(email: string) {
    const user = await Repository.getOneByEmail(email);
    const code = uuidv4();
    if(!user){
      return null
    }
    await Repository.updateCode(user.accountData.id, code);
    await emailManager.sendConfirmMessages(user!);
  }

  async confirmUser(code: string) {
    const user = await Repository.getOneByCode(code);
    return await Repository.confirmUser(user!.accountData.id)
  }
}