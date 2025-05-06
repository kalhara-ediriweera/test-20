
import mongoose from "mongoose";

const farmingDetailSchema = mongoose.Schema({
    farmer_id: {
        type: String,
        required: true
    },
    farmer_name: {
        type: String,
        required: true
    },
    crop_name: {
        type: String,
        required: true 
    },
    area: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const FarmingDetails = mongoose.model('FarmingDetails', farmingDetailSchema);

export default FarmingDetails;