import express from 'express';
import { adminLogin, adminLogout, allChats, allmessages, allusers, getAdminData, getDashboardStats } from '../controllers/admin.js';
import { isAdmin } from '../middlewares/auth.js';

const  router = express.Router();
router.use(isAdmin);

router.get('/')
router.post('/verify',adminLogin);
router.get('/logout', adminLogout);
router.get('/get-admin-data',getAdminData)
router.get('/users',allusers);
router.get('/chat',allChats);
router.get('/message',allmessages);
router.get('/stats', getDashboardStats);
// ongoing
// router.get('/services', getAllServices);

export default router;
