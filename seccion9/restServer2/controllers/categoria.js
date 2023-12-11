const { response } = require("express");
const Categoria = require("../models/categoria");

const categoriasGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  // si quiero disparar ambas promesas a la vez, ya que no dependen una de la otra
  const resp = await Promise.all([
    Categoria.countDocuments({ estado: true }),
    Categoria.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json(resp);
};

const categoriasPost = async (req, res = response) => {
  const { nombre } = req.body;

  const categoriaExist = await Categoria.findOne({ nombre });

  if (categoriaExist) {
    return res.status(401).json({
      msg: `La categoría ${categoriaExist.nombre} ya existe`,
    });
  }

  const categoriaToCreate = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoriaCreated = new Categoria(categoriaToCreate);

  await categoriaCreated.save();

  res.json({
    ok: true,
    msg: "post API categorías - controlador",
    categoria: categoriaCreated,
  });
};

const categoriasPut = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  const existeCategoria = await Categoria.findOne({ _id: id });
  if (!existeCategoria) {
    return res.json({
      msg: "No existe el id de la categoría ingresada",
    });
  }

  const updatedCategoria = await Categoria.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    ok: true,
    msg: "put API categorías - controlador",
    categoria: updatedCategoria,
  });
};

const categoriasDelete = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;
  resto.estado = false;

  const existeCategoria = await Categoria.findOne({ _id: id });
  if (!existeCategoria) {
    return res.json({
      msg: "No existe el id de la categoría ingresada",
    });
  }

  const updatedCategoria = await Categoria.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    ok: true,
    msg: "delete API categorías - controlador",
  });
};

module.exports = {
  categoriasGet,
  categoriasPost,
  categoriasPut,
  categoriasDelete,
};
