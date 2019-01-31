let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let db = mongoose.connect('mongodb://localhost/lbri-shop', { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let Product = require('./model/product');
let ShoppingList = require('./model/shoppinglist');

app.post('/product', function(request, response) {
    let product = new Product();
        product.title = request.body.title;
        product.price = request.body.price;
        product.imgUrl = request.body.imgUrl;
        product.save(function (err, savedProduct) {
            if (err) {
                response.status(500).send({error: "Could not save product"});
            } else {
                response.send(savedProduct);
            }
        });
});

app.get('/product', function(request, response) {
    product.find({}, function(err, products) {
        if (err) {
            response.status(500).send({error: "Products not found"});
        } else {
            response.send(products);
        }
    });
});

app.post('/shoppinglist', function(request, response){
   let shoppingList = new ShoppingList();
    shoppingList.title = request.body.title;
    shoppingList.save(function (err, savedShoppingList) {
        if (err) {
            response.status(500).send({error: "Shopping list not saved"});
        } else {
            response.send(savedShoppingList);
        }
    })
});

app.get('/shoppinglist', function (request, response) {
    shoppingList.find({}).populate({path: 'products', model:'Product'}).exec(function (err, shoppingLists ) {
        if (err) {
            response.status(500).send({error: 'Shopping List not found'})
        } else {
            response.send(shoppingLists);
        }
    })
})

app.put('/shoppinglist', function (request, response) {
    product.findOne({_id: request.body.productId}, function (err, product) {
     if (err) {
         response.status(500).send({error:"Product not found"})
     }  else {
         ShopplingList.update({_id: request.body.shoppingListId}, {$addToSet: {products: product._id}}, function (err, updatedShoppingList) {
             if (err) {
                 response.status(500).send({error: "Shopping list not updated"});
             } else {
                 response.send(updatedShoppingList);
             }
         })
     }
    })
})

app.listen(3001, function() {
    console.log("API running on port 3001");
});