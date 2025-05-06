import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePrd() {
    const navigate = useNavigate();
    const { prdId } = useParams();// Get user ID from URL To navigate back or to another page

  console.log("Prd ID:", prdId);
    const [formData, setFormData] = useState({
            prd_name: '',
            prd_brand: '',
            price: '',
            stock: '',
            cetegory: '',
            img_url: ''
        });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Fetch user data when component mounts
        async function fetchProductData() {
          try {
            const response = await axios.get(`http://localhost:5000/api/product/${prdId}`);
            if (response.data.success) {
              setFormData(response.data.product);  // Populate the form with the fetched data
            } else {
              console.log("product not found");
            }
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }
        
        fetchProductData();
      }, [prdId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:5000/api/product/${prdId}`, formData);
          if (response.data.success) {
            toast.success('product updated successfully!');
            setTimeout(() => {
                navigate("/s-dash/manPrd");
            }, 1000);
          } else {
            toast.error('Failed to update product.');
          }
        } catch (error) {
          console.error("Error updating product data:", error);
          toast.error('An error occurred while updating the product.');
        }
      };
    
    


    return (
        <div className="add-user-container">
            <h2 className="add-user-heading">Update Product</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="prd_name" value={formData.prd_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Product Brand</label>
                    <input type="text" name="prd_brand" value={formData.prd_brand} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select name="cetegory" value={formData.cetegory} onChange={handleChange} required>
                        <option value="" disabled>Select a category</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Pesticides">Pesticides</option>
                        <option value="Herbicides">Herbicides</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Image Url</label>
                    <input type="text" name="img_url" value={formData.img_url} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Update Product</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdatePrd;
