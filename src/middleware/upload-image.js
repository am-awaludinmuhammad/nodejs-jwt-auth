import multer from "multer";

const multerSetup = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

      return storage;
}

const uploadImage = {
    single: (file) => {
        const upload = multer({ storage: multerSetup() });
        return upload.single(file);
    },
    multiple: (files) => {
        const upload = multer({ storage: multerSetup() });
        return upload.array(files);
    }
}

export {
    uploadImage,
}