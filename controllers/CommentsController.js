import CommentsModel from '../models/Comments.js'

export const getAllCommentsForPost = async (req, res) => {


    const postId = req.params.idPost;
    try {
       const comments = await CommentsModel.find().populate('user').populate('post').exec(); 


     
       const commentsById = comments.filter(el => el.post._id == postId )
      
       res.json(commentsById);
    } catch (error) {
       console.log(error);
       res.status(500).json({
           message: 'There is a problem with getting comments for this post!'
       });
    }

}

export const createComment = async (req, res) => {


    const postId = req.params.idPost;


    try {
        const doc = new CommentsModel({

          text: req.body.text,
          post: postId,
          user: req.userId,
          
         
        });
    
        const comment = await doc.save()
        res.json(comment);
       } catch (error) {
          console.log(error);
          res.status(500).json({
              message: 'There is a problem with creating a comment!'
          });
       } 

}

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentsModel.find().populate('user').populate('post').exec(); 
 
       res.json(comments);
    } catch (error) {
       console.log(error);
       res.status(500).json({
           message: 'There is a problem with creating a post!'
       });
    }
 }