const Pirate = require("../model/pirate.model");
const jwtConfig = require('../config/jwt.config');
const jwt = require('jsonwebtoken');

module.exports.createPirate = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (error) => {
        if (!error) {
            Pirate.create(req.body)
                .then(newFruit => res.json({ newFruit: newFruit }))
                .catch(err => res.json({ message: "Error al crear pirata", error: err }));
        } else {
            res.status(500).json(error);
        }
    });
}

module.exports.findPirates = (req, res) => {
    Pirate.find({}).sort({name:1})
        .then(pirates => res.json({ pirates: pirates }))
        .catch(err => res.json({ message: "Error al listar", error: err }));
}

module.exports.findPirateById = (req, res) => {
    Pirate.findById(req.params.id)
        .then(pirate => res.json({ pirate: pirate }))
        .catch(err => res.json({ message: "Error al buscar por id", error: err }))
}

module.exports.updatePirate = (req, res) => {
    Pirate.findByIdAndUpdate(req.params.id, req.body)
        .then(pirateUpdate => res.json({ pirateUpdate: pirateUpdate }))
        .catch(err => res.json({ message: "Error al actualizar", error: err }))
}

module.exports.deletePirate = (req, res) => {
    Pirate.findOneAndRemove({ _id: req.params.id })
        .then(resDelete => res.json({ resDelete: resDelete }))
        .catch(err => res.status(500).json(err))
}