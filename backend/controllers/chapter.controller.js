import Chapter from "../models/Chapter.js";
import logger from "../config/logger.js";

const getChapterById = async (req,res) => {
    try {
        const {id} = req.params;
        const chapter = await Chapter.findById(id).populate('quiz');

        if (!chapter){
            return res.status(404).json({
                success:false,
                message: "Chapter not found"
            });
        }

        return res.status(200).json({
            success:true,
            data: chapter
        });
    } catch (error) {
        logger.error(`Error fetching chapter by ID: ${error.message}`);
        return res.status(500).json({
            success:false,
            message: "Server Error"
        });
    }
}