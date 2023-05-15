/**
 * this file will be used to represent the category schema
 * 
 * Category Fields:
 * 
 * 1.name
 * 2.description
 * 3.cost
 */







module.exports = (sequelize, Sequelize) => {

const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },{
        tableName: "products"
    })

    return Product;
}