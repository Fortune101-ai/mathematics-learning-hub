import Topic from '../models/Topic.js';
const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('chapters').sort('order');
        res.json({ success: true, data: topics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).populate('chapters');
        if (!topic) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }
        res.json({ success: true, data: topic });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { getAllTopics, getTopicById };