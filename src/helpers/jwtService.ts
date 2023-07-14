import jwt, {Secret} from "jsonwebtoken";
import dotenv from "dotenv";
import {ObjectId} from "mongodb";
dotenv.config();


const secret: Secret = process.env.JWT_SECRET as Secret;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is missing');
}

export class JwtService {
  async generateJwt(id: string) {
    return jwt.sign({id}, secret, {expiresIn: '1h'});
  }

  async getUserByToken(token: string) {
    try {
      const result: any = jwt.verify(token, secret)
      return result
    }catch {
      return null;
    }
  }
}
