/** load model for table films */
const filmModel = require(`../models/index`).film

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

/** load library path and filestream */
const path = require(`path`)
const fs = require(`fs`)

/** create function to read all data */
exports.getAllFilms = async (req, res) => {
    /** call findAll() to get all data */
    let films = await filmModel.findAll()
    return res.json({
        success: true,
        data: films,
        message: `All films have been loaded`
    })
}

/** create function for filter */
exports.findFilm = async (req, res) => {
    /** define keyword to find data */
    let keyword = req.body.keyword

    /** call findAll() within where clause and operation to find data based on keyword */
    let films = await filmModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { author: { [Op.substring]: keyword } },
                { genre: { [Op.substring]: keyword } },
                { description: { [Op.substring]: keyword } },
            ]
        }
    })
    return res.json({
        success: true,
        data: films,
        message: `All films have been loaded`
    })
}

/** load function from upload-picture single(picture) means just upload one file with request name picture */
const upload = require(`./upload-cover`).single(`picture`)

/** create function to add new film */
exports.addFilm = (req, res) => {
    /** run function upload */
    upload(req, res, async error => {
        /** check if there are error when upload */
        if (error) {
            return res.json({ message: error })
        }

        /** check if file is empty */
        if (!req.file) {
            return res.json({ message: `Nothing to Upload` })
        }

        /** prepare data from request */
        let newFilm = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            price: req.body.price,
            picture: req.file.filename
        }

        /** execute inserting data to films table */
        filmModel.create(newFilm).then(result => {
            /** if inserts process success */
            return res.json({
                success: true,
                data: result,
                message: `New film has been inserted`
            })
        })
        .catch(error => {
            /** if inserts process failed */
            return res.json({
                success: false,
                message: error.message
            })
        })
    })
}

/** create function to update film */
exports.updateFilm = async (req, res) => {
    /** run upload function */
    upload(req, res, async error => {
        /** check if there are error when upload */
        if (error) {
            return res.json({ message: error })
        }

        /** store selected film ID that will update */
        let id = req.params.id

        /** prepare films data that will update */
        let film = {
            name: req.body.name,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            price: req.body.price,
            picture: req.file.filename
        }

        /** check if file is not empty, it means update data within reupload file */
        if (req.file) {
            /** get selected films data */
            const selectedFilm = await filmModel.findOne({
                where: { id: id }
            })

            /** get old filename of picture file */
            const oldPictureFilm = selectedFilm.picture

            /** prepare path of old picture to delete file */
            const pathPicture = path.join(__dirname, `../picture`, oldPictureFilm)

            /** check file existence */
            if (fs.existsSync(pathPicture)) {
                /** delete old picture file */
                fs.unlink(pathPicture, error => console.log(error))
            }
            /** add new picture filename to film object */
            film.picture = req.file.filename
        }

        /** execute update data based on defined id film */
        filmModel.update(film, { where: { id: id } }).then(result => {
            /** if updates process success */
            return res.json({
                success: true,
                data: result,
                message: 'Data film has been updated'
            })
        })
        .catch(error => {
            /** if updates process fail */
            return res.json({
                success: false,
                message: error.message
            })
        })
    })
}

/** create function to delete film */
exports.deleteFilm = async (req, res) => {
    /** store selected films ID that will be delete */
    const id = req.params.id

    /** delete picture file */
    /** get selected films data */
    const film = await filmModel.findOne({ where: { id: id } })
    /** get old filename of picture file */
    const oldPictureFilm = film.picture

    /** prepare path of old picture to delete file */
    const pathPicture = path.join(__dirname, `../picture`, oldPictureFilm)

    /** check file existence */
    if (fs.existsSync(pathPicture)) {
        /** delete old picture file */
        fs.unlink(pathPicture, error => console.log(error))
    }
    /** end of delete picture file */

    /** execute delete data based on defined id film */
    filmModel.destroy({ where: { id: id } }).then(result => {
        /** if updates process success */
        return res.json({
            success: true,
            id_deleted: id,
            message: `Data film has been deleted`
        })
    })
    .catch(error => {
        /** if updates process fail */
        return res.json({
            success: false,
            message: error.message
        })
    })
}