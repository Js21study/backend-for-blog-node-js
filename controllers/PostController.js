import PostModel from '../models/Posts.js'

export const getAll = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec(); 

      res.json(posts);
   } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'There is a problem with creating a post!'
      });
   }
}

// export const getOne = async (req, res) => {
//    try {
//       const postId = req.params.id;
//       PostModel.findOneAndUpdate(
//       {
//          _id: postId,
//       }, 
//       {
//          $inc: { viewsCount: 1},
//       },
//       {
//          returnDocument: 'after',
//       },
//       (err, doc) => {
//          if (err) {
//             console.log(err);
//             return res.status(500).json({
//                 message: 'It is impossible to return a post!'
//             });
//          }

//          if (!doc) {
//             return res.status(404).json({
//                message: 'This post is undefinded'
//             });
//          }

//          res.json(doc);
//       },
//     );
      

//    } catch (error) {
//       console.log(error);
//       res.status(500).json({
//           message: 'Do not have access to posts!'
//       });
//    }
// }

export const getOne = async (req, res) => {


         const postId = req.params.id;
      PostModel.findOneAndUpdate(
                  {
                     _id: postId,
                  }, 
                  {
                     $inc: { viewsCount: 1},
                  },
                  {
                     returnDocument: 'after',
                  }
      )
     .then(
      (doc) => {
         if (!doc) {
            return res.status(404).json({
               message: 'This post is undefinded'
            });
         }

         res.json(doc);
       }
      );
}


export const remove = async (req, res) => {


         const postId = req.params.id;
      PostModel.findOneAndDelete(
                  {
                     _id: postId,
                  }
      )
     .then(
      (doc) => {
         if (!doc) {
            return res.status(404).json({
               message: 'This post is undefinded'
            });
         }

         res.json({
            success: true,
         });
       }
      );
}


export const update = async (req, res) => {


   const postId = req.params.id;
PostModel.updateOne(
            {
               _id: postId,
            }, 
            {
               title: req.body.title,
               text: req.body.text,
               imageUrl: req.body.imageUrl,
               tags: req.body.tags,
               user: req.userId,
            }
)
.then(
(doc) => {
   if (!doc) {
      return res.status(500).json({
         message: 'It is impossible to update a post!'
      });
   }

   res.json({
      success: true,
   });
 }
);
}


export const create = async (req, res) => {
   try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save()
    res.json(post);
   } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'There is a problem with creating a post!'
      });
   } 
}