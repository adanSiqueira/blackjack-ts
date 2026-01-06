"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameStore = exports.GameStore = void 0;
const crypto_1 = __importDefault(require("crypto"));
const domain_1 = require("@blackjack/domain");
class GameStore {
    constructor() {
        this.games = new Map();
    }
    createGame() {
        const id = crypto_1.default.randomUUID();
        const session = {
            id,
            game: new domain_1.Game(),
            createdAt: new Date(),
            status: 'active'
        };
        this.games.set(id, session);
        return session;
    }
    getGame(id) {
        return this.games.get(id);
    }
    finishGame(id) {
        const session = this.games.get(id);
        if (!session)
            return;
        session.status = 'finished';
    }
    deleteGame(id) {
        this.games.delete(id);
    }
    listActiveGames() {
        return [...this.games.values()].filter(g => g.status === 'active');
    }
}
exports.GameStore = GameStore;
exports.gameStore = new GameStore();
