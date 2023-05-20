
/**
* This file will be used for the following purpose: 
*
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through the file. 
* 
* One of the advantages of using index.js file is, other file
* trying to import this file, just need to provide the
* module name.
*
*/

const config =require("../configs/db.config");
const Sequelize =require ("sequelize");

/**
 * Creating DB Connection
 */

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect
    }

);
/**
 * db={
 * Sequelize;
 * sequelize;
 * category;
 * }
 */

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.model.js")(sequelize,Sequelize);
db.product = require("./product.model.js")(sequelize,Sequelize);

db.user=require("./user.model.js")(sequelize,Sequelize);
db.role=require("./role.model.js")(sequelize,Sequelize);

db.cart=require("./cart.model")(sequelize,Sequelize);

//Establish relationship with user and role

db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignKey:"roleid",
})

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userid",
})

/**
 * Establish relationship between cart and products:Many to Many
 */

db.cart.belongsToMany(db.product,{
    through:"cart_products",
    foreignKey:"cartid",
})

db.product.belongsToMany(db.cart,{
    through:"cart_products",
    foreignKey:"productid",
})

/**
 * Relationship between cart and user
 */

db.user.hasMany(db.cart);

db.ROLES=["user","admin"]
module.exports = db;