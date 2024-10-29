import Router from 'express';
import { User } from '../models/users';
import { addUser,
         getUsers,
        getUser, 
        updateUser, 
        deleteUser} from '../controllers/bankController';

const router =Router();

router.route('/users/new').post(addUser);
router.route('/users').get(getUsers);
router.route('/users/:id').get(getUser);
router.route('/users/:id').put(updateUser);
router.route('/users/:id').delete(deleteUser);






export default router;