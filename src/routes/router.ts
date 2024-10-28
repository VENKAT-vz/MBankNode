import Router from 'express';
import { User } from '../models/users';

const router =Router();

const {addUser}=require('../controllers/bankController');

router.route('/users').post(addUser);


export default router;