import Routine from "./routine.model";

export const getRoutine=async(user_id:any)=>{
    const routine=await Routine.find({user_id:user_id});
    return routine;
}

export const createRoutine=async(routineBody:any)=>{
    const routine=await Routine.create(routineBody);
    return routine;
}

export const editRoutine=async(routineId:any,routineBody:any)=>{
    const routine=await Routine.findByIdAndUpdate(routineId,routineBody,{new:true});
    return routine;
}

export const deleteRoutine=async(routineId:any)=>{
    const routine=await Routine.findByIdAndDelete(routineId);
    return routine;
}