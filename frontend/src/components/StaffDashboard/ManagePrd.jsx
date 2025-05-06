import "../../css/AdminDashboard/admin-dashboard.css";
import "../../css/AdminDashboard/manage-content.css";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from "react";

function ManagePrd() {
  const [products, setproducts] = useState([]);

  const navigate = useNavigate();
  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Get products from the backend
        setproducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []); // runs once on mount

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/${id}`
      );
      if (response.data.success) {
        // Remove the deleted user from the products state to update the UI
        setproducts(products.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  function handleAddProduct() {
    navigate("/s-dash/addPrd");
  }

  const handleUpdateProduct = (productId) => {
    navigate(`/s-dash/updateProduct/${productId}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Product Report", 20, 20);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);

    let yPos = 40; // Start position for table
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Product Name", 20, yPos);
    doc.text("Product Brand", 70, yPos);
    doc.text("Product Stock", 120, yPos);
    doc.text("Product Category", 170, yPos);
    yPos += 10; // Move to the next line

    products.forEach((product) => {
      doc.setFont("helvetica", "normal");
      doc.text(String(product.prd_name), 20, yPos); // Ensure text is a string
      doc.text(String(product.prd_brand), 70, yPos);
      doc.text(String(product.stock), 120, yPos);
      doc.text(String(product.cetegory), 170, yPos);
      yPos += 10; // Move to the next line
    });

    doc.save("admin_report.pdf"); // Save the generated PDF
  };

  return (
    <>
      <div className="admin-dash">
        <h1 className="admin-dash-heading">Manage Products</h1>

        <div className="manage">
          <button className="add" onClick={handleAddProduct}>
            Add Product
          </button>

          <div className="table-container">
            <table className="manage-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-container">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.prd_name}</td>
                    <td>{product.prd_brand}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>
                      <img src={product.img_url} width={50} alt="Product" />
                    </td>
                    <td>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdateProduct(product._id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <button className="add" onClick={generatePDF}>
            Reports
          </button>
        </div>
      </div>
    </>
  );
}

export default ManagePrd;
