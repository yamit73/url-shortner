import Token from "./User/Token.js";
const { verifyToken } = Token;
import userSchema from "../Models/User.js";

const beforeHandleRequest = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).send({ success: false, errors: ['Invalid Authorization header'] });
        }
        const token = authorizationHeader.substring(7) ?? req.query.bearer;
        if (!token) {
            res.status(401).send({ success: false, errors: ["Token is missing from request!!"] });
        }
        try {
            const decodedData = await verifyToken(token);
            const userId = decodedData.user_id;
            const user = await userSchema.findById(userId);
            req.user = user;
            next();
        } catch (err) {
            res.status(500).send({ success: false, errors: [err.message] })
        }

    } catch (error) {
        res.status(500).send({ success: false, errors: ["Something went wrong!!"] });
    };
}
export default beforeHandleRequest;