const mongoose = require('mongoose');

const {item_tags, item_size, special_type} = require('../constants');

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
    },
    description : {
        type : Array,
        required : true,
    },
    tag : {
        type : String,
        enum : item_tags
    },
    availability : {
        type : Boolean,
    },
    available_quantatity : {
        type : Number
    },
    size : {
        type : String,
        enum : item_size,
    },
    pages : {
        type : Number,
    },
    special_type : {
        type : String,
        enum : special_type,
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;