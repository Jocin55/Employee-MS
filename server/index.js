import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'





import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';

dotenv.config(); // ✅ load environment variables first
connectToDatabase(); // ✅ now connect to Mongo

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
