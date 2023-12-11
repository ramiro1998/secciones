const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.status(400).json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.status(400).json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex }, { estado: true });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino);
    return res.status(400).json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $and: [{ nombre: regex }, { estado: true }],
  });

  res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `La colección ${coleccion} no existe`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      return buscarUsuarios(termino, res);
    case "categorias":
      return buscarCategorias(termino, res);
    case "productos":
      return buscarProductos(termino, res);
    default:
      break;
  }

  res.json({
    coleccion,
    termino,
  });
};

module.exports = { buscar };
