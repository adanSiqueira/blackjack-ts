"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGameToState = mapGameToState;
function mapCard(card) {
    return {
        suit: card.suit,
        rank: card.rank,
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
function mapResult(game) {
    const p = game.player.hand.value;
    const d = game.dealer.hand.value;
    if (p > 21)
        return 'lose';
    if (d > 21)
        return 'win';
    if (p > d)
        return 'win';
    if (p < d)
        return 'lose';
    return 'push';
}
function mapGameToState(game, gameId, status) {
    const playerBust = game.isPlayerBust();
    const phase = status === 'finished' ? 'finished' : 'player_turn';
    return {
        gameId,
        player: mapPlayer(game.player, 'player'),
        dealer: mapPlayer(game.dealer, 'dealer', {
            hideSecondCard: phase === 'player_turn',
        }),
        phase,
        result: phase === 'finished' ? mapResult(game) : undefined
    };
}
