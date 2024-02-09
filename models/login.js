const { Schema, model} = require('mongoose');

const LoginSchema = Schema ({
    username: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    }
});

module.exports = model('Login', LoginSchema);