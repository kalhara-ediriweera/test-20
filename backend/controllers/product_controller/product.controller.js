import Product from "../../models/product_model/product.model.js";

export const createProduct = async (req,res) => {
    const { prd_name, prd_brand, price, stock, cetegory, img_url } = req.body;

    if (!prd_name || !prd_brand || !price || !stock || !cetegory || !img_url) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
      }
    
      try {
        
        const newProduct = new Product({ prd_name, prd_brand, price, stock, cetegory, img_url });
    
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully" });
    
      } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}

 

export const allPrds =  async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getPrd = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removePrd = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

export const updatePrd = async (req, res) => {
  const { id } = req.params; 
  const { prd_name, prd_brand, price, stock, cetegory, img_url } = req.body;
  
  try {
    // Find the user by ID and update their details
    const product = await Product.findByIdAndUpdate(id, {
      prd_name,
      prd_brand,
      price,
      stock,
      cetegory,
      img_url
    }, { new: true }); 

    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};