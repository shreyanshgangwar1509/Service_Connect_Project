import express from 'express';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, LeaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { AttachmentMulter } from '../middlewares/multer.js';


const  router = express.Router();

router.use(isAuthenticated);
router.post('/new', newGroupChat);
router.get('/my', getMyChat);
router.get('/my/groups', getMyGroups);
router.put('/addmembers', addMembers);
router.put('/removemember', removeMembers);
router.delete('/leave/:id',LeaveGroup)
// attachments
router.post('/message',AttachmentMulter,sendAttachment)
// get message
router.get('/message/:id', getMessages);
// get chat details
router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)

export default router;
