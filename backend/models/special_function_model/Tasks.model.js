import mongoose from "mongoose";

const farmingTaskSchema = mongoose.Schema({
    crop_name: {
        type: String,
        required: true 
    },
    season: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['month', 'week'],
        required: true
    },
    tasks: [
        {
            period: {
                type: String,
                required: true
            },
            task_list: {
                type: [String],
                required: true
            }
        }
    ]
});

const FarmingTasks = mongoose.model('FarmingTask', farmingTaskSchema);

export default FarmingTasks;
