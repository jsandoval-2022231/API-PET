const Usuario = require('../models/usuario');
const Mascota = require('../models/mascota');
const Role = require('../models/role');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const existeMascotaId = async ( id = '') => {
    const existeMascotaId = await Mascota.findOne({id});
    if(existeMascotaId){
        throw new Error(`La mascota con el ${ id } no existe`);
    }
}

const existeMascotaNombre = async ( nombre = '') => {
    const existeMascotaNombre = await Mascota.findOne({nombre});
    if(existeMascotaNombre){
        throw new Error(`La mascota con el ${ nombre } ya existe`);
    }
}

const edadMinimal = async (edad = 0) => {
    if(edad <= 0){
        throw new Error(`La edad no puede ser menor a 0`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existeMascotaId,
    existeMascotaNombre,
    edadMinimal
}