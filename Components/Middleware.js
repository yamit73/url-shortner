import Token from "./User/Token.js";
const { verifyToken } = Token;
import userSchema from "../Models/User.js";

const beforeHandleRequest = async (req, res, next) => {
    try {
        const token = req.headers.authorization ?? false;
        if (!token) {
            res.status(401).send("Token is missing from request!!");
        }
        const decodedData = verifyToken(token);
        console.log(decodedData)
        const userId = decodedData.user_id;
        const user = await userSchema.findById(userId);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!!");
    }
};

export default beforeHandleRequest;