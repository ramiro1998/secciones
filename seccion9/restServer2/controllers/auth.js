const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  try {
    const { correo, password } = req.body;

    // Verificar si el mail existe
    const usuario = await Usuario.findOne({ correo: correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (error) {
    return res.json({
      msg: "Hable con el administrador",
      error: error,
    });
  }
};

module.exports = {
  login,
};
