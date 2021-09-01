import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { registerService, findUserService } from "./users.service";
import { message, messageCustom, messageError } from "../helpers/message";

const expiry_length = 30 * 86400;
const jwt_headers:any = {
  algorithm: "HS256",
  expiresIn: expiry_length,
};

export const register = async (req:any, res:any) => {
    try {
      var user:any = await registerService(req.body);
      var return_object = {
        user: user,
      };
      const access_token = jwt.sign(
        { email: user.email, user_id: user._id },
        String(process.env.JWT_SECRET),
        jwt_headers
      );
      messageCustom(res, 200, "user created successfully", return_object);
    } catch (err:any) {
      if (err.error === "ValidationError") {
        messageError(res, 400, err.message, err.name);
      } else {
        if (Number(err.code) === 11000) {
          messageError(
            res,
            409,
            `${Object.keys(err.keyValue)[0]} '${
              Object.values(err.keyValue)[0]
            }' already exists.`,
            "ValidationError"
          );
        } else {
          messageError(res, 500, err.message, err.name);
        }
      }
    }
  };