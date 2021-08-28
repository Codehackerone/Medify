export const messager = function (res:any, code:Number, message:String) {
  var return_object = {
    status_code: code,
    message: message,
  };
  res.status(code).json(return_object);
};

export const messager_err = function (res:any, code:Number, message:String, err:any) {
  var return_object = {
    status_code: code,
    message: message,
    error: err,
  };
  res.status(code).json(return_object);
};

export const messager_custom = function (res:any, code:Number, message:String, return_object:any) {
  return_object.status_code = code;
  return_object.message = message;
  res.status(code).json(return_object);
};
