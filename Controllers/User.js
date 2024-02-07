import UserModel from "../Models/User.js";
import Token from "../Components/User/Token.js";
const { createToken } = Token;
import Password from "../Components/User/Password.js";
const { hasPassword, verifyPassword } = Password;

const signup = async (req, res) => {
  const reqBody = req.body;
  const isValidParams = validateParams(reqBody);
  if (!isValidParams.success) {
    return res.status(400).json(isValidParams);
  }
  try {
    const hashedPassword = await hasPassword(reqBody.password);
    const dbUser = await UserModel.findOne({ email: reqBody.email });
    if (dbUser) {
      return res.status(400).json({
        success: false,
        errors: ["user with same email already exist"],
      });
    }
    const userCreateResponse = await UserModel.create({
      email: reqBody.email,
      password: hashedPassword,
    });
    if (userCreateResponse._id) {
      const payload = { user_id: userCreateResponse.user_id };
      const token = await createToken(payload);
      console.log(token);
      return res.status(200).json({ success: true, token });
    }
  } catch (err) {
    return res.status(500).json({ success: false, errors: [err.message] });
  }
};

const signin = async (req, res) => {
  const reqBody = req.body;
  if (!reqBody || !reqBody.email || !reqBody.password) {
    return res
      .status(400)
      .json({ success: false, errors: ["email and password are required"] });
  }
  let response = { success: false, errors: [] };
  try {
    const user = await UserModel.findOne({ email: reqBody.email });
    console.log(user);
    if (user) {
      const validCred = await verifyPassword(reqBody.password, user.password);
      console.log(validCred);
      if (validCred) {
        const payload = { user_id: user.user_id };
        const token = await createToken(payload);
        console.log(token);
        return res.status(200).json({ success: true, token });
      } else {
        response.errors.push("Invalid credentials!");
        return res.status(401).json(response);
      }
    } else {
      response.errors.push("User does not exist!");
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Error in signin:", error);
    return res
      .status(500)
      .json({ success: false, errors: ["Internal server error"] });
  }
};

function validateParams(data) {
  let response = { success: true, errors: [] };
  if (!data || !data.email || !data.password) {
    response.success = false;
    response.errors.push("email and passsword is required!");
    return response;
  }

  const isValidMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!isValidMail) {
    response.success = false;
    response.errors.push("Invalid email address!!");
  }
  let isLetter = false;
  let isSpecChars = false;
  let isNumber = false;
  for (let ch of data.password) {
    if (/[a-zA-Z]/.test(ch)) {
      isLetter = true;
    } else if (/^\d$/.test(ch)) {
      isNumber = true;
    } else if (/[!@#$%^&*(),.?":{}|<>]/) {
      isSpecChars = true;
    }
  }
  if (!isLetter || !isSpecChars || !isNumber) {
    response.success = false;
    response.errors.push(
      "Password should be of combination of special character, number and letter"
    );
  }
  return response;
}
export default { signin, signup };
