import { Router } from "express";
import Url from "../Controllers/Url.js";
const { redirectUrl } = Url;
const router = Router();

router.get('/:id/', redirectUrl);

export default router;
