const { Router } = require('express');
const { check } = require('express-validator');

const { mascotaGet, mascotasPost, mascotaDelete, mascotaPut, getMascotaById} = require('../controllers/mascota.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaId, edadMinimal, existeMascotaNombre } = require('../helpers/db-validators');

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
    "/",
    [
        check("edad", "la edad minima debe de ser mayor a 1").custom(edadMinimal),
        check("nombre","El nombre es obligatorio").custom(existeMascotaNombre),
        validarCampos
    ], mascotasPost);

router.put(
    "/:id", [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaId),
        validarCampos
    ], mascotaPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaId),
        validarCampos
    ], mascotaDelete);


module.exports = router;