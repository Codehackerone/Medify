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
      const access_token = jwt.sign(
        { email: user.email, user_id: user._id },
        String(process.env.JWT_SECRET),
        jwt_headers
      );
      var return_object:any = {
        user: user,
        auth_token: access_token,
      };
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

  export const login = async (req:any, res:any) => {
    try {
      if (!req.body.email || !req.body.password) {
        var err = {
          s_code: 400,
          type: "ValidationError",
          name: "Both 'email' and 'password' are required",
        };
        throw err;
      }
      var email = req.body.email;
      var password = req.body.password;
      const user:any = await findUserService({ email });
      if (!user) {
        var err = {
          s_code: 500,
          type: "AuthenticationError",
          name: "Email or Password doesn't match.",
        };
        throw err;
      }
      if (!bcrypt.compareSync(password, user.password)) {
        var err = {
          s_code: 500,
          type: "AuthenticationError",
          name: "Email or Password doesn't match.",
        };
        throw err;
      }
      const access_token = jwt.sign(
        { email: user.email, user_id: user._id },
        String(process.env.JWT_SECRET),
        jwt_headers
      );
      var return_object:any = {};
      return_object.auth_token = access_token;
      return_object.user = user;
      messageCustom(res, 200, "successfully logged in", return_object);
    } catch (err:any) {
      if (err.s_code !== undefined) {
        messageError(res, err.s_code, err.name, err.type);
      } else {
        console.log(err);
        messageError(res, 500, "error", err);
      }
    }
  };
  