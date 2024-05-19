class Trade {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.offers = { player1: [], player2: [] };
        this.isCompleted = false;
    }

    addOffer(player, item) {
        this.offers[player.id].push(item);
    }

    completeTrade() {
        if (this.isCompleted) return;
        this.player1.inventory = this.player1.inventory.filter(item => !this.offers.player1.includes(item));
        this.player2.inventory = this.player2.inventory.filter(item => !this.offers.player2.includes(item));
        this.player1.inventory.push(...this.offers.player2);
        this.player2.inventory.push(...this.offers.player1);
        this.isCompleted = true;
        console.log('Trade completed successfully.');
    }
}

module.exports = Trade;
