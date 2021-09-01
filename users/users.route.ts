import express from "express";
import { register, login } from "./users.controller";
import { validateRegistration } from "../middlewares/validator";

const Router=express.Router();

Router.route("/login")
    .post(login);

Router.route("/register")
    .post(validateRegistration(), register);

export default Router;