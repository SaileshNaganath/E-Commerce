/**\This file will contain the routing logic for the category controller*/

const {requestValidator,authJwt}= require ("../middlewares");

const categoryController =require ("../controllers/category.controllers")

module.exports=function(app){

    //Route for the POST request to create a category
    app.post ("/ecom/api/v1/categories",[requestValidator.validateCategoryRequest,authJwt.verifyToken,authJwt.isAdmin],categoryController.create);

    //Route for the GET request to fetch all category
    app.get ("/ecom/api/v1/categories",categoryController.findAll);

    //Route for the GET request to fetch a category using category id
    app.get ("/ecom/api/v1/categories/:id",categoryController.findOne);

    //Route for the PUT request to update a category using category id
    app.put ("/ecom/api/v1/categories/:id",[requestValidator.validateCategoryRequest],categoryController.update);
       
    //Route for the DELETE request to delete a category using category id
    app.delete ("/ecom/api/v1/categories/:id",[authJwt.verifyToken,authJwt.isAdmin],categoryController.delete);
}
