import jwt from "jsonwebtoken";
import fs from "fs/promises";

const createToken = async (payload) => {
  try {
    const privateKey = await loadPrivateKey();
    const token = jwt.sign(payload, privateKey.toString(), { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = async (token) => {
  try {
    // const publicKey = await loadPublicKey();
    const privateKey = await loadPrivateKey();
    const decoded = jwt.verify(token, privateKey.toString());
    return decoded;
  } catch (error) {
    throw error;
  }
};

const loadPrivateKey = async () => {
  return await fs.readFile("././private-key.pem", "utf8");
};

const loadPublicKey = async () => {
  return await fs.readFile("././public-key.pem", "utf8");
};

export default { createToken, verifyToken };
