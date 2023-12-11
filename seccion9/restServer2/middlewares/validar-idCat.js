const existeCategoria = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      msg: "id inválido",
    });
  }

  next();
};

const existeProducto = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      msg: "id inválido",
    });
  }

  next();
};

module.exports = { existeCategoria, existeProducto };
