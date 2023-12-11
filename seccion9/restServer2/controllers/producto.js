const { response } = require("express");
const Producto = require("../models/producto");

const productosGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  // si quiero disparar ambas promesas a la vez, ya que no dependen una de la otra
  const resp = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json(resp);
};

const productosPost = async (req, res = response) => {
  const { ...body } = req.body;
  console.log("body", body, body.nombre);
  const productoExist = await Producto.findOne({ nombre: body.nombre });

  if (productoExist) {
    return res.status(401).json({
      msg: `El producto ${productoExist.nombre} ya existe`,
    });
  }

  const productoToCreate = {
    ...body,
    usuario: req.usuario._id,
  };
  console.log("productoToCreate", productoToCreate);
  const productoCreated = new Producto(productoToCreate);

  await productoCreated.save();

  res.json({
    ok: true,
    msg: "post API productos - controlador",
    producto: productoCreated,
  });
};

const productosPut = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  const existeProducto = await Producto.findOne({ _id: id });
  if (!existeProducto) {
    return res.json({
      msg: "No existe el id de la producto ingresada",
    });
  }

  const updatedProducto = await Producto.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    ok: true,
    msg: "put API productos - controlador",
    producto: updatedProducto,
  });
};

const productosDelete = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;
  resto.estado = false;

  const existeProducto = await Producto.findOne({ _id: id });
  if (!existeProducto) {
    return res.json({
      msg: "No existe el id de la producto ingresada",
    });
  }

  const updatedProducto = await Producto.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    ok: true,
    msg: "delete API productos - controlador",
  });
};

module.exports = {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
};
