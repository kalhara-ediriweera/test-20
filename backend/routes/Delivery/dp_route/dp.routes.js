import express from "express";
import {
  registerDelPerson,
  delPersonLogin,
  allDelPersons,
  getDelPerson,
  removeDelPerson,
  updateDelPerson,
} from "../../../controllers/Delivery/dp_controller/dp.controller.js";
const router = express.Router();

router.post("/deliver-person/sign-up", registerDelPerson);
router.post("/deliver-person/login", delPersonLogin);
router.get("/deliver-person/all", allDelPersons);
router.get("/deliver-person/:id", getDelPerson);
router.put("/deliver-person/update/:id", updateDelPerson);
router.delete("/deliver-person/remove/:id", removeDelPerson);

export default router;
