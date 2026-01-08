"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const domain_1 = require("@blackjack/domain");
const game_mapper_1 = require("../../mappers/game.mapper");
const games = new Map();
class GameController {
    static createGame(req, res) {
        const game = new domain_1.Game();
        const gameId = crypto.randomUUID();
        game.start(100); // Starting with a default bet of 100
        games.set(gameId, game);
        const dto = (0, game_mapper_1.mapGameToState)(game, gameId);
        res.json(dto); // ✅ THIS is what frontend expects
    }
    static getGame(req, res) {
        const game = games.get(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json((0, game_mapper_1.mapGameToState)(game, req.params.id));
    }
    static hit(req, res) {
        const game = games.get(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        game.hitPlayer();
        res.json((0, game_mapper_1.mapGameToState)(game, req.params.id));
    }
    static stand(req, res) {
        const game = games.get(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        game.stand();
        res.json((0, game_mapper_1.mapGameToState)(game, req.params.id));
    }
}
exports.GameController = GameController;
