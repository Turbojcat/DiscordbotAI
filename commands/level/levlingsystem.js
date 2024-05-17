const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'userData.json');
const configFilePath = path.join(__dirname, '..', '..', 'config.json'); // Update this line

// Load configuration
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

// Load user data from the JSON file
function loadUserData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading user data:', err);
    return {};
  }
}

// Function to save user data to the JSON file
function saveUserData(userData) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
  } catch (err) {
    console.error('Error saving user data:', err);
  }
}

// Function to backup user data
function backupUserData(userData) {
  try {
    fs.writeFileSync(backupFilePath, JSON.stringify(userData, null, 2));
    console.log('User data backup created successfully.');
  } catch (err) {
    console.error('Error creating user data backup:', err);
  }
}

// Function to calculate the required XP for the next level
function calculateRequiredXP(level) {
  return Math.floor(config.baseXP * Math.pow(config.xpMultiplier, level));
}

// In-memory cache for user data
const userDataCache = loadUserData();

// Cooldown tracking
const cooldowns = new Map();

module.exports = {
  data: {
    name: 'level',
    description: 'View your current level and XP',
  },
  execute(message) {
    const userId = message.author.id;

    // If the user doesn't have any data, initialize it
    if (!userDataCache[userId]) {
      userDataCache[userId] = {
        xp: 0,
        level: 0,
        totalMessages: 0,
      };
    }

    const { xp, level, totalMessages } = userDataCache[userId];
    const requiredXP = calculateRequiredXP(level + 1);

    // Create an embed to display the user's level, XP, and total messages
    const embed = {
      color: 0x0099ff,
      title: `Level: ${level}`,
      description: `XP: ${xp}/${requiredXP}`,
      fields: [
        {
          name: 'Total Messages',
          value: totalMessages.toString(),
          inline: true,
        },
      ],
      footer: {
        text: `You need ${requiredXP - xp} more XP to reach the next level.`,
      },
    };

    message.reply({ embeds: [embed] });
  },

  leaderboard(message) {
    const sortedUsers = Object.entries(userDataCache)
      .sort((a, b) => b[1].level - a[1].level || b[1].xp - a[1].xp)
      .slice(0, 10);

    const leaderboardEmbed = {
      color: 0x0099ff,
      title: 'Leaderboard',
      fields: sortedUsers.map(([userId, userData], index) => ({
        name: `${index + 1}. ${message.guild.members.cache.get(userId).user.username}`,
        value: `Level: ${userData.level}\nXP: ${userData.xp}`,
        inline: true,
      })),
    };

    message.reply({ embeds: [leaderboardEmbed] });
  },

  handleMessage(message) {
    const userId = message.author.id;
    const content = message.content.trim();

    // Check if the user has permission to gain XP
    if (!message.member.roles.cache.some(role => config.allowedRoles.includes(role.id))) {
      return;
    }

    // Check if the user is on cooldown
    if (cooldowns.has(userId)) {
      const cooldownExpiration = cooldowns.get(userId);
      const remainingCooldown = cooldownExpiration - Date.now();
      if (remainingCooldown > 0) {
        return;
      } else {
        cooldowns.delete(userId);
      }
    }

    // Check if the message contains at least one valid word
    const words = content.match(/\b\w+\b/g);
    const hasValidWord = words && words.length > 0;

    // Check if the message has a minimum number of unique words
    const uniqueWords = new Set(words);
    const hasMinUniqueWords = uniqueWords.size >= config.minUniqueWords;

    if (hasValidWord && hasMinUniqueWords && content.length >= config.minCharacters) {
      const xpToAdd = Math.floor(content.length * config.xpMultiplier);

      // Initialize user data if it doesn't exist
      if (!userDataCache[userId]) {
        userDataCache[userId] = {
          xp: 0,
          level: 0,
          totalMessages: 0,
        };
      }

      userDataCache[userId].xp += xpToAdd;
      userDataCache[userId].totalMessages += 1; // Increment total messages count

      const { xp, level } = userDataCache[userId];
      const requiredXP = calculateRequiredXP(level + 1);

      // Level up if the user has enough XP
      if (xp >= requiredXP) {
        userDataCache[userId].level += 1;
        userDataCache[userId].xp = xp - requiredXP;

        // Award role reward if applicable
        const roleReward = config.roleRewards.find(reward => reward.level === userDataCache[userId].level);
        if (roleReward) {
          const role = message.guild.roles.cache.get(roleReward.roleId);
          if (role) {
            message.member.roles.add(role)
              .then(() => {
                message.reply(`Congratulations! You have leveled up to level ${userDataCache[userId].level} and been awarded the ${role.name} role.`);
              })
              .catch(console.error);
          } else {
            console.error(`Role with ID ${roleReward.roleId} not found.`);
          }
        } else {
          message.reply(`Congratulations! You have leveled up to level ${userDataCache[userId].level}.`);
        }
      }

      saveUserData(userDataCache);
      cooldowns.set(userId, Date.now() + config.cooldownDuration);
    }
  },
};

// Backup user data every 24 hours
setInterval(() => {
  backupUserData(userDataCache);
}, 24 * 60 * 60 * 1000);
