import User from "./model/userModel.js";
import bcrypt from "bcrypt";
import connectDB from "./db/db.js";

const userRegister = async () => {
    connectDB();
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gamil.com",
            password: hashPassword,
            role:"admin"

        })
       await newUser.save();
       console.log("Admin was created");   

    } catch (err) {
        console.log("Error in user seeding:", err);

    }
}

userRegister();