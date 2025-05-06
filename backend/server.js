import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/user_route/auth.routes.js";
import productRoutes from "./routes/product_route/product.routes.js";
import orderRoutes from "./routes/order_route/order.route.js";
import specialRoutes from "./routes/special_function_route/special.routes.js";
import delpersonRoutes from "./routes/Delivery/dp_route/dp.routes.js";
import delpersonAsignRoutes from "./routes/Delivery/dm_route/dm_asign.routes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", specialRoutes);
app.use("/api", delpersonRoutes);
app.use("/api", delpersonAsignRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
