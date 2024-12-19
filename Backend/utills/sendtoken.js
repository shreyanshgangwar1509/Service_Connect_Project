
export const cookieopt = {
        maxAge:24*60*60*1000,
        sameSite: "none",
        httpOnly: true,
        secure:true,
    }
export const sendtoken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id }, process.env.JWT_SECERET,
        {expiresIn:'9h'}
    )
    return res.status(code).cookie("access-token", token,cookieopt ).json({success:true,message})
}