import User from "./users.model";

export const registerService = async (userBody: any) => {
  const user = await User.create(userBody);
  return user;
};

export const findUserService = async (param: any) => {
  var user = await User.findOne(param);
  return user;
};

export const moreDetailsService = async (userDetails: any, userId: any) => {
  var user = await User.findByIdAndUpdate(userId, userDetails, { new: true });
  return user;
};
