import express from 'express';
import { allChats, allmessages, allusers, getAdminData, getDashboardStats } from '../controllers/admin';
import { isAdmin } from '../middlewares/auth';

const  router = express.Router();

router.get('/')

router.post('/verify',adminLogin);

router.get('/logout', adminLogout);

router.use(isAdmin);
router.get('/',getAdminData)
router.get('/users',allusers);
router.get('/chat',allChats);
router.get('/message',allmessages);
router.get('/stats', getDashboardStats);
// ongoing
router.get('/services', getAllServices);

export default router;
