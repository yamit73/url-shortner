import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import urlRouter from "./Routes/Url.js";
import userRouter from "./Routes/User.js";
import defaultRouter from "./Routes/Default.js";
import redirectRouter from "./Routes/Redirect.js";
import connectToDB from "./Connect.js";
import beforeHandleRequest from "./Components/Middleware.js";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());

connectToDB().then(() => {
    console.log('Mongodb connection established!!');
});

app.use(redirectRouter);
app.use(userRouter);
app.use(beforeHandleRequest);
app.use(urlRouter);
app.use(defaultRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port: " + PORT);
});
