import Router from 'express';
import { User } from '../models/users';

const router =Router();

const {addUser}=require('../controllers/bankController');

router.route('/users').post(addUser);

// router.post('/users', async (req,res)=>{
//     try{
//         const user=new User(req.body);
//         await user.save();
//         res.status(201).json({
//             success:true,
//             data:user
//         });
//     } catch (error) {
//         res.status(400).json({ error: (error as Error).message });
//     }
    
// });

export default router;