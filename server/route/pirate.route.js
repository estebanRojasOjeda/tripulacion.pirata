const PirateController = require("../controller/pirate.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/pirate/new", authenticate, PirateController.createPirate);
    app.get("/api/pirate/all", authenticate, PirateController.findPirates);
    app.get("/api/pirate/:id", authenticate, PirateController.findPirateById);
    app.put("/api/pirate/:id", authenticate, PirateController.updatePirate);
    app.delete("/api/pirate/:id", authenticate, PirateController.deletePirate);
}