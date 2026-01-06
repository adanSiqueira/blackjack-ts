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
    return {
        id,
        hand: player.hand.cards.map(mapCard),
        value: player.hand.value,
        funds: player.funds,
        status: player.hand.value > 21
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
