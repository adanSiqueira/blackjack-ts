"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGameToState = mapGameToState;
function mapCard(card) {
    return {
        suit: card.suit,
        rank: card.value,
    };
}
function calculateVisibleValue(cards) {
    let total = 0;
    for (const card of cards) {
        if (['K', 'Q', 'J'].includes(card.rank))
            total += 10;
        else if (card.rank === 'A')
            total += 11; // first-card Ace = 11
        else
            total += Number(card.rank);
    }
    return total;
}
function mapPlayer(player, id, options) {
    const cards = player.hand.cards.map(mapCard);
    const visibleCards = options?.hideSecondCard ? cards.slice(0, 1) : cards;
    return {
        id,
        hand: visibleCards,
        value: options?.hideSecondCard ? calculateVisibleValue(visibleCards) : player.hand.value,
        funds: player.funds,
        status: (options?.hideSecondCard ? 0 : player.hand.value) > 21
            ? 'bust'
            : 'playing',
    };
}
function mapGameToState(game, gameId) {
    const phase = 'player_turn'; // later this becomes dynamic
    return {
        gameId,
        player: mapPlayer(game.player, 'player'),
        dealer: mapPlayer(game.dealer, 'dealer', {
            hideSecondCard: phase === 'player_turn',
        }),
        phase,
    };
}
