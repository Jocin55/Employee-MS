import multer from "multer"
import path from "path";
import Employee from "../models/Employee.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob, // backend expects dob
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;
     
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, error: "User is already registered" }) // fixed typo
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        })

        const saveUser = await newUser.save()

        const newEmployee = new Employee({
            userId: saveUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        })
        await newEmployee.save()
        return res.status(200).json({success:true, message: "Employee created"})
    }catch(error){
        return res.status(500).json({success: false, error: "Server error in adding employee"}) // fixed typo
    }
}

export { addEmployee, upload }
