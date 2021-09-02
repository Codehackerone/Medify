import { message, messageCustom, messageError } from "../helpers/message";
import {
    OK,
    CREATED,
    BAD_REQUEST,
    CONFLICT,
    SERVER_ERROR,
} from "../helpers/messageTypes";
import { getRoutineByIdService, getRoutineByUserIdService, editRoutineService, deleteRoutineService,createRoutineService } from "./routine.service";

export const getRotineById = async (req: any, res: any) => {
    try {
        const response:any = await getRoutineByIdService(req.params.id);
        let return_object:any = {
            routine: response,
        };
        if(response.length === 0){
            message(200, OK,"No routine found");
            return;
        }
        messageCustom(res, OK, "Routines Found",return_object);
    } catch (error) {
        messageError(res, SERVER_ERROR, "Error in findinf routine", error);
    }
}

export const createRoutine = async (req: any, res: any) => {
    try {
        const response:any = await createRoutineService(req.body);
        messageCustom(res, CREATED, "Routine Created successfully",response);
    } catch (error) {
        messageError(res, SERVER_ERROR, "Error in creating routine", error);
    }
}