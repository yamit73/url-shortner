import mongoose from "mongoose";

mongoose.set("strictQuery", true);
async function connectToDB() {
    const db = process.env.DB_NAME;
    const username = process.env.DB_USER_NAME;
    const password = process.env.DB_PASSWORD;
    const cluster = process.env.DB_CLUSTER;
    const url = `mongodb+srv://${username}:${password}@${cluster}/${db}`;
    try {
        // mongoose.set('debug', true);
        return mongoose.connect(url);
    } catch (error) {
        console.error(error);
    }
}

export default connectToDB;