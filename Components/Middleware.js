import Token from "./User/Token.js";
const { verifyToken } = Token;
import userSchema from "../Models/User.js";

const beforeHandleRequest = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).send('Invalid Authorization header');
        }
        const token = authorizationHeader.substring(7);
        if (!token) {
            res.status(401).send("Token is missing from request!!");
        }
        const decodedData = await verifyToken(token);
        if (decodedData.exp < Date.now) {
            res.status(401).send("Token expired!!");
        }
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