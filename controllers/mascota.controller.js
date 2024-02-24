const { response, json } = require('express');
const Mascota = require('../models/mascota');

const mascotaGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { adoptado: false };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const mascotasPost = async (req, res) => {
    const {nombre, edad, raza, adoptado }  = req.body;
    const mascota = new Mascota({nombre, edad, raza, adoptado});

    await mascota.save();
    res.status(200).json({
        mascota
    });
}

const getMascotaById = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotaPut = async (req, res) => {
    const { id } = req.params;
    const { _id, edad, raza, ...resto} = req.body;

    await Mascota.findByIdAndUpdate(id, resto);

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'Mascota fue adoptada :D',
        mascota
    })
}

const mascotaDelete = async (req, res) => {
    const {id} = req.params;
    await Mascota.findByIdAndUpdate(id,{adoptado: true});

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'Mascota eliminado exitosamente',
        mascota
    });
}


module.exports = {
    mascotaGet,
    mascotasPost,
    mascotaDelete,
    mascotaPut,
    getMascotaById
}
