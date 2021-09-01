import { user_schema } from "../helpers/schemas";
import { messageError } from "../helpers/message";

export const validate_user = () => {
    return async (req:any, res:any, next:any) => {
      const { error } = user_schema.validate(req.body);
      if (error) {
        const msg = error.details.map((el:any) => el.message).join(",");
        messageError(res, 400, msg, "ValidationError");
      } else {
        next();
      }
    };
  };