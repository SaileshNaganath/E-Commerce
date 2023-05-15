const express = require ("express");
const serverConfig = require ("./configs/server.config");
const bodyParser = require("body-parser");

//Initalising Express
const app = express();

/**
 * Using the body parser middleware
 * 
 * Used for parsing th request
 * 
 * Parsing the request of the type json and convert that to object
 */

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Initialising the Database
 */

const db=require("./models");
const Category = db.category;

db.sequelize.sync({force:true})
.then(()=>{
    console.log('Tables dropped and created');
    init();
})

function init(){
    var categories =[
        {
            name:"Electronics",
            description: "Electronics Description"
        },
        {
            name:"KitchenItems",
            description:"KitchenItems Description"
        }
    ];
    Category.bulkCreate(categories)
    .then(()=>{
        console.log("Category table initialised");
    })
    .catch(err=>{
        console.log("Error while initialising categories table");
    })
    
}

require ('./routes/category.routes')(app)
require ('./routes/product.routes')(app)

app.listen (serverConfig.PORT,()=>{
    console.log(`Application is listening in port: ${serverConfig.PORT}`);
});