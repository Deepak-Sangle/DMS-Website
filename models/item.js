const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    img : {
        data : Buffer,
        contentType : String,
        // required : true,
    },
    description : {
        type : Array,
        required : true,
    },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;