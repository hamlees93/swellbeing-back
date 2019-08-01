// Questions are set with description, category and image. Aim is to make site dynamic enough, that an update in enums here, will change all dropdown menus etc on the front end...not there yet //

const { Schema } = require("mongoose");

const QuestionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["physical", "mental", "emotional", "social"] 
  },
  image: {
    type: String,
    required: true,
    enum: ["Caterpillar","Smileys","Clouds","Unicorn","Stars","Snowman","Slider"]
  }
}); 

module.exports = QuestionSchema;