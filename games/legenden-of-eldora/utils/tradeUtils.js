// utils/tradeUtils.js
function initiateTradeRequest(player1, player2) {
    const tradeId = generateTradeId();
    const trade = {
      id: tradeId,
      player1: player1.id,
      player2: player2.id,
      player1Items: [],
      player2Items: [],
      player1Accepted: false,
      player2Accepted: false,
    };
  
    tradeData[tradeId] = trade;
    return tradeId;
  }
  
  function addItemToTrade(tradeId, playerId, itemId, quantity) {
    const trade = tradeData[tradeId];
  
    if (!trade) {
      return false;
    }
  
    const player = playerId === trade.player1 ? 'player1' : 'player2';
    const playerItems = trade[`${player}Items`];
  
    if (!playerItems.some(item => item.id === itemId)) {
      playerItems.push({ id: itemId, quantity });
    } else {
      const itemIndex = playerItems.findIndex(item => item.id === itemId);
      playerItems[itemIndex].quantity += quantity;
    }
  
    return true;
  }
  
  function removeItemFromTrade(tradeId, playerId, itemId, quantity) {
    const trade = tradeData[tradeId];
  
    if (!trade) {
      return false;
    }
  
    const player = playerId === trade.player1 ? 'player1' : 'player2';
    const playerItems = trade[`${player}Items`];
  
    const itemIndex = playerItems.findIndex(item => item.id === itemId);
  
    if (itemIndex === -1) {
      return false;
    }
  
    playerItems[itemIndex].quantity -= quantity;
  
    if (playerItems[itemIndex].quantity <= 0) {
      playerItems.splice(itemIndex, 1);
    }
  
    return true;
  }
  
  function acceptTrade(tradeId, playerId) {
    const trade = tradeData[tradeId];
  
    if (!trade) {
      return false;
    }
  
    const player = playerId === trade.player1 ? 'player1' : 'player2';
    trade[`${player}Accepted`] = true;
  
    if (trade.player1Accepted && trade.player2Accepted) {
      completeTrade(trade);
      delete tradeData[tradeId];
    }
  
    return true;
  }
  
  function completeTrade(trade) {
    // Implement trade completion logic
  }
  
  function generateTradeId() {
    // Implement trade ID generation logic
    return 'trade_' + Math.random().toString(36).substr(2, 9);
  }
  
  module.exports = {
    initiateTradeRequest,
    addItemToTrade,
    removeItemFromTrade,
    acceptTrade,
  };
  