class Marketplace {
    constructor() {
        this.listings = [];
    }

    addListing(item, price, seller) {
        this.listings.push({ item, price, seller });
        console.log(`Listing added: ${item} for ${price} gold.`);
    }

    buyItem(itemName, buyer) {
        const listing = this.listings.find(listing => listing.item === itemName);
        if (listing && buyer.gold >= listing.price) {
            buyer.inventory.push(listing.item);
            buyer.gold -= listing.price;
            listing.seller.gold += listing.price;
            console.log(`${buyer.name} bought ${itemName} for ${listing.price} gold.`);
            this.listings = this.listings.filter(list => list !== listing);
        } else {
            console.log('Transaction failed.');
        }
    }
}

module.exports = { Marketplace };
