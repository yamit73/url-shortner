import { Router } from "express";
import UrlController from "../Controllers/Url.js";
const { generateNewShortUrl } = UrlController;

const router = Router();
router.post('/url', generateNewShortUrl);

export default router;
