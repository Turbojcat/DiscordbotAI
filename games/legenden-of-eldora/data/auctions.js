// games/legenden-om-eldoria/data/auctions.js
const auctions = {
    'auction_1': {
      item: 'iron_sword',
      seller: 'player_id_1', // Replace with an actual player ID
      currentBid: 100,
      bidders: ['player_id_2', 'player_id_3'], // Replace with actual player IDs
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
  };
  
  module.exports = auctions;
  