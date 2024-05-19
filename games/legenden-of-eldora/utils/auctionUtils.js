// utils/propertyUtils.js
function buyProperty(player, propertyId) {
    const property = propertyData[propertyId];
  
    if (!property) {
      return false;
    }
  
    if (!checkPropertyRequirements(player, property)) {
      return false;
    }
  
    player.ownedProperties.push(propertyId);
    player.gold -= property.price;
    return true;
  }
  
  function sellProperty(player, propertyId) {
    const property = propertyData[propertyId];
  
    if (!property) {
      return false;
    }
  
    if (!player.ownedProperties.includes(propertyId)) {
      return false;
    }
  
    player.ownedProperties = player.ownedProperties.filter(id => id !== propertyId);
    player.gold += property.sellPrice;
    return true;
  }
  
  function checkPropertyRequirements(player, property) {
    // Implement property requirement checking logic
    return true; // Placeholder
  }
  
  module.exports = {
    buyProperty,
    sellProperty,
  };
  // games/legenden-om-eldoria/utils/auctionUtils.js
const auctions = require('../data/auctions');
const items = require('../data/items');

function createAuction(player, itemId, startingBid, duration) {
  const auctionId = generateAuctionId();
  const item = items[itemId];
  const endTime = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
  const auction = {
    id: auctionId,
    item: itemId,
    seller: player.id,
    currentBid: startingBid,
    bidders: [],
    endTime,
  };

  auctions[auctionId] = auction;

  return auctionId;
}

function placeBid(player, auctionId, bid) {
  const auction = auctions[auctionId];

  if (!auction) {
    return false;
  }

  if (bid <= auction.currentBid) {
    return false;
  }

  if (player.gold < bid) {
    return false;
  }

  auction.currentBid = bid;
  auction.bidders.push(player.id);

  return true;
}

function generateAuctionId() {
  // Implement auction ID generation logic
  return 'auction_' + Math.random().toString(36).substr(2, 9);
}

module.exports = {
  createAuction,
  placeBid,
};
