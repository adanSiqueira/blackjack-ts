"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGameToState = mapGameToState;
function mapCard(card) {
    return {
        suit: card.suit,
        rank: card.rank,
    };
}
function mapPlayer(player, id) {
    const cards = player.hand?.cards ?? [];
    return {
        id,
        hand: cards.map(mapCard),
        value: player.hand?.value ?? 0,
        funds: player.funds ?? 0,
        status: (player.hand?.value ?? 0) > 21
            ? 'bust'
            : 'playing',
    };
}
function mapGameToState(game, gameId) {
    return {
        gameId,
        player: mapPlayer(game.player, 'player'),
        dealer: mapPlayer(game.dealer, 'dealer'),
        phase: 'player_turn',
    };
}
