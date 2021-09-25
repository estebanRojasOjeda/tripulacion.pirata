const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "El nomre es requerido"]
    },
    lastName: {
        type: String,
        required: [true, "El nomre es requerido"]
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"],
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "Correo invalido"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        minlength: [3, "La contraseña debe tener 3 caracteres"]
    }

}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben coincidir');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
});

const User = mongoose.model('User', UserSchema);

module.exports = User;