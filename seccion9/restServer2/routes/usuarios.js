const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosGetPaginado,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido } = require("../helpers/db-validators");
const { emailExiste } = require("../helpers/db-validators");
const { existeUsuarioId } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

//importando más limpio desde index
// const { validarCampos, validarJWT, tieneRole } = require("../middlewares/index");

const router = Router();

router.get("/", usuariosGetPaginado);

router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("rol").custom((rol) => esRoleValido(rol)),
    check("id").custom((id) => existeUsuarioId(id)),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom((correo) => emailExiste(correo)),
    check("rol").custom((rol) => esRoleValido(rol)),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [validarJWT, tieneRole("ADMIN_ROLE", "VENTAS_ROLE"), esAdminRole],
  usuariosDelete
);

module.exports = router;
