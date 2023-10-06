const { CLIENT_PORT } = require("../shared/common")

const services_tags = {
    REGISTOR : "REGISTOR",
    RUBBER_STAMP : "RUBBER_STAMP",
    XEROX : "XEROX",
    LETTER_HEADS : "LETTER_HEADS",
    STATIONERY : "STATIONERY",
    SPIRAL_BINDING : "SPIRAL_BINDING",
    DIGITAL_BOARDS : "DIGITAL_BOARDS",
    OFFSET_PRINTING : "OFFSET_PRINTING",
    DTP : "DTP",
}

const font_styles = {
    PRIMARY_FONT : "Segoe UI",
    HEADING_FONT : "Lucida Grande",
    PRIMARY_COLOR : "black",
    SECONDARY_COLOR : "white",
}

const item_tags_obj = {
    REGISTOR : 'REGISTOR',
    PRAMANPATRA : 'PRAMANPATRA',
    PAVTI_BOOK : 'PAVTI_BOOK', 
    STAMP: 'STAMP',
    STATIONERY_ITEMS : 'STATIONERY_ITEMS', 
    LETTER_HEADS : 'LETTER_HEADS', 
    DIGITAL_BOARDS :'DIGITAL_BOARDS',
}

const item_special_type_obj = {
    NONE : 'NONE', 
    GHARPATTI : 'GHARPATTI', 
    PANIPATTI : 'PANIPATTI', 
    CHOTTA_SHIKKA : 'CHOTTA_SHIKKA', 
    MOTHA_SHIKKA : 'MOTHA_SHIKKA', 
    EKATRA : 'EKATRA', 
    PERSONALLIZED_REGISTOR : 'PERSONALLIZED_REGISTOR'
}

const item_size_obj = {
    NA : 'NA',
    SMALL : 'SMALL',
    BIG : 'BIG'
}

const convert_obj_to_arr = (obj)=> {
    const arr = [];
    for(const key in obj){
        arr.push(obj[key]);
    }
    return arr;
}

const item_tags = convert_obj_to_arr(item_tags_obj);
const item_size = convert_obj_to_arr(item_size_obj);
const item_special_type = convert_obj_to_arr(item_special_type_obj);

const CLIENT_BASE_URL = (process.env.NODE_ENV === "production") ? "https://www.deepak-multi-services.com/" : `http://localhost:${CLIENT_PORT}`;

module.exports = { services_tags, font_styles, item_tags, item_tags_obj, item_size, item_size_obj, item_special_type, item_special_type_obj, CLIENT_BASE_URL }