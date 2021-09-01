import { userRegistrationschema } from "../helpers/schemas";
import { BAD_REQUEST } from "../helpers/messageTypes";
import { messageError } from "../helpers/message";

export const validateLogin = () => {
    return async (req:any, res:any, next:any) => {
      const { error } = userRegistrationschema.validate(req.body);
      if (error) {
        const msg = error.details.map((el:any) => el.message).join(",");
        messageError(res, BAD_REQUEST, msg, "ValidationError");
      } else next();
    };
  };