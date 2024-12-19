import multer from 'multer';

export const multerupload = multer({
    limits: {
        fileSize:1024*1024*5,
    }
});

export const singleAvatar = multerupload.single("avatar");

export const AttachmentMulter = multerupload.array("files",5);