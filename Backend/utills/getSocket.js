import { userSocketIds } from "..";

export const getSockets = (users) => {
    const sokckets = users.map((user)=>userSocketIds.get(user._id.toString()))
    return sokckets;
}