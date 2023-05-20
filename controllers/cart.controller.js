const db= require("../models");
const Product = db.product;
const Cart=db.cart;
const Op = db.Sequelize.Op;

exports.create=(req,res)=>{
    const cart = {
        userID:req.userID //we are getting this id from middleware
    };

    Cart.create(cart)
    .then(cart=>{
        res.status(201).send(cart);
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal server error happened"
        })
    })
}

exports.update = (req,res)=>{

    const cartID = req.params.id;
    
    Cart.findByPk(cartID)
    .then(cart=>{
        Product.findAll({
            where:{
                id:req.body.productIDs
            }
        })
        .then(items=>{
            if(!items){
                res.status(400).send({
                    message:"Items trying to add does not exist"
                })
            }
            cart.setProducts(items)
            .then(()=>{
                var cost =0;
                const ProductSelected =[];
                cart.getProducts().then(products=>{
                    for(i=0;i<products.length;i++){
                        cost = cost + products[i].cost;
                        ProductSelected.push({
                            id:products[i].id,
                            name:products[i].name,
                            cost:products[i].cost
                        });
                    }

                    res.status(200).send({
                        id:cart.id,
                        productSelected:ProductSelected,
                        cost:cost
                    })
                })
            })
        })
        .catch(err=>{
            res.status(500).send({
                message:"Some internal server error happened while fetching Product details"
            })
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some internal server error happened while fetching Cart details"
        })
    })
}

exports.getCart=(req,res)=>{
    Cart.findByPk(req.params.cartID).then(cart=>{
        var cost=0;
        const ProductSelected =[];
                cart.getProducts().then(products=>{
                    for(i=0;i<products.length;i++){
                        cost = cost + products[i].cost;
                        ProductSelected.push({
                            id:products[i].id,
                            name:products[i].name,
                            cost:products[i].cost
                        });
                    }

                    res.status(200).send({
                        id:cart.id,
                        productSelected:ProductSelected,
                        cost:cost
                    })
                })
    })
}