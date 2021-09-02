import Routine from "./routine.model";

export const getRoutineByIdService = async (routine_id: any) => {
  const routine = await Routine.findById(routine_id);
  return routine;
};

export const getRoutineByUserIdService = async (user_id: any) => {
  const routine = await Routine.find({ user_id: user_id });
  return routine;
};

export const createRoutineService = async (routineBody: any) => {
  const routine = await Routine.create(routineBody);
  return routine;
};

export const editRoutineService = async (routineId: any, routineBody: any) => {
  const routine = await Routine.findByIdAndUpdate(routineId, routineBody, {
    new: true,
  });
  return routine;
};

export const deleteRoutineService = async (routineId: any) => {
  const routine = await Routine.findByIdAndDelete(routineId);
  return routine;
};
