import { Router } from "express";
import UrlController from "../Controllers/Url.js";
const { generateNewShortUrl, redirectUrl } = UrlController;

const router = Router();
router.post('/url', generateNewShortUrl);
router.get('/url/:id', redirectUrl);

export default router;
