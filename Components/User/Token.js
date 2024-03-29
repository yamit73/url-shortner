import jwt from "jsonwebtoken";
import fs from "fs/promises";

const createToken = async (payload) => {
    try {
        const privateKey = await loadPrivateKey();
        const expiresIn = 4 * 60 * 60;
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn })

        return token;
    } catch (error) {
        throw error;
    }
};

const verifyToken = async (token) => {
    try {
        const publicKey = await loadPublicKey();
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded;
    } catch (error) {
        throw error;
    }
};

const loadPrivateKey = async () => {
    await fs.readFile('././private-key.pem', 'utf8')
};

const loadPublicKey = async () => {
    await fs.readFile('././public-key.pem', 'utf8')
};

export default { createToken, verifyToken };