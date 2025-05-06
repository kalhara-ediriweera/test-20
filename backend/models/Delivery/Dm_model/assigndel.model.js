import mongoose from "mongoose";

// Schema Definition
const assignedDelsSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  owner_email: {
    // Fixed typo here
    type: String,
    required: true,
  },
  owner_address: {
    type: String,
    required: true,
  },
  owner_phone: {
    type: String,
    default: "Pending",
  },
  delPerson_email: {
    type: String,
    required: true,
  },
  delStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const AssignedDels = mongoose.model("AssignedDel", assignedDelsSchema);
export default AssignedDels;
