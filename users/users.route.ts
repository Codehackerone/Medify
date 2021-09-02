import express from "express";
import { register, login, moreDetails, verifyToken } from "./users.controller";
import { validateRegistration, validateLogin } from "../middlewares/validator";
import { authorize } from "../middlewares/authorization";

const Router = express.Router();

Router.route("/verifytoken").all(authorize(), verifyToken);

Router.route("/login").post(validateLogin(), login);

Router.route("/register").post(validateRegistration(), register);

Router.route("/userdetails").post(authorize(), moreDetails);

export default Router;
