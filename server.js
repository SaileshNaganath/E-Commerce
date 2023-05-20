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
const Product = db.product;
const Role=db.role;

Category.hasMany(Product); //This will create a foreign key column (categoryID)
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

    /**
     * adding roles
     */

    Role.create({
        id:1,
        name:"user"
    });
    Role.create({
        id:2,
        name:"admin"
    })
    
}

require ('./routes/category.routes')(app)
require ('./routes/product.routes')(app)
require('./routes/auth.routes')(app)
require('./routes/cart.routes')(app)

app.listen (serverConfig.PORT,()=>{
    console.log(`Application is listening in port: ${serverConfig.PORT}`);
});