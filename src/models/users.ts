import mongoose, {Schema,Document} from 'mongoose';

export interface IUser extends Document{

    firstname:string,
    lastname:string,
    dateOfBirth:Date,
    gender:string,
    contactNumber:string,
    city:string,
    state:string,
    aadharNum?:string,
    panNum?:string,
    status:string,
    username:string,
    emailid:string,
    income?:Number

}

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'Please enter firstname']
    },
    lastname:{
        type:String,
        required:[true,'Please enter lastname']
    },
    dateOfBirth:{
        type:Date,
        required:[true,'Please enter DOB']
    },
    gender:{
        type:String,
        required:[true,'Please enter gender']  
    },
    contactNumber:{
        type:String,
        required:[true,'Please enter your contact number'],
        unique: true,
    },
    city:{
        type:String,
        required:[true,'Please enter your city']  
    }, 
    state:{
        type:String,
        required:[true,'Please enter your state']  
    }, 
    aadharNum: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    panNum: { 
        type: String,
        unique: true,
        sparse: true
    },
    status:{
        type:String,
        default:"NotApproved"
    },
    username:{
        type:String,
        required:[true,"Please enter your username"],
        unique: true,
    },
    emailid:{
        type:String,
        required:[true, "Please enter your emailid"],
        unique: true,
    },
    income:{
        type:Number,
        required:false  
    }},
    {
        timestamps:true
    });

    export const User= mongoose.model<IUser>('User',userSchema);