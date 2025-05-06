import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../../css/HomePage/Order_process.css";
import "../../css/HomePage/product.css";
import Delivery from "../../assets/images/graphics/delivery.jpg";
import { ToastContainer, toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

export default function OrderProcess() {
  const location = useLocation();
  const product = location.state;

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [paymentType, setPaymentType] = useState("");
  const totalPrice = product.price * quantity;

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in

      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    if (userId) {
      fetchUsers();
    }
  }, [userId]);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmOrder = async () => {
    const orderDetails = {
      name: user.full_name, // User's name from the logged-in session
      Shipping_addrs: user.address, // User's address from the session
      prd_name: product.prd_name,
      prd_brand: product.prd_brand,
      item_price: product.price,
      quantity: quantity,
      tot_price: totalPrice,
      payment_type: paymentType,
    };

    try {
      const response = await fetch("http://localhost:5000/api/add_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      toast.success("Order Confirmed ! ");
      setTimeout(() => {
        navigate("/");
      }, 2300);
    } catch (error) {
      console.error("Error:", error);
      alert("Error placing the order.");
    }
  };

  const handlePaymentTypeChange = (e) => {
    const value = e.target.value;
    setPaymentType(value);
    if (value === "cash") {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const cardRegex = /^[0-9]|[-]{19}$/; // Simple validation for 16-digit card number
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    const cvvRegex = /^[0-9]{3}$/; // 3-digit CVV

    if (!cardRegex.test(cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits.";
    }

    if (!expiryRegex.test(expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format.";
    }

    if (!cvvRegex.test(cvv)) {
      errors.cvv = "CVV must be 3 digits.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Card Details Saved.", {
        autoClose: 1500, // Time in milliseconds before the toast auto closes
        hideProgressBar: true, // Show progress bar
        closeButton: true, // Show close button
        pauseOnHover: true, // Pause the toast when hovered
        draggable: true, // Allow dragging of the toast
        className: "toast-custom-success", // Custom class for the toast message
        bodyClassName: "toast-body-custom", // Custom body class for the toast
      });
      console.log("Form submitted");
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.slice(0, 16); // Limit to 16 digits

    // Format as XXXX-XXXX-XXXX-XXXX
    const formattedValue = value
      .replace(/(\d{4})/g, "$1-")
      .replace(/-$/, "");

    setCardNumber(formattedValue);
  };

  return (
    <>
      <div className="prd-head"></div>
      <div id="main-container">
        <motion.div
          id="column_left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <div>
              <p id="p_addr">Name</p>
              <input
                name="name"
                id="q_input"
                value={user.full_name || ""}
                type="text"
                disabled
              />
              <br />
              <br />
              <p id="p_addr">Shipping Address</p>
              <textarea
                name="shipping_addr"
                id="shipping_addr"
                value={user.address || ""}
                maxLength={200}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              ></textarea>
              <p id="p_qty">Item Quantity</p>
              <input
                id="q_input"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={product.stock}
              />
              <p id="p_details">Payment Type</p>
              <select
                id="drop_down"
                value={paymentType}
                onChange={handlePaymentTypeChange}
              >
                <option value="cash">select methord</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          )}

          {step === 2 && paymentType === "card" && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange} // Single merged function
              />
              {errors.cardNumber && <p>{errors.cardNumber}</p>}

              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              {errors.expiryDate && <p>{errors.expiryDate}</p>}

              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                
              />
              {errors.cvv && <p>{errors.cvv}</p>}

              <button id="save-button">
                <FaSave id="icon" /> Save
              </button>
            </form>
          )}

          {step === 3 && (paymentType === "card" || paymentType === "cash") && (
            <>
              <h2 id="thank_msg">Your Order is Ready to deliver</h2>
              <img id="thank_img" src={Delivery} alt="thanks" />
            </>
          )}

          <div>
            {step > 1 && (
              <button id="back_btn" onClick={prevStep}>
                Back
              </button>
            )}
            {step > 1 && step < 3 && (
              <button id="next_btn" onClick={nextStep}>
                Next
              </button>
            )}
            {step === 3 && (
              <button id="confirm_btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            )}
          </div>
        </motion.div>

        <div id="column_right">
          <h3>Order Summary</h3>
          <br />
          <hr />
          <br />
          <div id="sub_container">
            <div id="left_section">
              <img id="prd_img" src={product.img_url} alt={product.prd_name} />
            </div>
            <div id="right_section">
              <p id="p_details">
                <strong>Item Name:</strong> {product.prd_name}
              </p>
              <p id="p_details">
                <strong>Item Brand:</strong> {product.prd_brand}
              </p>
              <p id="p_details">
                <strong>Category:</strong> {product.cetegory}
              </p>
              <p id="p_details">
                <strong>Stock:</strong> {product.stock}
              </p>
              <p id="p_details_price">
                <strong>Item Price:</strong> {`Rs. ${product.price}`}
              </p>
              <hr />
              <input
                type="text"
                value={`Total Price: Rs. ${totalPrice}`}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
