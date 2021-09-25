const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name: {
        required: [true, "El nombre de pirate es requerido"],
        type: String
    },
    position: {
        required: [true, "La posición del pirate es requerida"],
        type: String
    },
    imageUrl: {
        required: [true, "La Url de imagen es requerida"],
        type: String
    },
    treasure: {
        required: [true, "Debe agregar al menos un tesoro"],
        type: Number
    },
    Phrase: {
        required: [true, "Debe agregar una frase"],
        type: String
    },
    PegLeg: {
        required: [true, "No puede ser Nulo"],
        type: Boolean
    },
    EyePatch: {
        required: [true, "No puede ser Nulo"],
        type: Boolean
    },
    HookHand: {
        required: [true, "No puede ser Nulo"],
        type: Boolean
    }
    
});



const Pirate = mongoose.model("Pirate", PirateSchema);
module.exports = Pirate;