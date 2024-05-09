import express from "express";
import userRoutes from "./user";
import cityRoutes from "./cities";

const apiRoutes = express.Router();

apiRoutes.use("/user", userRoutes);
apiRoutes.use("/city", cityRoutes);

export default apiRoutes;
