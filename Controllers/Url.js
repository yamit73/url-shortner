import { nanoid } from "nanoid";
import URL from "../Models/Url.js";


const generateNewShortUrl = async (req, res) => {
    const reqData = req.body;
    if (!reqData.url) {
        return res.status(400).json({ success: false, message: "url is required!!!" });
    }
    const userId = req.user.user_id;
    const url = reqData.url;
    const dbData = await URL.findOne({ user_id: userId, redirect_url: url });
    if (!dbData) {
        const shortId = nanoid(20);
        await URL.create({
            user_id: userId,
            short_id: shortId,
            redirect_url: url,
            visit_count: 0
        });
        return res.json({ success: true, data: { id: shortId } });
    } else {
        return res.json({ success: false, errors: ["short url already exists for the same url!!"] });
    }
}

const redirectUrl = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: "id is required!!!" });
    }
    const userId = req.user.user_id;
    let dbData = await URL.findOneAndUpdate(
        {
            user_id: userId,
            short_id: id,
        },
        {
            $inc: { visit_count: 1 }
        }
    );
    if (dbData) {
        return res.redirect(dbData.redirect_url);
    }
    return res.json({ success: false, errors: ["Invalid url for"] });
}
export default { generateNewShortUrl, redirectUrl };
