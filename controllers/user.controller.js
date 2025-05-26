const userModel = require(`../models/index`).user
const md5 = require(`md5`)
/** Load Operation from Sequelize */
const Op = require(`sequelize`).Op
//load func auth form controller

// Fungsi untuk mendapatkan semua data user
exports.getAllUser = async (request, response) => {
    let users = await userModel.findAll();
    return response.json({
        success: true,
        data: users,
        message: `All Users have been loaded`
    });
};

// Fungsi untuk menambahkan data user baru
exports.addUser = (request, response) => {
    let newUser = {
        name: request.body.name,
        address: request.body.address,
        contact: request.body.contact,
        role: request.body.role || 'user',
        email: request.body.email,
        password: md5(request.body.password),
    };
    /** Execute inserting data to user's table */
    userModel.create(newUser)
    .then(result => {
        /** if insert's process success */
        return response.json({
            success: true,
            data: result,
            message: `New User has been inserted`
        })
    })
    .catch(error => {
        /** if insert's process success */
        return response.json({
            success: false,
            message: error.message
        })
    })
};

exports.findUser = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation 
     * to find data based on keyword */
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword} },
                { email: { [Op.substring]: keyword} },
                { contact: { [Op.substring]: keyword} },
                { role: { [Op.substring]: keyword} },
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: `All Users have been loaded`
    })
}


// Fungsi untuk mengubah data user
exports.updateUser = (request, response) => {
    let dataUser = {
        name: request.body.name,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role,
    };
    let idUser = request.params.id;
    userModel.update(dataUser, { where: { id: idUser } })
        .then(result => {
            return response.json({
                success: true,
                data: dataUser,
                message: `Data user has been updated`
            });
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            });
        });
};

// Fungsi untuk menghapus data user
exports.deleteUser = (request, response) => {
    let idUser = request.params.id;
    userModel.destroy({ where: { id: idUser } })
        .then(result => {
            return response.json({
                success: true,
                data:idUser,
                message: `Data user has been deleted`
            });
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            });
       });
};

