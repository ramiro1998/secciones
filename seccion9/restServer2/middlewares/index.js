const validaCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validaRoles,
};


//únicamente está exportado y comentado en routes/usuarios
