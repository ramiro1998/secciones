const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  categoria: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Categoria",
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, ...producto } = this.toObject();
  producto.uid = _id
  return producto;
};

module.exports = model("Producto", ProductoSchema);
