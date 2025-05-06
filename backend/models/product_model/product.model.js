
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    prd_name: {
        type: String,
        required: true 
    },
    prd_brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    cetegory: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;