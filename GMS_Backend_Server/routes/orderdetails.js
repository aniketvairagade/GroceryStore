
//Select OrderDetails.OrderID,Products.ProductName,OrderDetails.Quantity from OrderDetails inner join Products on Products.ProductID=OrderDetails.OrderDetailID inner join Orders on  Orders.OrderID=OrderDetails.OrderID and Orders.CustomerID=1;
const mysql = require('mysql2');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const app = express.Router();

// app.use(bodyParser.json());

const connectionDetails = {
    host: config.get("host"),
    database: config.get("database"),
    port: config.get("serverport"),
    user: config.get("user"),
    password: config.get("password")
};

// GET all orders and order items by customerid
app.get("/all/:cid", (request, response) => {

   let CustomerID = request.params.cid;

    let queryText = `Select OrderDetails.OrderID,Products.ProductName,OrderDetails.Quantity from OrderDetails inner join Products on Products.ProductID=OrderDetails.ProductID inner join Orders on Orders.OrderID=OrderDetails.OrderID and Orders.CustomerID=${CustomerID}`;

    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result) => {
        response.setHeader("content-Type", "application/json");
        if (err == null) {
            response.write(JSON.stringify(result));
        } else {
            response.write(JSON.stringify({error: err}));
        }
        connection.end();
        response.end();
    });
});

// Add order item into order details table for a particular order
app.post("/addorderitem/:oid/:pid", (request, response) => {

    let orderID = request.params.oid;
    let productID =request.params.pid
    let {Quantity,UnitPrice,Discount}=request.body;
   
    let queryText = `INSERT INTO OrderDetails(OrderID,ProductID,Quantity,UnitPrice,Discount)
    VALUES(${orderID},${productID},${Quantity},${UnitPrice},${Discount} )`;

    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result) => {
        response.setHeader("content-Type", "application/json");
        if (err == null) {
            response.write(JSON.stringify(result));
        } else {
            response.write(JSON.stringify(err));
        }
        connection.end();
        response.end();
    });
});




app.post("/copyorderitem/:oid/:cid", (request, response) => {

    let orderID = request.params.oid;
    let customerID =request.params.cid
    let {Quantity,UnitPrice,Discount}=request.body;
   
    let queryText = `INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice, Discount)
SELECT 
    ${orderID} AS OrderID,  
    Products.ProductID,
    CartItems.Quantity,
    Products.UnitPrice,
    0.00 AS Discount 
FROM 
    CartItems
INNER JOIN 
    Cart ON Cart.CartID = CartItems.CartID
INNER JOIN 
    Products ON Products.ProductID = CartItems.ProductID
INNER JOIN 
    Customers ON Cart.CartID = CartItems.CartID AND Cart.CustomerID = Customers.CustomerID
WHERE 
    Customers.CustomerID = ${customerID};
`;

    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result) => {
        response.setHeader("content-Type", "application/json");
        if (err == null) {
            response.write(JSON.stringify(result));
        } else {
            response.write(JSON.stringify(err));
        }
        connection.end();
        response.end();
    });
});



// // Remove an cart item
// app.delete("/:id", (request, response) => {
//     let CartID = request.params.id;

//     let queryText = ``;

//     let connection = mysql.createConnection(connectionDetails);
//     connection.query(queryText, (err, result) => {
//         response.setHeader("content-Type", "application/json");
//         if (err == null) {
//             response.write(JSON.stringify(result));
//         } else {
//             response.write(JSON.stringify({error: err}));
//         }
//         connection.end();
//         response.end();
//     });
// });

module.exports = app;
