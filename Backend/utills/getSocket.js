// import { userSocketIds } from "..";
const userSocketIds = require('..');

 const getSockets = (users) => {
    const sokckets = users.map((user)=>userSocketIds.get(user._id.toString()))
    return sokckets;
}
export default getSockets