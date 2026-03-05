import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import adminRoute from "./routes/admin.routes.js";
import gameRoute from "./routes/game.route.js";
import notificationRoute from "./routes/notification.route.js";
import rewardRoute from "./routes/reward.route.js";
import supportRoute from "./routes/supportFaq.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import transactionRoute from "./routes/transaction.route.js";
import participantRoute from "./routes/participant.route.js";

const port = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(express.json());
app.use("/api/admin", adminRoute);
app.use("/api/games", gameRoute);
app.use("/api", notificationRoute);
app.use("/api", rewardRoute);
app.use("/api", supportRoute);
app.use("/api/users", userRoute); 
app.use("/api/auth", authRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/participants", participantRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});