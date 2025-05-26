/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load member's controller */
const orderController = require(`../controllers/order.controller`)

/** create route to add new order using method POST */
app.post("/", orderController.addOrdering)

/** create route to update order
 * using method PUT and define paramater for "id" */
app.put("/:id", orderController.updateOrdering)

/** method DELETE */
app.delete("/:id", orderController.deleteOrdering)

/** create route to show all member using method GET */
app.get("/", orderController.getOrder)


/** export app in order to load in another file */
module.exports = app
