import express from "express";
import { getRotineById, createRoutine, editRoutine, deleteRoutine  } from "./routine.controller";
import { validateCreateRoutine } from "../middlewares/validator";
import { authorize } from "../middlewares/authorization";

const Router = express.Router();

Router.route("/create")
    .post(authorize(), validateCreateRoutine(),createRoutine);

Router.route('/:id')
    .get(authorize(), getRotineById)
    .put(authorize(), editRoutine)
    .delete(authorize(), deleteRoutine);

export default Router;