import userSchema from "../Models/User";
import Password from "../Components/User/Password";
const { hasPassword, verifyPassword } = Password;

const signup = (req, res) => {
  const reqBody = req.body;
  const isValidParams = validateParams({
    email: "amit@gmail.com",
    password: "Amit@123",
  });
  console.log(isValidParams);
  if (!isValidParams.success) {
    return res.status(400).json(isValidParams);
  }
  const hashedPassword = hasPassword(reqBody.password);
};
signup({}, {});

const signin = (req, res) => {};

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
