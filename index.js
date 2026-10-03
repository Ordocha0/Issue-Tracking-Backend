import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from './Utils/db.js';
import path from 'path';
const PORT = process.env.PORT || 3001;
import './Models/index.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello World!")
})


import userRouter from './Routes/User.route.js'

app.use('/user', userRouter)



app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
    console.log("Models synced...");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database error:", error);
  }
});
