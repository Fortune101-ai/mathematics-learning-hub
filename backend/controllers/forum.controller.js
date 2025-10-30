import ForumPost from "../models/ForumPost.js";
const getAllPosts = async (req, res) => {
    try {
        const {topic, search} = req.query;
        const query = {}

        if (topic) query.topic = topic;

        if (search) {
            query.$or = [
                {title: {$regex: search, $options:"i"}},
                {content:{$regex:search, $options:"i"}}
            ];
        }

        const posts = (await ForumPost.find(query)).sort("-createdAt");
        res.json({success:true,data:posts})
    }catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
    }

}

const createPost = async (req,res)=>{
    try {
        const {title,content,topic,anonymous} = req.body;

        const post = await ForumPost.create({
            title,
            content,
            topic,
            authorId: anonymous ? null : req.user._id,
            authorName: anonymous ? 'Anonymous' : req.user.name,
        })

        res.status(201).json({success:true,data:post})
    }catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
    }
}

const getPostById = async (req,res)=>{
    try {
        const post = await ForumPost.findByIdAndUpdate(req.params.id,{$inc:{views:1}},{new:true});

        if(!post){
            return res.status(404).json({success:false,message:"Post not found"})
        }

        res.json({success:true,data:post})
    }catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
    }
}

const addReply = async (req,res) => {
    try {
        const {content,anonymous} = req.body;

        const post = await ForumPost.findById(req.params.id);

        if(!post){
            return res.status(404).json({success:false,message:"Post not found"})
        }

        post.replies.push({
            content,
            authorId: anonymous ? null : req.user._id,
            authorName: anonymous ? 'Anonymous' : req.user.name,
        });

        await post.save();

        res.status(201).json({success:true,data:post});
    }catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
    }
}

const votePost = async (req, res) => {
  try {
    const { vote } = req.body; 
    const post = await ForumPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: vote } },
      { new: true }
    );

    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
    getAllPosts,
    createPost,
    getPostById,
    addReply,
    votePost
}