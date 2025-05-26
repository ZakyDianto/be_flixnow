const { request, response } = require("express")
const { where, json } = require("sequelize")

/** load model for 'order' table */
const orderModel = require(`../models/index`).order

// Load model for 'details_of_order' table
const { detail_of_order } = require('../models');

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

//create func to add film ordering 
exports.addOrdering = async (request, response) => {
    try {
        let newData = {
            userID: request.body.userID,
            adminID: request.body.adminID,
            date_of_order: request.body.date_of_order,
            status: request.body.status
        };

        let result = await orderModel.create(newData);
        let orderID = result.id;

        let detailsOfOrder = JSON.parse(request.body.details_of_order);

        detailsOfOrder.forEach(item => {
            item.orderID = orderID;
        });

        await detail_of_order.bulkCreate(detailsOfOrder);

        return response.json({
            success: true,
            message: `New Film Ordered has been inserted`
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

//create func for update film ordering
exports.updateOrdering = async (request, response) => {
    try {
        // Siapkan data utama untuk tabel orders
        let newData = {
            userID: request.body.userID,
            adminID: request.body.adminID,
            date_of_order: request.body.date_of_order,
            status: request.body.status
        };

        let orderID = request.params.id;

        // Update data utama
        await orderModel.update(newData, { where: { id: orderID } });

        // Hapus semua detail sebelumnya
        await detailsOfOrderModel.destroy({ where: { orderID: orderID } });

        // Parse data details_of_order (dikirim sebagai string JSON)
        let detailOfOrder = JSON.parse(request.body.details_of_order);

        // Tambahkan orderID ke tiap detail item
        detailOfOrder.forEach(item => {
            item.orderID = orderID;
        });

        // Masukkan semua detail baru
        await detailsOfOrderModel.bulkCreate(detailOfOrder);

        return response.json({
            success: true,
            message: `Film Ordered has been updated`
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

//create func for delete film ordering data
exports.deleteOrdering = async (request, response) => {
    //prepare orderID that as parameter to delete
    let orderID = request.params.id

    //delete detailsOfOrder using model
    detailsOfOrderModel.destroy(
        { where: {orderID: orderID}}
    )
    .then(result => {
        //delete order data using model
        orderModel.destroy({where: {id: orderID}})
        .then(result => {
            return response.json({
                success: true,
                message: `Ordering Film's has deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

// create function for get all ordering data
exports.getOrder = async (request, response) => {
    let data = await orderModel.findAll(
        {
            include: [
                `user`, `admin`,
                {
                    model: detail_of_order,
                    as: `details_of_order`,
                    include: ["film"]
                }
            ]
        }
    )
    return response.json({
        success: true,
        data: data,
        message: `All ordering film have been loaded`
    })
}