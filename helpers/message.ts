export const message = function (res:any, code:Number, message:String) {
  var return_object = {
    status_code: code,
    message: message,
  };
  res.status(code).json(return_object);
};

export const messageError = function (res:any, code:Number, message:String, err:any) {
  var return_object = {
    status_code: code,
    message: message,
    error: err,
  };
  res.status(code).json(return_object);
};

export const messageCustom = function (res:any, code:Number, message:String, return_object:any) {
  return_object.status_code = code;
  return_object.message = message;
  res.status(code).json(return_object);
};
