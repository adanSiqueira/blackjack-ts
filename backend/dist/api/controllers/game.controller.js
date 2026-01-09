"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const game_services_1 = require("../../services/game.services");
const game_mapper_1 = require("../../mappers/game.mapper");
class GameController {
    static createGame(req, res) {
        const session = game_services_1.gameService.createGame(100);
        res.json((0, game_mapper_1.mapGameToState)(session.game, session.id));
    }
    static getGame(req, res) {
        try {
            const session = game_services_1.gameService.getGame(req.params.id);
            res.json((0, game_mapper_1.mapGameToState)(session.game, session.id));
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
    static hit(req, res) {
        try {
            const session = game_services_1.gameService.hit(req.params.id);
            res.json((0, game_mapper_1.mapGameToState)(session.game, session.id));
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static stand(req, res) {
        try {
            const session = game_services_1.gameService.stand(req.params.id);
            res.json((0, game_mapper_1.mapGameToState)(session.game, session.id));
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
exports.GameController = GameController;
