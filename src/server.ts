import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import adminRoute from "./routes/admin.routes.js";
import gameRoute from "./routes/game.route.js";
import notificationRoute from "./routes/notification.route.js";

const port = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/games", gameRoute);
app.use("/api", notificationRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});