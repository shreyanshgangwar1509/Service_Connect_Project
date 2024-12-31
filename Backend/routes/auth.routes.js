import express from 'express';
import { getProfile, Login, logoutUser, SignUp, verifyemail } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { singleAvatar } from '../middlewares/multer.js';

const  router = express.Router();


router.post('/signup', SignUp);

router.post('/login', Login);
router.post('/verifyemail', verifyemail);
// now user should be logged in 
// router.use(isAuthenticated); after this all routes usees is authenticated auto amtically 
router.get('/me', isAuthenticated, getProfile);
router.get('/logout', isAuthenticated, logoutUser);

export default router;