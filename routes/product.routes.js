/**\This file will contain the routing logic for the product controller*/

const {requestValidator} = require("../middlewares")
const productController = require ("../controllers/product.controllers")

module.exports =function(app){

    app.post("/ecom/api/v1/products",[requestValidator.validateProductRequest],productController.create);

    app.get("/ecom/api/v1/products",productController.findAll);

    app.get("/ecom/api/v1/products/:id",productController.findOne);

    app.put("/ecom/api/v1/products/:id",[requestValidator.validateProductRequest],productController.update);

    app.delete("/ecom/api/v1/products/:id",productController.delete);

    app.get("/ecom/api/v1/categories/:categoryID/products",productController.getProductsUnderCategory);
}