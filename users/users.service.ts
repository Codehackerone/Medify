import User from './users.model';

export const register = async (req:any, res:any) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
}