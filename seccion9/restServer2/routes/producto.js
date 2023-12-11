const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
} = require("../controllers/producto");
const { validarJWT } = require("../middlewares/validar-jwt");
const { existeProducto } = require("../middlewares/validar-idCat");

const router = Router();

router.get("/", [validarCampos], productosGet);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatorio").not().isEmpty(),
    check("categoria", "El id de la categoría no es válido").isMongoId(),
    validarCampos,
  ],
  productosPost
);
router.put(
  "/:id",
  [
    validarJWT,
    existeProducto,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("descripcion", "La descripción es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  productosPut
);
router.delete(
  "/:id",
  [validarJWT, existeProducto, validarCampos],
  productosDelete
);

module.exports = router;
