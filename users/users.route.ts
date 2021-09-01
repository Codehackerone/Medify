import express from "express";
import { register, login } from "./users.controller";

const Router=express.Router();

Router.route("/login")
    .post(login);

Router.route("/register")
    .post(register);