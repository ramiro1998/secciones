const { response } = require('express')


const usuariosGet = (req, res = response) => {

    // si no existe nombre
    const { nombre = 'generic', apellido } = req.query

    res.json({
        ok: true,
        msg: 'get API - controlador',
        nombre,
        apellido
    })
}


const usuariosPut = (req, res) => {

    const { id } = req.params

    res.status(200).json({
        ok: true,
        msg: 'put API - controlador',
        id
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

const usuariosDelete = (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'delete API - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}