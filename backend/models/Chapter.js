import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true,
    },
    topicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    content:{
        videoUrl:String,
        notes:String,
        examples:[String],
    },
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz',
    }
}, { timestamps: true });

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;