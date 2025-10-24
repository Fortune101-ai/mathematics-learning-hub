import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim:true,
    },
    description: {
        type:String,
        required:true,
    },
    order:{
        type:Number,
        required:true,
    },
    chapters:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chapter",
        }
    ]
},{
    timestamps:true,
})

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;