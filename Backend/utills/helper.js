

export const getOtherMemeber = (members, userId) => {
    return members.find((member)=>member._id.toString()!==userId.toString())
}