import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Something is wrong with email').isEmail(),
    body('password', 'Something is wrong with password').isLength({ min: 5 }),
    body('fullName', 'Something is wrong with name').isLength({ min: 2 }),
    body('avatarUrl', 'Something is wrong with avatar url').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Something is wrong with email').isEmail(),
    body('password', 'Something is wrong with password').isLength({ min: 5 }),
];

export const postCreateValidation = [
    body('title', 'Write title of your post').isLength({ min: 3 }).isString(),
    body('text', 'Write text of your post').isLength({ min: 3 }).isString(),
    body('tags', 'There is problem with tags.').optional().isString(),
    body('imageUrl', 'Something is wrong with url').optional().isString(),
];


export const commentsCreateValidation = [
    body('text', 'Write your comment').isLength({ min: 2 }).isString(),
];