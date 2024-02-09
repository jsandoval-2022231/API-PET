const { Router } = require('express');
const { check } = require('express-validator');
const { mascotaGet, mascotasPost, mascotaDelete, mascotaPut, getMascotaById} = require('../controllers/mascota.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { raza, existeMascotaId } = require('../helpers/db-validators');

const router = Router();

router.get("/", mascotaGet);


router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaId),
        validarCampos
    ], getMascotaById);

router.post(
    "/:id",
    [
        check("id", "El id no es un formato valido de mongoDB").isMongoId(),
        check("edad","La edad es obligatoria").not().isEmpty(),
        validarCampos
    ], mascotasPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], mascotaPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaId),
        validarCampos
    ], mascotaDelete);


router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ], mascotasPost);

module.exports = router;