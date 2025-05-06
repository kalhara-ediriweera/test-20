import express from "express";
import { allDetails, createDetails, createTasks, getDetail, getTask, getWeather, removeDetail, updateDetail } from "../../controllers/special_function_controller/SpecialFunction.contoller.js";


const router = express.Router();

router.post('/addDetails', createDetails);
router.get('/getDetails', allDetails);
router.get('/getDetails/:id', getDetail);
router.delete('/detail/:id', removeDetail);
router.put('/detail/:id', updateDetail)

router.get('/weather/:city', getWeather);

router.post('/createTasks', createTasks);
router.get('/tasks', getTask);

export default router;