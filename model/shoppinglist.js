let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let shoppingList = new Schema({
    title:{type: String, default:'Shopping List'},
    products:[{type: ObjectId, ref:'Product'}]
});

module.exports = mongoose.model('ShoppingList', shoppingList);