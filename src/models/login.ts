import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

export interface ILogin extends Document {
    username: string;
    emailid: string;
    password: string;
    role: string;
}

const loginSchema: Schema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true 
    },
    emailid: {
        type: String, 
        required: true, 
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: { 
        type: String, 
        required: true,
        minlength: [8, 'Your password must be at least 8 characters long'], 
        select: false
    },
    role: { 
        type: String, 
        required: true 
    },
});

// Pre-save middleware to hash the password
loginSchema.pre<ILogin>('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); 
    }
    
    try {
        const saltRounds = 10; // You can adjust the salt rounds based on your security needs
        this.password = await bcrypt.hash(this.password, saltRounds);
        next(); // Proceed to save
    } catch (error) {
        next(error as Error); 
    }
});

// Method to compare password
loginSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Login = mongoose.model<ILogin>('Login', loginSchema);

export default Login;
