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

export const getAllNew = async (req, res) => {
   try {
      const posts = await PostModel.find().sort("createdAt").populate('user').exec(); 
      posts.reverse();

      res.json(posts);
   } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'There is a problem with getting new posts!'
      });
   }
}


export const getAllPopular = async (req, res) => {
   try {
      const posts = await PostModel.find().sort({"viewsCount" : -1}).populate('user').exec(); 

      res.json(posts);
   } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'There is a problem with getting popular posts!'
      });
   }
}


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
      ).populate('user')
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
               tags: req.body.tags.split(','),
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
      tags: req.body.tags.split(','),
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


export const getLastTags =  async (req, res) => {
   try {
      const posts = await PostModel.find().limit(5).exec(); 
      const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
      res.json(tags);
   } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'There is a problem with creating a post!'
      });
   }
}


export const getTagsByName =  async (req, res) => {
   const tagName = req.params.name;
   try {
      const posts = await PostModel.find().exec(); 
      //  const tags = posts.map(el => el.tags )
      //  const tagsAll = [].concat(...tags);
    
      const postsWithTag = posts.filter(el => el.tags.includes(tagName) )
     
      res.json(postsWithTag);
   } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'There is a problem with getting tags!'
      });
   }
}


