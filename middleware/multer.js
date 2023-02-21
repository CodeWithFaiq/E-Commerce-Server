const multer=require('multer');

const Storage=multer.diskStorage({
    destination:'Public/Images',
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const uploads=multer({
    storage:Storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == 'image/jpeg' || file.mimetype== 'image/png' ){
            return cb(null,true);
        }
        else{
            return cb(new Error('Invalid File Formate, Please Select Again.'),false);
        }
    }
})

module.exports=uploads;