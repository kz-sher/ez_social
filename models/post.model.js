const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   post_id: {
      type: Number,
      index: true,
      unique: true
   },
   description: {
      type: String,
      required: true
   },
   author: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   },
   image: {
      url: {
         type: String,
         required: true
      },
      filename: {
         type: String,
         required: true
      },
      imageId: {
         type: String,
         required: true
      }
   }
});

// initialize auto increment plugin based on connection
autoIncrement.initialize(mongoose.connection); 
PostSchema.plugin(autoIncrement.plugin, { 
   model: 'Post', 
   field: 'post_id',
   startAt: 1
});

module.exports = mongoose.model('Post', PostSchema)