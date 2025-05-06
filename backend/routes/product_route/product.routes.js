import express from "express";
import { allPrds, createProduct, getPrd, removePrd, updatePrd } from "../../controllers/product_controller/product.controller.js";

const router = express.Router();

router.post('/addPrd', createProduct)
router.get('/products', allPrds)
router.get('/product/:id', getPrd)
router.delete('/product/:id' , removePrd)
router.put('/product/:id', updatePrd)

export default router;