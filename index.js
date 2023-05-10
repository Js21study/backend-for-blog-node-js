import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import {registerValidation, loginValidation, postCreateValidation, commentsCreateValidation} from './validations.js'
import { UserController, PostController, CommentsController } from './controllers/index.js';

import handleValidationErrors from './utils/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js'

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('db is launched')
).catch((err)=> console.log('db error', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if(!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());

app.use(cors())

app.use('/uploads', express.static('uploads'));



app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register );

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

app.get('/auth/me', checkAuth, UserController.getMe );

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts/tags', PostController.getLastTags );

// 
app.get('/posts/tags/:name', PostController.getTagsByName );
app.get('/posts/new', PostController.getAllNew);
app.get('/posts/popular', PostController.getAllPopular );
//
app.get('/posts', PostController.getAll );
app.get('/posts/:id', PostController.getOne );
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create );
app.delete('/posts/:id', checkAuth, PostController.remove );
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update );



app.get('/comments/:idPost', CommentsController.getAllCommentsForPost );
app.get('/comments', CommentsController.getAllComments );
app.post('/comments/:idPost', checkAuth, commentsCreateValidation, handleValidationErrors, CommentsController.createComment );


app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server work');
});