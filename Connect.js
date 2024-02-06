import mongoose from "mongoose";

mongoose.set("strictQuery", true);
async function connectToDB() {
    const port = process.env.DB_PORT ?? 3000;
    const db = process.env.DB_NAME;
    const username = process.env.DB_USER_NAME;
    const password = process.env.DB_PASSWORD;
    const url = `mongodb://${username}:${password}@localhost:${port}/${db}?authSource=admin`;
    console.log(url);
    try {
        mongoose.set('debug', true);
        return mongoose.connect(url);
    } catch (error) {
        console.error(error);
    }
}

export default connectToDB;