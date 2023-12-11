const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  categoriasGet,
  categoriasPost,
  categoriasPut,
  categoriasDelete,
} = require("../controllers/categoria");
const { validarJWT } = require("../middlewares/validar-jwt");
const { existeCategoria } = require("../middlewares/validar-idCat");

const router = Router();

router.get("/", [validarCampos], categoriasGet);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  categoriasPost
);
router.put(
  "/:id",
  [
    validarJWT,
    existeCategoria,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  categoriasPut
);
router.delete(
  "/:id",
  [validarJWT, existeCategoria, validarCampos],
  categoriasDelete
);

module.exports = router;
