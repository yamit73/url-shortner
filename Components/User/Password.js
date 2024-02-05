import bcrypt from "bcrypt";

const saltRound = 10;
const hasPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
  } catch (error) {
    throw error;
  }
};
const verifyPassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

export default { hasPassword, verifyPassword };
