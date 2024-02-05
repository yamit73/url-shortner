import Token from "./User/Token";
const { verifyToken } = Token;
import userSchema from "../Models/User";

const beforeHandleRequest = async (req, res, next) => {
    try {
        const token = req.headers.authorization ?? false;
        if (!token) {
            res.status(401).send("Token is missing from request!!");
        }
        const decodedData = verifyToken(token);
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