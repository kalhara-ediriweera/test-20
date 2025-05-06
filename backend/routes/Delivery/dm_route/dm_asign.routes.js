import express from "express";
import {
  allAsignDelPersons,
  asignDelPerson,
  updateAsignDelPersons,
  removeAsignDelPersons,
  removeAsignDel,
} from "../../../controllers/Delivery/dm_controller/dm_asign.controller.js";
const router = express.Router();

router.post("/deliver-asign/new", asignDelPerson);
router.get("/deliver-asign/all", allAsignDelPersons);
router.put("/deliver-asign/update/:id", updateAsignDelPersons);
router.delete("/deliver-asign/delete/:id", removeAsignDelPersons);
router.delete("/deliver-asign/delete/abc/:product_id", removeAsignDel);

export default router;
