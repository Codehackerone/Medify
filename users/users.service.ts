import User from './users.model';

export const register = async (userBody:any) => {
    const user = await User.create(userBody);
    return user;
}

export const findUser = async (param:any) => {
    var user = await User.findOne(param);
    return user;
};