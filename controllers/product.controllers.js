/**
 * This file will contain the logic for the product resource.
 * Every time any CRUD req come for the product, methods defined in this connect fille will be executed.
 */
const {product}=require("../models");
const db= require("../models");
const Product =db.product;

/**
 * Create and save a new product
 */

exports.create =(req,res)=>{
    /**
     * Validation of request body
     */
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the product can't be empty"
        })
        return;
    }

    if(!req.body.cost){
        res.status(400).send({
            message:"Cost of the product can't be empty"
        })
        return;
    }  
}  


exports.create=(req,res)=>{
    let product={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost
    };

    Product.create(product)
    .then(product=>{
        console.log(`Product Name: ${product.name} got inserted in db`);
        res.status(201).send(product);
    })
    .catch (err =>{
        console.log(`Issue in inserting product name: ${product.name}`);
        console.log(`Error Message: ${err.message}`)
        res.status(500).send({
            message:"Some Internal error while storing the product"
        })
    })
}

/**
 * GET:Get the list of all products
 */


exports.findAll =(req,res)=>{
    let productName = req.query.name;
    let promise;
    if(productName){
        promise=Product.finAll({
            where:{
                name:productName
            }
        });
    }else{
        promise=Product.findAll();
    }


promise
.then(products=>{
    res.status(200).send(products);
})
.catch(err=>{
    res.status(500).send({
        message:"Some internal error while fetching the categories"
    });
})
}

/**
 * GET:Get the category based on id
 */

exports.findOne=(req,res)=>{
    let productID = req.params.id;

    Product.findByPk(productID)
    .then(product=>{
        res.status(200).send(product);
    })
    .catch(err=>{
        res.send(500).send({
            message:"Some internal error while Fetching category based on ID"
        })
    })
}

/**
 * Update the existing category
 */

exports.update=(req,res)=>{

    if(!req.body.name){
        res.status(400).send({
            message:"Name of the Product cannot be empty"
        })
    }

    if(!req.body.cost){
        res.status(400).send({
            message:"Cost of the Product cannot be empty"
        })
    }
    const product={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost
    };

    const productID =req.params.id;

    Product.update(product,{
        where:{id:productID}
    })
    .then (updateProduct=>{
        //Where the updation happened successfully
        //You need to send the updated row to the table.
        //But while fetching that row and sending it to user there can be error.

        Product.findByPk(productID)
        .then(product=>{
            res.status(200).send(product);
        })
        .catch(err=>{
            res.status(500).send({
                message:"Some Internal Error wHile Fetching the request"
            })
        })
    })
    .catch(err=>{
        //where the update task failed
        res.status(500).send({
            message:"Some Internal Error wHile Updating the request"
        })
    })
}

/** Delete the existing category */

exports.delete =(req,res)=>{
    const productID = req.params.id;

    Product.destroy({
        where:{
            id:productID
        }
    })
    .then(result=>{
        res.status(200).send({
            message:"Successfully deleted the category"
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some Internal Error while deleting Category based on ID"
        })
    })
}