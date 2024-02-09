const { Schema, model } = require('mongoose');

const MascotaSchema = Schema({
    nombre: {
        type: String,
        require: [true, "El nombres es obligatorio"]
    },
    edad: {
        type: Number,
        require: [true, "La edad es obligatoria"]
    },
    raza: {
        type: String,
        require: [true, "La raza debe ser obligatoria"]
    },
    adoptado: {
        type: Boolean,
    }
});

module.exports = model('Mascota', MascotaSchema);