import { nanoid } from "nanoid";
import URL from "../Models/Url.js";


const generateNewShortUrl = async (req, res) => {
    const reqData = req.body;
    if (!reqData.url) {
        return res.status(400).json({ success: false, message: "url is required!!!" });
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: reqData.url,
        visitHistory: []
    });

    return res.status(200).json({ success: true, data: { id: shortId } });
}

const redirectUrl = async (req, res) => {
    const {id} = req.query;
    console.log(id);
    if (!id) {
        return res.status(400).json({ success: false, message: "id is required!!!" });
    }
    let dbData = await URL.findOneAndUpdate(
        {
            shortId: id,
        },
        {
            $push: {
                visitHistory: {
                    timeStamps: new Date()
                }
            }
        }
    );

    return res.redirect(dbData.redirectUrl);
}
export default { generateNewShortUrl, redirectUrl };
