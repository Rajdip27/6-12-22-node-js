const mongoose = require("mongoose");
module.exports = mongoose.model("Blog", new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    
    image: {
      type: String,
      required:false
    },
  })
);