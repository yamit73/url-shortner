import { Router } from "express";

const router = Router();

router.all('*', (req, res) => {
    return res.status(404).send({ success: false, errors: ["Resource not found!!"] });
})

export default router;
