import { Router } from "express";
import { deleteEvent, getEvent, getEvents, postEvent, putEvent } from "../controllers/event";
// import some type of restricted access?

const router = Router();

router.get("/event", getEvents);
router.get("/event/:id", getEvent)
router.post("/event", postEvent);
router.put("/event/:id", putEvent);
router.delete("/event", deleteEvent);

export default router