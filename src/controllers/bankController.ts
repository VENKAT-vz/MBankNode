import { Request, Response, NextFunction } from 'express';
import catchAsyncError from '../middlewares/catchAsyncError'; // Ensure this path is correct
import {User} from '../models/users';
import ErrorHandler from '../utils/errorhandler';
import Login from '../models/login';

export const addUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { users, password, role } = req.body; 

        const newUser = new User({
            firstname: users.firstname,
            lastname: users.lastname,
            dateOfBirth: new Date(users.dateOfBirth), 
            gender: users.gender,
            contactNumber: users.contactNumber,
            address: users.address,
            city: users.city,
            state: users.state,
            username: users.username,
            emailid: users.emailid,
        });

        await newUser.save();

        const newLogin = new Login({
            username: newUser.username,
            emailid: newUser.emailid,
            password: password, 
            role: role, 
        });

        await newLogin.save();

        res.status(201).json({ message: 'User and login created successfully.' });
    } catch (error) {
        
        res.status(500).json({ message: 'Error creating user or login.', error });
    }
};

export const getUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try{

    }catch(error){
        res.status(500).json({ message: 'Error finding users.', error });
    }
}


