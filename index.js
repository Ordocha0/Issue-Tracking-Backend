import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from './Utils/db.js';
import path from 'path';
import pinoHttp from 'pino-http';
const PORT = process.env.PORT || 3001;
import './Models/index.js';
import { logger } from './Utils/logger.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use(pinoHttp({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
}));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello World!")
})


import userRouter from './Routes/User.route.js'

app.use('/user', userRouter)



app.listen(PORT, async () => {
  try {
    const log = logger.child({});

    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
    log.info("Models synced...");
    log.info(`Server running on port ${PORT}`);
  } catch (error) {
    log.error("Database error:", error);
  }
});
