import { Router } from "express";

const router = Router();

/** GET /api/health: comprueba que el servicio está en marcha. */
router.get("/", (req, res) => {
    res.json({ status: "ok", date: new Date().toISOString() });
});

export default router;
