const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const mailExist = await Usuario.findOne({ correo });
  if (mailExist)
    throw new Error(`El correo ${correo} ya está registrado en la BD`);
};

const existeUsuarioId = async (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const idExist = await Usuario.findById(id);
    if (!idExist) throw new Error(`El id ${id} no está registrado en la BD`);
    // Yes, it's a valid ObjectId, proceed with `findById` call.
  } else {
    throw new Error(`El id no es válido`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioId,
};
