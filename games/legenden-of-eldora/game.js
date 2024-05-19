const { createEmbed } = require('./utils/embeds');
const players = require('./data/players');
const items = require('./data/items');
const monsters = require('./data/monsters');
const quests = require('./data/quests');
const events = require('./data/events');
const raids = require('./data/raids');
const arenas = require('./data/arenas');
const {
  gainExperience,
  calculateExperienceNeeded,
  calculateDamage,
  performAttack,
  isPlayerDead,
} = require('./utils/gameUtils');
const {
  addItemToInventory,
  removeItemFromInventory,
} = require('./utils/inventoryUtils');
const { gainSkillExperience } = require('./utils/skillUtils');
const {
  startQuest,
  completeQuest,
} = require('./utils/questUtils');
const { startEvent, completeEvent } = require('./utils/eventUtils');
const { joinRaid, completeRaid } = require('./utils/raidUtils');
const { joinArena, completeArena } = require('./utils/arenaUtils');
const { savePlayerData, loadPlayerData, saveGameState, loadGameState } = require('./utils/saveUtils');
const Player = require('./player/Player');

const playerRaces = ['Night Elf', 'Blood Elf', 'Gnome', 'Troll', 'Human'];

class Game {
  constructor(client) {
    this.client = client;
    this.players = {};
    this.items = items;
    this.monsters = monsters;
    this.quests = quests;
    this.events = events;
    this.raids = raids;
    this.arenas = arenas;
  }

  start() {
    this.loadGameData();
    this.registerGameCommands();
    this.saveGameDataInterval = setInterval(() => {
      this.saveGameData();
    }, 60 * 1000); // Save every minute
  }

  loadGameData() {
    const gameState = loadGameState();
    if (gameState) {
      // Load game state data from gameState object
    } else {
      // Initialize game state data
    }

    // Load player data
    this.client.users.cache.forEach(user => {
      const playerData = loadPlayerData(user.id);
      if (playerData) {
        this.players[user.id] = playerData;
      }
    });
  }

  saveGameData() {
    saveGameState();
    Object.values(this.players).forEach(player => savePlayerData(player));
  }

  registerGameCommands() {
    this.client.commands.set('start', {
      data: {
        name: 'start',
        description: 'Start the game',
      },
      execute: this.startGame.bind(this),
    });

    this.client.commands.set('combat', {
      data: {
        name: 'combat',
        description: 'Engage in combat with a monster',
      },
      execute: this.startCombat.bind(this),
    });

    // Register other game commands
    // ...
  }

  async startGame(message) {
    const player = await this.createPlayer(message);
    if (!player) return;

    // Start game logic with the created player
    // ...
  }

  async createPlayer(message) {
    const filter = (m) => m.author.id === message.author.id;
    const raceEmbed = createEmbed('Select your race', 'Choose one of the following races:', playerRaces);

    message.channel.send({ embeds: [raceEmbed] }).then((msg) => {
      msg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then((collected) => {
          const reaction = collected.first();
          const raceIndex = playerRaces.indexOf(reaction.emoji.name);
          const race = playerRaces[raceIndex];

          if (race) {
            const nameEmbed = createEmbed('Enter your name', 'What would you like to name your character?');
            message.channel.send({ embeds: [nameEmbed] }).then(() => {
              message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                .then((collected) => {
                  const name = collected.first().content;
                  const player = new Player(name, race);
                  this.players[message.author.id] = player;
                  message.channel.send(`Welcome to the game, ${player.name} the ${player.race}!`);
                  return player;
                })
                .catch(() => {
                  message.reply('You did not provide a name in time. Please try again.');
                });
            });
          } else {
            message.reply('You did not select a valid race. Please try again.');
          }
        })
        .catch(() => {
          message.reply('You did not select a race in time. Please try again.');
        });
    });
  }

  async startCombat(message) {
    const player = this.players[message.author.id];
    if (!player) {
      message.reply('You need to create a character first. Use the !start command to begin.');
      return;
    }

    const monster = this.getRandomMonster();

    const combatEmbed = createEmbed('Combat', `You encountered a ${monster.name}!`, [
      `Level: ${monster.level}`,
      `Health: ${monster.health}`,
      `Attack: ${monster.attack}`,
      `Defense: ${monster.defense}`,
    ]);

    const filter = (reaction, user) => {
      return ['⚔️', '🛡️', '🏃'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    combatEmbed.setFooter({ text: 'React with ⚔️ to attack, 🛡️ to defend, or 🏃 to flee' });

    message.channel.send({ embeds: [combatEmbed] }).then((msg) => {
      msg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then((collected) => {
          const reaction = collected.first();

          if (reaction.emoji.name === '⚔️') {
            this.handleAttack(message, player, monster);
          } else if (reaction.emoji.name === '🛡️') {
            this.handleDefend(message, player, monster);
          } else if (reaction.emoji.name === '🏃') {
            this.handleFlee(message, player, monster);
          }
        })
        .catch(() => {
          message.reply('You did not react in time. Combat has ended.');
        });
    });
  }

  handleAttack(message, player, monster) {
    const playerDamage = calculateDamage(player.attack, monster.defense);
    const monsterDamage = calculateDamage(monster.attack, player.defense);

    monster.health -= playerDamage;
    player.health -= monsterDamage;

    const attackEmbed = createEmbed('Combat', `You attacked the ${monster.name}!`, [
      `You dealt ${playerDamage} damage to the monster.`,
      `The monster dealt ${monsterDamage} damage to you.`,
      `Your health: ${player.health}`,
      `Monster health: ${monster.health}`,
    ]);

    message.channel.send({ embeds: [attackEmbed] }).then(() => {
      if (isPlayerDead(player)) {
        this.handlePlayerDeath(message, player);
      } else if (monster.health <= 0) {
        this.handleMonsterDefeat(message, player, monster);
      } else {
        this.startCombat(message, monster);
      }
    });
  }

  handleDefend(message, player, monster) {
    const playerDamage = calculateDamage(player.attack, monster.defense);
    const monsterDamage = calculateDamage(monster.attack, player.defense * 2); // Doubled defense when defending

    monster.health -= playerDamage;
    player.health -= monsterDamage;

    const defendEmbed = createEmbed('Combat', `You defended against the ${monster.name}!`, [
      `You dealt ${playerDamage} damage to the monster.`,
      `The monster dealt ${monsterDamage} damage to you.`,
      `Your health: ${player.health}`,
      `Monster health: ${monster.health}`,
    ]);

    message.channel.send({ embeds: [defendEmbed] }).then(() => {
      if (isPlayerDead(player)) {
        this.handlePlayerDeath(message, player);
      } else if (monster.health <= 0) {
        this.handleMonsterDefeat(message, player, monster);
      } else {
        this.startCombat(message, monster);
      }
    });
  }

  handleFlee(message, player, monster) {
    const fleeChance = 50; // 50% chance to flee successfully
    const fleedSuccessfully = Math.random() < fleeChance / 100;

    if (fleedSuccessfully) {
      message.reply('You successfully fled from the combat!');
    } else {
      const monsterDamage = calculateDamage(monster.attack, player.defense);
      player.health -= monsterDamage;

      const fleeFailedEmbed = createEmbed('Combat', `You failed to flee from the ${monster.name}!`, [
        `The monster dealt ${monsterDamage} damage to you.`,
        `Your health: ${player.health}`,
      ]);

      message.channel.send({ embeds: [fleeFailedEmbed] }).then(() => {
        if (isPlayerDead(player)) {
          this.handlePlayerDeath(message, player);
        } else {
          this.startCombat(message, monster);
        }
      });
    }
  }

  handlePlayerDeath(message, player) {
    message.reply(`You have been defeated! Your character ${player.name} has died.`);
    // Implement additional player death logic, such as respawning or game over
  }

  handleMonsterDefeat(message, player, monster) {
    const expGained = gainExperience(monster.level, player.level);
    player.experience += expGained;

    const lootItems = this.generateLoot(monster.level);
    lootItems.forEach(item => addItemToInventory(player, item));

    const defeatEmbed = createEmbed('Combat', `You defeated the ${monster.name}!`, [
      `You gained ${expGained} experience points.`,
      `You looted: ${lootItems.map(item => item.name).join(', ')}`,
      `Your current experience: ${player.experience}`,
    ]);

    message.channel.send({ embeds: [defeatEmbed] });
  }

  generateLoot(monsterLevel) {
    // Implement loot generation logic based on monster level
    // Return an array of Item objects
  }

  getRandomMonster() {
    // Implement logic to fetch a random monster
    // You can use the this.monsters array and return a random monster object
    const randomIndex = Math.floor(Math.random() * this.monsters.length);
    return this.monsters[randomIndex];
  }
}

module.exports = Game;
