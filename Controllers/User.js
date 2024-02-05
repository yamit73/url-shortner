import userSchema from "../Models/User";
import Token from "../Components/User/Token";
const { createToken, verifyToken } = Token;
import Password from "../Components/User/Password";
const { hasPassword, verifyPassword } = Password;

const signup = async (req, res) => {
  const reqBody = req.body;
  const isValidParams = validateParams(reqBody);
  console.log(isValidParams);
  if (!isValidParams.success) {
    return res.status(400).json(isValidParams);
  }
  const hashedPassword = await hasPassword(reqBody.password);
  const userCreateResponse = await userSchema.create({
    email: reqBody.email,
    password: hashedPassword
  });
  return userCreateResponse.status(200).json(userCreateResponse);
};

const signin = async (req, res) => {
  const reqBody = req.body;
  if (!reqBody || !reqBody.email || !reqBody.password) {
    return res.status(400).json({ success: false, errors: ["email and password are required"] });
  }
  let response = { success: false, errors: [] };
  try {
    const user = await userSchema.findOne({ email: reqBody.email });
    if (user) {
      const validCred = await verifyPassword(reqBody.password, user.password);

      if (validCred) {
        const payload = { user_id: user.user_id };
        const token = await createToken(payload);

        return res.status(200).json({ success: true, token });
      } else {
        response.errors.push("Password didn't match!");
        return res.status(401).json(response);
      }
    } else {
      response.errors.push("User does not exist!");
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Error in signin:", error);
    return res.status(500).json({ success: false, errors: ["Internal server error"] });
  }
};


function validateParams(data) {
  let response = { success: false, errors: [] };
  if (!data || !data.email || !data.password) {
    response.errors.push("email and passsword is required!");
    return response;
  }

  const isValidMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!isValidMail) {
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
  console.log(isLetter, "isLetter");
  console.log(isSpecChars, "isSpecChars");
  console.log(isNumber, "isNumber");
  if (!isLetter || !isSpecChars || !isNumber) {
    response.errors.push(
      "Password should be of combination of special character, number and letter"
    );
  }
  return response;
}
export default { signin, signup };
