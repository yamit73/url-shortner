import URL from "../Models/Url";

const getStats = (req, res) => {
    const shortId = req.body.id;
    if (!shortId) {
        return res.status(400).json({ success: false, message: "id is required!!" });
    }
    const dbData = URL.findOne({ shortId });
    return res.status(200).json(
        {
            success: true,
            data: {
                total_clicks: dbData.visitHistory.length,
                analytics: dbData.visitHistory
            }
        }
    );
};

export default getStats;