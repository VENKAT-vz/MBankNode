import { Request, Response, NextFunction } from 'express';
import catchAsyncError from '../middlewares/catchAsyncError'; // Ensure this path is correct
import {User} from '../models/users';
import ErrorHandler from '../utils/errorhandler';
import Login from '../models/login';

// export const createUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json({
//         success: true,
//         data: user
//     });
// });

export const addUser = async (req: Request, res: Response) => {
    try {
        const { users, password, role } = req.body; // Correctly destructuring

        // Create new User instance
        const newUser = new User({
            firstname: users.firstname,
            lastname: users.lastname,
            dateOfBirth: new Date(users.dateOfBirth), // Ensure to convert to Date object
            gender: users.gender,
            contactNumber: users.contactNumber,
            address: users.address,
            city: users.city,
            state: users.state,
            username: users.username,
            emailid: users.emailid,
        });

        // Save user to database
        await newUser.save();

        // Create new Login instance
        const newLogin = new Login({
            username: newUser.username,
            emailid: newUser.emailid,
            password: password, // Now this is correctly accessed
            role: role, // Now this is correctly accessed
        });

        // Save login to database
        await newLogin.save();

        res.status(201).json({ message: 'User and login created successfully.' });
    } catch (error) {
        console.error(error); // Log the full error to console
        res.status(500).json({ message: 'Error creating user or login.', error });
    }
};



