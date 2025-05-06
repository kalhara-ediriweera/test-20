
import mongoose from "mongoose";

const staffSchema = mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
