const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = (req, res = response) => {
  // si no existe nombre
  const { nombre = "generic", apellido } = req.query;

  res.json({
    ok: true,
    msg: "get API - controlador",
    nombre,
    apellido,
  });
};

const usuariosGetPaginado = async (req, res = response) => {

  const { limite = 5, desde = 0 } = req.query;

  const usuarios = await Usuario.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite));
  const cant_usuarios = await Usuario.countDocuments({ estado: true });

  // si quiero disparar ambas promesas a la vez, ya que no dependen una de la otra
  const resp = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  console.log("usuarios", usuarios);
  // res.json({ cantidad: cant_usuarios, usuarios: usuarios });
  res.json(resp);
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, ...resto } = req.body;

  if (password) {
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(200).json({
    ok: true,
    msg: "put API - controlador",
    usuario,
  });
};

const usuariosPost = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si correo existe

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(200).json({
      usuario,
    });
  } catch (error) {
    console.log("error", error);
    res.json({ msg: "error", text: error });
  }
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  const uid = req.uid;

  // Borrado físico
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Borrado soft
  const usuarioSoft = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({ usuario: usuarioSoft, uid });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosGetPaginado,
};
