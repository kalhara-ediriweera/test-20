import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddPrd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prd_name: "",
    prd_brand: "",
    price: "",
    stock: "",
    cetegory: "",
    img_url: "",
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addPrd",
        formData
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Product Added successful!");
        setTimeout(() => {
          navigate("/s-dash/manPrd");
        }, 1000);
      } else {
        toast.error(response.data.message || "Error in Product Creation");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("Product creation failed! Please try again.");
    }
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Add New Product</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="prd_name"
            value={formData.prd_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Brand</label>
          <input
            type="text"
            name="prd_brand"
            value={formData.prd_brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="cetegory"
            value={formData.cetegory}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticides">Pesticides</option>
            <option value="Herbicides">Herbicides</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image Url</label>
          <input
            type="text"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddPrd;
