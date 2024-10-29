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
        const users = await User.find();

        res.status(200).json({
            success: true,
            results: users.length,
            data: users
        });
    }catch(error){
        res.status(500).json({ message: 'Error finding users.', error });
    }
};

export const getUser =async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = await User.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: user
        });
    }catch(error){
        res.status(500).json({ message: `Error finding the user with id ${req.params.id}`, error });
    }
};

export const updateUser =async(req:Request,res:Response,next:NextFunction)=>{
    try{
        // const user = await User.findById(req.params.id);

        // if (!user) {
        //     return next(new ErrorHandler('user not found', 404));
        // }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            data: user
        });
    }catch(error){
        res.status(500).json({ message: `Error finding the user with id ${req.params.id}`, error });
    }
};

export const deleteUser =async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const user =  await User.findByIdAndDelete(req.params.id);
       if(user){
        const login = await Login.findOneAndDelete({username:user.username});
       }
        res.status(200).json({
            success: true,
            message:`user with user id ${req.params.id} is successfully deleted along with the login cred too`});
    }catch(error){
        res.status(500).json({ message: `Error finding the user with id ${req.params.id}`, error });
    }
};


