/**
 * This file contains the controller logic for the category resource.
 * Every time a CRUD request come for the category,methods defined in this Controller file wil be executed
 */
const { category } = require("../models")
const db = require("../models");
const Category = db.category;

/**
 * POST:Create and save a new category
 */

/**
 * Creation of the category object to be stored in db
 */
exports.create=(req,res)=>{
let category={
    name:req.body.name,
    description:req.body.description
};

Category.create(category)
.then(category=>{
    console.log(`Category Name: ${category.name} got inserted `)
    res.status(201).send(category);
})
.catch(err=>{
    console.log(`Issue in inserting category name: ${category.name} `)
    console.log(`Error Message: ${err.message}`)
    res.status(500).send({
        message:"Some internal error while storing the category"
    })
})
}
/**
 * GET:Get the list of all categories
 */


exports.findAll =(req,res)=>{
    let categoryName = req.query.name;
    let promise;
    if(categoryName){
        promise=Category.finAll({
            where:{
                name:categoryName
            }
        });
    }else{
        promise=Category.findAll();
    }


promise
.then(categories=>{
    res.status(200).send(categories);
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
    let categoryID = req.params.id;

    Category.findByPk(categoryID)
    .then(category=>{
        res.status(200).send(category);
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
    const category={
        name:req.body.name,
        description:req.body.description
    };

    const categoryID =req.params.id;

    Category.update(category,{
        where:{id:categoryID}
    })
    .then (updateCategory=>{
        //Where the updation happened successfully
        //You need to send the updated row to the table.
        //But while fetching that row and sending it to user there can be error.

        Category.findByPk(categoryID)
        .then(category=>{
            res.status(200).send(category);
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
    const categoryID = req.params.id;

    Category.destroy({
        where:{
            id:categoryID
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