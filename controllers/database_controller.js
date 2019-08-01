const QuestionSchema = require("./../database/schemas/QuestionSchema");

// Simple call to get the enums from the schema to make site more dynamic // 
const index = (req, res) => {
    return res.json({
        categories: QuestionSchema.obj.category.enum,
        images: QuestionSchema.obj.image.enum
    });
};

module.exports = {
    index
};