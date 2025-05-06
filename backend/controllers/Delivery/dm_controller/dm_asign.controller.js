import AssignedDels from "../../../models/Delivery/Dm_model/assigndel.model.js";

// Create a Delivery Assignment
export const asignDelPerson = async (req, res) => {
  const {
    product_id,
    product_name,
    owner_email, // Fixed typo here
    owner_address,
    owner_phone,
    delPerson_email,
    delStatus,
  } = req.body;

  if (
    !product_id ||
    !product_name ||
    !owner_email || // Fixed typo here
    !owner_address ||
    !delPerson_email ||
    !delStatus
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields." });
  }

  try {
    // Check if the product has already been assigned
    let userExists = await AssignedDels.findOne({ product_id });
    if (userExists) {
      return res
        .status(409) // Conflict error status
        .json({
          success: false,
          message: "A delivery for this product has already been assigned.",
        });
    }

    // Create a new delivery assignment
    const newUser = new AssignedDels({
      product_id,
      product_name,
      owner_email, // Fixed typo here
      owner_address,
      owner_phone,
      delPerson_email,
      delStatus,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "Delivery assigned successfully." });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get All Delivery Assignments
export const allAsignDelPersons = async (req, res) => {
  try {
    const asigns = await AssignedDels.find();
    res.status(200).json({ success: true, asigns });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updateAsignDelPersons = async (req, res) => {
  const { id } = req.params;
  const {
    product_id,
    product_name,
    owner_email,
    owner_address,
    owner_phone,
    delPerson_email,
    delStatus,
  } = req.body;

  try {
    // Find the user by ID and update their details
    const order = await AssignedDels.findByIdAndUpdate(
      id,
      {
        product_id,
        product_name,
        owner_email,
        owner_address,
        owner_phone,
        delPerson_email,
        delStatus,
      },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeAsignDelPersons = async (req, res) => {
  const { id } = req.params;
  try {
    await AssignedDels.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Order is Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

export const removeAsignDel = async (req, res) => {
  const { product_id } = req.params; // Change to product_id
  try {
    const result = await AssignedDels.findOneAndDelete({ product_id }); // Use product_id in the query

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" }); // Update the message
    }

    res.status(200).json({ success: true, message: "Product is Deleted" }); // Update the message
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};
