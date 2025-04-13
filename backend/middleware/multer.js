import multer from "multer";
// ou're importing the multer library — a Node.js middleware for handling multipart/form-data, which is mainly used for uploading files.
const storage=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
})
// You're telling multer how and where to store uploaded files on disk.
// diskStorage() is a method provided by multer to customize storage behavior.
// It takes a config object where you define:
// filename: how the file should be named when saved
// (optionally) destination: where to save the file (e.g., ./uploads/)

const upload=multer({storage})

export default upload;